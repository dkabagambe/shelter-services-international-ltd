import { MapPin, Phone, Mail, Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

const columns = [
  {
    title: "Company",
    links: ["About Us", "Our Farms", "Sustainability", "Careers", "Blog"],
  },
  {
    title: "Products",
    links: ["Fresh Vegetables", "Fresh Fruits", "Herbs & Spices", "Bulk Produce", "All Products"],
  },
  {
    title: "Export Services",
    links: ["Request a Quote", "Air Freight", "Sea Freight", "Packaging Options", "Documentation"],
  },
];

const socials = [
  { Icon: Facebook, label: "Facebook" },
  { Icon: Instagram, label: "Instagram" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Twitter, label: "Twitter" },
];

export function SiteFooter() {
  return (
    <footer className="bg-[#111c17] text-gray-300">

      {/* Main footer body */}
      <div className="shell grid gap-12 py-16 lg:grid-cols-[1.6fr_repeat(3,1fr)]">

        {/* Brand column */}
        <div>
          {/* Logo mark */}
          <div className="flex items-center gap-3">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-[#1a6b3c]">
              <svg viewBox="0 0 48 48" className="size-7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8 22L24 8L40 22V40H30V30H18V40H8V22Z" fill="white" fillOpacity="0.2" stroke="white" strokeWidth="2.5" strokeLinejoin="round"/>
                <path d="M24 36C24 28 30 24 36 24C36 32 30 36 24 36Z" fill="white"/>
                <path d="M24 36C24 28 18 24 12 24C12 32 18 36 24 36Z" fill="white" fillOpacity="0.5"/>
              </svg>
            </span>
            <div className="leading-tight">
              <p className="text-base font-extrabold tracking-tight text-white">
                SHELTER SERVICES
              </p>
              <p className="text-[10px] font-semibold tracking-[0.18em] text-[#1a6b3c] uppercase">
                International Limited
              </p>
            </div>
          </div>

          <p className="mt-5 text-sm leading-relaxed text-gray-400">
            Fresh produce. Global trust. Exporting premium Kenyan fruits and
            vegetables to importers and retailers worldwide since 2009.
          </p>

          {/* Contact details */}
          <ul className="mt-6 space-y-3">
            <li className="flex items-start gap-3 text-sm">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[#1a6b3c]" />
              <span className="text-gray-400">
                Enterprise Road, Industrial Area, Nairobi, Kenya
              </span>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Phone className="size-4 shrink-0 text-[#1a6b3c]" />
              <a
                href="tel:+254701903029"
                className="text-gray-300 transition-colors hover:text-white"
              >
                +254 701 903 029
              </a>
            </li>
            <li className="flex items-center gap-3 text-sm">
              <Mail className="size-4 shrink-0 text-[#1a6b3c]" />
              <a
                href="mailto:info@shelterservices.co.ke"
                className="text-gray-300 transition-colors hover:text-white"
              >
                info@shelterservices.co.ke
              </a>
            </li>
          </ul>

          {/* Social icons */}
          <div className="mt-7 flex gap-2.5">
            {socials.map(({ Icon, label }) => (
              <a
                key={label}
                href="#"
                aria-label={label}
                className="grid h-9 w-9 place-items-center rounded-full border border-white/10 text-gray-400 transition-all hover:border-[#1a6b3c] hover:bg-[#1a6b3c]/10 hover:text-white"
              >
                <Icon className="size-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {columns.map((col) => (
          <nav key={col.title}>
            <h3 className="mb-5 text-sm font-bold uppercase tracking-wider text-white">
              {col.title}
            </h3>
            <ul className="space-y-3">
              {col.links.map((link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="text-sm text-gray-400 transition-colors hover:text-white"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 bg-black/30">
        <div className="shell flex items-center justify-center py-6">
          <p
            className="text-center text-base font-medium tracking-widest text-[#4ade80]"
            style={{ fontFamily: "'Georgia', 'Times New Roman', serif" }}
          >
            © {new Date().getFullYear()} Shelter Services International Limited. All rights reserved.
          </p>
        </div>
      </div>

    </footer>
  );
}
