import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";

function Opportunities({ setPage, darkMode, setDarkMode }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("All Locations");
  const [type, setType] = useState("All Types");

  const [internships, setInternships] = useState([]);
  const [loadingInternships, setLoadingInternships] = useState(true);

  const [selectedJob, setSelectedJob] = useState(null);
  const [showApplication, setShowApplication] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [yearOfEntrance, setYearOfEntrance] = useState("");
  const [expectedGraduationYear, setExpectedGraduationYear] =
    useState("");
  const [cv, setCv] = useState(null);
  const [projectLink, setProjectLink] = useState("");
  const [github, setGithub] = useState("");
  const [portfolio, setPortfolio] = useState("");
  const [whyInterested, setWhyInterested] = useState("");

  // Load internships from backend
  useEffect(() => {
    async function loadInternships() {
      try {
        const response = await fetch(
          "http://localhost:5000/api/internships"
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error("Failed to load internships");
        }

        setInternships(data.internships);
      } catch (error) {
        console.error("INTERNSHIPS ERROR:", error);
      } finally {
        setLoadingInternships(false);
      }
    }

    loadInternships();
  }, []);

  const filteredInternships = internships.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.company.toLowerCase().includes(search.toLowerCase()) ||
      job.skills.some((skill) =>
        skill.toLowerCase().includes(search.toLowerCase())
      );

    const matchesLocation =
      location === "All Locations" || job.location === location;

    const matchesType =
      type === "All Types" || job.type === type;

    return matchesSearch && matchesLocation && matchesType;
  });

  function openJob(job) {
    setSelectedJob(job);
    setShowApplication(false);
    setSubmitted(false);
  }

  function closeJob() {
    setSelectedJob(null);
    setShowApplication(false);
    setSubmitted(false);
  }

  async function handleApplication(event) {
    event.preventDefault();

    const savedUser = localStorage.getItem("internhubUser");

    if (!savedUser) {
      alert("Please log in before applying.");
      setPage("login");
      return;
    }

    const user = JSON.parse(savedUser);

    try {
      const response = await fetch(
        "http://localhost:5000/api/applications",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: user.id,

            title: selectedJob.title,
            company: selectedJob.company,
            location: selectedJob.location,
            icon: selectedJob.icon,

            fullName,
            email,
            yearOfEntrance,
            expectedGraduationYear,

            cv: cv ? cv.name : "",

            projectLink,
            github,
            portfolio,
            whyInterested,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        alert(data.message);
        return;
      }

      console.log("APPLICATION RESPONSE:", data);

      setSubmitted(true);
    } catch (error) {
      console.error("APPLICATION ERROR:", error);
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

      <main className="all-opportunities">

        {!selectedJob ? (

          <>
            <button
              className="back-btn"
              onClick={() => setPage("home")}
            >
              ← Back to Home
            </button>

            <div className="opportunities-intro">

              <span className="section-label">
                YOUR NEXT STEP
              </span>

              <h1>Find your next opportunity.</h1>

              <p>
                Explore internships, discover your potential,
                and start building your career.
              </p>

            </div>

            <div className="search-filters">

              <input
                type="text"
                placeholder="🔎 Search jobs, companies, or skills..."
                value={search}
                onChange={(event) => setSearch(event.target.value)}
              />

              <select
                value={location}
                onChange={(event) => setLocation(event.target.value)}
              >
                <option>All Locations</option>
                <option>Addis Ababa</option>
                <option>Remote</option>
              </select>

              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
              >
                <option>All Types</option>
                <option>Remote</option>
                <option>Hybrid</option>
                <option>On-site</option>
              </select>

            </div>

            <div className="results-heading">

              <h2>Available Internships</h2>

              <span>
                {loadingInternships
                  ? "Loading..."
                  : `${filteredInternships.length} opportunities`}
              </span>

            </div>

            {loadingInternships ? (

              <div className="no-results">

                <h3>Loading opportunities...</h3>

                <p>
                  Please wait a moment.
                </p>

              </div>

            ) : (

              <div className="opportunity-grid">

                {filteredInternships.map((job) => (

                  <div
                    className="opportunity-card clickable-card"
                    key={job.id}
                    onClick={() => openJob(job)}
                  >

                    <div className="opportunity-top">

                      <div className="company-icon">
                        {job.icon}
                      </div>

                      <span className="remote">
                        {job.type}
                      </span>

                    </div>

                    <h3>{job.title}</h3>

                    <p>{job.company}</p>

                    <div className="opportunity-tags">

                      {job.skills.map((skill) => (
                        <span key={skill}>
                          {skill}
                        </span>
                      ))}

                    </div>

                    <div className="opportunity-bottom">

                      <span>
                        📍 {job.location}
                      </span>

                      <span>
                        View details →
                      </span>

                    </div>

                  </div>

                ))}

              </div>

            )}

            {!loadingInternships &&
              filteredInternships.length === 0 && (

                <div className="no-results">

                  <h3>No opportunities found 😕</h3>

                  <p>
                    Try another keyword or change your filters.
                  </p>

                  <button
                    className="primary-btn"
                    onClick={() => {
                      setSearch("");
                      setLocation("All Locations");
                      setType("All Types");
                    }}
                  >
                    Clear filters
                  </button>

                </div>

              )}

          </>

        ) : (

          <div className="job-details">

            <button
              className="back-btn"
              onClick={closeJob}
            >
              ← Back to opportunities
            </button>

            {!showApplication && !submitted && (

              <>
                <div className="details-header">

                  <div className="details-icon">
                    {selectedJob.icon}
                  </div>

                  <div>

                    <span className="section-label">
                      INTERNSHIP
                    </span>

                    <h1>{selectedJob.title}</h1>

                    <p>
                      {selectedJob.company} ·{" "}
                      {selectedJob.location}
                    </p>

                  </div>

                </div>

                <div className="details-layout">

                  <div className="details-main">

                    <section className="details-section">

                      <h2>About the internship</h2>

                      <p>
                        {selectedJob.description}
                      </p>

                    </section>

                    <section className="details-section">

                      <h2>Requirements</h2>

                      <ul>

                        {selectedJob.requirements.map(
                          (requirement) => (
                            <li key={requirement}>
                              {requirement}
                            </li>
                          )
                        )}

                      </ul>

                    </section>

                  </div>

                  <aside className="details-sidebar">

                    <div className="detail-box">

                      <span>Work type</span>

                      <strong>
                        {selectedJob.type}
                      </strong>

                    </div>

                    <div className="detail-box">

                      <span>Location</span>

                      <strong>
                        {selectedJob.location}
                      </strong>

                    </div>

                    <div className="detail-box">

                      <span>Skills</span>

                      <div className="opportunity-tags">

                        {selectedJob.skills.map((skill) => (
                          <span key={skill}>
                            {skill}
                          </span>
                        ))}

                      </div>

                    </div>

                    <button
                      className="apply-btn"
                      onClick={() =>
                        setShowApplication(true)
                      }
                    >
                      Apply Now →
                    </button>

                  </aside>

                </div>
              </>

            )}

            {showApplication && !submitted && (

              <div className="application-container">

                <div className="application-heading">

                  <span className="section-label">
                    APPLICATION
                  </span>

                  <h1>Apply for this internship</h1>

                  <p>
                    {selectedJob.title} ·{" "}
                    {selectedJob.company}
                  </p>

                </div>

                <form
                  className="application-form"
                  onSubmit={handleApplication}
                >

                  <h2>Personal Information</h2>

                  <label>
                    Full Name

                    <input
                      type="text"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(event) =>
                        setFullName(event.target.value)
                      }
                      required
                    />

                  </label>

                  <label>
                    Email

                    <input
                      type="email"
                      placeholder="Enter your email"
                      value={email}
                      onChange={(event) =>
                        setEmail(event.target.value)
                      }
                      required
                    />

                  </label>

                  <h2>Education</h2>

                  <div className="form-row">

                    <label>
                      Year of Entrance

                      <input
                        type="number"
                        placeholder="e.g. 2023"
                        min="2000"
                        max="2100"
                        value={yearOfEntrance}
                        onChange={(event) =>
                          setYearOfEntrance(event.target.value)
                        }
                        required
                      />

                    </label>

                    <label>
                      Expected Graduation Year

                      <input
                        type="number"
                        placeholder="e.g. 2027"
                        min="2000"
                        max="2100"
                        value={expectedGraduationYear}
                        onChange={(event) =>
                          setExpectedGraduationYear(
                            event.target.value
                          )
                        }
                        required
                      />

                    </label>

                  </div>

                  <h2>Projects & Experience</h2>

                  <label>
                    Project / Work Sample Link{" "}
                    <span>(optional)</span>

                    <input
                      type="url"
                      placeholder="https://github.com/... or https://figma.com/..."
                      value={projectLink}
                      onChange={(event) =>
                        setProjectLink(event.target.value)
                      }
                    />

                  </label>

                  <label>
                    GitHub Username{" "}
                    <span>(optional)</span>

                    <input
                      type="text"
                      placeholder="e.g. olantu123"
                      value={github}
                      onChange={(event) =>
                        setGithub(event.target.value)
                      }
                    />

                  </label>

                  <label>
                    Portfolio{" "}
                    <span>(optional)</span>

                    <input
                      type="url"
                      placeholder="https://yourportfolio.com"
                      value={portfolio}
                      onChange={(event) =>
                        setPortfolio(event.target.value)
                      }
                    />

                  </label>

                  <h2>Documents</h2>

                  <label>
                    CV / Resume

                    <input
                      type="file"
                      accept=".pdf,.doc,.docx,application/pdf"
                      onChange={(event) =>
                        setCv(event.target.files[0])
                      }
                      required
                    />

                    <small>
                      PDF or Word document · Maximum
                      recommended size: 5 MB
                    </small>

                  </label>

                  <h2>Message</h2>

                  <label>
                    Why are you interested?{" "}
                    <span>(optional)</span>

                    <textarea
                      placeholder="Tell us briefly why you are interested in this internship..."
                      rows="6"
                      value={whyInterested}
                      onChange={(event) =>
                        setWhyInterested(event.target.value)
                      }
                    ></textarea>

                  </label>

                  <div className="form-buttons">

                    <button
                      type="button"
                      className="secondary-btn"
                      onClick={() =>
                        setShowApplication(false)
                      }
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      className="primary-btn"
                    >
                      Submit Application →
                    </button>

                  </div>

                </form>

              </div>

            )}

            {submitted && (

              <div className="success-message">

                <div className="success-icon">
                  ✓
                </div>

                <h1>Application Submitted!</h1>

                <p>
                  Your application for{" "}
                  <strong>{selectedJob.title}</strong>{" "}
                  has been submitted successfully.
                </p>

                <button
                  className="primary-btn"
                  onClick={closeJob}
                >
                  Back to Opportunities
                </button>

                <button
                  className="secondary-btn"
                  onClick={() => setPage("applications")}
                >
                  View My Applications
                </button>

              </div>

            )}

          </div>

        )}

      </main>

    </div>
  );
}

export default Opportunities;