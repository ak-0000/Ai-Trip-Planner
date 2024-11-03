import { Outlet } from "react-router";
import Header from "./Header";
import { Toaster } from 'sonner';


const Body = () => {
  return (
    <div className="bg-[#C8E7F5] min-h-screen flex flex-col">
      <Header />
      <Toaster/>
      <Outlet />
    </div>

  );
};

export default Body;
