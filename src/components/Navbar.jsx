function Navbar({ darkMode, setDarkMode, setPage }) {
  return (
    <nav className="navbar">

      <div className="logo">
        Intern<span>Hub</span>
      </div>

      <div className="nav-links">
  <button onClick={() => setPage("home")}>Home</button>

  <button onClick={() => setPage("opportunities")}>
    Opportunities
  </button>

  <button onClick={() => setPage("about")}>
    About
  </button>
</div>

      <div className="nav-buttons">

        <button
          className="theme-btn"
          onClick={() => setDarkMode(!darkMode)}
          title="Change theme"
        >
          {darkMode ? "☀️" : "🌙"}
        </button>

        <button
  className="login-btn"
  onClick={() => setPage("login")}
>
  Login
</button>

<button
  className="signup-btn"
  onClick={() => setPage("signup")}
>
  Get Started
</button>

      </div>

    </nav>
  );
}

export default Navbar;