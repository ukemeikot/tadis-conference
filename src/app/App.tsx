import { AboutStack } from '../features/about/AboutStack'
import { Contact } from '../features/contact/Contact'
import { Faq } from '../features/faq/Faq'
import { Gallery, Sponsors, Voices } from '../features/gallery/Gallery'
import { Hero } from '../features/hero/Hero'
import { ConvenerLetter } from '../features/letter/ConvenerLetter'
import { MemoryWalk } from '../features/memories/MemoryWalk'
import { PhotoGallery } from '../features/photos/PhotoGallery'
import { SiteFooter } from '../features/navigation/SiteFooter'
import { SiteHeader } from '../features/navigation/SiteHeader'
import { DayInNumbers } from '../features/numbers/DayInNumbers'
import { ProgrammeIntro, ProgrammeTimeline } from '../features/programme/Programme'
import { Sessions } from '../features/sessions/Sessions'
import {
  FiresideGrid,
  PanelistsGrid,
  SpeakerStage,
  SpeakersIntro,
} from '../features/speakers'

/**
 * TADIS 2026 — one long-scroll page, in its post-summit form: a recap of the day
 * rather than an invitation to it.
 *
 * Section order is the reading order and follows the recap design. Each section
 * owns its own scroll behaviour; they share one rAF-throttled scroll driver
 * (see shared/hooks/useScrollFrame).
 */
export function App() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <SiteHeader />

      <main id="main">
        <Hero />
        <MemoryWalk />
        {/* What the day meant to the people behind it, before the detail. */}
        <ConvenerLetter />
        <Voices />
        <AboutStack />

        <SpeakersIntro />
        <SpeakerStage />
        <PanelistsGrid />
        <FiresideGrid />

        <ProgrammeIntro />
        <ProgrammeTimeline />

        {/* The venue floor plan stood here before the summit; with the day over,
            the venue lives on in the contact map and this slot shows what it held. */}
        <DayInNumbers />
        <Gallery />
        <PhotoGallery />
        <Sponsors />

        <Sessions />
        <Faq />
        <Contact />
      </main>

      <SiteFooter />
    </>
  )
}
