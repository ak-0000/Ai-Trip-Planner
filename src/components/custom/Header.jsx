import { useState } from "react";
import { LOGO_URL } from "../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";
import { useNavigate } from "react-router";

const Header = () => {
    const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
    const [showLogout, setShowLogout] = useState(false);
    const navigate = useNavigate();
  
    return (
        <div className="bg-blue-400 h-24 flex items-center justify-between shadow-lg px-4">
            <button onClick={() => navigate("/")}>
                <img className="h-16 w-auto" src={LOGO_URL} alt="Company Logo" />
            </button>
      
            <div className="flex items-center relative">
                {isAuthenticated ? (
                    <>
                        <h1 className="text-white mr-4 text-xl">Welcome, {user.name}</h1>
                        <button
                            className="mr-6 bg-white rounded-3xl w-24 h-14 text-blue-700 hover:bg-orange-500"
                            onClick={() => navigate("/Mytrips")}
                        >
                            My Trips
                        </button>
                        <div className="relative">
                            <button onClick={() => setShowLogout(prev => !prev)}>
                                <img 
                                    src={user.picture || "default-profile-pic.jpg"} 
                                    alt="User Profile" 
                                    className="rounded-full h-14 cursor-pointer" 
                                />
                            </button>
                            {showLogout && (
                                <div className="absolute right-0 mt-2 bg-white rounded-md shadow-lg z-10">
                                    <button
                                        className="h-10 w-full font-bold text-lg text-red-600 rounded-2xl transition duration-200 ease-in-out hover:bg-red-500 hover:text-white"
                                        onClick={() => logout({ returnTo: window.location.origin })}
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </>
                ) : (
                    <button
                        className="h-10 px-4 font-bold text-lg bg-green-500 text-white rounded-2xl transition duration-200 ease-in-out hover:bg-green-400"
                        onClick={loginWithRedirect}
                    >
                        Sign In
                    </button>
                )}
            </div>
        </div>
    );
};

export default Header;
