const Database = require("better-sqlite3");

const db = new Database("internhub.db");

db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    skill TEXT NOT NULL
  )
`).run();

db.prepare(`
  CREATE TABLE IF NOT EXISTS applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    location TEXT,
    icon TEXT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    year_of_entrance TEXT,
    expected_graduation_year TEXT,
    cv TEXT,
    project_link TEXT,
    github TEXT,
    portfolio TEXT,
    why_interested TEXT,
    FOREIGN KEY (user_id) REFERENCES users(id)
  )
`).run();

console.log("InternHub database is ready 🗄️");

module.exports = db;