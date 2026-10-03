import Navbar from "../components/Navbar";

function Profile({
  setPage,
  darkMode,
  setDarkMode,
  user,
  setUser,
}) {

  function logout() {
    localStorage.removeItem("internhubUser");
    setUser(null);
    setPage("home");
  }

  return (
    <div className="app">

      <Navbar
        darkMode={darkMode}
        setDarkMode={setDarkMode}
        setPage={setPage}
      />

      <main className="profile-page">

        <div className="profile-header">

          <div className="profile-avatar">
            {user?.name?.charAt(0).toUpperCase()}
          </div>

          <div>
            <span className="section-label">
              MY PROFILE
            </span>

            <h1>
              Welcome, {user?.name}! 👋
            </h1>

            <p>
              Your InternHub profile
            </p>
          </div>

        </div>

        <div className="profile-card">

          <div className="profile-item">
            <span>Full Name</span>
            <strong>{user?.name}</strong>
          </div>

          <div className="profile-item">
            <span>Email</span>
            <strong>{user?.email}</strong>
          </div>

          <div className="profile-item">
            <span>Main Skill</span>
            <strong>{user?.skill}</strong>
          </div>

        </div>

        <div className="profile-actions">

  <button
    className="primary-btn"
    onClick={() => setPage("opportunities")}
  >
    Find Opportunities →
  </button>

  <button
    className="secondary-btn"
    onClick={() => setPage("applications")}
  >
    My Applications
  </button>

  <button
    className="secondary-btn"
    onClick={logout}
  >
    Log Out
  </button>

</div>

      </main>

    </div>
  );
}

export default Profile;