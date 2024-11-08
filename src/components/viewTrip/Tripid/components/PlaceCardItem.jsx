import { GETPLACEDETAILS, PHOTO_REF_URL } from "@/components/service/GlobalApi";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
  // console.log(place);
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

      const destination = place.placeName;
      //   console.log("Destination:", destination);

      if (!destination || typeof destination !== "string") {
        console.error("Invalid destination:", destination);
        setError("Invalid destination provided.");
        return;
      }

      const result = await GETPLACEDETAILS(destination);
      //   console.log(result.data.results[0].photos[0].photo_reference);
      const PhotoUrl = PHOTO_REF_URL.replace(
        `{Name}`,
        result.data.results[0].photos[0].photo_reference
      );
      // console.log(result);
      // console.log(PhotoUrl);
      SetPhotourl(PhotoUrl);

      if (
        result.data &&
        result.data.results &&
        result.data.results.length > 0
      ) {
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
    <Link
      to={
        "https://www.google.com/maps/search/?api=1&query=" +
        encodeURIComponent(place?.placeName)
      }
      target="_blank"
      className="hover:scale-105 transition-all cursor-pointer"
    >
      <div className="bg-blue-50 border rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow flex gap-4">
        <img
          src={photourl}
          alt={place.placeName}
          className="w-32 h-32 object-cover rounded-lg"
        />
        <div>
          <h3 className="font-bold text-lg text-black">{place.placeName}</h3>
          <p className="text-sm text-gray-600">{place.placeDetails}</p>
          <p className="text-sm text-gray-600">
            Time to travel: {place.timeToTravel}
          </p>
        </div>
      </div>
    </Link>
  );
};
export default PlaceCardItem;
