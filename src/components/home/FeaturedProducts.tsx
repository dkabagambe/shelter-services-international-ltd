import { useState } from "react";
import { ShoppingCart, ArrowRight, Leaf, Apple, Beef, Carrot, Flower2, Package, LayoutGrid, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts, type Product } from "@/context/products";
import { useCart } from "@/context/cart";
import { Link } from "@tanstack/react-router";

type CategoryKey = "all" | "fruits" | "meat" | "vegetables";

const categories: { key: CategoryKey; name: string; icon: typeof Leaf }[] = [
  { key: "all",        name: "All Products",      icon: LayoutGrid },
  { key: "fruits",     name: "Fresh Fruits",       icon: Apple },
  { key: "vegetables", name: "Fresh Vegetables",   icon: Carrot },
  { key: "meat",       name: "Halal Meat",         icon: Beef },
];

// ─── Product Card ──────────────────────────────────────────────────────────────
function ProductCard({ p }: { p: Product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      <Link to="/products/$id" params={{ id: p.id }} className="block overflow-hidden bg-gray-50">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <Link to="/products/$id" params={{ id: p.id }}>
            <h3 className="text-base font-bold text-gray-900 transition-colors hover:text-[#1a6b3c]">
              {p.name}
            </h3>
          </Link>
          {p.badge && (
            <span className="shrink-0 rounded-full bg-[#1a6b3c] px-2 py-0.5 text-[10px] font-bold text-white">
              {p.badge}
            </span>
          )}
        </div>
        <p className="mt-1.5 text-xl font-extrabold text-[#1a6b3c]">
          ${p.price.toFixed(2)}{" "}
          <span className="text-sm font-medium text-gray-400">/ {p.unit}</span>
        </p>
        <p className="mt-1 text-sm text-gray-500">{p.tagline}</p>
        <p className="mt-0.5 text-sm text-gray-400">
          Min. Order:{" "}
          <span className="font-semibold text-gray-600">{p.min_order}</span>
        </p>

        {/* Qty stepper + Add to Cart */}
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
            <button
              onClick={() => setQty((q) => Math.max(1, q - 1))}
              className="text-gray-600 hover:text-[#1a6b3c]"
              aria-label="Decrease"
            >
              <Minus className="size-3.5" />
            </button>
            <span className="min-w-[40px] text-center text-sm font-semibold">{qty} kg</span>
            <button
              onClick={() => setQty((q) => q + 1)}
              className="text-gray-600 hover:text-[#1a6b3c]"
              aria-label="Increase"
            >
              <Plus className="size-3.5" />
            </button>
          </div>
          <Button
            className="flex-1 gap-2 bg-[#1a6b3c] text-sm font-semibold text-white hover:bg-[#145530]"
            onClick={() => addItem(p, qty)}
          >
            <ShoppingCart className="size-4" />
            Add to Cart
          </Button>
        </div>
      </div>
    </article>
  );
}

// ─── Section block ─────────────────────────────────────────────────────────────
function ProductSection({ title, sub, items }: { title: string; sub: string; items: Product[] }) {
  if (items.length === 0) return null;
  return (
    <div className="mb-14">
      <div className="mb-7 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{sub}</p>
        </div>
        <Link
          to="/shop"
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#1a6b3c] hover:underline"
        >
          View All <ArrowRight className="size-4" />
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}

// ─── Featured Products ─────────────────────────────────────────────────────────
export function FeaturedProducts() {
  const { products } = useProducts();
  const [activeCategory, setActiveCategory] = useState<CategoryKey>("all");

  const fruits     = products.filter((p) => p.category === "fruits");
  const meats      = products.filter((p) => p.category === "meat");
  const vegetables = products.filter((p) => p.category === "vegetables");

  // What to show based on active category
  const showFruits     = activeCategory === "all" || activeCategory === "fruits";
  const showMeats      = activeCategory === "all" || activeCategory === "meat";
  const showVegetables = activeCategory === "all" || activeCategory === "vegetables";

  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="shell flex gap-10">

        {/* ── Left sidebar ── */}
        <aside className="hidden w-52 shrink-0 lg:block">
          <h3 className="mb-4 text-base font-bold text-gray-800">Shop by Category</h3>
          <nav className="flex flex-col gap-1">
            {categories.map(({ key, name, icon: Icon }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium transition-colors text-left ${
                  activeCategory === key
                    ? "bg-[#1a6b3c] text-white"
                    : "text-gray-600 hover:bg-green-50 hover:text-[#1a6b3c]"
                }`}
              >
                <Icon className="size-4 shrink-0" />
                {name}
                <span className={`ml-auto text-[11px] rounded-full px-1.5 py-0.5 font-semibold ${
                  activeCategory === key ? "bg-white/20 text-white" : "bg-gray-100 text-gray-500"
                }`}>
                  {key === "all"
                    ? products.length
                    : products.filter((p) => p.category === key).length}
                </span>
              </button>
            ))}
          </nav>
        </aside>

        {/* ── Mobile category pills ── */}
        <div className="min-w-0 flex-1">
          <div className="mb-6 flex gap-2 overflow-x-auto pb-1 lg:hidden">
            {categories.map(({ key, name }) => (
              <button
                key={key}
                onClick={() => setActiveCategory(key)}
                className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
                  activeCategory === key
                    ? "bg-[#1a6b3c] text-white"
                    : "border border-gray-200 text-gray-600 hover:border-[#1a6b3c] hover:text-[#1a6b3c]"
                }`}
              >
                {name}
              </button>
            ))}
          </div>

          {/* ── Product sections ── */}
          {showFruits && (
            <ProductSection
              title="Fresh Fruits"
              sub="Premium African fruits, export-ready"
              items={fruits}
            />
          )}
          {showMeats && (
            <ProductSection
              title="Fresh Halal Meat"
              sub="Halal certified, fresh-cut and export-ready"
              items={meats}
            />
          )}
          {showVegetables && (
            <ProductSection
              title="Featured Fresh Vegetables"
              sub="Carefully selected and packed for global markets"
              items={vegetables}
            />
          )}

          {/* Empty state */}
          {!showFruits && !showMeats && !showVegetables && (
            <div className="flex flex-col items-center gap-4 py-20 text-center">
              <p className="text-sm font-semibold text-gray-400">No products in this category yet.</p>
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
