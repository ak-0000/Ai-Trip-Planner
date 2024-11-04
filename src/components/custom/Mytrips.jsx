import { db } from "@/config/firebaseconfig";
import { useAuth0 } from "@auth0/auth0-react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import TripCardItem from "./TripCardItem";

const MyTrips = () => {
    const { user } = useAuth0();
    const [userTrips, setUserTrips] = useState([]);

    useEffect(() => {
        if (user?.email) {
            fetchUserTrips();
        }
    }, [user]);

    const fetchUserTrips = async () => {
        try {
            const q = query(
                collection(db, "AiTrips"),
                where("EmailId", "==", user.email)
            );
            const querySnapshot = await getDocs(q);
            const trips = querySnapshot.docs.map(doc => doc.data());
            setUserTrips(trips);
        } catch (error) {
            console.error("Error fetching user trips:", error);
        }
    };

    return (
        <div className="sm:px-10 md:px-32 lg:px-56 xl:px-72 px-5 mt-20">
            <h2 className="font-bold text-3xl">My Trips</h2>
            <div className="grid grid-cols-2 mt-10 md:grid-cols-3 gap-5">
                {userTrips.length === 0 ? (
                    <div>No trips available</div>
                ) : (
                    userTrips.map((trip, index) => (
                        <TripCardItem key={index} trip={trip} />
                    ))
                )}
            </div>
        </div>
    );
};

export default MyTrips;
