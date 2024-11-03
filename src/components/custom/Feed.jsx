import { Button } from "../ui/button";
import { Link } from "react-router-dom";


const Feed = () => {
  return (
    <div className="flex flex-col items-center mx-56 gap-9">
      <h2 className="font-extrabold text-[60px] text-center mt-48">
        <span className="text-pink-600">
          Plan your perfect journey with our AI-Trip planner!<br></br>
        </span>
        let us handle the details so you can focus on the adventure.
      </h2>
      <p className="text-2xl text-gray-500 text-center">
        Welcome to your personalized travel experience! Our AI-powered trip
        planner designs itineraries tailored to your interests, budget, and
        schedule. Discover hidden gems, must-visit spots, and efficient travel
        routes—all in one place
      </p>
      <Link to={"/create-trip"}>
        <Button className="h-16 w-28 mt-12 text-lg px-32 border border-none rounded-2xl">Lets Get Started !</Button>
      </Link>
    </div>
  );
};

export default Feed;
