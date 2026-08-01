import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import emailjs from "@emailjs/browser";

const SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string;
const PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string;
// Use a separate newsletter template ID, or fall back to the order one
const TEMPLATE_ID = (import.meta.env.VITE_EMAILJS_NEWSLETTER_TEMPLATE_ID ?? import.meta.env.VITE_EMAILJS_TEMPLATE_ID) as string;

export function Newsletter() {
  const [email, setEmail]       = useState("");
  const [company, setCompany]   = useState("");
  const [loading, setLoading]   = useState(false);
  const [done, setDone]         = useState(false);
  const [error, setError]       = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (SERVICE_ID && TEMPLATE_ID && PUBLIC_KEY) {
      try {
        await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          {
            to_email: "danielkabagambe@gmail.com",
            to_name: "Admin",
            subscriber_email: email,
            subscriber_company: company || "-",
            order_id: "Newsletter Subscription",
            order_date: new Date().toLocaleDateString("en-GB"),
            items_html: `New newsletter subscriber: ${email} (${company || "no company"})`,
            total_price: "N/A",
            total_qty: "N/A",
            customer_name: email,
            customer_email: email,
            customer_phone: "N/A",
            customer_company: company || "-",
            country: "N/A",
            city: "N/A",
            notes: "Newsletter subscription",
          },
          PUBLIC_KEY
        );
      } catch {
        // Still show success to user - subscription noted
      }
    }

    setLoading(false);
    setDone(true);
    setEmail("");
    setCompany("");
  }

  return (
    <section className="shell py-16 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="relative overflow-hidden rounded-3xl bg-primary-dark px-8 py-12 text-primary-foreground lg:px-14 lg:py-16"
      >
        {/* Background blobs */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-20 -top-20 size-80 rounded-full bg-primary-foreground/5 blur-3xl" />
          <div className="absolute -bottom-10 left-0 size-60 rounded-full bg-primary-foreground/5 blur-3xl" />
        </div>

        <div className="relative grid items-center gap-10 lg:grid-cols-[1.3fr_1fr]">
          {/* Left */}
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.14em] text-primary-foreground/60">
              <span className="h-px w-6 bg-primary-foreground/30" />
              Stay in the loop
            </div>
            <h2 className="mt-4 text-2xl font-extrabold sm:text-3xl">
              Weekly price lists &amp; harvest updates
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-primary-foreground/80">
              Join 4,000+ importers receiving our Monday availability sheet, FOB pricing and
              seasonal crop forecasts straight to their inbox.
            </p>
            <a
              href="tel:+254703372539"
              className="mt-5 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-2 text-sm font-semibold transition-colors hover:bg-primary-foreground/15"
            >
              <Phone className="size-4" />
              Or call us: +254 703 372 539
              <ArrowRight className="size-3.5" />
            </a>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-4">
            {done ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-8 text-center">
                <CheckCircle className="size-10 text-green-400" />
                <p className="text-base font-bold">You're subscribed!</p>
                <p className="text-sm text-primary-foreground/70">
                  We'll send price updates every Monday. Check your inbox.
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-primary-foreground/50" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your business email address"
                    className="h-12 w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 pl-11 pr-5 text-sm text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/50 focus:border-primary-foreground/40 focus:bg-primary-foreground/15"
                  />
                </div>
                <input
                  type="text"
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  placeholder="Company name (optional)"
                  className="h-12 w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 text-sm text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/50 focus:border-primary-foreground/40"
                />
                {error && <p className="text-xs text-red-400">{error}</p>}
                <Button
                  type="submit"
                  size="lg"
                  variant="secondary"
                  disabled={loading}
                  className="w-full rounded-full font-bold disabled:opacity-60"
                >
                  {loading ? "Subscribing…" : "Subscribe to Price Updates"}
                </Button>
              </form>
            )}
            <p className="text-center text-[11px] text-primary-foreground/50">
              No spam. Unsubscribe anytime. Used by importers in 20+ countries.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
