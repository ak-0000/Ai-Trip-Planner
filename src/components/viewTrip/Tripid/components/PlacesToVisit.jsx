import PlaceCardItem from "./PlaceCardItem";

const PlacesToVisit = ({ trip }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md my-8">
      <h2 className="font-bold text-2xl text-pink-700 mb-5">Places to Visit</h2>
      <div>
        {trip?.tripData?.itinerary?.map((item, index) => (
          <div key={index} className="mb-6">
            <h3 className="font-semibold text-xl text-blue-800 mb-3">
              {item.day}
            </h3>
            <p className="text-orange-600 text-lg mb-2 text-bold ">Best time to visit: {item.bestTimeToVisit}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {item.plan?.map((place, placeIndex) => (
                <PlaceCardItem key={placeIndex} place={place} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlacesToVisit;