import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, Plus, Minus, ArrowLeft, Star, CheckCircle, Truck, Snowflake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts } from "@/context/products";
import { useCart } from "@/context/cart";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";

export const Route = createFileRoute("/products/$id")({
  component: ProductDetailPage,
});

function ProductDetailPage() {
  const { id } = Route.useParams();
  const { products } = useProducts();
  const product = products.find((p) => p.id === id);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <AnnouncementBar />
        <SiteHeader />
        <main className="shell py-20 text-center">
          <p className="text-lg font-semibold text-gray-500">Product not found.</p>
          <Link to="/shop" className="mt-4 inline-block text-sm font-semibold text-[#1a6b3c] hover:underline">
            ← Back to Shop
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  // Related products - same category, exclude self
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  function handleAddToCart() {
    addItem({ ...product, minOrder: product.min_order } as any, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <main className="shell py-10">
        {/* Breadcrumb */}
        <nav className="mb-8 flex items-center gap-2 text-sm text-gray-500">
          <Link to="/" className="hover:text-[#1a6b3c] transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-[#1a6b3c] transition-colors">Shop</Link>
          <span>/</span>
          <span className="font-semibold text-gray-800">{product.name}</span>
        </nav>

        {/* Product layout */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="aspect-[4/3] w-full object-cover"
            />
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="rounded-full bg-[#1a6b3c]/10 px-3 py-1 text-xs font-bold text-[#1a6b3c] capitalize">
                  {product.category}
                </span>
                <h1 className="mt-3 text-3xl font-extrabold text-gray-900">{product.name}</h1>
                <p className="mt-1 text-base text-gray-500">{product.tagline}</p>
              </div>
              {product.badge && (
                <span className="shrink-0 rounded-full bg-[#1a6b3c] px-3 py-1 text-xs font-bold text-white">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Rating */}
            <div className="mt-4 flex items-center gap-2">
              <div className="flex gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`size-4 ${i < Math.round(product.rating) ? "fill-amber-400 text-amber-400" : "text-gray-200"}`}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold text-gray-700">{product.rating.toFixed(1)}</span>
              <span className="text-sm text-gray-400">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="mt-6 rounded-xl bg-gray-50 px-6 py-5">
              <p className="text-3xl font-extrabold text-[#1a6b3c]">
                ${product.price.toFixed(2)}
                <span className="ml-1 text-base font-medium text-gray-400">/ {product.unit}</span>
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Minimum order: <span className="font-semibold text-gray-700">{product.min_order}</span>
              </p>
              {!product.in_stock && (
                <p className="mt-2 text-sm font-bold text-red-500">Currently out of stock</p>
              )}
            </div>

            {/* Features */}
            <ul className="mt-6 space-y-2">
              {[
                { icon: CheckCircle, text: "Export Grade - Class 1 quality" },
                { icon: ShieldCheck, text: "Global GAP & HACCP certified handling" },
                { icon: Snowflake, text: "Cold chain maintained from farm to port" },
                { icon: Truck, text: "Air freight from JKIA - 24–48h delivery" },
              ].map(({ icon: Icon, text }) => (
                <li key={text} className="flex items-center gap-2.5 text-sm text-gray-600">
                  <Icon className="size-4 shrink-0 text-[#1a6b3c]" />
                  {text}
                </li>
              ))}
            </ul>

            {/* Qty + Add to cart */}
            <div className="mt-8 flex items-center gap-3">
              <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3">
                <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-gray-600 hover:text-[#1a6b3c]" aria-label="Decrease">
                  <Minus className="size-4" />
                </button>
                <span className="min-w-[60px] text-center text-base font-bold text-gray-900">{qty} kg</span>
                <button onClick={() => setQty((q) => q + 1)} className="text-gray-600 hover:text-[#1a6b3c]" aria-label="Increase">
                  <Plus className="size-4" />
                </button>
              </div>

              <Button
                onClick={handleAddToCart}
                disabled={!product.in_stock}
                className={`flex-1 gap-2 py-3 text-sm font-bold transition-all ${
                  added ? "bg-emerald-500 hover:bg-emerald-600" : "bg-[#1a6b3c] hover:bg-[#145530]"
                } text-white disabled:opacity-50`}
              >
                {added ? (
                  <><CheckCircle className="size-4" /> Added!</>
                ) : (
                  <><ShoppingCart className="size-4" /> Add to Cart</>
                )}
              </Button>
            </div>

            <p className="mt-3 text-sm text-gray-400">
              Subtotal: <span className="font-bold text-gray-700">${(product.price * qty).toFixed(2)}</span>
            </p>

            <div className="mt-4 flex gap-3">
              <Link to="/checkout" className="flex-1">
                <Button variant="outline" className="w-full border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white">
                  Request a Quote
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Related products */}
        {related.length > 0 && (
          <div className="mt-16">
            <h2 className="mb-6 text-2xl font-extrabold text-gray-900">Related Products</h2>
            <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
              {related.map((p) => (
                <Link
                  key={p.id}
                  to="/products/$id"
                  params={{ id: p.id }}
                  className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all hover:shadow-md"
                >
                  <img
                    src={p.image}
                    alt={p.name}
                    className="aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="p-4">
                    <p className="text-sm font-bold text-gray-900 group-hover:text-[#1a6b3c] transition-colors">{p.name}</p>
                    <p className="mt-1 text-base font-extrabold text-[#1a6b3c]">
                      ${p.price.toFixed(2)} <span className="text-xs font-normal text-gray-400">/{p.unit}</span>
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        <div className="mt-10">
          <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-semibold text-[#1a6b3c] hover:underline">
            <ArrowLeft className="size-4" /> Back to Shop
          </Link>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
