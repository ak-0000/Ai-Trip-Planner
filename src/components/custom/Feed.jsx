import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Feed = () => {
  return (
    <div className="flex flex-col items-center mx-8 lg:mx-56 gap-8 lg:gap-12">
      <h2 className="font-extrabold text-[36px] lg:text-[60px] text-center mt-12 lg:mt-20 leading-snug">
        <span className="text-pink-600">
          Plan your perfect journey with our AI-Trip planner!
        </span>
        <br />
        Let us handle the details so you can focus on the adventure.
      </h2>
      
      <p className="text-lg lg:text-2xl text-gray-500 text-center max-w-3xl">
        Welcome to your personalized travel experience! Our AI-powered trip
        planner designs itineraries tailored to your interests, budget, and
        schedule.
      </p>
      
      <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-24 mt-12 lg:mt-16">
        <img className="w-3/4 lg:w-auto" src="/file.png" alt="Trip Planning Illustration" />
        
        <Link to="/create-trip">
          <Button className="h-14 lg:h-16 w-auto px-10 lg:px-16 text-lg font-semibold rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 transition-colors duration-300">
            Let's Get Started ! 
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Feed;

