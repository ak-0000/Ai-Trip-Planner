import { LOGO_URL } from "../utils/constants";
import { useAuth0 } from "@auth0/auth0-react";

const Header = () => {
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log(user);

  return (
    <div className="bg-blue-400 h-24 flex items-center justify-between shadow-lg px-4">
      <img className="h-16 w-auto" src={LOGO_URL} alt="logo" />
      <div className="flex items-center">
        {isAuthenticated ? (
          <>
            <h1 className="text-white mr-4 text-xl'">Welcome, {user.name}</h1>
            <button
              className="h-10 px-4 font-bold text-lg bg-red-500 text-white rounded-2xl transition duration-200 ease-in-out hover:bg-red-400"
              onClick={() => logout({ returnTo: window.location.origin })}
            >
              Logout
            </button>
          </>
        ) : (
          <button
            className="h-10 px-4 font-bold text-lg bg-green-500 text-white rounded-2xl transition duration-200 ease-in-out hover:bg-green-400"
            onClick={() => loginWithRedirect()}
          >
            Sign In
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

