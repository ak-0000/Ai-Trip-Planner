import { GETPLACEDETAILS, PHOTO_REF_URL } from "@/components/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const HotelCardItem = ({ hotel }) => {
  const [loading, setLoading] = useState(false);
  const [placeData, setPlaceData] = useState(null);
  const [error, setError] = useState(null);
  const [photourl, setPhotourl] = useState("");

  useEffect(() => {
    Getplacephoto();
  }, [hotel]);

  const Getplacephoto = async () => {
    try {
      setLoading(true);

      const destination = hotel?.hotelName;

      if (!destination || typeof destination !== "string") {
        console.error("Invalid destination:", destination);
        setError("Invalid destination provided.");
        return;
      }

      const result = await GETPLACEDETAILS(destination);
      const place = result?.data?.results?.[0];

      if (place?.photos?.length > 0) {
        const photoRef = place.photos[0].photo_reference;
        const PhotoUrl = PHOTO_REF_URL(photoRef); // ✅ Correct function usage
        setPhotourl(PhotoUrl);
        setPlaceData(place);
      } else {
        setPhotourl("/placeholder.jpg"); // Optional: show fallback
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
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(hotel?.hotelName + " " + hotel?.hotelAddress)
      }
      target="_blank"
      className="hover:scale-105 transition-all cursor-pointer text-bold"
    >
      <div className="bg-blue-50 p-4 rounded-lg shadow-md">
        <img
          src={photourl || "/placeholder.jpg"} // fallback if empty
          alt={hotel?.hotelName}
          className="w-full h-40 object-cover rounded-md mb-4"
        />
        <div className="text-center">
          <h3 className="font-semibold text-lg text-blue-800">
            {hotel?.hotelName}
          </h3>
          <p className="text-gray-600 text-sm">📍 {hotel?.hotelAddress}</p>
          <p className="text-blue-700 text-sm">💵 {hotel?.price}</p>
          <p className="text-yellow-500 text-sm">⭐ {hotel?.rating} stars</p>
        </div>
      </div>
    </Link>
  );
};

export default HotelCardItem;
