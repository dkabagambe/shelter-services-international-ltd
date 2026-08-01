import { motion } from "framer-motion";
import { Leaf, Apple, Beef, Carrot, Package, LayoutGrid, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useProducts } from "@/context/products";

const categoryConfig = [
  { name: "Fresh Fruits",      value: "fruits",     icon: Apple,      color: "bg-rose-50 text-rose-500 group-hover:bg-rose-500 group-hover:text-white" },
  { name: "Fresh Vegetables",  value: "vegetables", icon: Carrot,     color: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" },
  { name: "Halal Meat",        value: "meat",       icon: Beef,       color: "bg-orange-50 text-orange-500 group-hover:bg-orange-500 group-hover:text-white" },
  { name: "Herbs & Spices",    value: "herbs",      icon: Leaf,       color: "bg-violet-50 text-violet-500 group-hover:bg-violet-500 group-hover:text-white" },
  { name: "Bulk Produce",      value: "vegetables", icon: Package,    color: "bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white" },
  { name: "All Products",      value: "all",        icon: LayoutGrid, color: "bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground" },
];

export function Categories() {
  const { products } = useProducts();

  function countFor(value: string) {
    if (value === "all") return products.length;
    if (value === "herbs") return 0; // placeholder until herbs category added
    return products.filter((p) => p.category === value).length;
  }

  return (
    <section className="shell py-16 lg:py-20">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Shop by Category</p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Sourced across the Kenyan highlands
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            From smallholder farms to your warehouse — certified and export-ready.
          </p>
        </div>
        <Link
          to="/shop"
          className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-primary/30 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground"
        >
          View all <ArrowRight className="size-4" />
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {categoryConfig.map(({ name, value, icon: Icon, color }, i) => (
          <motion.div
            key={name}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.4, delay: i * 0.06 }}
            whileHover={{ y: -6, transition: { duration: 0.2 } }}
          >
            <Link
              to="/shop"
              search={{ category: value } as any}
              className="group flex flex-col items-center gap-3 rounded-2xl border border-border bg-card p-6 text-center shadow-card transition-all hover:border-primary/20 hover:shadow-card-hover"
            >
              <span className={`grid size-14 place-items-center rounded-2xl transition-all duration-200 ${color}`}>
                <Icon className="size-6" />
              </span>
              <span className="text-sm font-bold leading-tight text-foreground transition-colors group-hover:text-primary">
                {name}
              </span>
              <span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-semibold text-muted-foreground">
                {countFor(value)} items
              </span>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
