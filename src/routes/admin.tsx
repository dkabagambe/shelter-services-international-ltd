import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  CheckCircle,
  AlertCircle,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/auth";
import { useProducts } from "@/context/use-products";
import type { Product } from "@/context/products";
import { useOrders, type OrderStatus } from "@/context/orders";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin | Shelter Services International" }] }),
  component: AdminPage,
});

// ─── Product Form ─────────────────────────────────────────────────────────────
type ProductFormData = Omit<Product, "id">;

const EMPTY_FORM: ProductFormData = {
  name: "",
  image: "",
  price: 0,
  unit: "kg",
  tagline: "",
  min_order: "",
  badge: "",
  category: "vegetables",
  rating: 4.8,
  reviews: 0,
  in_stock: true,
};

function ProductModal({
  initial,
  onClose,
  onSave,
  uploadImage,
}: {
  initial: Product | null;
  onClose: () => void;
  onSave: (data: ProductFormData, id?: string) => Promise<void>;
  uploadImage: (f: File) => Promise<{ url: string | null; error: string | null }>;
}) {
  const [form, setForm] = useState<ProductFormData>(initial ? { ...initial } : EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [imgLoading, setImgLoading] = useState(false);
  const [error, setError] = useState("");

  function set(field: keyof ProductFormData, value: unknown) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setImgLoading(true);
    const { url, error } = await uploadImage(file);
    setImgLoading(false);
    if (error || !url) {
      setError("Image upload failed: " + error);
      return;
    }
    set("image", url);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.image || form.price <= 0) {
      setError("Name, image and price are required.");
      return;
    }
    setSaving(true);
    await onSave(form, initial?.id);
    setSaving(false);
    onClose();
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-xl overflow-y-auto rounded-2xl bg-white p-7 shadow-2xl max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-xl font-extrabold text-gray-900">
            {initial ? "Edit Product" : "Add New Product"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
            <X className="size-5" />
          </button>
        </div>

        {error && (
          <div className="mb-4 flex items-center gap-2 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            <AlertCircle className="size-4 shrink-0" /> {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Product Name *</label>
              <input
                value={form.name}
                onChange={(e) => set("name", e.target.value)}
                required
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                placeholder="e.g. French Beans"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Price (USD) *</label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={form.price}
                onChange={(e) => set("price", parseFloat(e.target.value))}
                required
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Unit</label>
              <input
                value={form.unit}
                onChange={(e) => set("unit", e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                placeholder="kg"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Category *</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value as Product["category"])}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
              >
                <option value="vegetables">Vegetables</option>
                <option value="fruits">Fruits</option>
                <option value="meat">Meat</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Min. Order</label>
              <input
                value={form.min_order}
                onChange={(e) => set("min_order", e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                placeholder="500 kg"
              />
            </div>

            <div className="flex flex-col gap-1.5 sm:col-span-2">
              <label className="text-sm font-semibold text-gray-700">Tagline</label>
              <input
                value={form.tagline}
                onChange={(e) => set("tagline", e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                placeholder="e.g. Fresh & Crisp"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">Badge (optional)</label>
              <input
                value={form.badge ?? ""}
                onChange={(e) => set("badge", e.target.value)}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                placeholder="Best Seller / Seasonal / Halal"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold text-gray-700">In Stock</label>
              <select
                value={form.in_stock ? "yes" : "no"}
                onChange={(e) => set("in_stock", e.target.value === "yes")}
                className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>
          </div>

          {/* Image upload */}
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Product Image *</label>
            <div className="flex items-center gap-3">
              {form.image && (
                <img
                  src={form.image}
                  alt="preview"
                  className="h-16 w-16 rounded-lg object-cover border border-gray-200"
                />
              )}
              <label className="flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-gray-300 px-4 py-2.5 text-sm font-medium text-gray-600 hover:border-[#1a6b3c] hover:text-[#1a6b3c]">
                <Upload className="size-4" />
                {imgLoading ? "Uploading…" : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={imgLoading}
                />
              </label>
              {/* Or paste URL */}
              <input
                value={typeof form.image === "string" ? form.image : ""}
                onChange={(e) => set("image", e.target.value)}
                placeholder="or paste image URL"
                className="flex-1 rounded-lg border border-gray-300 px-3 py-2 text-xs outline-none focus:border-[#1a6b3c]"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={saving}
              className="bg-[#1a6b3c] text-white hover:bg-[#145530]"
            >
              {saving ? "Saving…" : initial ? "Save Changes" : "Add Product"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── Admin Page ────────────────────────────────────────────────────────────────
type Tab = "products" | "orders";

function AdminPage() {
  const { user, isAdmin, loading: authLoading, signOut } = useAuth();
  const navigate = useNavigate();
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    uploadImage,
    loading: pLoading,
  } = useProducts();
  const { orders, fetchAllOrders, updateOrderStatus, deleteOrder, loading: oLoading } = useOrders();

  const [tab, setTab] = useState<Tab>("products");
  const [modal, setModal] = useState<{ open: boolean; product: Product | null }>({
    open: false,
    product: null,
  });
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [toast, setToast] = useState<{ msg: string; ok: boolean } | null>(null);

  // Redirect non-admins
  useEffect(() => {
    if (!authLoading && !user) navigate({ to: "/login" });
    if (!authLoading && user && !isAdmin) navigate({ to: "/" });
  }, [user, isAdmin, authLoading]);

  useEffect(() => {
    if (tab === "orders") fetchAllOrders();
  }, [tab]);

  function showToast(msg: string, ok = true) {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 3000);
  }

  async function handleSave(data: Omit<Product, "id">, id?: string) {
    if (id) {
      const { error } = await updateProduct(id, data);
      showToast(error ? error : "Product updated.", !error);
    } else {
      const { error } = await addProduct(data);
      showToast(error ? error : "Product added.", !error);
    }
  }

  async function handleDelete(id: string) {
    const { error } = await deleteProduct(id);
    showToast(error ? error : "Product deleted.", !error);
    setDeleteConfirm(null);
  }

  async function handleStatusChange(orderId: string, status: OrderStatus) {
    const { error } = await updateOrderStatus(orderId, status);
    showToast(error ? error : `Order marked ${status}.`, !error);
  }

  async function handleDeleteOrder(id: string) {
    const { error } = await deleteOrder(id);
    showToast(error ? error : "Order deleted.", !error);
    setDeleteConfirm(null);
  }

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-[#1a6b3c] border-t-transparent" />
      </div>
    );
  }

  const STATUS_OPTS: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
  const STATUS_COLORS: Record<OrderStatus, string> = {
    pending: "bg-yellow-100 text-yellow-700",
    confirmed: "bg-blue-100 text-blue-700",
    shipped: "bg-purple-100 text-purple-700",
    delivered: "bg-green-100 text-green-700",
    cancelled: "bg-red-100 text-red-700",
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Toast */}
      {toast && (
        <div
          className={`fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold shadow-lg text-white transition-all ${toast.ok ? "bg-[#1a6b3c]" : "bg-red-500"}`}
        >
          {toast.ok ? <CheckCircle className="size-4" /> : <AlertCircle className="size-4" />}
          {toast.msg}
        </div>
      )}

      {/* Modal */}
      {modal.open && (
        <ProductModal
          initial={modal.product}
          onClose={() => setModal({ open: false, product: null })}
          onSave={handleSave}
          uploadImage={uploadImage}
        />
      )}

      {/* Delete confirm */}
      {deleteConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-2xl text-center">
            <AlertCircle className="mx-auto size-12 text-red-500 mb-3" />
            <h3 className="text-lg font-bold text-gray-900">Are you sure?</h3>
            <p className="mt-1 text-sm text-gray-500">This action cannot be undone.</p>
            <div className="mt-6 flex gap-3">
              <Button variant="outline" className="flex-1" onClick={() => setDeleteConfirm(null)}>
                Cancel
              </Button>
              <Button
                className="flex-1 bg-red-500 text-white hover:bg-red-600"
                onClick={() => {
                  if (tab === "products") handleDelete(deleteConfirm);
                  else handleDeleteOrder(deleteConfirm);
                }}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Sidebar + main layout */}
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-60 shrink-0 flex-col border-r border-gray-200 bg-white lg:flex">
          <div className="p-6 border-b border-gray-100">
            <Link to="/" className="flex items-center gap-2">
              <span className="grid size-9 place-items-center rounded-lg bg-[#1a6b3c] text-white">
                <svg viewBox="0 0 48 48" className="size-5" fill="none">
                  <path
                    d="M8 22L24 8L40 22V40H30V30H18V40H8V22Z"
                    fill="white"
                    fillOpacity="0.2"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinejoin="round"
                  />
                  <path d="M24 36C24 28 30 24 36 24C36 32 30 36 24 36Z" fill="white" />
                </svg>
              </span>
              <span className="text-sm font-extrabold text-[#1a6b3c] leading-tight">
                Admin Panel
              </span>
            </Link>
          </div>

          <nav className="flex-1 p-4 space-y-1">
            {(
              [
                { id: "products", label: "Products", icon: Package },
                { id: "orders", label: "Orders", icon: ShoppingBag },
              ] as { id: Tab; label: string; icon: typeof Package }[]
            ).map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setTab(id)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-colors ${
                  tab === id
                    ? "bg-[#1a6b3c]/10 text-[#1a6b3c]"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <Icon className="size-4" />
                {label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <Button
              variant="outline"
              size="sm"
              className="w-full gap-2 text-gray-600"
              onClick={async () => {
                await signOut();
                navigate({ to: "/" });
              }}
            >
              <LogOut className="size-4" /> Sign Out
            </Button>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 overflow-auto">
          {/* Top bar (mobile) */}
          <div className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 lg:hidden">
            <h1 className="text-lg font-extrabold text-gray-900">Admin Panel</h1>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setTab("products")}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${tab === "products" ? "bg-[#1a6b3c] text-white" : "text-gray-600"}`}
              >
                Products
              </button>
              <button
                onClick={() => setTab("orders")}
                className={`rounded-lg px-3 py-1.5 text-sm font-semibold ${tab === "orders" ? "bg-[#1a6b3c] text-white" : "text-gray-600"}`}
              >
                Orders
              </button>
            </div>
          </div>

          <div className="p-6 lg:p-8">
            {/* ── Products Tab ── */}
            {tab === "products" && (
              <div>
                {/* Stats row */}
                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
                  {[
                    { label: "Total Products", value: products.length, color: "text-[#1a6b3c]" },
                    {
                      label: "In Stock",
                      value: products.filter((p) => p.in_stock).length,
                      color: "text-green-600",
                    },
                    {
                      label: "Out of Stock",
                      value: products.filter((p) => !p.in_stock).length,
                      color: "text-red-500",
                    },
                    {
                      label: "Categories",
                      value: new Set(products.map((p) => p.category)).size,
                      color: "text-blue-600",
                    },
                  ].map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm text-center"
                    >
                      <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
                      <p className="text-xs text-gray-500 mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-6 flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-extrabold text-gray-900">Products</h2>
                    <p className="text-sm text-gray-500">{products.length} total products</p>
                  </div>
                  <Button
                    className="gap-2 bg-[#1a6b3c] text-white hover:bg-[#145530]"
                    onClick={() => setModal({ open: true, product: null })}
                  >
                    <Plus className="size-4" /> Add Product
                  </Button>
                </div>

                {pLoading ? (
                  <p className="text-sm text-gray-500">Loading…</p>
                ) : (
                  <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-50 text-xs font-bold uppercase tracking-wider text-gray-500">
                          <tr>
                            <th className="px-5 py-3 text-left">Product</th>
                            <th className="px-5 py-3 text-left">Category</th>
                            <th className="px-5 py-3 text-left">Price</th>
                            <th className="px-5 py-3 text-left">Min Order</th>
                            <th className="px-5 py-3 text-left">Stock</th>
                            <th className="px-5 py-3 text-left">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                          {products.map((p) => (
                            <tr key={p.id} className="hover:bg-gray-50">
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={p.image}
                                    alt={p.name}
                                    className="h-10 w-10 rounded-lg object-cover"
                                  />
                                  <div>
                                    <p className="font-semibold text-gray-900">{p.name}</p>
                                    <p className="text-xs text-gray-400">{p.tagline}</p>
                                  </div>
                                </div>
                              </td>
                              <td className="px-5 py-3 capitalize text-gray-600">{p.category}</td>
                              <td className="px-5 py-3 font-bold text-[#1a6b3c]">
                                ${p.price}/{p.unit}
                              </td>
                              <td className="px-5 py-3 text-gray-600">{p.min_order}</td>
                              <td className="px-5 py-3">
                                <span
                                  className={`rounded-full px-2 py-0.5 text-xs font-bold ${p.in_stock ? "bg-green-100 text-green-700" : "bg-red-100 text-red-500"}`}
                                >
                                  {p.in_stock ? "In Stock" : "Out"}
                                </span>
                              </td>
                              <td className="px-5 py-3">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => setModal({ open: true, product: p })}
                                    className="rounded-lg p-1.5 text-gray-400 hover:bg-blue-50 hover:text-blue-600"
                                    title="Edit"
                                  >
                                    <Pencil className="size-4" />
                                  </button>
                                  <button
                                    onClick={() => setDeleteConfirm(p.id)}
                                    className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                                    title="Delete"
                                  >
                                    <Trash2 className="size-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ── Orders Tab ── */}
            {tab === "orders" && (
              <div>
                {/* Stats row */}
                <div className="mb-6 grid grid-cols-2 gap-4 sm:grid-cols-5">
                  {(
                    [
                      { label: "Total", value: orders.length, color: "text-gray-900" },
                      {
                        label: "Pending",
                        value: orders.filter((o) => o.status === "pending").length,
                        color: "text-yellow-600",
                      },
                      {
                        label: "Confirmed",
                        value: orders.filter((o) => o.status === "confirmed").length,
                        color: "text-blue-600",
                      },
                      {
                        label: "Shipped",
                        value: orders.filter((o) => o.status === "shipped").length,
                        color: "text-purple-600",
                      },
                      {
                        label: "Delivered",
                        value: orders.filter((o) => o.status === "delivered").length,
                        color: "text-[#1a6b3c]",
                      },
                    ] as { label: string; value: number; color: string }[]
                  ).map(({ label, value, color }) => (
                    <div
                      key={label}
                      className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm text-center"
                    >
                      <p className={`text-2xl font-extrabold ${color}`}>{value}</p>
                      <p className="text-xs text-gray-500 mt-1">{label}</p>
                    </div>
                  ))}
                </div>

                <div className="mb-6">
                  <h2 className="text-2xl font-extrabold text-gray-900">Orders</h2>
                  <p className="text-sm text-gray-500">{orders.length} total orders</p>
                </div>

                {oLoading ? (
                  <p className="text-sm text-gray-500">Loading orders…</p>
                ) : orders.length === 0 ? (
                  <div className="flex flex-col items-center gap-4 rounded-2xl border border-gray-200 bg-white py-16 text-center">
                    <ShoppingBag className="size-12 text-gray-200" />
                    <p className="text-sm font-semibold text-gray-500">No orders yet.</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {orders.map((order) => (
                      <div
                        key={order.id}
                        className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
                      >
                        <div className="flex flex-wrap items-start justify-between gap-4">
                          <div>
                            <p className="text-sm font-bold text-gray-900">
                              #{order.id.slice(0, 8).toUpperCase()}
                            </p>
                            <p className="text-xs text-gray-400">
                              {new Date(order.created_at).toLocaleDateString("en-GB", {
                                day: "numeric",
                                month: "short",
                                year: "numeric",
                              })}
                            </p>
                            <p className="mt-1 text-sm font-semibold text-gray-700">
                              {order.customer_name}
                            </p>
                            <p className="text-xs text-gray-400">
                              {order.customer_email} · {order.country}
                            </p>
                          </div>

                          <div className="flex items-center gap-3">
                            {/* Status select */}
                            <div className="relative">
                              <select
                                value={order.status}
                                onChange={(e) =>
                                  handleStatusChange(order.id, e.target.value as OrderStatus)
                                }
                                className={`rounded-full px-3 py-1.5 text-xs font-bold outline-none cursor-pointer ${STATUS_COLORS[order.status]}`}
                              >
                                {STATUS_OPTS.map((s) => (
                                  <option key={s} value={s} className="bg-white text-gray-700">
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </div>

                            <button
                              onClick={() => setDeleteConfirm(order.id)}
                              className="rounded-lg p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500"
                              title="Delete order"
                            >
                              <Trash2 className="size-4" />
                            </button>
                          </div>
                        </div>

                        {/* Items */}
                        <div className="mt-4 space-y-2">
                          {order.items.map((item) => (
                            <div key={item.product.id} className="flex items-center gap-3 text-sm">
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="h-8 w-8 rounded-md object-cover"
                              />
                              <span className="flex-1 font-medium text-gray-700">
                                {item.product.name}
                              </span>
                              <span className="text-gray-400">{item.quantity} kg</span>
                              <span className="font-bold text-[#1a6b3c]">
                                ${(item.product.price * item.quantity).toFixed(2)}
                              </span>
                            </div>
                          ))}
                        </div>

                        <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3">
                          <span className="text-sm text-gray-500">
                            Total:{" "}
                            <span className="font-extrabold text-[#1a6b3c]">
                              ${order.total_price.toFixed(2)}
                            </span>
                          </span>
                          {order.notes && (
                            <p className="text-xs text-gray-400 max-w-xs truncate">
                              Note: {order.notes}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
