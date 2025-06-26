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

### Tenant App (`tenant-app/`)
- Store management dashboard for business owners
- Sales tracking, receipt generation, and payment management
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

### Tenant App
```bash
cd tenant-app
npm install
npm run dev
```

## Configuration

### Google Maps API Key
The Google Maps API key is already configured in `user-app/src/App.tsx` line 86:
Current key: `AIzaSyA0sIJoIzT0Z6Bsj3Sw6LEh0_tLixgxMpY`

### Demo Login Credentials
- **Admin Dashboard**: admin@biid.com / password
- **Tenant App**: store@cafe-de-paris.jp / storepass

## Deployment

All three applications can be built and deployed independently:

```bash
# Admin Dashboard
cd admin-dashboard
npm run build

# User App
cd user-app
npm run build

# Tenant App
cd tenant-app
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

### Tenant App
- Store dashboard with sales metrics and analytics
- Sales management with transaction tracking and CSV export
- Receipt generation with PDF capabilities and detailed listings
- Payment history with GMO integration tracking and fee calculations
- Store settings with comprehensive configuration options
- Mock data integration (ready for Firebase)

## Deployed Applications

- **Admin Dashboard**: https://firebase-auth-dashboard-fdprcfbb.devinapps.com
- **User App**: https://firebase-auth-dashboard-17qy2kfa.devinapps.com
- **Tenant App**: https://firebase-auth-dashboard-jd0xwugb.devinapps.com

