import Navbar from "../components/Navbar";
import JobCard from "../components/JobCard";
import Stats from "../components/Stats";

function Home({ setPage, darkMode, setDarkMode }) {
  return (
    <div className="app">

   <Navbar
  darkMode={darkMode}
  setDarkMode={setDarkMode}
  setPage={setPage}
/>

      <main>

        <section className="hero">

          <div className="hero-content">

            <div className="badge">
              🚀 Your career starts here
            </div>

            <h1>
              Find an internship.
              <br />
              <span>Build your future.</span>
            </h1>

            <p>
              Discover internship opportunities, track your applications,
              and take the next step toward your career.
            </p>

            <div className="hero-buttons">


<a href="#opportunities" className="primary-btn">
  Explore Opportunities →
</a>

             <button
  className="secondary-btn"
  onClick={() => setPage("signup")}
>
  Create Profile
</button>

            </div>

          </div>


          <div className="hero-card">

            <div className="card-header">
              <span>Recommended for you</span>
              <span>•••</span>
            </div>

            <JobCard
              icon="💻"
              title="Frontend Developer Intern"
              company="Tech Startup • Addis Ababa"
              skills={["React", "JavaScript", "Remote"]}
            />

            <JobCard
              icon="🚀"
              title="Software Engineer Intern"
              company="Innovation Labs • Ethiopia"
              skills={["Node.js", "Python", "Hybrid"]}
            />

          </div>

        </section>

       <Stats />

<section className="opportunities" id="opportunities">

  <div className="section-heading">
    <div>
      <span className="section-label">EXPLORE</span>
      <h2>Latest Opportunities</h2>
      <p>Find an opportunity that matches your skills.</p>
    </div>

   <button
  className="view-all-btn"
  onClick={() => setPage("opportunities")}
>
  View all →
</button>
  </div>

  <div className="opportunity-grid">

    <div className="opportunity-card">
      <div className="opportunity-top">
        <div className="company-icon">💻</div>
        <span className="remote">Remote</span>
      </div>

      <h3>Frontend Developer Intern</h3>
      <p>Tech Startup</p>

      <div className="opportunity-tags">
        <span>React</span>
        <span>JavaScript</span>
      </div>

      <div className="opportunity-bottom">
        <span>📍 Addis Ababa</span>
        <span>2 days ago</span>
      </div>
    </div>


    <div className="opportunity-card">
      <div className="opportunity-top">
        <div className="company-icon">🚀</div>
        <span className="remote">Hybrid</span>
      </div>

      <h3>Software Engineer Intern</h3>
      <p>Innovation Labs</p>

      <div className="opportunity-tags">
        <span>Node.js</span>
        <span>Python</span>
      </div>

      <div className="opportunity-bottom">
        <span>📍 Ethiopia</span>
        <span>4 days ago</span>
      </div>
    </div>


    <div className="opportunity-card">
      <div className="opportunity-top">
        <div className="company-icon">🎨</div>
        <span className="remote">Remote</span>
      </div>

      <h3>UI/UX Design Intern</h3>
      <p>Creative Studio</p>

      <div className="opportunity-tags">
        <span>Figma</span>
        <span>Design</span>
      </div>

      <div className="opportunity-bottom">
        <span>📍 Addis Ababa</span>
        <span>1 week ago</span>
      </div>
    </div>

  </div>

</section>

</main>
    </div>
  );
}

export default Home;