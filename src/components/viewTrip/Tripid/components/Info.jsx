const Info = ({ trip }) => {
  return (
    <div className="bg-white p-5 rounded-xl shadow-md mb-8">
      <img
        src="/placeholder.jpg"
        alt="Trip destination"
        className="h-[300px] w-full object-cover rounded-lg mb-5"
      />
      <div className="text-center">
        <h2 className="text-3xl font-bold text-blue-700 mb-2">
          {trip?.userSelection?.destination || "Destination"}
        </h2>
        <div className="flex justify-center gap-5 my-4 text-sm md:text-md">
          <span className="p-2 px-4 bg-blue-100 text-blue-700 rounded-full">
            📅 {trip?.userSelection?.days || 0} days
          </span>
          <span className="p-2 px-4 bg-blue-100 text-blue-700 rounded-full">
            💰 {trip?.userSelection?.budget || "N/A"} Budget
          </span>
          <span className="p-2 px-4 bg-blue-100 text-blue-700 rounded-full">
            🥂 No. of Travelers: {trip?.userSelection?.traveler || "N/A"}
          </span>
        </div>
      </div>
    </div>
  );
};
 export default Info;