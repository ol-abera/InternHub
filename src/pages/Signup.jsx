import { useState } from "react";
import Navbar from "../components/Navbar";

function Signup({ setPage, darkMode, setDarkMode, setUser }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [skill, setSkill] = useState("");

  async function handleSignup(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "http://localhost:5000/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            password,
            skill,
          }),
        }
      );

      const data = await response.json();

      console.log(data);

      if (!response.ok) {
        alert(data.message);
        return;
      }

      const user = data.user;

      localStorage.setItem("internhubUser", JSON.stringify(user));

      setUser(user);
      setPage("profile");
    } catch (error) {
      console.error("Signup failed:", error);
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
            <span className="section-label">GET STARTED</span>

            <h1>Create your profile</h1>

            <p>
              Create your InternHub profile and start discovering
              opportunities that match your skills.
            </p>
          </div>

          <form className="auth-form" onSubmit={handleSignup}>
            <label>
              Full Name
              <input
                type="text"
                placeholder="Enter your full name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                required
              />
            </label>

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
                placeholder="Create a password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </label>

            <label>
              Your Skill
              <input
                type="text"
                placeholder="e.g. React, Python, UI/UX"
                value={skill}
                onChange={(event) => setSkill(event.target.value)}
                required
              />
            </label>

            <button type="submit" className="primary-btn">
              Create Profile →
            </button>
          </form>

          <p className="auth-switch">
            Already have an account?{" "}
            <button onClick={() => setPage("login")}>
              Log In
            </button>
          </p>
        </div>
      </main>
    </div>
  );
}

export default Signup;