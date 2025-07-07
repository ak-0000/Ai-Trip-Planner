import { GETPLACEDETAILS, PHOTO_REF_URL } from "@/components/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  const [photourl, SetPhotourl] = useState("");
  const [loading, setLoading] = useState(false);
  const [placeData, setPlaceData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    Getplacephoto();
  }, [place]);

  const Getplacephoto = async () => {
    try {
      setLoading(true);

      const destination = place?.placeName;

      if (!destination || typeof destination !== "string") {
        console.error("Invalid destination:", destination);
        setError("Invalid destination provided.");
        return;
      }

      const result = await GETPLACEDETAILS(destination);
      const placeInfo = result?.data?.results?.[0];

      if (placeInfo?.photos?.length > 0) {
        const photoRef = placeInfo.photos[0].photo_reference;
        const photoUrl = PHOTO_REF_URL(photoRef);
        SetPhotourl(photoUrl);
        setPlaceData(placeInfo);
      } else {
        SetPhotourl("/placeholder.jpg");
        setError("No photo found for this place.");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
      setError("Failed to fetch place details. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Link
      to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
        place?.placeName
      )}`}
      target="_blank"
      className="hover:scale-105 transition-all cursor-pointer"
    >
      <div className="bg-blue-50 border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow flex gap-4">
        <img
          src={photourl || "/placeholder.jpg"}
          alt={place?.placeName}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-bold text-lg text-black">{place?.placeName}</h3>
          <p className="text-sm text-gray-600">{place?.placeDetails}</p>
          <p className="text-sm text-gray-600">
            Time to travel: {place?.timeToTravel}
          </p>
        </div>
      </div>
    </Link>
  );
};

export default PlaceCardItem;
