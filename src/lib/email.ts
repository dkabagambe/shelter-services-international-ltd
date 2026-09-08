import type { CartItem } from "@/context/cart";

export interface OrderEmailData {
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCompany?: string;
  country: string;
  city?: string;
  notes?: string;
  items: CartItem[];
  totalPrice: number;
  totalQty: number;
}

export async function sendOrderEmails(data: OrderEmailData): Promise<boolean> {
  try {
    const response = await fetch("/api/order-email.php", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Email service returned ${response.status}`);
    return true;
  } catch (err) {
    console.error("Order email error:", err);
    return false;
  }
}

export async function sendContactEmail(data: {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  kind: "contact" | "newsletter";
}): Promise<boolean> {
  try {
    const response = await fetch("/api/contact-email.php", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error(`Email service returned ${response.status}`);
    return true;
  } catch (err) {
    console.error("Contact email error:", err);
    return false;
  }
}
