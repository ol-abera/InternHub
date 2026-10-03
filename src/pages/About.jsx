import Navbar from "../components/Navbar";

function About({ setPage, darkMode, setDarkMode }) {
  return (
    <div className="app">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setPage={setPage}
      />

      <main className="simple-page">

        <span className="section-label">ABOUT INTERNHUB</span>

        <h1>Connecting students with opportunities.</h1>

        <p>
          InternHub is a platform designed to help students discover
          internship opportunities, build their profiles, and take the
          next step toward their careers.
        </p>

        <div className="about-cards">

          <div className="about-card">
            <h2>🎯 Our Mission</h2>
            <p>
              Make it easier for students to find internships that match
              their skills and interests.
            </p>
          </div>

          <div className="about-card">
            <h2>🚀 Our Goal</h2>
            <p>
              Help students gain practical experience and prepare for
              their future careers.
            </p>
          </div>

          <div className="about-card">
            <h2>💡 Why InternHub?</h2>
            <p>
              Search opportunities, explore internship details, and
              apply from one simple platform.
            </p>
          </div>

        </div>

        <button
          className="primary-btn"
          onClick={() => setPage("opportunities")}
        >
          Explore Opportunities →
        </button>

      </main>

    </div>
  );
}

export default About;