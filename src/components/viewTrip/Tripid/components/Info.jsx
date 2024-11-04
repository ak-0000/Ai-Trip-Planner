import { GETPLACEDETAILS, PHOTO_REF_URL } from "@/components/service/GlobalApi";
import { useEffect, useState } from "react";

const Info = ({ trip }) => {
    const [loading, setLoading] = useState(false);
    const [placeData, setPlaceData] = useState(null);
    const [error, setError] = useState(null);
    const [photourl, setPhotourl] = useState("");

    useEffect(() => {
        Getplacephoto();
    }, [trip]);

    const Getplacephoto = async () => {
        try {
            setLoading(true);

            if (!trip.userSelection) {
                return;
            }

            const destination = trip.userSelection.destination;

            if (!destination || typeof destination !== "string") {
                console.error("Invalid destination:", destination);
                setError("Invalid destination provided.");
                return;
            }

            const result = await GETPLACEDETAILS(destination);
            const PhotoUrl = PHOTO_REF_URL.replace(`{Name}`, result.data.results[0].photos[0].photo_reference);
            setPhotourl(PhotoUrl);

            if (result.data && result.data.results && result.data.results.length > 0) {
                setPlaceData(result.data.results[0]);
            } else {
                setError("No place data found.");
            }
        } catch (error) {
            console.error("Error fetching place photo:", error);
            setError("Failed to fetch place details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-5 rounded-xl shadow-md mb-8">
            {loading ? (
                <p className="text-center text-gray-600">Loading place details...</p>
            ) : error ? (
                <p className="text-center text-red-600">{error}</p>
            ) : placeData ? (
                <>
                    <img
                        src={photourl || "/placeholder.jpg"} // Use first photo URL or placeholder
                        alt="Trip destination"
                        className="w-full object-cover rounded-lg mb-5 max-w-full"
                        style={{ maxHeight: "400px", objectFit: "cover", objectPosition: "center" }} // Adjust height and fit
                    />
                    <div className="text-center">
                        <h2 className="text-3xl font-bold text-blue-700 mb-2">
                            {placeData.displayName || trip.userSelection.destination || "Destination"}
                        </h2>
                        <div className="flex justify-center gap-5 my-4 text-sm md:text-md">
                            <span className="p-2 px-4 bg-blue-100 text-blue-700 rounded-full">
                                📅 {trip.userSelection.days || 0} days
                            </span>
                            <span className="p-2 px-4 bg-blue-100 text-blue-700 rounded-full">
                                💰 {trip.userSelection.budget || "N/A"} Budget
                            </span>
                            <span className="p-2 px-4 bg-blue-100 text-blue-700 rounded-full">
                                🥂 No. of Travelers: {trip.userSelection.traveler || "N/A"}
                            </span>
                        </div>
                    </div>
                </>
            ) : (
                <p className="text-center text-gray-600">No trip details available.</p>
            )}
        </div>
    );
};

export default Info;
