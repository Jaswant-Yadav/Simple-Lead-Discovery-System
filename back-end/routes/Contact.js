const axios = require("axios");
const HUNTER_API_KEY = process.env.HUNTER_API_KEY;
require('dotenv').config();

const express = require('express');
const router = express.Router();

const sqlite3 = require('sqlite3').verbose();

const dbPath = process.env.DB_PATH || './database.db';

// Initialize the SQLite database connection
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Failed to open database:', err.message);
  } else {
    console.log('Connected to the SQLite database.');
  }
});


router.post("/discover/:company_id", async (req, res) => {
  const { company_id } = req.params;

  db.get(`SELECT * FROM companies WHERE id = ?`, [company_id], async (err, company) => {
    if (err || !company) {
      return res.status(404).json({ error: "Company not found" });
    }

    try {
      const hunterRes = await axios.get("https://api.hunter.io/v2/domain-search", {
        params: {
          domain: company.website,
          api_key: HUNTER_API_KEY
        }
      });

      const emails = hunterRes.data.data.emails;

      const decisionMakers = emails.filter(e =>
        /CEO|CTO|Founder|Director|VP/i.test(e.position || "")
      );

      decisionMakers.forEach(e => {
        const fullName = `${e.first_name} ${e.last_name}`.trim();
        db.run(
          `INSERT INTO contacts (company_id, name, title, email, linkedin_url)
           VALUES (?, ?, ?, ?, ?)`,
          [company_id, fullName, e.position, e.value, e.linkedin]
        );
      });

      res.json({ success: true, count: decisionMakers.length, contacts: decisionMakers });
    } catch (error) {
      console.error(error.response?.data || error.message);
      res.status(500).json({ error: "Error calling Hunter.io" });
    }
  });
});

//  List all contacts with company info
router.get("/contacts", (req, res) => {
  const query = `
    SELECT contacts.*, companies.name AS company_name
    FROM contacts
    JOIN companies ON contacts.company_id = companies.id
    ORDER BY contacts.id DESC
  `;
  db.all(query, [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

module.exports = router;
