import { useState, createContext, useEffect, useRef } from "react";
import { ColorModeContext, useMode } from "./Theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Publishers from "./scenes/Publisher";
import DashBoard from "./scenes/dashBoard";
import Users from "./scenes/Users";
import Trips from "./scenes/trips";
import Login from "./scenes/login";
import Graph from "./scenes/Graph";
// import Bar from "./scenes/bar";
// import Form from "./scenes/form";
// import Line from "./scenes/line";
// import Pie from "./scenes/pie";
import News from "./scenes/News";
import Vehicles from "./scenes/vehicles";
import Settings from "./scenes/settings";
import AddPublisherForm from "./scenes/AddPublisherForm";
import AddStation from "./scenes/AddStation";
import PrivateRoute from "./scenes/PrivateRoute";
import Riders from "./scenes/Riders";
import Drivers from "./scenes/Drivers";
import EditDriver from "./scenes/EditDriver";
import Stations from "./scenes/Stations";
import AddDriver from "./scenes/AddDriver";
import EditRider from "./scenes/EditRider";
import EditProfile from "./scenes/EditProfile";
import Owner from "./scenes/Owner";
import Loading from "./scenes/Loading";
import graphData from "./road-chesapeake (7).json";

export const LoginContext = createContext();

function App() {
  const [theme, colorMode] = useMode();
  const navigate = useNavigate();
  const [loggedIn, setLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const refreshInProgress = useRef(false);

  const refreshTokens = async () => {
    if (refreshInProgress.current) {
      console.log("Refresh token already in progress, skipping...");
      return;
    }
    refreshInProgress.current = true;

    const refresh = localStorage.getItem("refresh");
    if (refresh) {
      try {
        console.log("Attempting to refresh token with refresh token:", refresh);
        const response = await fetch(
          "https://4407-31-9-106-65.ngrok-free.app/users/refresh/",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Origin: "https://4407-31-9-106-65.ngrok-free.app",
            },
            body: JSON.stringify({ refresh }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to refresh token");
        }

        const data = await response.json();
        console.log("Received new tokens:", data);
        localStorage.setItem("access", data.access);
        localStorage.setItem("refresh", data.refresh);
        setLoggedIn(true);
      } catch (error) {
        console.error("Refresh token error:", error);
        setLoggedIn(false);
        localStorage.clear();
        navigate("/login");
      } finally {
        refreshInProgress.current = false;
      }
    } else {
      setLoggedIn(false);
      localStorage.clear();
      navigate("/login");
      refreshInProgress.current = false;
    }
    setLoading(false);
  };

  useEffect(() => {
    console.log("Initializing App...");
    const initialize = async () => {
      setLoading(true);
      await refreshTokens();
    };

    initialize();
    // Set interval to refresh tokens every 60 minutes
    const minute = 1000 * 60;
    const intervalId = setInterval(refreshTokens, minute * 60);

    // Cleanup interval on component unmount
    return () => {
      clearInterval(intervalId);
      console.log("Cleared interval for token refresh.");
    };
  }, []);

  useEffect(() => {
    console.log("Checking loggedIn and loading state...");
    // Check if the user is not logged in and loading is done, then navigate to login page
    if (!loggedIn && !loading) {
      navigate("/login");
    }
  }, [loggedIn, loading, navigate]);

  if (loading) {
    return <Loading />;
  }

  return (
    <LoginContext.Provider value={[loggedIn, setLoggedIn]}>
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <div className="app">
            <main className="content">
              {/* Conditionally render the Topbar */}
              {location.pathname !== "/login" && <Topbar />}
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route element={<PrivateRoute />} />
                <Route path="/" element={<DashBoard />} />
                {/* <Route path="/users" element={<Users />} /> */}
                <Route path="/publishers" element={<Publishers />} />
                <Route path="/riders" element={<Riders />} />
                <Route path="/drivers" element={<Drivers />} />
                <Route path="/add-publisher" element={<AddPublisherForm />} />
                <Route path="/add-station" element={<AddStation />} />
                <Route path="/add-vehicle" element={<AddStation />} />
                <Route path="/add-driver" element={<AddDriver />} />
                <Route path="/edit-driver/:id" element={<EditDriver />} />
                <Route path="/edit-rider/:id" element={<EditRider />} />
                <Route path="/owner/:id" element={<Owner />} />
                <Route path="/trips" element={<Trips />} />
                <Route path="/stations" element={<Stations />} />
                <Route path="/news" element={<News />} />
                <Route path="/vehicles" element={<Vehicles />} />
                <Route path="/settings" element={<Settings />} />
                <Route
                  path="/graph"
                  element={<Graph graphData={graphData} />}
                />
              </Routes>
            </main>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
    </LoginContext.Provider>
  );
}

export default App;
