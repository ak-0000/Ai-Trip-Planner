import { Link } from "react-router-dom";
const Hotel = ({ trip }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md my-8">
      <h2 className="font-bold text-2xl text-blue-700 mb-5">
        Hotel Recommendations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          <Link
            key={index}
            to={
              "https://www.google.com/maps/search/?api=1&query=" +
              encodeURIComponent(hotel?.hotelName + " " + hotel?.hotelAddress)
            }
            target="_blank"
            className="hover:scale-105 transition-all cursor-pointer text-bold"
          >
            <div className="bg-blue-50 p-4 rounded-lg shadow-md">
              <img
                src="/placeholder.jpg"
                alt={hotel?.hotelName}
                className="w-full h-40 object-cover rounded-md mb-4"
              />
              <div className="text-center">
                <h3 className="font-semibold text-lg text-blue-800">
                  {hotel?.hotelName}
                </h3>
                <p className="text-gray-600 text-sm">
                  📍 {hotel?.hotelAddress}
                </p>
                <p className="text-blue-700 text-sm">💵 {hotel?.price}</p>
                <p className="text-yellow-500 text-sm">
                  ⭐ {hotel?.rating} stars
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Hotel ;