# PhishGuard

An AI-powered email phishing detection tool that analyzes email content and uploaded `.eml` files to identify phishing attempts, suspicious patterns, and red flags.

## Features

- **Paste & Analyze** — Paste email text directly for instant AI-powered phishing analysis
- **Upload .eml Files** — Upload email files for automated parsing and analysis
- **Classification** — Emails are classified as Safe, Suspicious, or Phishing with a confidence score
- **Red Flag Detection** — Highlights specific phishing indicators found in the email
- **Actionable Steps** — Provides recommended actions based on the analysis
- **Scan History** — View and revisit all past analyses
- **User Authentication** — Secure login and registration system

## Tech Stack

**Frontend:** React, Vite, Tailwind CSS, React Router, Axios, Lucide Icons

**Backend:** Node.js, Express, MongoDB (Mongoose), Groq SDK (LLaMA 3.3 70B), Mailparser, JWT, Multer

## Project Structure

```
phish-guard/
├── backend/
│   ├── config/          # Database configuration
│   ├── controllers/     # Route handlers (analysis, users)
│   ├── middleware/       # Auth middleware
│   ├── models/          # Mongoose schemas (Analysis, User)
│   ├── routes/          # API route definitions
│   ├── .env.example     # Environment variable template
│   └── index.js         # Express server entry point
├── frontend/
│   ├── public/
│   └── src/
│       ├── api/         # Axios API calls
│       ├── components/  # Reusable UI components
│       ├── context/     # React context (auth)
│       ├── pages/       # Page components (Home, History, Login, Register)
│       ├── App.jsx      # Root component with routing
│       └── main.jsx     # Entry point
├── .gitignore
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18+)
- MongoDB instance (local or Atlas)
- [Groq API key](https://console.groq.com/)

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Fill in your environment variables in .env
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

### Environment Variables

Create a `.env` file in the `backend/` directory:

```
PORT=5000
NODE_ENV=development
MONGODB_URI=your_mongodb_connection_string
GROQ_API_KEY=your_groq_api_key
```

## API Endpoints

| Method | Endpoint          | Description              | Auth |
| ------ | ----------------- | ------------------------ | ---- |
| POST   | `/api/analyze`    | Analyze pasted email text | Yes  |
| POST   | `/api/upload`     | Analyze uploaded .eml file | Yes  |
| GET    | `/api/history`    | Get user's scan history  | Yes  |
| POST   | `/api/users/register` | Register a new user  | No   |
| POST   | `/api/users/login`    | Login                | No   |

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for details.
