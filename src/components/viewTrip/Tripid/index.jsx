import { db } from "@/config/firebaseconfig";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { toast } from "sonner";
import Info from "./components/Info";
import Hotel from "./components/Hotel";
import PlacesToVisit from "./components/PlacesToVisit";
import Footer from "./components/Footer";

const ViewTrip = () => {
  const { tripId } = useParams();
  const [Trip , setTrip] = useState([]);

  useEffect(() => {
    tripId && GetTripData();
  }, [tripId]);

  const GetTripData = async () => {
    const docRef = doc(db, "AiTrips", tripId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      // console.log(docSnap.data());
      setTrip(docSnap.data());
    } else {
      console.log("no such document");
      toast("no Trip Found");
    }
  };

  return <div className="p-10 md:px-20 lg:px-44 xl:px-56">
    <Info trip = {Trip}/>
    <Hotel trip = {Trip} />
    <PlacesToVisit trip = {Trip} />
    <Footer trip = {Trip}/>
    </div>;
};

export default ViewTrip;
