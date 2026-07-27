import { Globe2, BadgeCheck, Award, Truck, MessageCircle } from "lucide-react";

const stats = [
  {
    icon: Globe2,
    title: "Exporting to 6+ Countries",
    sub: "UAE, Saudi Arabia, Qatar, Oman, Kuwait & Bahrain",
  },
  {
    icon: BadgeCheck,
    title: "Premium Quality Produce",
    sub: "Sourced from trusted farms across Kenya",
  },
  {
    icon: Award,
    title: "International Certifications",
    sub: "Global GAP, HACCP, ISO — Fresh & Safe",
  },
  {
    icon: Truck,
    title: "Reliable Supply",
    sub: "Year-round availability and consistent quality",
  },
  {
    icon: MessageCircle,
    title: "Customer Satisfaction",
    sub: "Our clients trust us worldwide",
  },
];

export function StatsBar() {
  return (
    <div className="border-y border-gray-200 bg-gray-50 py-8">
      <div className="shell grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map(({ icon: Icon, title, sub }) => (
          <div
            key={title}
            className="flex flex-col items-center gap-3 rounded-xl bg-white px-4 py-6 text-center shadow-sm"
          >
            {/* Icon circle */}
            <span className="grid size-12 place-items-center rounded-full bg-[#1a6b3c]/10 text-[#1a6b3c]">
              <Icon className="size-6" />
            </span>
            <div>
              <p className="text-sm font-bold text-[#1a6b3c]">{title}</p>
              <p className="mt-1.5 text-xs leading-relaxed text-gray-500">{sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
