# Your Heineken — Phygital Ritual Platform
### Developed by Kairo · kairoinc.lat

A phygital brand experience for Heineken: real geolocation, live weather, generative AI recommendations, camera-based pour guide and downloadable story cards. One HTML file. Zero app downloads.

---

## Deploy in 5 minutes

### Step 1 — GitHub

```bash
# Create a new repo on github.com, then:
git init
git add .
git commit -m "Your Heineken — initial deploy"
git remote add origin https://github.com/YOUR_USER/your-heineken.git
git push -u origin main
```

### Step 2 — Railway

1. Go to [railway.app](https://railway.app) → **New Project**
2. Select **Deploy from GitHub repo**
3. Connect your `your-heineken` repository
4. Railway auto-detects Node.js via `package.json`

### Step 3 — Environment Variables

In Railway dashboard → your project → **Variables** tab:

```
ANTHROPIC_API_KEY = sk-ant-XXXXXXXXXXXXXXXX
```

That's it. Railway sets `PORT` automatically.

### Step 4 — Custom Domain (optional)

Railway dashboard → **Settings** → **Custom Domain**
Add: `yourheineken.com` or any domain you own.

---

## Local Development

```bash
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
npm start
# Open http://localhost:3000
```

---

## Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Vanilla HTML/CSS/JS — no framework |
| AI | Claude Sonnet 4 via Anthropic API |
| Geolocation | Browser Geolocation API + Nominatim (OSM) |
| Weather | Open-Meteo API (free, no key needed) |
| Camera | WebRTC + Canvas pixel analysis |
| Audio | Web Audio API (ambient drone) |
| Hosting | Railway (Node.js + Express) |
| Deploy | GitHub → Railway auto-deploy |

---

## Features

- **Phygital Landing** — 4-section pitch deck (NFC, pillars, flow, CTA)
- **Pouring AI** — Camera foam detection (WebRTC + frame analysis)
- **Geo Scan** — Real location + live weather via Open-Meteo
- **AI Recommendation** — Claude generates contextual Heineken suggestion
- **Spotify** — Vibe-curated playlist with direct Spotify links
- **Story Card** — html2canvas downloadable IG Story card
- **City Mode** — Buenos Aires ritual pulse (live demo data)
- **URL Personalization** — `?user=Name` customizes the experience

---

## Personalized Demo Links

Send to Heineken executives:
```
https://your-domain.up.railway.app/?user=Bram
https://your-domain.up.railway.app/?user=FirstName+LastName
```

---

## Project Structure

```
your-heineken/
├── server.js          # Express server + API proxy
├── package.json       # Node dependencies
├── railway.toml       # Railway config
├── .env.example       # Environment template
├── .gitignore
└── public/
    └── index.html     # The entire experience
```

---

*Developed by Kairo — kairoinc.lat*
*The Kairo Method: Observe → Reduce → Build → Launch*
