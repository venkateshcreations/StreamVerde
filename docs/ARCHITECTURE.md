# StreamVerde — Frontend Architecture

## Overview

The StreamVerde frontend is split into two independent applications that share a common design system:

```
streamverde/
├── website/    ← Public marketing site (static HTML)
├── app/        ← IPTV web application (SPA)
└── shared/     ← Design tokens + utilities (used by both)
```

---

## Design System (`shared/`)

### `shared/css/tokens.css`
Single source of truth for all design tokens:
- CSS custom properties (colors, spacing, typography, z-index)
- Global reset
- Scrollbar styles

Both `website/` and `app/` import this file first.

### `shared/js/utils.js`
Exposes `window.SV` with:
- DOM helpers (`$`, `$$`, `addClass`, etc.)
- `SV.observeFadeIn()` — IntersectionObserver scroll reveal
- `SV.debounce()`
- `SV.formatNumber()`, `SV.formatCurrency()`, `SV.formatDuration()`
- `SV.store` — localStorage helpers
- `SV.events` — lightweight event bus

---

## Website (`website/`)

Static marketing site. No build step required.

### CSS load order
```html
shared/css/tokens.css     ← design tokens (variables)
website/css/base.css      ← noise overlay, orbs, sections, tooltips
website/css/animations.css ← all @keyframes + .fade-in reveal
website/css/components.css ← buttons, cards, pricing, platforms, stats
website/css/layout.css    ← navbar, hero, all sections, footer, responsive
```

### JS load order
```html
shared/js/utils.js        ← SV utilities
website/js/navbar.js      ← scroll shrink, mobile menu, scroll-spy
website/js/main.js        ← IntersectionObserver, interactions
```

---

## App (`app/`)

Single-Page Application. All pages are in the DOM, shown/hidden by the Router.

### CSS load order
```html
shared/css/tokens.css     ← design tokens
app/css/auth.css          ← sign in / register screens
app/css/shell.css         ← sidebar, topbar, layout shell, notification panel
app/css/components.css    ← cards, tables, buttons, modals, forms, progress bars
app/css/pages.css         ← per-page styles (home, live, epg, movies, profile, admin…)
```

### JS load order
```html
shared/js/utils.js        ← SV utilities
app/js/router.js          ← page switching, nav highlight, title update
app/js/sidebar.js         ← sidebar open/close/toggle
app/js/notifications.js   ← notification panel toggle
app/js/player.js          ← video player overlay
app/js/modals.js          ← modal system with templates
app/js/auth.js            ← login, register, logout, role switching
app/js/app.js             ← bootstrap, global state, event delegation
```

### State model (`App.state`)
```js
{
  isLoggedIn: Boolean,
  isAdmin:    Boolean,
  user: {
    id, name, email, role, plan, avatar
  }
}
```

### Routing
`Router.goto(page)` — hides all `.page` elements, shows `#page-{id}`.

Pages: `home`, `live`, `epg`, `movies`, `series`, `search`, `dvr`, `catchup`, `profile`, `settings`, `admin-dashboard`, `admin-users`, `admin-channels`, `admin-vod`, `admin-payments`, `admin-analytics`, `admin-ads`, `admin-settings`

### Auth flow
```
Auth screen
  ↓ login()
  ↓ if email contains "admin" → isAdmin=true
  ↓ _showApp(isAdmin)
  ↓ Router.goto("admin-dashboard" | "home")
```

---

## Linking website → app

The website's "Sign In" and "Get Started" buttons link to `../app/index.html`.

The app's "← Back to site" (footer) links to `../website/index.html`.

---

## Backend Integration Points (future)

| Endpoint | Module | Method |
|---|---|---|
| `POST /auth/login` | auth.js | Replace `Auth.login()` mock |
| `POST /auth/register` | auth.js | Replace `Auth.register()` mock |
| `GET /channels` | page-live | Fetch + render channel grid |
| `GET /epg` | page-epg | Fetch + render EPG grid |
| `GET /vod` | page-movies, page-series | Fetch + render grids |
| `GET /users` | page-admin-users | Fetch + render table |
| `GET /analytics` | page-admin-analytics | Fetch + render charts |
| `POST /subscribe` | profile page | Upgrade plan |
| `GET /recordings` | page-dvr | Fetch DVR list |
