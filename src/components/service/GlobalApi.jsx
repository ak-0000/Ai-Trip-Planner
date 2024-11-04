import axios from "axios";

const BASE_URL = "https://maps.gomaps.pro/maps/api/place/textsearch/json"; // Correct endpoint for text search

const config = {
    headers: {
        'Content-Type': 'application/json',
    }
};

export const GETPLACEDETAILS = (query) => {
    if (!query || typeof query !== 'string') {
        throw new Error('A valid query string must be provided');
    }

    const apiKey = import.meta.env.VITE_GOOGLE_API_KEY; // Ensure your API key is stored in environment variable
    const url = `${BASE_URL}?query=${encodeURIComponent(query)}&key=${apiKey}`; // Include the API key in the URL
    return axios.get(url, config);
};

export const PHOTO_REF_URL = `https://maps.gomaps.pro/maps/api/place/photo?photo_reference={Name}&maxwidth=400&key=`+import.meta.env.VITE_GOOGLE_API_KEY;
