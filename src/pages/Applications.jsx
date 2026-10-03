
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Applications({ setPage, darkMode, setDarkMode }) {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadApplications() {
      const savedUser = localStorage.getItem("internhubUser");

      if (!savedUser) {
        setLoading(false);
        return;
      }

      const user = JSON.parse(savedUser);

      try {
        const response = await fetch(
          `http://localhost:5000/api/applications/${user.id}`
        );

        const data = await response.json();

        if (!response.ok) {
          console.error(data.message);
          return;
        }

        setApplications(data.applications);
      } catch (error) {
        console.error("APPLICATIONS ERROR:", error);
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  return (
    <div className="app">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setPage={setPage}
      />

      <main className="applications-page">

        <div className="applications-heading">

          <span className="section-label">
            MY APPLICATIONS
          </span>

          <h1>Track your applications.</h1>

          <p>
            Keep track of the internship opportunities you've applied for.
          </p>

        </div>

        {loading ? (

          <div className="empty-applications">

            <div className="empty-icon">
              ⏳
            </div>

            <h2>Loading applications...</h2>

            <p>
              We're getting your applications.
            </p>

          </div>

        ) : applications.length === 0 ? (

          <div className="empty-applications">

            <div className="empty-icon">
              📋
            </div>

            <h2>No applications yet</h2>

            <p>
              When you apply for an internship, your application
              will appear here.
            </p>

            <button
              className="primary-btn"
              onClick={() => setPage("opportunities")}
            >
              Find Opportunities →
            </button>

          </div>

        ) : (

          <div className="applications-list">

            {applications.map((application) => (

              <div
                className="application-card"
                key={application.id}
              >

                <div className="application-icon">
                  {application.icon || "💼"}
                </div>

                <div className="application-info">

                  <span className="application-status">
                    Submitted
                  </span>

                  <h2>
                    {application.title}
                  </h2>

                  <p>
                    {application.company}
                  </p>

                  <span className="application-location">
                    📍 {application.location}
                  </span>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

    </div>
  );
}

export default Applications;

