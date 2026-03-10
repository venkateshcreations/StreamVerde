# StreamVerde — IPTV Platform

> A cloud-native OTT/IPTV platform delivering Live TV, VOD, Catch-up TV, Cloud DVR, AI-powered recommendations, and full operator management. Built as a complete SaaS/OTT/Middleware solution.

![Version](https://img.shields.io/badge/version-1.0.0-00ff87?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-00ff87?style=flat-square)
![Status](https://img.shields.io/badge/status-live-00ff87?style=flat-square)

---

## 📁 Project Structure

```
streamverde/
├── website/                  # Marketing / Landing page
│   ├── index.html            # Main entry point
│   ├── css/
│   │   ├── base.css          # Reset, variables, typography
│   │   ├── components.css    # Buttons, cards, badges
│   │   ├── layout.css        # Navbar, sections, footer
│   │   └── animations.css    # Keyframes, transitions
│   ├── js/
│   │   ├── main.js           # Init, scroll, observers
│   │   └── navbar.js         # Nav scroll & mobile menu
│   └── sections/
│       └── (HTML partials reference)
│
├── app/                      # IPTV Web Application
│   ├── index.html            # App entry point (auth → dashboard)
│   ├── css/
│   │   ├── auth.css          # Sign in / Register screens
│   │   ├── shell.css         # Sidebar, topbar, layout shell
│   │   ├── components.css    # Tables, cards, modals, forms
│   │   └── pages.css         # Per-page styles
│   ├── js/
│   │   ├── app.js            # App bootstrap & state
│   │   ├── auth.js           # Login / register / logout
│   │   ├── router.js         # Page navigation & routing
│   │   ├── sidebar.js        # Sidebar & mobile toggle
│   │   ├── player.js         # Video player overlay
│   │   ├── modals.js         # Modal system
│   │   └── notifications.js  # Notification panel
│   └── pages/
│       ├── subscriber/       # Subscriber page HTML partials
│       └── admin/            # Admin page HTML partials
│
├── shared/                   # Shared across website + app
│   ├── css/
│   │   └── tokens.css        # Design tokens (colors, fonts, spacing)
│   └── js/
│       └── utils.js          # Shared utility functions
│
├── assets/
│   └── icons/                # SVG icons (placeholder)
│
├── docs/
│   ├── SPEC.md               # Platform specification
│   ├── ARCHITECTURE.md       # Technical architecture notes
│   └── CHANGELOG.md          # Version history
│
├── .gitignore
├── .editorconfig
└── README.md
```

---

## 🚀 Quick Start

### Option 1 — Open directly in browser
```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/streamverde.git
cd streamverde

# Open the marketing website
open website/index.html

# Open the web application
open app/index.html
```

### Option 2 — Serve locally (recommended)
```bash
# Using Python
python3 -m http.server 8080

# Using Node.js / npx
npx serve .

# Then visit:
# http://localhost:8080/website/   → Marketing site
# http://localhost:8080/app/       → IPTV Application
```

---

## 🎯 Platform Features

| Feature | Status |
|---|---|
| Live TV Streaming (HLS/DASH/RTMP/WebRTC) | ✅ UI Complete |
| Video On Demand (VOD) | ✅ UI Complete |
| Catch-Up TV (72h replay) | ✅ UI Complete |
| Cloud DVR | ✅ UI Complete |
| Electronic Program Guide (EPG) | ✅ UI Complete |
| AI Recommendations Engine | ✅ UI Complete |
| Full-Text & Voice Search | ✅ UI Complete |
| Multi-Device Support (15+ platforms) | ✅ UI Complete |
| Subscriber Management | ✅ UI Complete |
| Admin Dashboard | ✅ UI Complete |
| Channel Management | ✅ UI Complete |
| VOD Library Management | ✅ UI Complete |
| Payments & Subscriptions | ✅ UI Complete |
| Analytics Dashboards | ✅ UI Complete |
| Advertising System | ✅ UI Complete |
| DRM & Security (Widevine/FairPlay/PlayReady) | ✅ UI Complete |
| Parental Controls | ✅ UI Complete |
| Reseller System | ✅ UI Complete |
| Notifications (Push/Email/SMS) | ✅ UI Complete |
| System Settings & Compliance | ✅ UI Complete |

---

## 👥 User Roles

| Role | Access |
|---|---|
| **Super Admin** | Full platform access |
| **IPTV Operator** | Channels, packages, analytics |
| **Content Manager** | VOD upload & management |
| **Subscriber** | Watch content, manage profile |
| **Reseller** | Dashboard, user creation, commissions |
| **Support Agent** | Ticketing, user assistance |

---

## 🔐 Demo Login

| Account | Email | Password | Role |
|---|---|---|---|
| Admin | `admin@streamverde.com` | `password` | Super Admin |
| Subscriber | `user@example.com` | `password` | Subscriber |

---

## 🎨 Design System

- **Primary Font:** Syne (display/headings)
- **Body Font:** Manrope
- **Mono Font:** JetBrains Mono
- **Accent Color:** `#00ff87` (StreamVerde Green)
- **Background:** `#000d07` (Deep Forest Black)
- **Theme:** Dark, green-accent, glass-morphism

---

## 🛠 Tech Stack (Frontend)

| Layer | Technology |
|---|---|
| Markup | HTML5, Semantic |
| Styling | CSS3, Custom Properties, Grid, Flexbox |
| Scripting | Vanilla JS (ES6+) |
| Fonts | Google Fonts (Syne, Manrope, JetBrains Mono) |
| Icons | Emoji + CSS |
| Build | None required — zero dependencies |

---

## 📦 Suggested Backend Stack (per spec)

- **API:** Node.js + Go (microservices)
- **AI/ML:** Python (recommendation engine)
- **Database:** PostgreSQL + Redis + Elasticsearch
- **Streaming:** NGINX RTMP + Wowza + AWS Media Services
- **CDN:** Cloudflare / AWS CloudFront / Akamai / Fastly
- **DRM:** Widevine + PlayReady + FairPlay
- **Monitoring:** Prometheus + Grafana + ELK Stack

---

## 📄 License

MIT © 2026 StreamVerde. All rights reserved.
