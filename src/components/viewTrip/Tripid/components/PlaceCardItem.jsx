import { Link } from "react-router-dom";

const PlaceCardItem = ({ place }) => {
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
            src="/placeholder.jpg"
            alt={place.placeName}
            className="w-32 h-32 object-cover rounded-lg"
          />
          <div>
            <h3 className="font-bold text-lg text-black">{place.placeName}</h3>
            <p className="text-sm text-gray-600">{place.placeDetails}</p>
            <p className="text-sm text-gray-600">Time to travel: {place.timeToTravel}</p>
          </div>
        </div>
      </Link>
    );
  };
export default PlaceCardItem;
  