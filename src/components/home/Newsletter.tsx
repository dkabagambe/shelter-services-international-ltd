import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, ArrowRight, CheckCircle, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sendContactEmail } from "@/lib/email";

export function Newsletter() {
  // Newsletter state
  const [newsEmail, setNewsEmail] = useState("");
  const [newsCompany, setNewsCompany] = useState("");
  const [newsLoading, setNewsLoading] = useState(false);
  const [newsDone, setNewsDone] = useState(false);

  // Contact form state
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
  });
  const [contactLoading, setContactLoading] = useState(false);
  const [contactDone, setContactDone] = useState(false);
  const [contactError, setContactError] = useState("");

  async function handleNewsSubmit(e: React.FormEvent) {
    e.preventDefault();
    setNewsLoading(true);

    await sendContactEmail({
      kind: "newsletter",
      name: newsEmail,
      email: newsEmail,
      company: newsCompany,
      message: "Newsletter subscription",
    });

    setNewsLoading(false);
    setNewsDone(true);
    setNewsEmail("");
    setNewsCompany("");
  }

  async function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactError("");
    setContactLoading(true);

    const sent = await sendContactEmail({ ...contact, kind: "contact" });
    if (!sent) {
      setContactError(
        "Failed to send. Please email us directly at info@shelterservicesinternational.com",
      );
      setContactLoading(false);
      return;
    }

    setContactLoading(false);
    setContactDone(true);
    setContact({ name: "", email: "", phone: "", company: "", message: "" });
  }

  function handleContactChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setContact((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return (
    <section className="shell py-16 lg:py-20 space-y-12">
      {/* ── Contact Us ── */}
      <motion.div
        initial={{ opacity: 0, y: 28 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.55 }}
        className="grid gap-10 rounded-3xl border border-gray-200 bg-white p-8 shadow-sm lg:grid-cols-2 lg:p-12"
      >
        {/* Left */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1a6b3c]">
            Get in Touch
          </p>
          <h2 className="mt-3 text-2xl font-extrabold text-gray-900 sm:text-3xl">Contact Us</h2>
          <p className="mt-3 text-sm leading-relaxed text-gray-500">
            Ready to import premium Kenyan produce? Our team responds within 24 hours with pricing,
            availability, and export documentation details.
          </p>

          <ul className="mt-8 space-y-5">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#1a6b3c]/10 text-[#1a6b3c]">
                <MapPin className="size-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">Address</p>
                <p className="text-sm text-gray-500">
                  Enterprise Road, Industrial Area
                  <br />
                  Nairobi, Kenya
                </p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#1a6b3c]/10 text-[#1a6b3c]">
                <Phone className="size-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">Phone / WhatsApp</p>
                <a href="tel:+254703372539" className="text-sm text-[#1a6b3c] hover:underline">
                  +254 703 372 539
                </a>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 grid size-9 shrink-0 place-items-center rounded-full bg-[#1a6b3c]/10 text-[#1a6b3c]">
                <Mail className="size-4" />
              </span>
              <div>
                <p className="text-sm font-bold text-gray-900">Email</p>
                <a
                  href="mailto:info@shelterservicesinternational.com"
                  className="text-sm text-[#1a6b3c] hover:underline"
                >
                  info@shelterservicesinternational.com
                </a>
              </div>
            </li>
          </ul>
        </div>

        {/* Right - contact form */}
        <div>
          {contactDone ? (
            <div className="flex h-full flex-col items-center justify-center gap-4 rounded-2xl border border-green-100 bg-green-50 p-10 text-center">
              <CheckCircle className="size-12 text-[#1a6b3c]" />
              <p className="text-lg font-bold text-gray-900">Message Sent!</p>
              <p className="text-sm text-gray-500">
                Thank you for reaching out. We'll respond within 24 hours.
              </p>
              <Button
                onClick={() => setContactDone(false)}
                variant="outline"
                className="border-[#1a6b3c] text-[#1a6b3c] hover:bg-[#1a6b3c] hover:text-white"
              >
                Send Another Message
              </Button>
            </div>
          ) : (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                {(
                  [
                    {
                      id: "name",
                      label: "Full Name",
                      type: "text",
                      required: true,
                      placeholder: "John Doe",
                    },
                    {
                      id: "company",
                      label: "Company",
                      type: "text",
                      required: false,
                      placeholder: "Your Business Ltd.",
                    },
                    {
                      id: "email",
                      label: "Email",
                      type: "email",
                      required: true,
                      placeholder: "you@company.com",
                    },
                    {
                      id: "phone",
                      label: "Phone / WhatsApp",
                      type: "tel",
                      required: false,
                      placeholder: "+971 50 000 0000",
                    },
                  ] as const
                ).map(({ id, label, type, required, placeholder }) => (
                  <div key={id} className="flex flex-col gap-1.5">
                    <label
                      className="text-sm font-semibold text-gray-700"
                      htmlFor={`contact-${id}`}
                    >
                      {label} {required && <span className="text-red-500">*</span>}
                    </label>
                    <input
                      id={`contact-${id}`}
                      name={id}
                      type={type}
                      required={required}
                      value={contact[id]}
                      onChange={handleContactChange}
                      placeholder={placeholder}
                      className="rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                    />
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-gray-700" htmlFor="contact-message">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  rows={4}
                  value={contact.message}
                  onChange={handleContactChange}
                  placeholder="Tell us about your import needs, products of interest, volumes..."
                  className="resize-none rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-[#1a6b3c] focus:ring-1 focus:ring-[#1a6b3c]"
                />
              </div>

              {contactError && <p className="text-sm text-red-500">{contactError}</p>}

              <Button
                type="submit"
                disabled={contactLoading}
                className="w-full gap-2 bg-[#1a6b3c] py-3 text-sm font-bold text-white hover:bg-[#145530] disabled:opacity-60"
              >
                {contactLoading ? (
                  "Sending…"
                ) : (
                  <>
                    <Send className="size-4" /> Send Message
                  </>
                )}
              </Button>
            </form>
          )}
        </div>
      </motion.div>

      {/* ── Newsletter ── */}
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
            {newsDone ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-primary-foreground/20 bg-primary-foreground/10 p-8 text-center">
                <CheckCircle className="size-10 text-green-400" />
                <p className="text-base font-bold">You're subscribed!</p>
                <p className="text-sm text-primary-foreground/70">
                  We'll send price updates every Monday. Check your inbox.
                </p>
              </div>
            ) : (
              <form className="flex flex-col gap-3" onSubmit={handleNewsSubmit}>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-primary-foreground/50" />
                  <input
                    type="email"
                    required
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    placeholder="Your business email address"
                    className="h-12 w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 pl-11 pr-5 text-sm text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/50 focus:border-primary-foreground/40 focus:bg-primary-foreground/15"
                  />
                </div>
                <input
                  type="text"
                  value={newsCompany}
                  onChange={(e) => setNewsCompany(e.target.value)}
                  placeholder="Company name (optional)"
                  className="h-12 w-full rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-5 text-sm text-primary-foreground outline-none transition-colors placeholder:text-primary-foreground/50 focus:border-primary-foreground/40"
                />
                <Button
                  type="submit"
                  size="lg"
                  variant="secondary"
                  disabled={newsLoading}
                  className="w-full rounded-full font-bold disabled:opacity-60"
                >
                  {newsLoading ? "Subscribing…" : "Subscribe to Price Updates"}
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
