# Weather (React + Vite)

This is a small front-end weather app built with React (Vite) and Tailwind CSS that uses the Open-Meteo APIs (geocoding + forecast). It supports searching for a city, showing current conditions, and a 5-day forecast. The UI includes loading skeletons and a day/night icon heuristic.

## Features

- Search for a city (Open-Meteo Geocoding API)
- Current weather: temperature, humidity, wind speed, weather condition
- 5-day forecast (min/max temperatures and weather icons)
- Loading skeletons while fetching
- Temperature unit toggle (°C / °F)

## API Used

- Geocoding: `https://geocoding-api.open-meteo.com/v1/search?name={CITY}&count=1`
- Forecast: `https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code&timezone=auto`

Notes:

- The app uses Open-Meteo's free public endpoints; no API key required.
- `weather_code` from the API is mapped to friendly icons/labels in `src/utils/weatherCode.js`.

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

## Environment

- No API keys required for Open-Meteo.
