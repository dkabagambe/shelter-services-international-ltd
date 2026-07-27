import { ShoppingCart, ArrowRight, Leaf, Apple, Carrot, Flower2, Package, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { products, type Product } from "@/data/products";

const categories = [
  { name: "Leafy Vegetables", icon: Leaf },
  { name: "Fruity Vegetables", icon: Apple },
  { name: "Root Vegetables", icon: Carrot },
  { name: "Herbs & Spices", icon: Flower2 },
  { name: "Bulk Vegetables", icon: Package },
  { name: "All Products", icon: LayoutGrid },
];

const fruits     = products.filter((p) => p.category === "fruits");
const meats      = products.filter((p) => p.category === "meat");
const vegetables = products.filter((p) => p.category === "vegetables");

// Original card — unchanged from original commit
function ProductCard({ p }: { p: Product }) {
  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:shadow-md">
      <div className="overflow-hidden bg-gray-50">
        <img
          src={p.image}
          alt={p.name}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-base font-bold text-gray-900">{p.name}</h3>
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
          <span className="font-semibold text-gray-600">{p.minOrder}</span>
        </p>
        <Button className="mt-5 w-full gap-2 bg-[#1a6b3c] text-sm font-semibold text-white hover:bg-[#145530]">
          <ShoppingCart className="size-4" />
          Add to Cart
        </Button>
      </div>
    </article>
  );
}

// Reusable section block
function ProductSection({
  title,
  sub,
  items,
}: {
  title: string;
  sub: string;
  items: Product[];
}) {
  return (
    <div className="mb-14">
      <div className="mb-7 flex items-end justify-between">
        <div>
          <h2 className="text-2xl font-extrabold text-gray-900">{title}</h2>
          <p className="mt-1 text-sm text-gray-500">{sub}</p>
        </div>
        <a
          href="#"
          className="flex shrink-0 items-center gap-1 text-sm font-semibold text-[#1a6b3c] hover:underline"
        >
          View All Products <ArrowRight className="size-4" />
        </a>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((p) => (
          <ProductCard key={p.id} p={p} />
        ))}
      </div>
    </div>
  );
}

export function FeaturedProducts() {
  return (
    <section className="bg-white py-14 lg:py-20">
      <div className="shell flex gap-10">

        {/* Left sidebar */}
        <aside className="hidden w-52 shrink-0 lg:block">
          <h3 className="mb-4 text-base font-bold text-gray-800">Shop by Category</h3>
          <nav className="flex flex-col gap-1">
            {categories.map(({ name, icon: Icon }) => (
              <a
                key={name}
                href="#"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-600 transition-colors hover:bg-green-50 hover:text-[#1a6b3c]"
              >
                <Icon className="size-4 shrink-0 text-[#1a6b3c]" />
                {name}
              </a>
            ))}
          </nav>
        </aside>

        {/* Product sections */}
        <div className="min-w-0 flex-1">
          <ProductSection
            title="Fresh Fruits"
            sub="Premium African fruits, export-ready"
            items={fruits}
          />
          <ProductSection
            title="Fresh Halal Meat"
            sub="Halal certified, fresh-cut and export-ready"
            items={meats}
          />
          <ProductSection
            title="Featured Fresh Vegetables"
            sub="Carefully selected and packed for global markets"
            items={vegetables}
          />
        </div>

      </div>
    </section>
  );
}
