import { MapPin, Phone, Mail } from "lucide-react";

const destinations = [
  { flag: "🇦🇪", name: "UAE" },
  { flag: "🇸🇦", name: "Saudi Arabia" },
  { flag: "🇶🇦", name: "Qatar" },
  { flag: "🇴🇲", name: "Oman" },
  { flag: "🇰🇼", name: "Kuwait" },
  { flag: "🇧🇭", name: "Bahrain" },
];

export function AnnouncementBar() {
  return (
    <div className="bg-[#1a4731] text-white">
      <div className="shell flex h-9 items-center justify-between overflow-hidden text-xs">
        {/* LEFT: location · phone · email */}
        <div className="flex shrink-0 items-center divide-x divide-white/20">
          <span className="flex items-center gap-1.5 pr-3 text-white/90">
            <MapPin className="size-3 shrink-0" />
            Nairobi, Kenya
          </span>
          <a
            href="tel:+254703372539"
            className="flex items-center gap-1.5 px-3 font-semibold text-white transition-colors hover:text-white/80"
          >
            <Phone className="size-3 shrink-0" />
            +254 703 372 539
          </a>
          <a
            href="mailto:info@shelterservices.co.ke"
            className="hidden items-center gap-1.5 pl-3 text-white/90 transition-colors hover:text-white lg:flex"
          >
            <Mail className="size-3 shrink-0" />
            info@shelterservices.co.ke
          </a>
        </div>

        {/* RIGHT: only on desktop (lg+) */}
        <div className="hidden items-center gap-2 lg:flex">
          <span className="hidden whitespace-nowrap text-white/85 xl:block">
            Exporting Premium Fresh Vegetables to the Middle East
          </span>
          <span className="hidden text-white/30 xl:block">|</span>
          <span className="whitespace-nowrap font-semibold text-white/75">
            Export Destinations:
          </span>
          <div className="flex items-center gap-3">
            {destinations.map((d) => (
              <span
                key={d.name}
                className="flex items-center gap-1 whitespace-nowrap text-white/90"
              >
                <span>{d.flag}</span>
                <span>{d.name}</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
