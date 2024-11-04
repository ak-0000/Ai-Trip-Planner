import { useState, useCallback } from "react";
import debounce from "lodash.debounce";

const PlaceSearch = () => {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    const fetchPlaces = async (searchQuery) => {
        if (!searchQuery) return;

        try {
            const response = await fetch(
                `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${searchQuery}&key=${import.meta.env.VITE_GOOGLE_API_KEY}`
            );
            const data = await response.json();
            setResults(data.predictions);
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    const debouncedFetchPlaces = useCallback(debounce(fetchPlaces, 500), []);

    const handleInputChange = (event) => {
        const value = event.target.value;
        setQuery(value);
        debouncedFetchPlaces(value);
    };

    const handlePlaceSelect = (place) => {
        setSelectedPlace(place);
        setQuery(place.description);
        setResults([]);
    };

    return (
        <div className="flex flex-col items-center w-full font-sans">
            <div className="relative w-full">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for places"
                    className="w-full px-4 py-3 rounded-md border border-gray-300 text-lg focus:outline-none"
                />
                <i className="fas fa-search absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>

            {results.length > 0 && (
                <ul className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                    {results.map((place) => (
                        <li
                            key={place.place_id}
                            onClick={() => handlePlaceSelect(place)}
                            className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                        >
                            {place.description}
                        </li>
                    ))}
                </ul>
            )}

            {selectedPlace && (
                <div className="mt-4 text-gray-700 text-lg font-semibold">
                    <p>Selected Place: {selectedPlace.description}</p>
                </div>
            )}
        </div>
    );
};

export default PlaceSearch;
