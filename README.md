# 🔍 Lead Discovery System — Appliflows Backend Intern Assignment

This project is a simplified backend lead generation system built as part of the Appliflows Backend Internship challenge. It enables user authentication, company data input, lead enrichment using the Hunter.io API, automation via n8n, and result display with optional LLM-powered personalization.


---

## 🚀 Features

- 🔐 Simple login system with session support
- 🏢 Company data input form (Name, Website, Funding Stage)
- 🧠 Lead enrichment via Hunter.io API (CEO/CTO/VP detection)
- 🔁 n8n workflow integration (manual trigger demo)
- 📄 Contacts display page with search + CSV export

---

## 🧑‍💻 Tech Stack

- **Backend**: Node.js + Express
- **Database**: SQLite
- **Frontend**: React + JS + CSS
- **Automation**: [n8n](https://n8n.io/)
- **APIs**: [Hunter.io](https://hunter.io)

---

## ⚙️ Installation Instructions

### 1. Clone Repository

```bash
git clone https://github.com/Jaswant-Yadav/Simple-Lead-Discovery-System.git
cd Simple-Lead-Discovery-System


##  2. Install Backend Dependencies

cd backend
npm install

## 3. Run Backend Server

node index.js

## 4. install Frontend Dependencies

cd frontend
npm install

## 5. Run Frontend Server

npm start

## 6. Configure .env

PORT=5000
SESSION_SECRET=your_secret_key
HUNTER_API_KEY=your_hunter_api_key



### 🔁 n8n Setup Instructions


#  Install n8n (if not using cloud)

npm install -g n8n
n8n


## Access n8n UI
Visit http://localhost:5678


## Import the Workflow
Use the n8n-workflow.json provided in this repo.

## Connect your backend endpoints:

    GET /api/companies

    POST /api/webhooks/n8n-leads

    Hunter.io API

 ##### 🧪 Demo Flow

    Login with:

        Username: admin

        Password: admin123

    Add a company like TechStart or HealthInnovate

    Run n8n workflow to fetch & enrich contacts

    View enriched contacts on Frontend



### 📤 API Endpoints

| Method | Endpoint                    | Description                       |
| ------ | --------------------------- | --------------------------------- |
| POST   | `/login`                    | Login with hardcoded credentials  |
| POST   | `/api/companies`            | Add a new company                 |
| GET    | `/api/companies`            | Get all companies (for n8n)       |
| POST   | `/api/discover/:company_id` | Enrich one company manually       |
| POST   | `/api/webhooks/n8n-leads`   | Receive enriched contact from n8n |
| GET    | `/api/contacts`             | List all contacts                 |


## 🧠 Challenges Faced

    Sign up in Hunter.io without a domain is such a very difficult

    First time work on  n8n workflow & Lead Enrichment Integration
   
    Structuring reusable code across frontend/backend quickly

    Ensuring reliable connection between n8n and backend locally
