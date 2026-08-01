import { motion } from "framer-motion";
import { Plane } from "lucide-react";

const featured = [
  { name: "United Arab Emirates", short: "UAE", hub: "Dubai · Abu Dhabi", flag: "🇦🇪" },
  { name: "Saudi Arabia", short: "KSA", hub: "Riyadh · Jeddah", flag: "🇸🇦" },
  { name: "Qatar", short: "QAT", hub: "Doha", flag: "🇶🇦" },
  { name: "Oman", short: "OMN", hub: "Muscat", flag: "🇴🇲" },
  { name: "United Kingdom", short: "UK", hub: "London · Manchester", flag: "🇬🇧" },
  { name: "Netherlands", short: "NLD", hub: "Amsterdam", flag: "🇳🇱" },
];

const arabMarkets = [
  { name: "Algeria", flag: "🇩🇿" },
  { name: "Bahrain", flag: "🇧🇭" },
  { name: "Comoros", flag: "🇰🇲" },
  { name: "Djibouti", flag: "🇩🇯" },
  { name: "Egypt", flag: "🇪🇬" },
  { name: "Iraq", flag: "🇮🇶" },
  { name: "Jordan", flag: "🇯🇴" },
  { name: "Kuwait", flag: "🇰🇼" },
  { name: "Lebanon", flag: "🇱🇧" },
  { name: "Libya", flag: "🇱🇾" },
  { name: "Mauritania", flag: "🇲🇷" },
  { name: "Morocco", flag: "🇲🇦" },
  { name: "Palestine", flag: "🇵🇸" },
  { name: "Syria", flag: "🇸🇾" },
  { name: "Tunisia", flag: "🇹🇳" },
  { name: "Yemen", flag: "🇾🇪" },
];

export function ExportDestinations() {
  return (
    <section className="relative overflow-hidden bg-[#1a6b3c] py-16 text-white lg:py-24">
      {/* Background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute right-0 top-0 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="shell relative">
        {/* Header */}
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-start">
          <div className="max-w-xl">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/60">
              Export Destinations
            </p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">
              Shipping to global markets every week
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/80">
              Consolidated air cargo departs Nairobi daily, landing premium produce in Gulf and
              European markets within 24–48 hours of dispatch.
            </p>
          </div>
          <div className="flex items-center gap-4 rounded-2xl border border-white/15 bg-white/10 px-6 py-5 lg:self-start">
            <Plane className="size-6 shrink-0 text-white/70" />
            <div>
              <p className="text-sm font-bold">Daily departures</p>
              <p className="text-xs text-white/70">JKIA, Nairobi</p>
            </div>
          </div>
        </div>

        {/* Featured destination cards */}
        <div className="mt-12 grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-6">
          {featured.map((d, i) => (
            <motion.div
              key={d.short}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="rounded-2xl border border-white/15 bg-white/10 p-6 backdrop-blur-sm transition-all hover:border-white/30 hover:bg-white/15"
            >
              <span className="text-3xl">{d.flag}</span>
              <p className="mt-4 text-sm font-bold leading-tight">{d.name}</p>
              <p className="mt-1 text-xs text-white/70">{d.hub}</p>
            </motion.div>
          ))}
        </div>

        {/* Arab League markets */}
        <div className="mt-12">
          <p className="mb-6 text-xs font-bold uppercase tracking-[0.16em] text-white/60">
            Arab League Markets
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:grid-cols-8">
            {arabMarkets.map((d, i) => (
              <motion.div
                key={d.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.35, delay: i * 0.04 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="flex flex-col items-center gap-2 rounded-xl border border-white/10 bg-white/8 px-3 py-4 backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/15"
              >
                <span className="text-2xl">{d.flag}</span>
                <p className="text-center text-xs font-semibold leading-tight">{d.name}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <p className="mt-8 text-center text-sm text-white/60">
          + more markets including Germany, France, Canada, Australia, Japan and more
        </p>
      </div>
    </section>
  );
}
