// index.js
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const cors = require('cors');
const extractContacts = require('./extractContacts');

const { addCompany, getAllCompanies, addContact, getAllContacts, db } = require('./database/database');

const contactRoutes = require('./routes/Contact');

const app = express();

// Middleware setup
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());

app.use(session({ secret: 'my-secret', resave: false,saveUninitialized: true,
    cookie: { httpOnly: true, secure: false, maxAge: 15 * 60 * 1000 }
}));
            
// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === 'admin' && password === 'admin123') {
        req.session.user = username;
        res.json({ message: "Log in successfully" });
    } else {
        res.status(401).json({ message: 'Invalid credentials' });
    }
});

// Add new company
app.post('/api/companies', async (req, res) => {
    const { name, website, funding_stage } = req.body;
    const company = { name, website, funding_stage };
    try {
        await addCompany(company);
        res.json({ message: 'Company added successfully!' });
    } catch (err) {
        res.status(500).json({ message: 'Failed to add company', error: err.message });
    }
});

// GET all companies (auth required)
app.get('/api/companies', async (req, res) => {
    const apiKey = req.headers['x-api-key'];
    if (req.session?.user || apiKey === process.env.API_KEY) {
        try {
            const companies = await getAllCompanies();
            res.json(companies);
        } catch (err) {
            res.status(500).json({ message: 'Failed to retrieve companies' });
        }
    } else {
        res.status(401).json({ message: 'Unauthorized access. Please log in.' });
    }
});

// Add enriched contact
app.post('/api/contacts', async (req, res) => {
    const { company_id, name, title, email, linkedin_url } = req.body;
    if (!company_id || !email) {
        return res.status(400).json({ message: "Missing required fields." });
    }
    try {
        await addContact({ company_id, name, title, email, linkedin_url });
        res.json({ message: "Contact added successfully!" });
    } catch (err) {
        res.status(500).json({ message: "Failed to add contact", error: err.message });
    }
});

// Get all contacts
app.get('/api/contacts', async (req, res) => {
    try {
        const contacts = await getAllContacts();
        res.json(contacts);
    } catch (err) {
        res.status(500).json({ message: 'Failed to retrieve contacts' });
    }
});

// Webhook route for n8n leads
app.post("/api/webhooks/n8n-leads", (req, res) => {
  console.log('Received webhook data:', req.body);

  try {
    const contacts = extractContacts(req.body);

    const stmt = db.prepare(`
      INSERT INTO contacts (company_id, name, title, email, linkedin_url)
      VALUES (?, ?, ?, ?, ?)
    `);

    for (const c of contacts) {
      stmt.run([c.company_id, c.name, c.title, c.email, c.linkedin_url]);
    }

    stmt.finalize();
    res.json({ success: true, inserted: contacts.length });

  } catch (error) {
    console.error("Webhook error:", error.message);
    res.status(400).json({ message: error.message });
  }
});

app.use("/api", contactRoutes);




// Start server
app.listen(5000, () => console.log('Server running on http://localhost:5000'));


