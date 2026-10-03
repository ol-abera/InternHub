
function Footer({ setPage }) {
  return (
    <footer className="footer">

      <div className="footer-content">

        <div className="footer-brand">

          <div className="footer-logo">
            Intern<span>Hub</span>
          </div>

          <p>
            Find opportunities. Build experience. Start your career.
          </p>

        </div>

        <div className="footer-links">

          <div>
            <h4>Explore</h4>

            <button onClick={() => setPage("home")}>
              Home
            </button>

            <button onClick={() => setPage("opportunities")}>
              Opportunities
            </button>

            <button onClick={() => setPage("about")}>
              About
            </button>
          </div>

          <div>
            <h4>Account</h4>

            <button onClick={() => setPage("login")}>
              Log In
            </button>

            <button onClick={() => setPage("signup")}>
              Get Started
            </button>
          </div>

        </div>

      </div>

      <div className="footer-bottom">
        <span>
          © 2026 InternHub. All rights reserved.
        </span>

        <span>
          Built with React ⚛️
        </span>
      </div>

    </footer>
  );
}

export default Footer;

