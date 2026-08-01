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
      {/* ══════════════════════════════════════════
          MOBILE hero — produce PNG fills screen
          hidden on lg+
      ══════════════════════════════════════════ */}
      <section className="relative w-full overflow-hidden lg:hidden" style={{ minHeight: "520px" }}>
        {/* Produce image as full background */}
        <img
          src={produceImage}
          alt="Premium fresh Kenyan vegetables"
          className="absolute inset-0 h-full w-full object-cover object-center"
        />

        {/* Dark overlay so text stays readable */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.65) 100%)",
          }}
        />

        {/* Text content */}
        <div className="relative z-10 flex flex-col justify-center px-5 py-14" style={{ minHeight: "520px" }}>
          <h1 className="text-3xl font-extrabold leading-tight tracking-tight text-white sm:text-4xl">
            Premium Fresh Vegetables
          </h1>
          <p className="text-3xl font-extrabold leading-tight tracking-tight text-[#6ee7a0] sm:text-4xl">
            from Kenya to the Middle East
          </p>
          <p className="mt-4 text-sm text-white/85">
            Grown with care. Packed with freshness. Delivered with trust.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link to="/shop">
              <Button size="lg" className="gap-2 bg-[#1a6b3c] px-6 text-white shadow-md hover:bg-[#145530]">
                <ShoppingCart className="size-4" /> Order Now
              </Button>
            </Link>
            <Link to="/checkout">
              <Button size="lg" variant="outline" className="gap-2 border-white/70 bg-white/10 px-6 text-white backdrop-blur-sm hover:bg-white/20">
                <FileText className="size-4" /> Request a Quote
              </Button>
            </Link>
          </div>

          {/* 2-col badges */}
          <div className="mt-8 grid grid-cols-2 gap-3">
            {highlights.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-2">
                <span className="grid size-8 shrink-0 place-items-center rounded-full border-2 border-white/50 bg-white/10 text-white">
                  <Icon className="size-3.5" />
                </span>
                <div>
                  <p className="text-xs font-bold leading-tight text-white">{title}</p>
                  <p className="text-[10px] text-white/70">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kenyan flag badge */}
        <div className="absolute bottom-4 right-4 z-20 flex items-center gap-2 rounded-xl bg-white/90 px-3 py-2 shadow-lg">
          <span className="text-2xl">🇰🇪</span>
          <div className="leading-tight">
            <p className="text-xs font-bold text-gray-900">Proudly Kenyan</p>
            <p className="text-[10px] font-semibold text-[#1a6b3c]">Globally Trusted</p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════
          DESKTOP hero — nairobi bg + produce PNG
          hidden below lg
      ══════════════════════════════════════════ */}
      <section className="relative hidden w-full overflow-hidden lg:block" style={{ minHeight: "500px" }}>
        {/* Nairobi cityscape background */}
        <img
          src={nairobiImage}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: "center 40%" }}
        />

        {/* Gradient — white on left fading right */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to right, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.65) 30%, rgba(255,255,255,0.2) 55%, transparent 75%)",
          }}
        />

        {/* Produce PNG — right side */}
        <img
          src={produceImage}
          alt="Premium fresh Kenyan vegetables"
          className="absolute bottom-0 right-0 z-10"
          style={{ height: "100%", width: "58%", objectFit: "contain", objectPosition: "right bottom" }}
        />

        {/* Text */}
        <div
          className="relative z-20 flex flex-col justify-center px-12 py-14 xl:px-16"
          style={{ maxWidth: "560px", minHeight: "500px" }}
        >
          <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 xl:text-5xl">
            Premium Fresh Vegetables
          </h1>
          <p className="text-4xl font-extrabold leading-tight tracking-tight text-[#1a6b3c] xl:text-5xl">
            from Kenya to the Middle East
          </p>
          <p className="mt-5 text-base text-gray-700">
            Grown with care. Packed with freshness.
            <br />
            Delivered with trust.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/shop">
              <Button size="lg" className="gap-2 bg-[#1a6b3c] px-7 text-white shadow-md hover:bg-[#145530]">
                <ShoppingCart className="size-4" /> Order Now
              </Button>
            </Link>
            <Link to="/checkout">
              <Button size="lg" variant="outline" className="gap-2 border-gray-500 bg-white/80 px-7 text-gray-700 hover:border-[#1a6b3c] hover:text-[#1a6b3c]">
                <FileText className="size-4" /> Request a Quote
              </Button>
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-4 gap-x-6 gap-y-4">
            {highlights.map(({ icon: Icon, title, sub }) => (
              <div key={title} className="flex items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full border-2 border-[#1a6b3c]/50 bg-white/90 text-[#1a6b3c]">
                  <Icon className="size-4" />
                </span>
                <div>
                  <p className="text-sm font-bold leading-tight text-gray-900">{title}</p>
                  <p className="text-xs text-gray-600">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Kenyan flag badge */}
        <div className="absolute bottom-5 right-5 z-30 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
          <span className="text-3xl">🇰🇪</span>
          <div className="leading-tight">
            <p className="text-sm font-bold text-gray-900">Proudly Kenyan</p>
            <p className="text-xs font-semibold text-[#1a6b3c]">Globally Trusted</p>
          </div>
        </div>
      </section>
    </>
  );
}
