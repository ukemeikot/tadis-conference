import { AboutStack } from '../features/about/AboutStack'
import { Contact } from '../features/contact/Contact'
import { Faq } from '../features/faq/Faq'
import { Gallery, Sponsors, Voices } from '../features/gallery/Gallery'
import { Hero } from '../features/hero/Hero'
import { SiteFooter } from '../features/navigation/SiteFooter'
import { SiteHeader } from '../features/navigation/SiteHeader'
import { ProgrammeIntro, ProgrammeTimeline } from '../features/programme/Programme'
import { RegistrationSection } from '../features/registration/RegistrationSection'
import {
  FiresideGrid,
  PanelistsGrid,
  RevealRail,
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
        <RevealRail />

        <ProgrammeIntro />
        <ProgrammeTimeline />

        <VenuePlan />
        <Gallery />
        <Voices />
        <Sponsors />

        <RegistrationSection />
        <Faq />
        <Contact />
      </main>

      <SiteFooter />
    </>
  )
}
