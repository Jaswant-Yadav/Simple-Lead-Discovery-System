require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();

const dbPath = process.env.DB_PATH || './database.db'; 
console.log('Connecting to DB at:', dbPath);

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

// Initialize the database with tables
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS companies (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            website TEXT,
            funding_stage TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);

    db.run(`
        CREATE TABLE IF NOT EXISTS contacts (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            company_id INTEGER,
            name TEXT,
            title TEXT,
            email TEXT,
            linkedin_url TEXT,
            FOREIGN KEY (company_id) REFERENCES companies(id) ON DELETE CASCADE
        )
    `);
});

// Add a company
const addCompany = (company) => {
    return new Promise((resolve, reject) => {
        const { name, website, funding_stage } = company;
        db.run('INSERT INTO companies (name, website, funding_stage) VALUES (?, ?, ?)', [name, website, funding_stage], function (err) {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
};

// Get all companies
const getAllCompanies = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM companies', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

// Add a contact
const addContact = (contact) => {
    return new Promise((resolve, reject) => {
        const { company_id, name, title, email, linkedin_url } = contact;
        db.run('INSERT INTO contacts (company_id, name, title, email, linkedin_url) VALUES (?, ?, ?, ?, ?)', 
            [company_id, name, title, email, linkedin_url], function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
    });
};

// Get all contacts
const getAllContacts = () => {
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM contacts', (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
};

module.exports = { addCompany, getAllCompanies, addContact, getAllContacts, db };
