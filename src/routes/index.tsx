import { createFileRoute } from "@tanstack/react-router";
import { AnnouncementBar } from "@/components/home/AnnouncementBar";
import { SiteHeader } from "@/components/home/SiteHeader";
import { Hero } from "@/components/home/Hero";
import { StatsBar } from "@/components/home/StatsBar";
import { FeaturedProducts } from "@/components/home/FeaturedProducts";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ExportDestinations } from "@/components/home/ExportDestinations";
import { Certifications } from "@/components/home/Certifications";
import { Testimonials } from "@/components/home/Testimonials";
import { Newsletter } from "@/components/home/Newsletter";
import { SiteFooter } from "@/components/home/SiteFooter";

const title = "Shelter Services International | Fresh Kenyan Produce Exporter";
const description =
  "Premium fresh fruits & vegetables exported from Nairobi, Kenya to global markets. Global GAP, HACCP and KEPHIS certified, cold chain delivery worldwide.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <AnnouncementBar />
      <SiteHeader />
      <main>
        <Hero />
        <StatsBar />
        <div id="shop">
          <FeaturedProducts />
        </div>
        <div id="about">
          <WhyChooseUs />
        </div>
        <div id="farms">
          <ExportDestinations />
        </div>
        <div id="certifications">
          <Certifications />
        </div>
        <Testimonials />
        <div id="contact">
          <Newsletter />
        </div>
        <div id="exports" />
      </main>
      <SiteFooter />
    </div>
  );
}
