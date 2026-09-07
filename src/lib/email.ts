/**
 * Email receipt sender using EmailJS.
 *
 * Setup (one-time, free):
 * 1. Go to https://emailjs.com and create a free account
 * 2. Add an Email Service (Gmail recommended) → copy the Service ID
 * 3. Create a Template with these variables:
 *      {{to_email}}        - recipient email
 *      {{to_name}}         - recipient name
 *      {{order_id}}        - order reference
 *      {{order_date}}      - date string
 *      {{items_html}}      - item rows (plain text list)
 *      {{total_price}}     - e.g. $247.30
 *      {{total_qty}}       - e.g. 120 kg
 *      {{customer_name}}   - full name
 *      {{customer_email}}  - email
 *      {{customer_phone}}  - phone
 *      {{customer_company}}- company
 *      {{country}}         - country
 *      {{notes}}           - special notes
 * 4. Copy the Template ID and your Public Key
 * 5. Add to your .env file:
 *      VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
 *      VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
 *      VITE_EMAILJS_PUBLIC_KEY=your_public_key
 */

import emailjs from "@emailjs/browser";
import type { CartItem } from "@/context/cart";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

const ADMIN_EMAIL = "info@shelterservicesinternational.com";

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

function buildItemsText(items: CartItem[]): string {
  return items
    .map(
      (i) =>
        `• ${i.product.name} - ${i.quantity} kg @ $${i.product.price.toFixed(2)}/kg = $${(i.product.price * i.quantity).toFixed(2)}`,
    )
    .join("\n");
}

async function sendEmail(toEmail: string, toName: string, data: OrderEmailData) {
  const params = {
    to_email: toEmail,
    to_name: toName,
    order_id: data.orderId.slice(0, 8).toUpperCase(),
    order_date: new Date().toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }),
    items_html: buildItemsText(data.items),
    total_price: `$${data.totalPrice.toFixed(2)}`,
    total_qty: `${data.totalQty} kg`,
    customer_name: data.customerName,
    customer_email: data.customerEmail,
    customer_phone: data.customerPhone,
    customer_company: data.customerCompany ?? "-",
    country: data.country,
    city: data.city ?? "-",
    notes: data.notes || "None",
  };

  return emailjs.send(SERVICE_ID, TEMPLATE_ID, params, PUBLIC_KEY);
}

/**
 * Sends two emails:
 * 1. Receipt to the customer
 * 2. Order notification to the admin (info@shelterservicesinternational.com)
 */
export async function sendOrderEmails(data: OrderEmailData): Promise<void> {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn(
      "EmailJS not configured. Add VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_ID and VITE_EMAILJS_PUBLIC_KEY to your .env file.",
    );
    return;
  }

  try {
    // Send to customer
    await sendEmail(data.customerEmail, data.customerName, data);

    // Send copy to admin
    await sendEmail(ADMIN_EMAIL, "Admin - Shelter Services", data);
  } catch (err) {
    console.error("EmailJS error:", err);
  }
}
