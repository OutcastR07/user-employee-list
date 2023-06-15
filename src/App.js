import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import HomePage from "./pages/HomePage/HomePage";
import { UserDetails } from "./pages/UserDetails/UserDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar /> {/* Show Navbar component */}
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route path="/user-details/:empID" element={<UserDetails />} />{" "}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
