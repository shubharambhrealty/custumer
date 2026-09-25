# Shubharambh Reality - Property Portal

A modern web application and interactive map portal for discovering plots, land, and real estate properties under **Shubharambh Reality**.

---

## 🌟 Key Features

- **Interactive Map (MapLibre GL)**:
  - Vector roadmap and high-resolution satellite imagery switchers.
  - 2D and 3D terrain tilt view controls.
  - Branded Shubharambh Reality pin markers with status indicators:
    - 🟢 **Available**
    - 🟡 **Selling Fast**
    - 🔴 **Sold Out**
    - ⚪ **Upcoming**
  - Proximity clustering logic that arranges identical/nearby plots side-by-side in a horizontal row so no markers overlap.

- **Smart Cascading Search**:
  - Sequential dropdown filtering: **Select State ➔ Select City ➔ Select Pincode**.
  - Child dropdowns automatically unlock and load options matching the parent selection.
  - Instant auto-reset when parent filters change.
  - Real-time search by Plot ID, title, locality, or city with auto-suggestions.

- **Dedicated Property Detail View (`?plot=<id>`)**:
  - Full-page view with direct URL routing for sharing specific plot links.
  - Multi-image photo gallery with slide arrows, thumbnail preview strip, and photo counter.
  - Complete specifications table (Plot ID, locality, city, state, pincode, GPS coordinates with Google Maps link, and registry verification status).
  - Quick action buttons for WhatsApp inquiry, direct phone call, and site visit booking.

- **Server-Side & Client-Side Integration**:
  - Production `index.php` injects live API property data directly on server load.
  - Vite dev server middleware proxies upstream API calls during local development.

---

## 🛠️ Tech Stack

- **Frontend**: React 18, Vite
- **Mapping Engine**: MapLibre GL
- **Styling**: Vanilla CSS (Tailored design system, responsive mobile layout)
- **Backend / Deployment**: PHP (cURL direct server-side data fetching)

---

## 🚀 Getting Started

### 1. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/shubharambhrealty/custumer.git
cd custumer
npm install
```

### 2. Development Server
Start the local Vite development server:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Production Build
Generate optimized production assets:
```bash
npm run build
```
Compiled production files and `dist/index.php` will be generated in the `dist/` directory.

---

## 📡 API Integration

The property listings are fetched dynamically from the live endpoint:
- **Endpoint**: `https://api.eformx.in/?api=proparty/proparty/proparty-list`
- **Method**: `POST`
- **Returned Fields**: `plot_id`, `title`, `price`, `status`, `status_label`, `locality`, `city`, `state`, `pincode`, `lat`, `lng`, `img`, `imgs`

---

## 📱 Mobile Responsiveness

The interface is fully optimized for mobile devices, tablets, and desktop displays:
- Touch-friendly navigation bar with a quick **"← Back to Map & Properties"** action.
- Scaled image heights and multi-line wrapping for long locality addresses.
- Full-width call and WhatsApp booking buttons for mobile users.
