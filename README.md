# Senior Assistant

A web application to help seniors manage their daily tasks, medications, appointments, and health information with Google Authentication.

## Features

- 🌿 **Google Sign-In** - Secure authentication via Google OAuth
- 💊 **Medicine Reminders** - Track and manage medications
- 📅 **Appointments** - Keep track of doctor visits
- 👥 **Contacts** - Quick access to family and friends
- 🛒 **Grocery Lists** - Shopping list management
- 🏥 **Health Info** - Store medical information
- 🎮 **Memory Game** - Cognitive health tracking
- 🕐 **Day Hub** - Clock and daily reminders

## Tech Stack

**Frontend:**
- React + Vite
- TailwindCSS
- React Router
- Google OAuth (@react-oauth/google)

**Backend:**
- FastAPI (Python)
- SQLAlchemy
- SQLite
- Google Auth Library

## Local Development

### Backend
```bash
cd backend
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

Visit http://localhost:5173

## Deployment

The app is containerized and ready to deploy to Google Cloud Run:

```bash
cd frontend && npm run build
xcopy dist backend\static /E /I /Y
cd backend
gcloud run deploy senior-assistant --source . --region us-central1 --allow-unauthenticated
```

## Google OAuth Setup

1. Create OAuth 2.0 credentials in Google Cloud Console
2. Add authorized origins and redirect URIs
3. Use Client ID: `509159482066-6jj5r7hgimlltbdpum2m73aduqguum0f.apps.googleusercontent.com`

## License

MIT
