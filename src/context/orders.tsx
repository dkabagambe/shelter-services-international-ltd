import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import { supabase } from "@/lib/supabase";
import type { CartItem } from "./cart";

export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";

export interface Order {
  id: string;
  user_id: string | null;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_company?: string;
  country: string;
  city?: string;
  notes?: string;
  items: CartItem[];
  total_price: number;
  total_qty: number;
  status: OrderStatus;
  created_at: string;
}

interface OrdersContextValue {
  orders: Order[];
  myOrders: Order[];
  loading: boolean;
  placeOrder: (
    fields: Omit<Order, "id" | "created_at" | "status">,
  ) => Promise<{ error: string | null; orderId: string | null }>;
  fetchAllOrders: () => Promise<void>;
  fetchMyOrders: (userId: string) => Promise<void>;
  updateOrderStatus: (id: string, status: OrderStatus) => Promise<{ error: string | null }>;
  deleteOrder: (id: string) => Promise<{ error: string | null }>;
}

const OrdersContext = createContext<OrdersContextValue | null>(null);

export function OrdersProvider({ children }: { children: ReactNode }) {
  const [orders, setOrders] = useState<Order[]>([]);
  const [myOrders, setMyOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);

  const placeOrder = useCallback(async (fields: Omit<Order, "id" | "created_at" | "status">) => {
    const row = { ...fields, status: "pending" as OrderStatus };
    const { data, error } = await supabase.from("orders").insert(row).select("id").single();
    if (error) {
      // Supabase not set up - store locally
      const local: Order = {
        ...row,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString(),
      };
      setMyOrders((prev) => [local, ...prev]);
      return { error: null, orderId: local.id };
    }
    return { error: null, orderId: data.id as string };
  }, []);

  const fetchAllOrders = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .order("created_at", { ascending: false });
    setLoading(false);
    if (!error && data) setOrders(data as Order[]);
  }, []);

  const fetchMyOrders = useCallback(async (userId: string) => {
    setLoading(true);
    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", userId)
      .order("created_at", { ascending: false });
    setLoading(false);
    if (!error && data) setMyOrders(data as Order[]);
  }, []);

  const updateOrderStatus = useCallback(async (id: string, status: OrderStatus) => {
    const { error } = await supabase.from("orders").update({ status }).eq("id", id);
    if (error) return { error: error.message };
    setOrders((prev) => prev.map((o) => (o.id === id ? { ...o, status } : o)));
    return { error: null };
  }, []);

  const deleteOrder = useCallback(async (id: string) => {
    const { error } = await supabase.from("orders").delete().eq("id", id);
    if (error) return { error: error.message };
    setOrders((prev) => prev.filter((o) => o.id !== id));
    return { error: null };
  }, []);

  return (
    <OrdersContext.Provider
      value={{
        orders,
        myOrders,
        loading,
        placeOrder,
        fetchAllOrders,
        fetchMyOrders,
        updateOrderStatus,
        deleteOrder,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

export function useOrders() {
  const ctx = useContext(OrdersContext);
  if (!ctx) throw new Error("useOrders must be used inside OrdersProvider");
  return ctx;
}
