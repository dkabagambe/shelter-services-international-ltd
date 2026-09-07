import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, CheckCircle, Trash2, ArrowLeft, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/cart";
import { useAuth } from "@/context/auth";
import { useOrders } from "@/context/orders";
import { sendOrderEmails } from "@/lib/email";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";

export const Route = createFileRoute("/checkout")({
  head: () => ({ meta: [{ title: "Checkout | Shelter Services International" }] }),
  component: CheckoutPage,
});

function CheckoutPage() {
  const { items, removeItem, updateQty, totalPrice, totalQty, clearCart } = useCart();
  const { user, profile } = useAuth();
  const { placeOrder } = useOrders();

  const [submitted, setSubmitted] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [orderSnapshot, setOrderSnapshot] = useState<typeof items>([]);
  const [orderTotalSnapshot, setOrderTotalSnapshot] = useState(0);
  const [form, setForm] = useState({
    name: profile?.full_name ?? "",
    company: "",
    email: user?.email ?? "",
    phone: "",
    country: "",
    city: "",
    notes: "",
  });

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);

    // 1. Save order (Supabase or local fallback)
    const { error, orderId: oid } = await placeOrder({
      user_id: user?.id ?? null,
      customer_name: form.name,
      customer_email: form.email,
      customer_phone: form.phone,
      customer_company: form.company,
      country: form.country,
      city: form.city,
      notes: form.notes,
      items,
      total_price: totalPrice,
      total_qty: totalQty,
    });

    if (error || !oid) {
      setSubmitting(false);
      return;
    }

    // 2. Send email receipts - customer + admin
    await sendOrderEmails({
      orderId: oid,
      customerName: form.name,
      customerEmail: form.email,
      customerPhone: form.phone,
      customerCompany: form.company,
      country: form.country,
      city: form.city,
      notes: form.notes,
      items,
      totalPrice,
      totalQty,
    });

    setSubmitting(false);
    setOrderId(oid);
    setOrderSnapshot([...items]);
    setOrderTotalSnapshot(totalPrice);
    clearCart();
    setSubmitted(true);
  }

  // ── Success screen ──────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <SiteHeader />
        <main className="shell flex flex-col items-center py-20 text-center">
          <div className="grid size-20 place-items-center rounded-full bg-[#1a6b3c]/10">
            <CheckCircle className="size-10 text-[#1a6b3c]" />
          </div>
          <h1 className="mt-6 text-3xl font-extrabold text-gray-900">Order Request Submitted!</h1>
          <p className="mt-3 max-w-md text-base text-gray-500">
            Thank you, <strong>{form.name}</strong>. Your order reference is{" "}
            <strong className="text-[#1a6b3c]">#{orderId.slice(0, 8).toUpperCase()}</strong>.
          </p>

          {/* Email confirmation notice */}
          <div className="mt-6 flex items-center gap-3 rounded-xl border border-[#1a6b3c]/20 bg-[#1a6b3c]/5 px-6 py-4">
            <Mail className="size-5 shrink-0 text-[#1a6b3c]" />
            <p className="text-sm text-gray-600 text-left">
              A receipt has been sent to <strong>{form.email}</strong>.<br />
              Our team will follow up within <strong>24 hours</strong> with a formal quote.
            </p>
          </div>

          {/* Order recap */}
          <div className="mt-8 w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm">
            <h2 className="mb-4 text-base font-bold text-gray-900">Order Summary</h2>
            <ul className="space-y-3">
              {orderSnapshot.length > 0 ? (
                orderSnapshot.map(({ product, quantity }) => (
                  <li key={product.id} className="flex items-center gap-3 text-sm">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-10 w-10 rounded-lg object-cover"
                    />
                    <span className="flex-1 font-medium text-gray-700">{product.name}</span>
                    <span className="text-gray-400">{quantity} kg</span>
                    <span className="font-bold text-[#1a6b3c]">
                      ${(product.price * quantity).toFixed(2)}
                    </span>
                  </li>
                ))
              ) : (
                <li className="text-sm text-gray-400">Order confirmed.</li>
              )}
            </ul>
            <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-4">
              <span className="text-sm font-bold text-gray-900">Total</span>
              <span className="text-lg font-extrabold text-[#1a6b3c]">
                ${orderTotalSnapshot.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="mt-8 flex gap-4">
            <Link to="/shop" search={{ category: undefined, q: "" }}>
              <Button className="bg-[#1a6b3c] text-white hover:bg-[#145530]">
                Continue Shopping
              </Button>
            </Link>
            {user && (
              <Link to="/account">
                <Button variant="outline">My Orders</Button>
              </Link>
            )}
          </div>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // ── Checkout form ───────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <main className="shell py-10">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#1a6b3c] transition-colors">
            Home
          </Link>
          <span>/</span>
          <Link
            to="/shop"
            search={{ category: undefined, q: "" }}
            className="hover:text-[#1a6b3c] transition-colors"
          >
            Shop
          </Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">Checkout</span>
        </nav>

        <h1 className="mb-8 text-3xl font-extrabold text-gray-900">Checkout</h1>

        {items.length === 0 ? (
          <div className="flex flex-col items-center gap-6 py-24 text-center">
            <ShoppingCart className="size-14 text-gray-200" />
            <p className="text-base font-semibold text-gray-500">Your cart is empty.</p>
            <Link to="/shop" search={{ category: undefined, q: "" }}>
              <Button className="bg-[#1a6b3c] text-white hover:bg-[#145530]">
                Browse Products
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid gap-10 lg:grid-cols-[1fr_400px]">
            {/* ── Left: Contact form ── */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-bold text-gray-900">Your Details</h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  {(
                    [
                      {
                        id: "name",
                        label: "Full Name",
                        type: "text",
                        required: true,
                        placeholder: "John Doe",
                      },
                      {
                        id: "company",
                        label: "Company Name",
                        type: "text",
                        required: false,
                        placeholder: "Your Business Ltd.",
                      },
                      {
                        id: "email",
                        label: "Email Address",
                        type: "email",
                        required: true,
                        placeholder: "you@company.com",
                      },
                      {
                        id: "phone",
                        label: "Phone / WhatsApp",
                        type: "tel",
                        required: true,
                        placeholder: "+971 50 000 0000",
                      },
                      {
                        id: "city",
                        label: "City",
                        type: "text",
                        required: false,
                        placeholder: "Dubai",
                      },
                    ] as const
                  ).map(({ id, label, type, required, placeholder }) => (
                    <div key={id} className="flex flex-col gap-1.5">
                      <label className="text-sm font-semibold text-gray-700" htmlFor={id}>
                        {label} {required && <span className="text-red-500">*</span>}
                      </label>
                      <input
                        id={id}
                        name={id}
                        type={type}
                        required={required}
                        value={form[id]}
                        onChange={handleChange}
                        placeholder={placeholder}
                        className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                      />
                    </div>
                  ))}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-sm font-semibold text-gray-700" htmlFor="country">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      id="country"
                      name="country"
                      required
                      value={form.country}
                      onChange={handleChange}
                      className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                    >
                      <option value="">Select country</option>
                      {[
                        "United Arab Emirates",
                        "Saudi Arabia",
                        "Qatar",
                        "Oman",
                        "Kuwait",
                        "Bahrain",
                        "Algeria",
                        "Comoros",
                        "Djibouti",
                        "Egypt",
                        "Iraq",
                        "Jordan",
                        "Lebanon",
                        "Libya",
                        "Mauritania",
                        "Morocco",
                        "Palestine",
                        "Syria",
                        "Tunisia",
                        "Yemen",
                        "United Kingdom",
                        "Netherlands",
                        "Germany",
                        "France",
                        "Canada",
                        "Australia",
                        "Japan",
                        "Other",
                      ].map((c) => (
                        <option key={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="mt-4 flex flex-col gap-1.5">
                  <label className="text-sm font-semibold text-gray-700" htmlFor="notes">
                    Special Requirements / Notes
                  </label>
                  <textarea
                    id="notes"
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Packaging preference, delivery port, phytosanitary requirements…"
                    className="resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                  />
                </div>
              </div>

              {/* Email notice */}
              <div className="flex items-start gap-3 rounded-xl border border-blue-100 bg-blue-50 px-5 py-4 text-sm text-blue-700">
                <Mail className="mt-0.5 size-4 shrink-0" />
                <span>
                  A receipt will be sent to <strong>{form.email || "your email"}</strong> and our
                  team at <strong>info@shelterservicesinternational.com</strong> immediately after you submit.
                </span>
              </div>

              {!user && (
                <p className="text-sm text-gray-500">
                  Have an account?{" "}
                  <Link to="/login" className="font-semibold text-[#1a6b3c] hover:underline">
                    Sign in
                  </Link>{" "}
                  to track your orders.
                </p>
              )}

              <Button
                type="submit"
                disabled={submitting}
                className="w-full bg-[#1a6b3c] py-3 text-sm font-bold text-white hover:bg-[#145530] disabled:opacity-60"
              >
                {submitting ? "Sending…" : "Submit Order Request"}
              </Button>
              <p className="text-center text-xs text-gray-400">
                No payment required now. Our team will send a formal quote within 24 hours.
              </p>
            </form>

            {/* ── Right: Order summary ── */}
            <div className="space-y-6">
              <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
                <h2 className="mb-5 text-lg font-bold text-gray-900">
                  Order Summary{" "}
                  <span className="ml-1 rounded-full bg-[#1a6b3c] px-2 py-0.5 text-xs font-bold text-white">
                    {items.length}
                  </span>
                </h2>

                <ul className="space-y-4">
                  {items.map(({ product, quantity }) => (
                    <li key={product.id} className="flex gap-3">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-14 w-14 shrink-0 rounded-lg object-cover"
                      />
                      <div className="flex min-w-0 flex-1 flex-col justify-between">
                        <div className="flex items-start justify-between gap-2">
                          <p className="text-sm font-bold text-gray-900 leading-tight">
                            {product.name}
                          </p>
                          <button
                            type="button"
                            onClick={() => removeItem(product.id)}
                            className="text-gray-400 hover:text-red-500 transition-colors"
                            aria-label="Remove item"
                          >
                            <Trash2 className="size-3.5" />
                          </button>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-1.5 rounded-lg border border-gray-200 px-2 py-0.5">
                            <button
                              type="button"
                              onClick={() => updateQty(product.id, quantity - 1)}
                              className="text-gray-500 hover:text-[#1a6b3c] text-xs font-bold"
                            >
                              −
                            </button>
                            <span className="text-xs font-semibold text-gray-700">
                              {quantity} kg
                            </span>
                            <button
                              type="button"
                              onClick={() => updateQty(product.id, quantity + 1)}
                              className="text-gray-500 hover:text-[#1a6b3c] text-xs font-bold"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm font-bold text-[#1a6b3c]">
                            ${(product.price * quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 space-y-2 border-t border-gray-100 pt-4">
                  <div className="flex justify-between text-sm text-gray-500">
                    <span>Total weight</span>
                    <span className="font-semibold text-gray-800">{totalQty} kg</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold text-gray-900">Subtotal</span>
                    <span className="text-xl font-extrabold text-[#1a6b3c]">
                      ${totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">
                    Shipping, duties and final pricing confirmed in your quote.
                  </p>
                </div>
              </div>

              <Link
                to="/shop"
                search={{ category: undefined, q: "" }}
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1a6b3c] hover:underline"
              >
                <ArrowLeft className="size-4" /> Continue Shopping
              </Link>
            </div>
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
