import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ShoppingCart, Search, SlidersHorizontal, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useProducts, type Product } from "@/context/products";
import { useCart } from "@/context/cart";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { SiteHeader } from "@/components/home/SiteHeader";
import { SiteFooter } from "@/components/home/SiteFooter";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop | Shelter Services International" },
      { name: "description", content: "Browse premium fresh Kenyan produce available for export." },
    ],
  }),
  component: ShopPage,
});

const categoryFilters = [
  { label: "All", value: "all" },
  { label: "Fruits", value: "fruits" },
  { label: "Vegetables", value: "vegetables" },
  { label: "Meat", value: "meat" },
] as const;

type CategoryFilter = (typeof categoryFilters)[number]["value"];

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
            <h3 className="text-base font-bold text-gray-900 hover:text-[#1a6b3c] transition-colors">{p.name}</h3>
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
          Min. Order: <span className="font-semibold text-gray-600">{p.min_order}</span>
        </p>
        <div className="mt-4 flex items-center gap-2">
          <div className="flex items-center gap-2 rounded-lg border border-gray-200 px-2 py-1">
            <button onClick={() => setQty((q) => Math.max(1, q - 1))} className="text-gray-600 hover:text-[#1a6b3c]" aria-label="Decrease">
              <Minus className="size-3.5" />
            </button>
            <span className="min-w-[40px] text-center text-sm font-semibold">{qty} kg</span>
            <button onClick={() => setQty((q) => q + 1)} className="text-gray-600 hover:text-[#1a6b3c]" aria-label="Increase">
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

function ShopPage() {
  const { products, loading } = useProducts();
  const [category, setCategory] = useState<CategoryFilter>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "price-asc" | "price-desc">("name");

  const filtered = products
    .filter((p) => category === "all" || p.category === category)
    .filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      if (sortBy === "price-asc") return a.price - b.price;
      if (sortBy === "price-desc") return b.price - a.price;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <main className="shell py-10">
        {/* Page title */}
        <div className="mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Shop All Products</h1>
          <p className="mt-1 text-sm text-gray-500">
            Premium Kenyan produce — export-ready, certified quality.
          </p>
        </div>

        {/* Filters bar */}
        <div className="mb-8 flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="flex flex-1 min-w-[200px] items-center overflow-hidden rounded-lg border border-gray-300 bg-white focus-within:border-[#1a6b3c] focus-within:ring-1 focus-within:ring-[#1a6b3c]">
            <Search className="ml-3 size-4 shrink-0 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="min-w-0 flex-1 bg-transparent px-3 py-2.5 text-sm text-gray-700 outline-none placeholder:text-gray-400"
            />
          </div>

          {/* Category tabs */}
          <div className="flex items-center gap-1 rounded-lg border border-gray-200 bg-gray-50 p-1">
            {categoryFilters.map((c) => (
              <button
                key={c.value}
                onClick={() => setCategory(c.value)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  category === c.value
                    ? "bg-[#1a6b3c] text-white shadow-sm"
                    : "text-gray-600 hover:text-[#1a6b3c]"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <SlidersHorizontal className="size-4" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-[#1a6b3c]"
            >
              <option value="name">Name A–Z</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Result count */}
        <p className="mb-6 text-sm text-gray-500">
          Showing <span className="font-semibold text-gray-800">{filtered.length}</span> products
        </p>

        {/* Grid */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="size-8 animate-spin rounded-full border-4 border-[#1a6b3c] border-t-transparent" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-20 text-center">
            <p className="text-base font-semibold text-gray-500">No products match your search.</p>
            <Button variant="outline" onClick={() => { setSearch(""); setCategory("all"); }}>
              Clear filters
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </main>
      <SiteFooter />
    </div>
  );
}
