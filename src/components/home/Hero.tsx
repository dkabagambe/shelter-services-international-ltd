import { ShoppingCart, FileText, CheckCircle, ShieldCheck, Truck, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import produceImage from "@/assets/hero-produce-removebg-preview.png";
import nairobiImage from "@/assets/nairobi.jpg";

const highlights = [
  { icon: CheckCircle, title: "Farm Fresh", sub: "Handpicked Quality" },
  { icon: ShieldCheck, title: "Global Standards", sub: "Export Quality" },
  { icon: Truck, title: "On-Time Delivery", sub: "Reliable & Efficient" },
  { icon: Snowflake, title: "Cold Chain", sub: "Freshness Guaranteed" },
];

export function Hero() {
  return (
    <>
      {/* ── MOBILE ─────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden lg:hidden" style={{ minHeight: "480px" }}>
        <img
          src={produceImage}
          alt="Premium fresh Kenyan vegetables"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.52) 0%, rgba(0,0,0,0.32) 50%, rgba(0,0,0,0.62) 100%)",
          }}
        />

        <div
          className="relative z-10 flex flex-col justify-center px-8 py-12 sm:px-10"
          style={{ minHeight: "480px" }}
        >
          {/* Eyebrow */}
          <span className="mb-3 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/30 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-white/80 backdrop-blur-sm">
            🇰🇪 Nairobi, Kenya
          </span>

          <h1 className="text-2xl font-bold leading-snug tracking-tight text-white sm:text-3xl">
            Premium Fresh Vegetables
            <span className="mt-0.5 block text-[#6ee7a0]">from Kenya to the World</span>
          </h1>

          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/80">
            Grown with care. Packed with freshness. Delivered with trust.
          </p>

          <div className="mt-5 flex flex-wrap gap-2.5">
            <Link to="/shop" search={{ category: undefined, q: "" }}>
              <Button
                size="sm"
                className="gap-1.5 bg-[#1a6b3c] px-5 text-white shadow-md hover:bg-[#145530]"
              >
                <ShoppingCart className="size-3.5" /> Order Now
              </Button>
            </Link>
            <Link to="/checkout">
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5 border-white/60 bg-white/10 px-5 text-white backdrop-blur-sm hover:bg-white/20"
              >
                <FileText className="size-3.5" /> Get a Quote
              </Button>
            </Link>
          </div>

          {/* 2-col feature badges */}
          <div className="mt-7 grid grid-cols-2 gap-2.5">
            {highlights.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-2">
                <span className="grid size-7 shrink-0 place-items-center rounded-full border border-white/40 bg-white/10 text-white">
                  <Icon className="size-3" />
                </span>
                <div>
                  <p className="text-[11px] font-bold leading-tight text-white">{title}</p>
                  <p className="text-[10px] text-white/60">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 shadow-lg">
          <span className="text-xl">🇰🇪</span>
          <div className="leading-tight">
            <p className="text-[11px] font-bold text-gray-900">Proudly Kenyan</p>
            <p className="text-[10px] font-semibold text-[#1a6b3c]">Globally Trusted</p>
          </div>
        </div>
      </section>

      {/* ── DESKTOP ────────────────────────────────────────────────── */}
      <section
        className="relative hidden w-full overflow-hidden lg:block"
        style={{ minHeight: "460px" }}
      >
        {/* Nairobi background */}
        <img
          src={nairobiImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />

        {/* Left-to-right fade */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.70) 32%, rgba(255,255,255,0.18) 58%, transparent 78%)",
          }}
        />

        {/* Produce image - right */}
        <img
          src={produceImage}
          alt="Premium fresh Kenyan vegetables"
          className="absolute bottom-0 right-0 z-10"
          style={{
            height: "100%",
            width: "55%",
            objectFit: "contain",
            objectPosition: "right bottom",
          }}
        />

        {/* Text block */}
        <div
          className="relative z-20 flex flex-col justify-center px-16 py-12 xl:px-20"
          style={{ maxWidth: "560px", minHeight: "460px" }}
        >
          {/* Eyebrow */}
          <span className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-[#1a6b3c]/25 bg-[#1a6b3c]/8 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-[#1a6b3c]">
            🇰🇪 Nairobi, Kenya - Est. 2009
          </span>

          <h1 className="text-3xl font-bold leading-snug tracking-tight text-gray-900 xl:text-[2.35rem]">
            Premium Fresh Vegetables
          </h1>
          <p className="text-3xl font-bold leading-snug tracking-tight text-[#1a6b3c] xl:text-[2.35rem]">
            from Kenya to the World
          </p>

          <p className="mt-4 text-[0.95rem] leading-relaxed text-gray-600">
            Grown with care. Packed with freshness. Delivered with trust.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/shop" search={{ category: undefined, q: "" }}>
              <Button className="gap-2 bg-[#1a6b3c] px-6 text-sm font-semibold text-white shadow-md hover:bg-[#145530]">
                <ShoppingCart className="size-4" /> Order Now
              </Button>
            </Link>
            <Link to="/checkout">
              <Button
                variant="outline"
                className="gap-2 border-gray-400 bg-white/80 px-6 text-sm font-semibold text-gray-700 hover:border-[#1a6b3c] hover:text-[#1a6b3c]"
              >
                <FileText className="size-4" /> Request a Quote
              </Button>
            </Link>
          </div>

          {/* Feature grid */}
          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-3">
            {highlights.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-2.5">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border border-[#1a6b3c]/40 bg-white text-[#1a6b3c]">
                  <Icon className="size-3.5" />
                </span>
                <div>
                  <p className="text-xs font-bold leading-tight text-gray-900">{title}</p>
                  <p className="text-[11px] text-gray-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Flag badge */}
        <div className="absolute bottom-5 right-5 z-30 flex items-center gap-2.5 rounded-xl bg-white/95 px-3.5 py-2.5 shadow-lg backdrop-blur-sm">
          <span className="text-2xl">🇰🇪</span>
          <div className="leading-tight">
            <p className="text-xs font-bold text-gray-900">Proudly Kenyan</p>
            <p className="text-[11px] font-semibold text-[#1a6b3c]">Globally Trusted</p>
          </div>
        </div>
      </section>
    </>
  );
}
