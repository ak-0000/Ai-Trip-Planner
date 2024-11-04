import { Route, Routes } from "react-router";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import Trip from "./components/custom/Trip";
import Feed from "./components/custom/Feed";
import ViewTrip from "./components/viewTrip/Tripid";
import Mytrips from "./components/custom/Mytrips"
import Body from "./components/custom/Body";



function App() {
  return (
    <div>
      <BrowserRouter basename="/">
        <Routes>
          <Route path="/" element={<Body />}>
            <Route path="/" element={<Feed />}></Route>
            <Route path="/create-trip" element={<Trip />}></Route>
            <Route path="/view-trip/:tripId" element={<ViewTrip/>}></Route>
            <Route path = "/Mytrips" element= {<Mytrips/>}/>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
