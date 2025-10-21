# Weather (React + Vite)

This is a small front-end weather app built with React (Vite) and Tailwind CSS that uses the Open-Meteo APIs (geocoding + forecast). It supports searching for a city, showing current conditions, and a 5-day forecast. The UI includes loading skeletons and a day/night icon heuristic.

## Deployment

- Live demo: https://weather-qie3.onrender.com/

## Features

- Search for a city (Open-Meteo Geocoding API)
- Current weather: temperature, humidity, wind speed, weather condition
- 5-day forecast (min/max temperatures and weather icons)
- Loading skeletons while fetching
- Temperature unit toggle (°C / °F)

## Design

- Figma: https://www.figma.com/design/7W6icyKzGdFffVRmxkNRFR/Weather-Web--Community-?node-id=0-1&p=f&t=AbYEv4pz6uEDPzVA-0

## API Used

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={CITY}&count=1`
- Forecast: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`

Notes:

- The app uses Open-Meteo's free public endpoints; no API key required.
- `weather_code` from the API is mapped to friendly icons/labels in `src/utils/weatherCode.js`.

## Environment

- No API keys required for Open-Meteo.

## Dependencies (installed)

The project uses the following packages (installed):

- axios — Promise-based HTTP client used for calling the Open‑Meteo geocoding and forecast APIs.
- react-hot-toast — Lightweight toast/notification library used to show success/error messages.
- react-icons — Collection of SVG icon
- react-loading-skeleton — Shows skeleton placeholders while API data is loading for a better UX.
- react-router — Client-side routing (if you expand to multiple pages/views).
- tailwind-scrollbar-hide — Small utility to hide scrollbars where desired in the UI.
- tailwindcss — Utility-first CSS framework used for styling the UI quickly and responsively.

## Local setup

Requirements: Node.js 18+ recommended.

1. Install dependencies

```powershell
npm install
```

2. Start dev server

```powershell
npm run dev
```

3. Open the URL printed by Vite (usually `http://localhost:5173`).
