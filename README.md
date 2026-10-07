# ShopPress

A combined homepage clone inspired by Shopify + WordPress, built with **React + Vite**.

## 🚀 Quick Start

```bash
# 1. Install dependencies
npm install

# 2. Run development server
npm run dev

# 3. Open in browser
# http://localhost:5173
```

## 📦 Build for Production

```bash
npm run build
```

Output goes to the `dist/` folder — ready to deploy to Vercel, Netlify, or any static host.

## 🌐 Deploy to Vercel (recommended)

```bash
npm install -g vercel
vercel
```

## 🌐 Deploy to Netlify

```bash
npm run build
# Drag and drop the dist/ folder to netlify.com/drop
```

## 📁 Project Structure

```
shoppress/
├── App.jsx          # Main homepage component
├── index.html       # HTML entry point
├── vite.config.js   # Vite configuration
├── package.json     # Dependencies
└── src/
    └── main.jsx     # React root entry
```

## 🛠 Tech Stack

- **React 18** — UI components & hooks
- **Vite** — blazing fast dev server & bundler
- **Google Fonts** — DM Sans + Playfair Display
- No extra CSS framework — pure inline styles + React state

## Features

- Sticky navbar with scroll effect
- Animated hero with dual CTA
- Trust bar
- 6-card feature grid with hover effects
- Split commerce / content section
- Pricing cards (Starter / Grow / Enterprise)
- Testimonials
- CTA section
- Footer

All sections use `IntersectionObserver` for smooth scroll-reveal animations.
