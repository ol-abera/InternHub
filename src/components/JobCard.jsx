function JobCard({ icon, title, company, skills }) {
  return (
    <div className="job-card">

      <div className="company-logo">
        {icon}
      </div>

      <div className="job-info">

        <h3>{title}</h3>

        <p>{company}</p>

        <div className="tags">

          {skills.map((skill) => (
            <span key={skill}>
              {skill}
            </span>
          ))}

        </div>

      </div>

    </div>
  );
}

export default JobCard;