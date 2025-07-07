import axios from "axios";

// ✅ Base URLs
const AUTOCOMPLETE_URL = "https://maps.googleapis.com/maps/api/place/autocomplete/json";
const PHOTO_BASE_URL = "https://maps.googleapis.com/maps/api/place/photo";

// ✅ Axios config (no credentials to avoid CORS issue)
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: false,
};

/**
 * 🔍 Fetch autocomplete suggestions for a place query
 * @param {string} query - Text the user typed
 * @returns Axios response (JSON)
 */
export const GETPLACEDETAILS = async (query) => {
  if (!query || typeof query !== "string") {
    throw new Error("A valid query string must be provided");
  }

  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  const url = `${AUTOCOMPLETE_URL}?input=${encodeURIComponent(query)}&key=${apiKey}`;

  return axios.get(url, config);
};

/**
 * 🖼 Generate a photo URL for a given photo reference
 * @param {string} photoRef - Photo reference from the API
 * @returns {string} Full photo URL
 */
export const PHOTO_REF_URL = (photoRef) => {
  const apiKey = import.meta.env.VITE_GOOGLE_API_KEY;
  return `${PHOTO_BASE_URL}?photo_reference=${photoRef}&maxwidth=400&key=${apiKey}`;
};
