# ✈️ AI Trip Planner

AI Trip Planner is a full-stack web application that helps users effortlessly plan personalized travel itineraries using **Gemini AI** and the **Google Places API**. It allows users to:

- 🔍 Search destinations with autocomplete
- 🎯 Select trip preferences (duration, budget, travel group)
- 🤖 Get AI-generated itineraries instantly
- 🏨 View suggested places, hotels, and activities
- 💾 Save and revisit trips securely using Firebase

---

## 💡 Inspiration

Planning trips manually is time-consuming — juggling between hotel websites, maps, and blogs. This app aims to solve that by automating smart itinerary creation using AI, making trip planning fast, fun, and easy.

---
### ScreenShots

<img width="1354" height="730" alt="image" src="https://github.com/user-attachments/assets/882f17f9-0e62-48ef-beb2-d80c4679aa73" />

<img width="1467" height="842" alt="image" src="https://github.com/user-attachments/assets/a83d32c0-ff1a-4c8a-afde-a7acc4cc6ce2" />

<img width="1581" height="464" alt="image" src="https://github.com/user-attachments/assets/5e07a7cc-4845-48dd-b408-07fe513a601a" />

<img width="1579" height="828" alt="image" src="https://github.com/user-attachments/assets/f9756526-3656-40a9-a3b7-968968d546bd" />

---
## 🧠 What I Learned

- 🔍 Google Places Autocomplete API for live search
- 📸 Fetching images using `photo_reference`
- 🔥 Firebase Firestore & secure Firestore rules
- 🤖 Prompt engineering with Gemini Pro
- ⚛️ React best practices (`useCallback`, debouncing)
- 🧪 CORS handling, API error management
- 🌐 Vite for modern frontend build/deployment

---

## 🛠️ Tech Stack

| Layer       | Tech Used                                             |
|-------------|--------------------------------------------------------|
| **Frontend** | React.js, Tailwind CSS, Vite                          |
| **Backend**  | Firebase Firestore (NoSQL, serverless)                |
| **APIs**     | Google Places API (Autocomplete, Photos), Gemini Pro |
| **Auth**     | Auth0                                                 |
| **State**    | React Hooks, Zustand (if used)                        |

---

## 🏗️ How I Built It

- **UI Design**: Responsive form to collect trip preferences
- **Autocomplete**: Debounced Google Places search input
- **AI Integration**: Gemini API used to generate itineraries based on preferences
- **Persistence**: Stored trips in Firestore with Auth0-secured access
- **Enhancements**:
  - Fetch Google Maps photos using `photo_reference`
  - View destinations in Google Maps
  - Handle API and CORS errors gracefully
---
