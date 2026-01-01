# MERN Course Platform

[English](README.md) | [Chinese](README.zh-TW.md)

A full-stack course management platform built with the MERN stack, designed as an **interview-oriented portfolio project**.

This project focuses on **role-based authorization, permission-driven UI decisions, and maintainable frontend architecture**, rather than feature stacking.

---

## Highlights

- Role-based access control (Student / Instructor)
- Permission-driven UI (centralized, not scattered conditionals)
- Complete course lifecycle: create, enroll, drop, edit
- Frontend & backend validation with Joi
- UX optimizations: skeleton loading, lazy routes, CLS prevention

---

## Key Design Decisions

### Centralized Permission System

Instead of checking roles inside each component, all permission logic is centralized via:

- `PermissionService` defines role & action permissions
- `useAuthUser` exposes normalized user data & permission flags

This keeps UI components **simple, predictable, and scalable**.

---

### Validation Strategy

- Frontend: Joi schema validation before submission
- Backend: Joi validation at API boundaries  
  Invalid data never reaches the database.

---

### UX & Performance

- Skeleton screens to prevent layout shift
- Lazy-loaded routes for non-home pages
- Mobile-specific interaction patterns (tap to expand instead of hover)

---

## Project Structure

```
|-- client/                 # React frontend
|-- config/                 # Server configuration
|-- models/                 # Mongoose models
|-- routes/                 # API routes
|-- validation/             # Backend validation
`-- server.js               # Server entry
```

---

## API Endpoints (Selected)

- `POST /api/user/register`
- `POST /api/user/login`
- `GET /api/courses`
- `POST /api/courses/enroll/:id`
- `POST /api/courses/drop/:id`
- `PATCH /api/courses/:id`

---

## Tech Stack

**Frontend**: React, React Router, Axios  
**Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Passport  
**Validation**: Joi  
**Tooling**: Concurrently, Nodemon, dotenv

---

## Getting Started

```bash
npm install
npm run clientinstall
npm run dev
```

---

## Environment Variables

**root**
```
MONGODB_CONNECTION=
PASSPORT_SECRET=
INSTRUCTOR_INVITE_CODE=
```

**client**
```
REACT_APP_API_BASE_URL=http://localhost:8080
```

---

## Deployment

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://course.tinahu.dev/)

---

## What This Project Demonstrates

- I design permission systems, not just UI
- I understand full-stack data flow
- I care about UX stability and maintainability
- I can clearly explain architectural trade-offs in interviews
