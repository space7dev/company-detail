import { ContentSection } from "./components/detail-company/content-section";
import { HeaderSection } from "./components/detail-company/header-section";
import { HeroSection } from "./components/detail-company/hero-section";
import { NewsletterFooterSection } from "./components/detail-company/newsletter-footer-section";

export function DetailCompanyPage() {
  return (
    <div className="relative min-h-[7476px] w-full min-w-[1366px] overflow-visible bg-neutral-50">
      <HeroSection />
      <ContentSection />
      <NewsletterFooterSection />
      <HeaderSection />
    </div>
  );
}
