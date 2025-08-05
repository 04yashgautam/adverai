import { HeroSection } from "./hero-section"
import { DashboardPreview } from "./dashboard-preview"
import { LargeTestimonial } from "./large-testimonial"
import { AnimatedSection } from "./animated-section"
import "./landingpage.css"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden pb-0">
      <div className="relative z-10">
        <main className="max-w-[1320px] mx-auto relative">
          {/* Hero Section */}
          <HeroSection />

          {/* Dashboard Preview */}
          <div className="absolute bottom-[-150px] md:bottom-[-400px] left-1/2 transform -translate-x-1/2 z-30">
            <AnimatedSection>
              <DashboardPreview />
            </AnimatedSection>
          </div>
        </main>

        {/* Large Testimonial */}
        <AnimatedSection
          className="relative z-10 max-w-[1320px] mx-auto mt-[411px] md:mt-[400px]"
          delay={0.2}
        >
          <LargeTestimonial />
        </AnimatedSection>
      </div>
    </div>
  )
}
