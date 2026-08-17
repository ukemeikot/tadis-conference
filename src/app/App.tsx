import { AboutStack } from '../features/about/AboutStack'
import { Contact } from '../features/contact/Contact'
import { Faq } from '../features/faq/Faq'
import { Gallery, Sponsors } from '../features/gallery/Gallery'
import { Hero } from '../features/hero/Hero'
import { SiteFooter } from '../features/navigation/SiteFooter'
import { SiteHeader } from '../features/navigation/SiteHeader'
import { ProgrammeIntro, ProgrammeTimeline } from '../features/programme/Programme'
import { RegistrationSection } from '../features/registration/RegistrationSection'
import {
  FiresideGrid,
  PanelistsGrid,
  SpeakerStage,
  SpeakersIntro,
} from '../features/speakers'
import { VenuePlan } from '../features/venue/VenuePlan'
import { useLumaCheckout } from '../shared/hooks/useLumaCheckout'

/**
 * TADIS 2026 — one long-scroll page.
 *
 * Section order is the reading order and matches the design exactly. Each section
 * owns its own scroll behaviour; they share one rAF-throttled scroll driver
 * (see shared/hooks/useScrollFrame).
 */
export function App() {
  // Binds Luma's overlay to every "Register free" trigger once the tree is up.
  useLumaCheckout()

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <AboutStack />

        <SpeakersIntro />
        <SpeakerStage />
        <PanelistsGrid />
        <FiresideGrid />
        {/* RevealRail is intentionally not mounted: it advertised "eight more
            still to come", which stopped being true once the eight panelists were
            announced. The component and its content are kept, so re-adding it is
            a one-line change if there is another batch to tease. */}

        <ProgrammeIntro />
        <ProgrammeTimeline />

        <VenuePlan />
        <Gallery />
        {/* Voices is intentionally not mounted. Its three quotes are invented
            placeholders — one attributed to "Delegate, TADIS 2025" — and now that
            the site is no longer billed as draft, showing fabricated testimonials
            as though they were real is the one thing here that should not ship.
            Put real quotes in content/gallery.ts and add <Voices /> back. */}
        <Sponsors />

        <RegistrationSection />
        <Faq />
        <Contact />
      </main>

      <SiteFooter />
    </>
  )
}
