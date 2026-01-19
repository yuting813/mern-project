[English](README.md) | [繁體中文](README.zh-TW.md)

# MERN Course Platform - Full-stack Engineering Practice

A curriculum management system built on the MERN Stack (MongoDB, Express, React, Node.js). This project focuses on implementing Permission-driven Architecture and a consistent full-stack validation mechanism to ensure data integrity and UI predictability.

- **Live Demo**: [course.tinahu.dev](https://course.tinahu.dev/)
- **Test Accounts**:
  - Student: `demo.student@tinahu.dev` / `DemoCourse2026`
  - Teacher: Invitation code required for registration. Available upon request for interview demos.

---

## Project Motivation

This project addresses common full-stack challenges:

- **Permission-driven UI**: Managing distinct workflows and views for different roles (Teachers vs. Students).
- **Validation Consistency**: Reducing maintenance costs caused by inconsistent validation rules across the stack.
- **Unified Error Handling**: Establishing a standardized API response and error interception mechanism.

---

## Project Structure & Design Principles

This project follows a decoupled frontend-backend architecture with a modular design:

```text
client/               # React frontend application
  src/components/     # UI components (Common and Page-specific)
  src/services/       # Encapsulated API logic (Auth, Course, Permission)
  src/validation/     # Frontend Joi schemas
models/               # Mongoose data models (User, Course)
routes/               # Express routes with permission middleware
validation/           # Backend Joi logic (Synced with frontend)
server.js             # Server entry point and middleware configuration

```

---

## Engineering Challenges & Decisions

### 1. Permission-driven UI Architecture

- **Challenge**: Scattering authorization logic across UI components leads to high maintenance costs, code duplication, and potential security loopholes.
- **Solution**: Implemented a centralized **Auth & Role State Management** system. UI components are completely decoupled from permission logic, rendering content strictly based on the state provided by the permission service.
- **Result**: Achieved **flicker-free** role-based navigation and improved architectural scalability, allowing for easy integration of new roles (e.g., Teaching Assistants) without modifying component logic.

### 2. Modular Validation with Joi (Single Source of Truth)

- **Challenge**: Inconsistencies between frontend and backend validation rules can lead to fragile systems and poor user experience.
- **Solution**: Established a **Single Source of Truth** for validation using **Joi Schemas**. The exact same validation logic governs data integrity from the initial client input interception to the final database write.
- **Result**: Significantly reduced debugging overhead and ensured strict data consistency across the entire platform.

### 3. Secure Authentication with JWT & Passport.js

- **Strategy**: Adopted a stateless authentication architecture using **JWT** combined with **Passport.js** strategies.
- **Implementation**: Developed custom middleware to enforce **Role-Based Access Control (RBAC)** on protected routes, ensuring critical features (e.g., Course Creation) remain inaccessible to unauthorized users.

### 4. Global Error Handling & Resilience

- **Challenge**: Ad-hoc error handling scattered across controllers and components results in technical debt, difficult debugging, and disjointed user experiences.
- **Solution**:
  - **Backend**: Engineered a **Global Error Middleware** to intercept unhandled exceptions and enforce a standardized API error response structure.
  - **Frontend**: Integrated **Error Boundaries** and **Axios Interceptors** to catch render failures or specific HTTP status codes (e.g., 401/403), triggering automated fallback UIs or redirection flows.
- **Result**: Enhanced system **Fault Tolerance**, ensuring the application degrades gracefully instead of crashing into a "White Screen of Death" during partial failures.

---

## Key Features

- **Role-based Dashboard**: Distinct interfaces and functionalities tailored for Teachers and Students.
- **Course Lifecycle Management**: Full implementation of creating, editing, publishing, and enrolling in courses.
- **RESTful API Design**: Semantic API endpoints handling relationships between User and Course entities.
- **Axios Interceptors**: Encapsulated Axios instances for automatic token injection and standardized error handling.

---

## Tech Stack

- **Frontend**: React, React Router
- **Backend**: Node.js, Express
- **Database**: MongoDB (Mongoose ODM)
- **Auth**: JWT, Passport.js
- **Validation**: Joi
- **Deployment**: Render / Vercel

---

## Quality Assurance

- **Code Standards**: Enforced semantic naming and consistent structural patterns.
- **Automated Deployment**: Integrated CI/CD pipelines via Render and Vercel.
- **Security Control**: Implemented stateless JWT validation and backend middleware for route protection.

---

## About Me

This project showcases my ability to design production-ready full-stack architectures with a focus on rigorous permission models and data validation.

- **Email**: tinahuu321@gmail.com
- **LinkedIn**: https://www.linkedin.com/in/tina-hu-frontend
