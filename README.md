✈️ AI Trip Planner
🚀 About the Project
AI Trip Planner is a full-stack web application that helps users plan personalized travel itineraries using the power of AI (Gemini API) and Google Places API. It allows users to:

Search for destinations with autocomplete suggestions,

Select trip preferences like duration, budget, and travel group,

Get a fully AI-generated travel itinerary,

View recommended places, hotels, and activities,

Save and revisit trips using Firebase integration.

This project combines real-time user interaction with generative AI and geolocation services to create an engaging travel planning experience.

💡 Inspiration
Planning trips manually is time-consuming — juggling multiple sites for hotels, activities, and routes. I wanted to simplify this using AI and automation. The goal was to build a tool that takes in user preferences and generates a smart, human-like travel plan within seconds.

🧠 What I Learned
During this project, I explored and learned:

🔍 Google Places Autocomplete API for live search suggestions

📸 How to get place photos using photo_reference

🔥 Firebase for storing and retrieving user trips securely

🤖 Integrating Gemini AI (Google) to generate dynamic travel itineraries

🛡️ Writing secure Firestore rules

⚛️ React best practices including useCallback, debouncing, and conditional rendering

🧪 Debugging CORS issues and handling API errors gracefully

🌐 Deploying full-stack apps using modern build tools like Vite

🛠️ Tech Stack
Frontend: React.js, Tailwind CSS, Vite

Backend: Firebase Firestore (NoSQL)

APIs Used:

Google Places API (Autocomplete, Photos)

Gemini Pro (AI travel planning)

Authentication: Auth0

State Management: React Hooks, Zustand (if used)

Build Tool: Vite

🏗️ How I Built It
UI Design:

Designed a responsive form to collect user preferences

Created reusable components for Places, Hotels, and Trips

Autocomplete:

Integrated Google’s Places API with debounced input

Fetched suggestions and let users select one

Trip Generation:

Passed destination, days, budget, and travel group into an AI prompt

Used Gemini Pro to generate travel itineraries

Data Persistence:

Stored user selections and AI output in Firebase Firestore

Secured access with Firestore rules and Auth0 authentication

Enhancements:

Photo fetching using Google Places photo_reference

Google Maps links for destination viewing

Error handling and loading indicators

⚠️ Challenges I Faced
❌ Google Maps API returns 200 even for errors → had to inspect data.status

🧵 Debounce was tricky to implement properly without triggering on every keystroke

🛑 Firestore initially blocked writes due to expired rules

🌍 CORS issues when calling Google API directly → needed to use proper domain + set headers

🔑 Managing and securing API keys

📦 Handling undefined data like missing photos[0] or empty predictions

📸 Screenshots
(Add screenshots of your app UI, autocomplete, AI itinerary, trip view, etc.)

✅ Future Improvements
Add Google Maps embed for trip route

Add hotel booking APIs (e.g., Booking.com or Amadeus)

Allow user customization on generated itinerary

Export trip as PDF or share with others

Add weather forecasts for travel dates

