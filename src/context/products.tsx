/**
 * Products store
 * - Reads/writes from Supabase `products` table when connected
 * - Falls back to the static seed data so the site works before Supabase is set up
 */
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import { supabase } from "@/lib/supabase";
import { products as seedProducts } from "@/data/products";

export type Product = {
  id: string;
  name: string;
  image: string;         // URL (Supabase storage) or imported asset path
  price: number;
  unit: string;
  tagline: string;
  min_order: string;
  badge?: string;
  category: "fruits" | "meat" | "vegetables";
  rating: number;
  reviews: number;
  in_stock: boolean;
};

// Map static seed shape → DB shape
function seedToProduct(s: (typeof seedProducts)[number]): Product {
  return {
    id: s.id,
    name: s.name,
    image: s.image,
    price: s.price,
    unit: s.unit,
    tagline: s.tagline,
    min_order: s.minOrder,
    badge: s.badge,
    category: s.category,
    rating: s.rating,
    reviews: s.reviews,
    in_stock: true,
  };
}

const SEED: Product[] = seedProducts.map(seedToProduct);

interface ProductsContextValue {
  products: Product[];
  loading: boolean;
  refresh: () => Promise<void>;
  addProduct: (p: Omit<Product, "id">) => Promise<{ error: string | null }>;
  updateProduct: (id: string, p: Partial<Product>) => Promise<{ error: string | null }>;
  deleteProduct: (id: string) => Promise<{ error: string | null }>;
  uploadImage: (file: File) => Promise<{ url: string | null; error: string | null }>;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>(SEED);
  const [loading, setLoading] = useState(false);
  const [useSupabase, setUseSupabase] = useState(true);

  const refresh = useCallback(async () => {
    if (!useSupabase) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("name");
    setLoading(false);
    if (error || !data) {
      // Supabase not configured yet - use seed data
      setUseSupabase(false);
      return;
    }
    if (data.length === 0) {
      // DB empty on first run - show seed data
      setProducts(SEED);
    } else {
      setProducts(data as Product[]);
    }
  }, [useSupabase]);

  useEffect(() => { refresh(); }, []);

  const addProduct = useCallback(async (p: Omit<Product, "id">) => {
    if (!useSupabase) {
      const newProduct: Product = { ...p, id: crypto.randomUUID() };
      setProducts((prev) => [...prev, newProduct]);
      return { error: null };
    }
    const { error } = await supabase.from("products").insert(p);
    if (error) return { error: error.message };
    await refresh();
    return { error: null };
  }, [useSupabase, refresh]);

  const updateProduct = useCallback(async (id: string, p: Partial<Product>) => {
    if (!useSupabase) {
      setProducts((prev) => prev.map((x) => (x.id === id ? { ...x, ...p } : x)));
      return { error: null };
    }
    const { error } = await supabase.from("products").update(p).eq("id", id);
    if (error) return { error: error.message };
    await refresh();
    return { error: null };
  }, [useSupabase, refresh]);

  const deleteProduct = useCallback(async (id: string) => {
    if (!useSupabase) {
      setProducts((prev) => prev.filter((x) => x.id !== id));
      return { error: null };
    }
    const { error } = await supabase.from("products").delete().eq("id", id);
    if (error) return { error: error.message };
    await refresh();
    return { error: null };
  }, [useSupabase, refresh]);

  const uploadImage = useCallback(async (file: File) => {
    const path = `products/${Date.now()}-${file.name}`;
    const { error } = await supabase.storage.from("product-images").upload(path, file);
    if (error) return { url: null, error: error.message };
    const { data } = supabase.storage.from("product-images").getPublicUrl(path);
    return { url: data.publicUrl, error: null };
  }, []);

  return (
    <ProductsContext.Provider value={{ products, loading, refresh, addProduct, updateProduct, deleteProduct, uploadImage }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error("useProducts must be used inside ProductsProvider");
  return ctx;
}
