# UNC Charlotte Student Dashboard

A modern student dashboard for UNC Charlotte built with Angular 19 and Flask. Features a collapsible sidebar, UNCC news feed, enrollment charts, and fundraising reports — all styled with Angular Material and UNCC green/gold branding.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | Angular 19, Angular Material, ng2-charts / Chart.js 4 |
| Backend | Python 3, Flask, Flask-CORS |
| Styling | Angular Material (indigo-pink theme), custom UNCC CSS |

---

## Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) v18 or higher
- [Python](https://www.python.org/) 3.10 or higher
- [Angular CLI](https://angular.dev/tools/cli) v19

```bash
npm install -g @angular/cli
```

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/Bnguyen8091/UNCC-Student-Dashboard.git
cd UNCC-Student-Dashboard
```

### 2. Start the backend

```bash
cd backend
pip install flask flask-cors flask-jwt-extended
python app.py
```

The API will run at `http://localhost:3000`.

### 3. Start the frontend

Open a new terminal:

```bash
cd frontend
npm install --legacy-peer-deps
npm start
```

Open your browser and go to `http://localhost:4200`.

---

## Project Structure

```
UNCC-Student-Dashboard/
├── backend/
│   ├── app.py              # Flask API (news + login endpoints)
│   └── requirements.txt    # Python dependencies
└── frontend/
    ├── public/
    │   └── uncc-logo.png   # Charlotte C logo asset
    └── src/
        └── app/
            ├── dashboard/  # News feed page
            ├── summary/    # Enrollment chart page
            ├── reports/    # Fundraising chart page
            └── services/   # News HTTP service
```

---

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/news` | Returns UNCC news articles |
| POST | `/api/login` | Returns JWT access token |

---

## Features

- **Collapsible sidebar** — UNCC green sidebar with the Charlotte C logo; collapses to icon-only mode via the hamburger button
- **News Dashboard** — displays UNCC news cards with title, summary, and a link to the full article
- **Summary Page** — bar chart showing Fall 2023 enrollment breakdown (undergraduate, graduate, first-year, transfer) with key stats
- **Reports Page** — pie chart showing fundraising data with a direct link to the UNCC giving portal
- **Responsive layout** — grid-based news cards reflow on smaller screens

---

## Built With

- [Angular](https://angular.dev/) — frontend framework
- [Angular Material](https://material.angular.io/) — UI component library
- [Chart.js](https://www.chartjs.org/) + [ng2-charts](https://github.com/valor-software/ng2-charts) — charting
- [Flask](https://flask.palletsprojects.com/) — backend API
- [Flask-CORS](https://flask-cors.readthedocs.io/) — cross-origin support
