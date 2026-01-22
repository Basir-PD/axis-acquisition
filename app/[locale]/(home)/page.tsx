import EnterpriseConversion from '@/components/enterprise/EnterpriseConversion'
import { FAQs } from '@/components/faq/faqs'
import { Container } from '@/components/hero/container'
import { Hero } from '@/components/hero/index'
import PricingComponents from '@/components/pricing'
import { Services } from '@/components/Services'
import { CTASection } from '@/components/shared/CTASection'
import { MacbookSection } from '@/components/shared/MacbookSection'
import ScrollToTopButton from '@/components/shared/ScrollTopButton'
import { ProjectLifeCycleTimeline } from '@/components/Timeline/index'
import { Testimonials } from '@/components/testimonial/ClientsTestimonials'
import { ContactPopupProvider } from '@/context/ContactPopupContext'

interface HomeProps {
  params: Promise<{ locale: string }> | { locale: string }
}

export default async function Home({ params }: HomeProps) {
  // Await params if it's a promise (Next.js 15+ behavior)
  await Promise.resolve(params)
  return (
    <ContactPopupProvider>
      <main className="relative overflow-hidden bg-cream-50 dark:bg-sage-950">
        <Hero />
        <EnterpriseConversion />

        <Container>
          <ProjectLifeCycleTimeline />
        </Container>

        <Services />

        {/* Discovery Call CTA after Services */}
        <CTASection
          variant="discovery"
          titleKey="cta.afterServices.title"
          subtitleKey="cta.afterServices.subtitle"
        />

        <PricingComponents />
        <Testimonials />

        <section className="relative" style={{ zIndex: 1 }}>
          <MacbookSection />
          <FAQs />
          <ScrollToTopButton />
        </section>
      </main>
    </ContactPopupProvider>
  )
}
