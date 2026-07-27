import { motion } from "framer-motion";
import { Sprout, ShieldCheck, Snowflake, Plane, Users, LineChart } from "lucide-react";

const reasons = [
  {
    icon: Sprout,
    title: "Direct Farm Sourcing",
    text: "We work directly with over 320 contracted smallholder farms across the Kenyan highlands.",
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
  },
  {
    icon: ShieldCheck,
    title: "Certified Quality",
    text: "Global GAP, HACCP, ISO 22000 and KEPHIS compliant processes at every stage of handling.",
    iconBg: "bg-blue-50",
    iconColor: "text-blue-600",
  },
  {
    icon: Snowflake,
    title: "Unbroken Cold Chain",
    text: "Pre-cooling within 4 hours of harvest and temperature-controlled transit to destination.",
    iconBg: "bg-cyan-50",
    iconColor: "text-cyan-600",
  },
  {
    icon: Plane,
    title: "Daily Air Freight",
    text: "Scheduled cargo out of JKIA Nairobi with consolidated and full-pallet shipping options.",
    iconBg: "bg-violet-50",
    iconColor: "text-violet-600",
  },
  {
    icon: Users,
    title: "Dedicated Account Team",
    text: "One export manager per client, with documentation, phytosanitary and customs support.",
    iconBg: "bg-amber-50",
    iconColor: "text-amber-600",
  },
  {
    icon: LineChart,
    title: "Year-Round Supply",
    text: "Staggered planting programmes ensure consistent volumes and stable contract pricing.",
    iconBg: "bg-rose-50",
    iconColor: "text-rose-500",
  },
];

export function WhyChooseUs() {
  return (
    <section className="bg-gray-50 py-16 lg:py-24">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Why Choose Us</p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            A supply partner built for serious importers
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-500">
            We go beyond produce — we provide end-to-end export support that keeps your supply chain reliable.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {reasons.map(({ icon: Icon, title, text, iconBg, iconColor }, i) => (
            <motion.div
              key={title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: (i % 3) * 0.09 }}
              className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <span className={`grid h-14 w-14 place-items-center rounded-2xl ${iconBg} ${iconColor}`}>
                <Icon className="size-6" />
              </span>
              <h3 className="mt-6 text-lg font-bold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
