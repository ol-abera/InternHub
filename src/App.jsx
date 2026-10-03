import { useEffect, useState } from "react";

import Home from "./pages/Home";
import Opportunities from "./pages/Opportunities";
import About from "./pages/About";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Footer from "./components/Footer";
import Applications from "./pages/Applications";

function App() {
    useEffect(() => {
    fetch("http://localhost:5000/api/test")
      .then((response) => response.json())
      .then((data) => {
        console.log(data.message);
      })
      .catch((error) => {
        console.error("Backend connection failed:", error);
      });
  }, []);

  const [page, setPage] = useState("home");

  const [darkMode, setDarkMode] = useState(true);

  const [user, setUser] = useState(() => {

    const savedUser = localStorage.getItem("internhubUser");

    return savedUser ? JSON.parse(savedUser) : null;

  });

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>

      {page === "home" && (
        <Home
          setPage={setPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {page === "opportunities" && (
        <Opportunities
          setPage={setPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {page === "about" && (
        <About
          setPage={setPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      {page === "login" && (
        <Login
  setPage={setPage}
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  setUser={setUser}
/>
      )}

      {page === "signup" && (
        <Signup
          setPage={setPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          setUser={setUser}
        />
      )}

      {page === "profile" && (
        <Profile
          setPage={setPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          user={user}
          setUser={setUser}
        />
      )}
      {page === "applications" && (
  <Applications
    setPage={setPage}
    darkMode={darkMode}
    setDarkMode={setDarkMode}
  />
)}
      {page === "applications" && (
        <Applications
          setPage={setPage}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
        />
      )}

      <Footer setPage={setPage} />

    </div>

    
  );
}

export default App;