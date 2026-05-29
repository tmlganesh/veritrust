# VeriTrust — Employee Verification Platform

A full-stack enterprise web application for managing employee background verifications, built with **Angular 17** and **Node.js**. Designed for HR teams, verification officers, and operations managers to streamline background checks, track verification records, and maintain compliance.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [Database Seeding](#database-seeding)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
- [Default Credentials](#default-credentials)
- [Screenshots](#screenshots)

---

## Features

### Authentication & Authorization
- JWT-based authentication with role-based access control
- Secure password hashing with bcrypt
- Protected routes with admin-only actions

### Dashboard
- Overview statistics — total records, pending, approved, active users
- Recent verification records table
- Real-time activity feed
- Quick action shortcuts

### Records Management
- Full data table with search, sort, and filter capabilities
- Filter by status (Verified, Pending, Escalated, Rejected)
- Filter by verification type (Employment, Education, Background Check, Identity, Address)
- Sortable columns and pagination
- Risk score visualization with progress indicators

### User Management (Admin)
- Add, edit, and delete users via slide-in drawer panel
- Role assignment (Administrator, Verification Officer, Viewer)
- Department management
- Active/inactive status toggle
- Delete confirmation modal

### Activity Logs
- Complete audit trail of all system events
- Summary statistics (total events, active users, flagged events)
- Filterable event log table with timestamps
- Action type badges (LOGIN, CREATE, APPROVE, UPDATE, DELETE, EXPORT)

### UI/UX
- Clean, professional enterprise SaaS design
- Collapsible sidebar navigation
- Responsive layout for all screen sizes
- Top navigation with search, notifications, user profile, and logout
- Loading skeletons for async data

---

## Tech Stack

### Frontend
| Technology | Version | Purpose |
|---|---|---|
| Angular | 17.3 | Frontend framework |
| TypeScript | 5.4 | Type-safe JavaScript |
| Tailwind CSS | 3.4 | Utility-first CSS framework |
| RxJS | 7.8 | Reactive programming |

### Backend
| Technology | Version | Purpose |
|---|---|---|
| Node.js | 18+ | Runtime environment |
| Express | 4.19 | Web framework |
| TypeScript | 5.4 | Type-safe JavaScript |
| Mongoose | 8.4 | MongoDB ODM |
| JSON Web Token | 9.0 | Authentication |
| bcryptjs | 2.4 | Password hashing |

### Database
| Technology | Purpose |
|---|---|
| MongoDB Atlas | Cloud-hosted NoSQL database |

---

## Project Structure

```
Project/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.ts                  # MongoDB connection
│   │   ├── controllers/
│   │   │   ├── authController.ts      # Login & profile
│   │   │   └── verificationController.ts  # CRUD & analytics
│   │   ├── middlewares/
│   │   │   ├── authMiddleware.ts      # JWT verification & role guard
│   │   │   └── delayMiddleware.ts     # Simulated API delay
│   │   ├── models/
│   │   │   ├── User.ts               # User schema with password hashing
│   │   │   ├── VerificationCase.ts    # Verification record schema
│   │   │   └── ActivityLog.ts         # Audit log schema
│   │   ├── routes/
│   │   │   ├── authRoutes.ts          # Auth endpoints
│   │   │   └── verificationRoutes.ts  # Case endpoints
│   │   ├── seed.ts                    # Database seeder
│   │   ├── server.ts                  # Express app entry point
│   │   └── types.d.ts                 # Custom type declarations
│   ├── .env                           # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/services/
│   │   │   │   └── auth.service.ts    # Authentication service
│   │   │   ├── features/
│   │   │   │   ├── auth/
│   │   │   │   │   └── login.component.ts
│   │   │   │   ├── dashboard/
│   │   │   │   │   └── dashboard.component.ts
│   │   │   │   ├── cases/
│   │   │   │   │   └── cases.component.ts
│   │   │   │   ├── users/
│   │   │   │   │   └── users.component.ts
│   │   │   │   └── analytics/
│   │   │   │       └── analytics.component.ts
│   │   │   ├── shared/components/
│   │   │   │   └── layout.component.ts
│   │   │   ├── app.component.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.routes.ts
│   │   ├── styles.css                 # Global styles & design system
│   │   └── index.html
│   ├── angular.json
│   ├── tailwind.config.js
│   └── package.json
│
└── README.md
```

---

## Prerequisites

Ensure the following are installed on your system:

- **Node.js** (v18 or higher) — [Download](https://nodejs.org/)
- **npm** (comes with Node.js)
- **MongoDB Atlas** account (free tier) — [Sign up](https://cloud.mongodb.com/)

> **Note:** A local MongoDB installation also works, but MongoDB Atlas is recommended for ease of setup.

---

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Project
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

---

## Environment Variables

Create a `.env` file inside the `backend/` directory with the following variables:

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@<cluster-url>/verification_portal?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key
API_DELAY=800
```

| Variable | Description |
|---|---|
| `PORT` | Port number for the backend server |
| `MONGO_URI` | MongoDB connection string (Atlas or local) |
| `JWT_SECRET` | Secret key for JWT token signing |
| `API_DELAY` | Simulated API response delay in milliseconds |

---

## Database Seeding

Populate the database with sample data (2 users + 15 verification cases):

```bash
cd backend
npm run seed
```

This creates:
- **Admin User** — `admin@mploychek.ai` / `admin123`
- **General User** — `user@mploychek.ai` / `user123`
- **15 verification cases** with randomized statuses and risk scores

---

## Running the Application

### Start the Backend

```bash
cd backend
npm run dev
```

The backend runs at **http://localhost:5000**.

### Start the Frontend

Open a **new terminal**:

```bash
cd frontend
npm start
```

The frontend runs at **http://localhost:4200**.

> Both servers must be running simultaneously for full functionality.

---

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `POST` | `/api/auth/login` | User login | Public |
| `GET` | `/api/auth/profile` | Get user profile | Authenticated |

### Verification Cases

| Method | Endpoint | Description | Access |
|---|---|---|---|
| `GET` | `/api/verification-cases` | List all cases | Authenticated |
| `GET` | `/api/verification-cases/:id` | Get case by ID | Authenticated |
| `PUT` | `/api/verification-cases/:id` | Update case status | Admin only |
| `GET` | `/api/verification-cases/analytics` | Get analytics summary | Authenticated |

### Request Headers

```
Authorization: Bearer <jwt_token>
Content-Type: application/json
```

---

## Default Credentials

| Role | Email | Password |
|---|---|---|
| Admin | `admin@mploychek.ai` | `admin123` |
| User | `user@mploychek.ai` | `user123` |

> Run `npm run seed` first to create these accounts in the database.

---

## Screenshots

### Login Page
Clean split layout with branding panel and sign-in form with role selector.

### Dashboard
Statistics overview with recent records table, activity feed, and quick actions.

### Records Page
Enterprise data table with search, sort, filter, and pagination.

### User Management
Admin console with add/edit drawer and delete confirmation modal.

### Activity Logs
Audit trail with summary cards and filterable event log table.

---

## Scripts Reference

### Backend

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start with nodemon (auto-reload) |
| Production | `npm start` | Start compiled JS |
| Build | `npm run build` | Compile TypeScript to JavaScript |
| Seed | `npm run seed` | Populate database with sample data |

### Frontend

| Script | Command | Description |
|---|---|---|
| Development | `npm start` | Start Angular dev server |
| Build | `npm run build` | Production build |
| Test | `npm test` | Run unit tests |

---

## License

ISC
