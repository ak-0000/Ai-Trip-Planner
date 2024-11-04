import { useState, useCallback } from "react";
import debounce from "lodash.debounce";
import { Button } from "../ui/button";
import { doc, setDoc } from "firebase/firestore";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelesList,
} from "../utils/options";
import { toast } from "sonner";
import { chatSession } from "@/config/Aimodel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
} from "@/components/ui/dialog";
import { useAuth0 } from "@auth0/auth0-react";
import { DialogTitle } from "@radix-ui/react-dialog";
import { db } from "@/config/firebaseconfig";
import { useNavigate } from "react-router";

const Trip = () => {
  const [formData, setFormData] = useState({
    destination: "",
    days: "",
    budget: "",
    traveler: "",
    selectedPlace: null,
  });
  const [placeResults, setPlaceResults] = useState([]);
  const [opendialog, setOpendialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const Navigate = useNavigate();

  const { user, isAuthenticated, loginWithRedirect, getAccessTokenSilently } =
    useAuth0();

  const fetchPlaces = async (searchQuery) => {
    if (!searchQuery) return;

    try {
      setLoading(true);
      const response = await fetch(
        `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${searchQuery}&key=${
          import.meta.env.VITE_GOOGLE_API_KEY
        }`
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setPlaceResults(data.predictions);
    } catch (error) {
      console.error("Error fetching places:", error);
      toast.error("Failed to fetch places. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const debouncedFetchPlaces = useCallback(debounce(fetchPlaces, 500), []);

  const handleInputChange = (field, value) => {
    setFormData((prevData) => ({ ...prevData, [field]: value }));
    if (field === "destination" && value === "") {
      setPlaceResults([]);
    }
  };

  const handlePlaceSelect = (place) => {
    setFormData((prevData) => ({
      ...prevData,
      destination: place.description,
      selectedPlace: place,
    }));
    setPlaceResults([]);
  };

  const Login = async () => {
    if (!isAuthenticated) {
      try {
        await loginWithRedirect();
        const token = await getAccessTokenSilently(); // Get the token after logging in
        // console.log("Token:", token); // Log the token
      } catch (error) {
        console.error("Error getting token:", error);
      }
      return;
    }
    console.log("User:", user);
  };

  const OnGenerateTrip = async () => {
    if (!isAuthenticated) {
      setOpendialog(true);
      return;
    }

    const days = parseInt(formData.days, 10);
    if (
      !formData.destination ||
      isNaN(days) ||
      days > 5 ||
      !formData.budget ||
      !formData.traveler
    ) {
      toast.error("Please fill in all required fields correctly.");
      return;
    }

    setLoading(true); // Set loading state to true to prevent further submissions

    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData.destination)
      .replace("{totaldays}", formData.days)
      .replace("{traveler}", formData.traveler)
      .replace("{budget}", formData.budget);

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      if (result && result.response && result.response.text) {
        // console.log(result.response.text());
        await SaveAiTrip(result.response.text()); // Await here to ensure save completes
      } else {
        console.error("No response text available.");
      }
    } catch (error) {
      console.error("Error generating trip:", error);
      toast.error("Failed to generate trip. Please try again.");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  const SaveAiTrip = async (TripData) => {
    if (!isAuthenticated || !user) {
      toast.error("User is not authenticated. Cannot save trip data.");
      return;
    }

    const docId = `${Date.now()}`; // timestamp for uniqueness

    try {
      await setDoc(doc(db, "AiTrips", docId), {
        userSelection: formData,
        tripData: JSON.parse(TripData),
        EmailId: user.email, // Get user email
        id: docId,
      });
      // console.log("Trip saved successfully!");
      toast.success("Trip saved successfully!");
      Navigate(`/view-trip/${docId}`);
    } catch (error) {
      console.error("Error saving trip data:", error);
      toast.error("Failed to save trip data. Please try again.");
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    OnGenerateTrip();
  };

  const closeDialog = () => {
    setOpendialog(false);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-20"
      >
        <h2 className="font-bold text-3xl">Tell us your Travel Preference</h2>
        <p className="mt-3 text-gray-500 text-xl">
          Just provide some basic information, and let AI generate a customized
          itinerary based on your preferences.
        </p>

        <div className="flex flex-col gap-10">
          {/* Destination */}
          <div className="mt-14">
            <h2 className="text-xl ">
              What is your destination of choice?
            </h2>
            <div className="relative w-full">
              <input
                type="text"
                value={formData.destination}
                onChange={(e) => {
                  handleInputChange("destination", e.target.value);
                  debouncedFetchPlaces(e.target.value);
                }}
                placeholder="Search for places"
                className="w-full px-4 py-3 rounded-md border border-gray-300 text-lg focus:outline-none"
              />
              {loading && <p className="text-gray-500">Loading...</p>}
              {placeResults.length > 0 && (
                <ul className="mt-2 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-64 overflow-y-auto">
                  {placeResults.map((place) => (
                    <li
                      key={place.place_id}
                      onClick={() => handlePlaceSelect(place)}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100"
                    >
                      {place.description}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {formData.selectedPlace && (
              <div className="mt-4 text-gray-700 text-lg font-semibold">
                <p>Selected Place: {formData.selectedPlace.description}</p>
              </div>
            )}
          </div>

          {/* Trip Days */}
          <div>
            <h2 className="text-xl">How many days is your trip?</h2>
            <input
              className="w-full px-4 py-3 rounded-md border border-gray-300 text-lg focus:outline-none bg-white"
              placeholder="Ex. 3"
              type="number"
              value={formData.days}
              onChange={(e) => handleInputChange("days", e.target.value)}
            />
          </div>

          {/* Budget */}
          <div>
            <h2 className="text-xl mt-6">What is your budget?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectBudgetOptions.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("budget", item.title)}
                  className={`p-4 border rounded-lg hover:shadow-lg bg-white cursor-pointer ${
                    formData.budget === item.title ? "border-blue-500" : ""
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          </div>

          {/* Travelers */}
          <div>
            <h2 className="text-xl mt-4">Who is traveling?</h2>
            <div className="grid grid-cols-3 gap-5 mt-5">
              {SelectTravelesList.map((item, index) => (
                <div
                  key={index}
                  onClick={() => handleInputChange("traveler", item.People)}
                  className={`p-4 border rounded-lg hover:shadow-lg bg-white cursor-pointer ${
                    formData.traveler === item.People ? "border-blue-500" : ""
                  }`}
                >
                  <h2 className="text-4xl">{item.icon}</h2>
                  <h2 className="font-bold">{item.title}</h2>
                  <h2 className="text-sm text-gray-500">{item.desc}</h2>
                </div>
              ))}
            </div>
          <div className=" mx-[490px]">
            <Button type="submit" disabled={loading} className="ml-[500px] mb-[80px] h-14 ">
              {loading ? "Generating..." : "Generate Trip"}
            </Button>
          </div>
          </div>

          {/* Generate Trip Button */}
        </div>
      </form>

      <Dialog open={opendialog} onOpenChange={setOpendialog}>
        <DialogContent>
          <DialogTitle>Login Required</DialogTitle>
          <DialogDescription>
            You need to be logged in to save your trip data.
          </DialogDescription>
          <Button onClick={Login}>Login</Button>
          <Button onClick={closeDialog}>Cancel</Button>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default Trip;
