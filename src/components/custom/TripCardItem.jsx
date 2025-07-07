import React, { useEffect, useState } from "react";
import { GETPLACEDETAILS, PHOTO_REF_URL } from "../service/GlobalApi";
import { Link } from "react-router-dom";

const TripCardItem = ({ trip }) => {
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

      if (!trip.userSelection) return;

      const destination = trip.userSelection.destination;

      if (!destination || typeof destination !== "string") {
        console.error("Invalid destination:", destination);
        setError("Invalid destination provided.");
        return;
      }

      const result = await GETPLACEDETAILS(destination);

      const results = result?.data?.results;
      if (results?.length > 0) {
        const firstResult = results[0];
        const photoRef = firstResult?.photos?.[0]?.photo_reference;

        if (photoRef) {
          const PhotoUrl = PHOTO_REF_URL(photoRef); // updated to use function style if you changed it
          setPhotourl(PhotoUrl);
        } else {
          setPhotourl("/placeholder.jpg"); // Fallback
        }

        setPlaceData(firstResult);
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
    <Link to={`/view-trip/${trip?.id}`}>
      <div className="hover:scale-105 transition-all cursor-pointer">
        <div>
          <img
            src={photourl || "/placeholder.jpg"}
            alt={trip?.userSelection?.destination || "Trip image"}
            className="object-cover rounded-xl w-full h-48"
          />
        </div>
        <div className="mt-2">
          <h2 className="font-bold text-lg text-blue-800">
            {trip?.userSelection?.destination}
          </h2>
          <h2 className="text-sm text-gray-500">
            {trip.userSelection.days} Days Trip with {trip.userSelection.budget} budget
          </h2>
        </div>
      </div>
    </Link>
  );
};

export default TripCardItem;
