# Multi-Tenant SaaS Backend API

A multi-tenant project management backend built with Node.js, Express, MongoDB, and JWT authentication.

## Features

- JWT Authentication
- Organization-based tenant isolation
- Projects and Tasks management
- Protected routes
- Nested project details endpoint
- Request validation
- MongoDB relationships using Mongoose

---

## Tech Stack

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT
- bcryptjs
- express-validator

---

## Installation

```bash
git clone <repo-url>

cd multi-tenant-saas-api

npm install
```

---

## Environment Variables

Create `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret
```

---

## Run Project

```bash
npm run dev
```

---

## API Endpoints

### Auth

#### Register
POST `/api/auth/register`

#### Login
POST `/api/auth/login`

---

### Projects

#### Create Project
POST `/api/projects`

#### Get Projects
GET `/api/projects`

#### Get Project Details
GET `/api/projects/:id`

---

### Tasks

#### Create Task
POST `/api/tasks`

#### Get Tasks
GET `/api/tasks`

---

## Multi-Tenant Isolation

All project and task queries are filtered using:

```js
organizationId: req.user.organizationId
```

This ensures organizations cannot access each other's data.

---

## Assumptions

- One user belongs to one organization
- Tasks belong to projects
- JWT authentication is required for protected routes

---

## Author

Mohammed Faizan Patel
