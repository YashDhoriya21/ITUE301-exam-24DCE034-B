# Library Book Management System
**ITUE301 Practical Exam — Set B**

A full-stack Library Book Management System built with React (frontend), Express.js (backend), and MongoDB (database).

---

## Project Structure

```
itue301-exam-24DCE34-B/
├── frontend/          # React + Vite frontend
│   ├── src/
│   │   ├── components/   # BookCard, Navbar
│   │   └── pages/        # HomePage, BooksPage, BorrowPage
│   └── package.json
├── backend/           # Express.js backend
│   ├── models/           # Book, Member, Borrowing schemas
│   ├── routes/           # books, members, borrowings routes
│   ├── server.js
│   ├── dbTest.js         # Task 5 schema validation demo
│   └── package.json
├── .env.example
├── .gitignore
└── README.md
```

---

## 1. Project Name
**Library Book Management System** — manages books, members, and borrowing records for a college library.

---

## 2. Frontend Setup and Run

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: **http://localhost:5173**

### Pages / Routes
| Route | Page |
|-------|------|
| `/` | HomePage |
| `/books` | BooksPage (fetches books from API) |
| `/borrow` | BorrowPage (borrowing form with live preview) |

---

## 3. Backend Setup and Run

```bash
cd backend
npm install
node server.js
```

Backend runs at: **http://localhost:5000**

### API Endpoints (Task 3 — In-Memory)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/v1/books` | Get all books |
| GET | `/api/v1/borrowings` | Get all borrowing records |
| POST | `/api/v1/borrowings` | Create a new borrowing record |

### API Endpoints (Task 5 — MongoDB)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET/POST | `/api/v2/books` | Books (MongoDB) |
| GET/POST | `/api/v2/members` | Members (MongoDB) |
| GET/POST | `/api/v2/borrowings` | Borrowings (MongoDB) |

---

## 4. MongoDB Setup

1. Install MongoDB Community Edition from https://www.mongodb.com/try/download/community
2. Start the MongoDB service:
   ```bash
   net start MongoDB        # Windows (run as Administrator)
   ```
3. MongoDB runs on: **mongodb://localhost:27017**
4. Database name: **library_db** (created automatically on first use)

### Run Schema Tests (Task 5)
```bash
cd backend
node dbTest.js
```
Demonstrates valid saves and validation failures for all three schemas.

---

## 5. Required Environment Variables

Copy `.env.example` to `.env` in the `backend/` folder:

```bash
cp .env.example backend/.env
```

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/library_db` |
| `PORT` | Express server port | `5000` |
| `NODE_ENV` | Environment mode | `development` |

---

## Tasks Implemented

| Task | Description | Marks |
|------|-------------|-------|
| Task 1 | React Component Architecture (BookCard, HomePage, BooksPage, BorrowPage) | 4 |
| Task 2 | React Routing (React Router) + State Management (useState, controlled form) | 4 |
| Task 3 | Express REST API + requestLogger middleware + global error handler | 4 |
| Task 4 | API consumption in React using fetch + useEffect (data/loading/error states) | 4 |
| Task 5 | MongoDB + Mongoose schemas with validation + dbTest.js | 4 |
