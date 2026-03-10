# Changelog

All notable changes to StreamVerde will be documented here.

---

## [1.0.0] — 2026-03-10

### Added — Website
- Full marketing landing page (`website/index.html`)
- Hero section with animated TV mockup and live stream grid
- Features section (9 cards: Live TV, VOD, Catch-Up, Cloud DVR, AI, DRM, Analytics, Monetization, Parental Controls)
- Live TV / EPG preview section with channel list and program guide panel
- VOD section with movie grid, genre filters, quality badges, ratings
- Pricing section (Basic $9, Pro $19, Ultra $35)
- Multi-platform support badges (9 device types)
- Analytics dashboard preview (metrics, bar charts, SVG line chart)
- Tech stack section (12 technologies)
- CTA section with free trial
- 4-column footer with social links and legal

### Added — App
- Auth screens: Sign In + Create Account with tab switching
- Role selector on registration (Subscriber / Operator / Content Manager / Reseller)
- Social login buttons (Google, Apple)
- Subscriber Dashboard:
  - Home — Continue watching, Live Now, AI Picks, Trending
  - Live TV — 500+ channel grid with category filters
  - EPG Guide — 7-day timeline with NOW indicators
  - Movies — Full grid with quality/rating overlays
  - Series — Series cards with episode counts
  - Search — Live search, trending tags, history
  - Cloud DVR — Storage gauge, recordings, scheduled
  - Catch-Up TV — 72h replay list
  - Profile — Subscription card, active devices
  - Settings — Playback, parental controls, notifications, security
- Admin Dashboard:
  - Dashboard — 6 KPI cards, charts, activity feed
  - User Management — Full CRUD table + Add User modal
  - Channels — Channel table + Add Channel modal
  - VOD Library — Content table + upload zone + encoding queue
  - Payments — Revenue stats + transaction table
  - Analytics — DAU, device breakdown, watch-time chart
  - Advertising — Campaign progress, ad-type breakdown
  - System Settings — Streaming, DRM, compliance, infrastructure

### Added — Shared
- Design tokens (`shared/css/tokens.css`)
- Utility library (`shared/js/utils.js`)

### Added — Docs
- `README.md` — Quick start, feature matrix, roles, demo credentials
- `docs/SPEC.md` — Full platform specification
- `docs/ARCHITECTURE.md` — Frontend architecture guide
- `.gitignore`
- `.editorconfig`
