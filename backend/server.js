const express = require("express");
const cors = require("cors");
const db = require("./database");
const bcrypt = require("bcryptjs");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());


// =========================
// HOME
// =========================

app.get("/", (req, res) => {
  res.json({
    message: "InternHub backend is running 🚀",
  });
});


// =========================
// TEST
// =========================

app.get("/api/test", (req, res) => {
  res.json({
    message: "React can talk to the backend! 🎉",
  });
});


// =========================
// INTERNSHIPS API
// =========================

app.get("/api/internships", (req, res) => {
  const internships = [
    {
      id: 1,
      icon: "💻",
      title: "Frontend Developer Intern",
      company: "Tech Startup",
      location: "Addis Ababa",
      type: "Remote",
      skills: ["React", "JavaScript"],
      description:
        "Work with our development team to build modern and responsive web applications.",
      requirements: [
        "Basic knowledge of HTML, CSS and JavaScript",
        "Understanding of React",
        "Good problem-solving skills",
      ],
    },
    {
      id: 2,
      icon: "🧑‍💻",
      title: "Software Engineer Intern",
      company: "Tech Solutions",
      location: "Addis Ababa",
      type: "On-site",
      skills: ["Java", "Python"],
      description:
        "Assist software engineers in developing and testing software solutions.",
      requirements: [
        "Basic programming knowledge",
        "Knowledge of Java or Python",
        "Problem-solving ability",
      ],
    },
    {
      id: 3,
      icon: "🎨",
      title: "UI/UX Design Intern",
      company: "Creative Studio",
      location: "Addis Ababa",
      type: "Hybrid",
      skills: ["Figma", "UI/UX"],
      description:
        "Help create clean and user-friendly interfaces for digital products.",
      requirements: [
        "Basic UI/UX knowledge",
        "Familiarity with Figma",
        "Creative thinking",
      ],
    },
    {
      id: 4,
      icon: "⚛️",
      title: "React Developer Intern",
      company: "Digital Agency",
      location: "Remote",
      type: "Remote",
      skills: ["React", "JavaScript"],
      description:
        "Build modern interfaces using React and work with an experienced development team.",
      requirements: [
        "JavaScript fundamentals",
        "Basic React knowledge",
        "Understanding of components",
      ],
    },
    {
      id: 5,
      icon: "🐍",
      title: "Python Developer Intern",
      company: "Software Company",
      location: "Addis Ababa",
      type: "Hybrid",
      skills: ["Python", "Backend"],
      description:
        "Support backend development and work with Python-based applications.",
      requirements: [
        "Basic Python knowledge",
        "Understanding of programming fundamentals",
        "Willingness to learn backend development",
      ],
    },
    {
      id: 6,
      icon: "📱",
      title: "Mobile App Developer Intern",
      company: "Mobile Tech",
      location: "Addis Ababa",
      type: "On-site",
      skills: ["Flutter", "Dart"],
      description:
        "Help develop and test mobile applications for Android and iOS.",
      requirements: [
        "Basic programming knowledge",
        "Interest in mobile development",
        "Basic Flutter knowledge is a plus",
      ],
    },
    {
      id: 7,
      icon: "🔐",
      title: "Cybersecurity Intern",
      company: "SecureNet",
      location: "Addis Ababa",
      type: "On-site",
      skills: ["Security", "Networking"],
      description:
        "Learn about cybersecurity practices and assist with security-related tasks.",
      requirements: [
        "Basic networking knowledge",
        "Interest in cybersecurity",
        "Good analytical skills",
      ],
    },
    {
      id: 8,
      icon: "📊",
      title: "Data Analyst Intern",
      company: "DataWorks",
      location: "Addis Ababa",
      type: "Hybrid",
      skills: ["Python", "SQL"],
      description:
        "Analyze data and create useful insights to support business decisions.",
      requirements: [
        "Basic Python knowledge",
        "Basic SQL knowledge",
        "Interest in data analysis",
      ],
    },
    {
      id: 9,
      icon: "🌐",
      title: "Web Developer Intern",
      company: "Web Solutions",
      location: "Remote",
      type: "Remote",
      skills: ["HTML", "CSS", "JavaScript"],
      description:
        "Build responsive websites and help improve existing web applications.",
      requirements: [
        "HTML and CSS knowledge",
        "JavaScript fundamentals",
        "Responsive design knowledge",
      ],
    },
  ];

  res.json({
    internships,
  });
});


// =========================
// REGISTER
// =========================

app.post("/api/users/register", (req, res) => {
  const { name, email, password, skill } = req.body;

  const hashedPassword = bcrypt.hashSync(password, 10);

  try {
    const statement = db.prepare(`
      INSERT INTO users (name, email, password, skill)
      VALUES (?, ?, ?, ?)
    `);

    const result = statement.run(
      name,
      email,
      hashedPassword,
      skill
    );

    res.json({
      message: "User registered successfully! 🎉",
      user: {
        id: result.lastInsertRowid,
        name,
        email,
        skill,
      },
    });
  } catch (error) {
    if (error.code === "SQLITE_CONSTRAINT_UNIQUE") {
      return res.status(400).json({
        message: "An account with this email already exists.",
      });
    }

    console.error(error);

    res.status(500).json({
      message: "Something went wrong while creating the account.",
    });
  }
});


// =========================
// LOGIN
// =========================

app.post("/api/users/login", (req, res) => {
  const { email, password } = req.body;

  try {
    const user = db
      .prepare("SELECT * FROM users WHERE email = ?")
      .get(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    const passwordMatch = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password.",
      });
    }

    res.json({
      message: "Login successful! 🎉",
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        skill: user.skill,
      },
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong while logging in.",
    });
  }
});


// =========================
// SUBMIT APPLICATION
// =========================

app.post("/api/applications", (req, res) => {
  const {
    userId,
    title,
    company,
    location,
    icon,
    fullName,
    email,
    yearOfEntrance,
    expectedGraduationYear,
    cv,
    projectLink,
    github,
    portfolio,
    whyInterested,
  } = req.body;

  try {
    const statement = db.prepare(`
      INSERT INTO applications (
        user_id,
        title,
        company,
        location,
        icon,
        full_name,
        email,
        year_of_entrance,
        expected_graduation_year,
        cv,
        project_link,
        github,
        portfolio,
        why_interested
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = statement.run(
      userId,
      title,
      company,
      location,
      icon,
      fullName,
      email,
      yearOfEntrance,
      expectedGraduationYear,
      cv,
      projectLink,
      github,
      portfolio,
      whyInterested
    );

    res.json({
      message: "Application submitted successfully! 🎉",
      applicationId: result.lastInsertRowid,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong while submitting the application.",
    });
  }
});


// =========================
// GET MY APPLICATIONS
// =========================

app.get("/api/applications/:userId", (req, res) => {
  const { userId } = req.params;

  try {
    const applications = db
      .prepare(`
        SELECT *
        FROM applications
        WHERE user_id = ?
        ORDER BY id DESC
      `)
      .all(userId);

    res.json({
      applications,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Something went wrong while loading applications.",
    });
  }
});


// =========================
// START SERVER
// =========================

app.listen(PORT, () => {
  console.log(
    `InternHub backend running on http://localhost:${PORT}`
  );
});