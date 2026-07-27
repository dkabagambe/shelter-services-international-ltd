import { ShoppingCart, FileText, CheckCircle, ShieldCheck, Truck, Snowflake } from "lucide-react";
import { Button } from "@/components/ui/button";
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
    <section className="relative w-full overflow-hidden" style={{ minHeight: "500px" }}>

      {/* Nairobi cityscape — full section background */}
      <img
        src={nairobiImage}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover"
        style={{ objectPosition: "center 40%" }}
      />

      {/* Light gradient over left half so text is readable */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(to right, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.65) 30%, rgba(255,255,255,0.2) 55%, transparent 75%)",
        }}
      />

      {/* Produce PNG — right side, floats over Nairobi bg, no white box */}
      <img
        src={produceImage}
        alt="Premium fresh Kenyan vegetables"
        className="absolute bottom-0 right-0 z-10 h-full w-auto max-w-none"
        style={{ objectFit: "contain", objectPosition: "right bottom", maxHeight: "100%", width: "58%" }}
      />

      {/* Text content — left side */}
      <div
        className="relative z-20 flex flex-col justify-center px-6 py-14 lg:px-12 xl:px-16"
        style={{ maxWidth: "560px", minHeight: "500px" }}
      >
        <h1 className="text-4xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-5xl">
          Premium Fresh Vegetables
        </h1>
        <p className="text-4xl font-extrabold leading-tight tracking-tight text-[#1a6b3c] sm:text-5xl">
          from Kenya to the Middle East
        </p>
        <p className="mt-5 text-base text-gray-700 sm:text-lg">
          Grown with care. Packed with freshness.
          <br />
          Delivered with trust.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button
            size="lg"
            className="gap-2 bg-[#1a6b3c] px-7 text-white shadow-md hover:bg-[#145530]"
          >
            <ShoppingCart className="size-4" />
            Order Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="gap-2 border-gray-500 bg-white/80 px-7 text-gray-700 backdrop-blur-sm hover:border-[#1a6b3c] hover:text-[#1a6b3c]"
          >
            <FileText className="size-4" />
            Request a Quote
          </Button>
        </div>

        {/* Four highlight badges */}
        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-4">
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

      {/* Kenyan flag badge — bottom right */}
      <div className="absolute bottom-5 right-5 z-30 flex items-center gap-3 rounded-xl bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
        <span className="text-3xl">🇰🇪</span>
        <div className="leading-tight">
          <p className="text-sm font-bold text-gray-900">Proudly Kenyan</p>
          <p className="text-xs font-semibold text-[#1a6b3c]">Globally Trusted</p>
        </div>
      </div>

    </section>
  );
}
