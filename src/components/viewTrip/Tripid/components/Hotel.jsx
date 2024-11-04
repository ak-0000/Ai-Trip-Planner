import HotelCardItem from "./HotelCardItem";

const Hotel = ({ trip }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md my-8">
      <h2 className="font-bold text-2xl text-blue-700 mb-5">
        Hotel Recommendations
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {trip?.tripData?.hotels && trip.tripData.hotels.length > 0 ? (
          trip.tripData.hotels.map((hotel, index) => (
            <HotelCardItem key={index} hotel={hotel} /> // Correctly place key prop
          ))
        ) : (
          <p className="text-center text-gray-600">
            No hotel recommendations available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Hotel;
