# TADIS 2026 — Re-Engineering Africa

Marketing site for **The African Dream Network International Summit**, Saturday
3 October 2026, Insight Bible Church, Uyo, Akwa Ibom State.

Ported from the `TADIS 2026.dc.html` design in the Claude Design project
*3D conference website design*, which itself sits on the **ProHealth Pathway
Design System** for its tokens.

## Running it

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build into dist/
npm run preview    # serve the built output
npm run typecheck  # tsc --noEmit
```

## Architecture

Feature-based (feature-sliced). One folder per page section, a `shared` layer for
things used across sections, and content data kept out of the components.

```
src/
  app/                    App shell + global styles
    App.tsx               Section order = reading order
    styles/
      global.css          Page palette, hover states, responsive breakpoints
      tokens/             Design-system tokens, synced from Claude Design
  content/                All copy and data, typed. Edit here, not in JSX.
    types.ts              Shapes for every content kind
    navigation.ts  about.ts  speakers.ts  programme.ts
    venue.ts  gallery.ts  faq.ts
  features/               One folder per section
    navigation/           SiteHeader (sticky nav, scroll spy, mobile menu), SiteFooter
    hero/                 Hero + Countdown
    about/                AboutStack — the sticky-stack panels
    speakers/             SpeakersIntro, SpeakerStage, SpeakerGrids, RevealRail
    programme/  venue/  gallery/  registration/  faq/  contact/
  shared/
    config/site.ts        Date, venue, contact, Luma event — single source of truth
    config/theme.ts       Event palette and colour helpers
    hooks/                Scroll driver, countdown, globe, tilt, media queries
    ui/                   Design-system primitives ported to TS
```

Why not clean architecture: there is no backend, no persistence and no domain
logic here — registration is delegated to Luma. Ports, repositories and use cases
would have been ceremony wrapped around a static page.

### The scroll driver

Every scroll-driven effect shares one rAF-throttled listener
(`shared/hooks/useScrollFrame.ts`). Subscribers write directly to the DOM through
refs and deliberately do **not** set React state — these run on every frame while
scrolling, and re-rendering the tree at 60fps would be far too expensive.
`useScrollSpy` is the one exception, because it changes a handful of times per page
and the nav has to re-render to move the underline.

### Motion budget

`useRichMotion()` gates the 3D choreography on viewport width ≥ 900px **and** no
`prefers-reduced-motion`. On a phone the CSS has already collapsed the two-column
stage into one column, so animating it would only cost battery. The Three.js globe
draws a static frame under reduced motion rather than disappearing.

## Editing content

Everything editorial is in `src/content/`. Some examples:

- **A speaker's name lands** — edit `speakers.ts`; set the real `name`, `role`,
  `sessionTitle`, and swap `portrait`.
- **Programme changes** — edit `programme.ts`. Set `emphasis: 'gold'` and an
  `eyebrow` containing `CONFIRMED` for a locked session; leave
  `programmeIsDraft = true` until the running order is final.
- **Date, venue, phone numbers** — `src/shared/config/site.ts` only. The hero,
  countdown, programme header, registration steps, contact block and footer all
  read from it.

## Registration → Luma

Registration is **not** handled by this site. Every "Register free" trigger opens
[the Luma event](https://luma.com/xpbcg8ks) in an overlay via Luma's official
embed, and Luma issues the ticket and QR code that accreditation scans.

- Event id lives in `site.luma.eventId` (`evt-6WLDjZNj4VL6gnh`)
- `shared/hooks/useLumaCheckout.ts` loads `embed.lu.ma/checkout-button.js` and
  calls `window.luma.initCheckout()` after mount — required because React renders
  the triggers after Luma's initial DOM scan
- `features/registration/LumaCheckoutLink.tsx` is the trigger. It is an `<a>` with
  a real `href`, so if the embed script is blocked by an ad blocker or a flaky
  connection it degrades to a plain link instead of a dead button

**Deliberately not built:** a local registration form posting to Luma's API. It
would need a server-side proxy (the API key cannot ship in frontend code) and a
Luma Plus subscription, and Luma has no public self-registration endpoint —
`POST /v1/events/guests/add` is a host-side add. It would also produce a second
delegate reference competing with Luma's real ticket at the door.

## Assets

`public/assets/` is generated from the originals in `Desktop/TADIS2026` and
`Downloads` (TADIC LOGO / TADIC DESIGN THEME). Each image exists twice: full size
capped at 1600px, and a `sm/` crop at 900px for cards and rails. Source files were
up to 18 MB straight off a camera; the thumbnails are 45–90 KB, with EXIF rotation
baked in.

### Photo policy: no faces in anonymous slots

**A real portrait only ever appears next to a real name.** The design filled its
"To be announced" cards with photos from the uploaded folder, and two of those
turned out to be named speakers — Aniekan AU Usoroh was serving as an unnamed
fireside guest, and Emana as the unnamed fireside host. Anything still unnamed now
renders a dashed "portrait to come" placeholder instead.

Consequently the five unidentified portraits (`speaker-05` … `speaker-09`) have
been **deleted** rather than left unused, since this repo is public. The originals
are untouched in `Desktop/TADIS2026`; re-run the asset pipeline if you identify
one and want it back.

The gallery uses the two event fliers rather than anonymous portraits, with empty
tiles for TADIS 2025 photography.

### Portrait frames

Stage portraits sit in a **4:5** frame (`PORTRAIT_RATIO` in `SpeakerStage.tsx`),
matching the sources. The design used a 4:3 video frame, which with
`object-fit: cover` cropped the top off a tall portrait and cut heads in half. Any
source that is not 4:5 needs an explicit `objectPosition` in `content/speakers.ts`
— Paul Udah's is square, so it is centred and crops at the sides.

## Needs your input

**Three portraits are missing.** Onofiok Luke, Williams Uchemba and Jasper Ifeanyi
have their names, roles and topics on the page but render a dashed "portrait to
come" card. Drop clean headshots into `public/assets/` as
`speaker-onofiok-luke.jpg` etc. (plus an `sm/` copy) and add a `portrait` block to
their entry in `content/speakers.ts`.

Do **not** crop these out of the reveal fliers — the fliers are composed around
their overlay text, so any crop that avoids the "SPEAKER REVEAL" badge and the name
block is a tight head-only close-up that has to be upscaled. Tried and discarded.

**Session times.** The fliers all print 8:30 AM, which is the summit start time
rather than each speaker's slot, so only Fela (08:30), Lady Helen (10:45) and the
convener (10:00) carry times. The rest show none until the running order is set.

**Paul Udah's nationality.** His flier carries a green/yellow/blue flag (Gabon)
where the others carry Nigeria. Left off the page in case it is a flier error.

## Still placeholder

All visibly flagged on the page:

- **Programme** — draft running order around the two confirmed sessions.
- **Panelists, fireside guests, reveals 05–12** — awaiting names, titles and photos.
- **Testimonials** — placeholder quotes.
- **Sponsor logos** — five empty slots.
- **Venue floor plan** — indicative until the walkthrough is done.
- **Gallery** — two empty tiles awaiting TADIS 2025 event photography.
- **Map** — `features/contact/Contact.tsx` has a placeholder panel; drop in an
  embed for 227 Nsikak Eduok Avenue.
- **Fonts** — Hanken Grotesk + JetBrains Mono from Google Fonts, substitutions
  from the design system rather than licensed brand fonts.
- **Logo** — `tadis-logo.png` and `adn-logo.png` are raster. An SVG would scale
  more crisply in the header and footer.

Removed from the design deliberately: the four **placeholder showreels** (Google's
public sample clips, unrelated to the event) in favour of the real portraits.

## Additions to the design

The design file was authored desktop-only and as a single in-browser document.
Three things were added rather than ported:

1. **Responsive breakpoints** (`app/styles/global.css`). The design's four-column
   grids, two-column speaker stage and isometric floor plan had no mobile
   handling. Below 900px the stage collapses to one column (portrait first), the
   About stack unpins into a plain list, and the floor plan flattens to a top-down
   diagram.
2. **A mobile menu.** Eight nav links plus a CTA cannot share one row on a phone;
   letting them wrap produced three ragged rows. They collapse behind a hamburger
   under 860px.
3. **Accessibility passes** — skip link, `aria-expanded`/`aria-controls` on the FAQ
   and menu toggles, the venue legend as the text equivalent of the visual plan,
   labelled countdown, and `useId` for form control ids (the design system's
   `Math.random()` ids changed on every render, breaking label association).
