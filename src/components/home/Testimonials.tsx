import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "Shelter Services has been our most consistent Kenyan supplier. Three years, weekly shipments, and the French beans arrive in the same condition every single time.",
    name: "Faisal Al-Mansoori",
    role: "Procurement Head",
    company: "Gulf Fresh Trading",
    city: "Dubai, UAE",
    initials: "FA",
  },
  {
    quote:
      "Their documentation is flawless and customs clearance is never an issue. That reliability is worth more to us than a lower price elsewhere.",
    name: "Noura Al-Harbi",
    role: "Category Manager",
    company: "Riyadh Markets Group",
    city: "Riyadh, Saudi Arabia",
    initials: "NA",
  },
  {
    quote:
      "We moved our entire avocado programme to them after one trial pallet. Grading accuracy and cold chain discipline are genuinely enterprise level.",
    name: "Yusuf Rahman",
    role: "Director",
    company: "Doha Produce Imports",
    city: "Doha, Qatar",
    initials: "YR",
  },
];

export function Testimonials() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">Client Testimonials</p>
          <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
            Trusted by importers worldwide
          </h2>
          <p className="mt-3 text-base leading-relaxed text-gray-500">
            Long-term relationships built on consistency, quality and transparency.
          </p>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl border border-gray-200 bg-white p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <Quote className="size-9 text-[#1a6b3c]/20" />

              <blockquote className="mt-5 flex-1 text-base leading-relaxed text-gray-700">
                "{t.quote}"
              </blockquote>

              <div className="mt-5 flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="size-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              <figcaption className="mt-6 flex items-center gap-4 border-t border-gray-100 pt-6">
                <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-[#1a6b3c] text-sm font-extrabold text-white">
                  {t.initials}
                </span>
                <div>
                  <p className="text-sm font-bold text-gray-900">{t.name}</p>
                  <p className="text-xs text-gray-500">
                    {t.role}, {t.company}
                  </p>
                  <p className="text-xs font-semibold text-[#1a6b3c]">{t.city}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
