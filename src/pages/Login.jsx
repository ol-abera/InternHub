
import { useState } from "react";
import Navbar from "../components/Navbar";

function Login({ setPage, darkMode, setDarkMode, setUser }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleLogin(event) {
    event.preventDefault();

    console.log("LOGIN BUTTON CLICKED");

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        }
      );

      const data = await response.json();

      console.log("LOGIN RESPONSE:", data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      localStorage.setItem(
        "internhubUser",
        JSON.stringify(data.user)
      );

      setUser(data.user);
      setPage("profile");
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      alert("Could not connect to the backend.");
    }
  }

  return (
    <div className="app">
      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setPage={setPage}
      />

      <main className="auth-page">
        <div className="auth-container">

          <div className="auth-heading">
            <span className="section-label">
              WELCOME BACK
            </span>

            <h1>Log in to InternHub</h1>

            <p>
              Access your profile and continue your internship journey.
            </p>
          </div>

          <form
            className="auth-form"
            onSubmit={handleLogin}
          >
            <label>
              Email

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label>
              Password

              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            <button
              type="submit"
              className="primary-btn"
            >
              Log In →
            </button>
          </form>

          <p className="auth-switch">
            Don't have an account?{" "}

            <button onClick={() => setPage("signup")}>
              Get Started
            </button>
          </p>

        </div>
      </main>
    </div>
  );
}

export default Login;
