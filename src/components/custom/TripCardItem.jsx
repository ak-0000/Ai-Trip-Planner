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
    <Link to={'/view-trip/' + trip?.id} >
    <div className="hover:scale-105 transition-all ">
      <div>
        <img src={photourl ? photourl : "placeholder.jpg"} className="object-cover rounded-xl" />
      </div>
      <div>
        <h2 className="font-bold text-lg">
          {trip?.userSelection?.destination}
        </h2>
        <h2 className="text-sm text-gray-500">
          {trip.userSelection.days} Days Trip with {trip.userSelection.budget}{" "}
          budget
        </h2>
      </div>
    </div>
    </Link>
  );
};

export default TripCardItem;
