# POINTSYSTEM-MELTY

Biid Point System - Comprehensive point management platform

## Applications

### Admin Dashboard (`admin-dashboard/`)
- Firebase Auth + Firestore management interface
- Member, store, and charge management
- Built with React, TypeScript, Tailwind CSS, shadcn/ui

### User App (`user-app/`)
- Store discovery and location-based services
- Google Maps integration with geolocation
- Built with React, TypeScript, Tailwind CSS, shadcn/ui

## Setup

### Admin Dashboard
```bash
cd admin-dashboard
npm install
npm run dev
```

### User App
```bash
cd user-app
npm install
npm run dev
```

## Configuration

### Google Maps API Key
Update `user-app/src/App.tsx` line 86:
Replace `YOUR_API_KEY_HERE` with your actual Google Maps API key.

## Deployment

Both applications can be built and deployed independently:

```bash
# Admin Dashboard
cd admin-dashboard
npm run build

# User App
cd user-app
npm run build
```

## Features

### Admin Dashboard
- Dashboard with system overview and statistics
- Member management with search and filtering
- Store management with status tracking
- Charge history with point calculations
- Mock data integration (ready for Firebase)

### User App
- Store search with category and accessibility filters
- Interactive map display with store location pins
- Current location detection using Geolocation API
- Google Maps integration with dynamic coordinates
- biid point system integration
- Responsive design for mobile and desktop

