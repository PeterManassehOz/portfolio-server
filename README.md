# Portfolio Server

REST API powering the Oz Peter Manasseh personal portfolio and administration platform.

Built with Express, TypeScript, MongoDB, and Mongoose.

The API provides public content endpoints for the portfolio frontend as well as protected administrative endpoints for managing portfolio content.

## Related Repositories

- **Public Portfolio:** https://github.com/PeterManassehOz/portfolio-fe
- **Admin CMS:** https://github.com/PeterManassehOz/portfolio-admin
- **Backend API:** https://github.com/PeterManassehOz/portfolio-server

---

## Overview

The Portfolio Server provides the backend infrastructure for the portfolio ecosystem.

It is responsible for:

- API routing
- Authentication
- Authorization
- Portfolio content management
- Project management
- Experience management
- Education management
- Achievement management
- About content
- Contact messages
- Administrator management
- Invitations
- Activity tracking
- Image management
- Email notifications

---

## Architecture

```text
             ┌───────────────────────┐
             │    Portfolio FE       │
             │       Next.js         │
             └───────────┬───────────┘
                         │
                         │
                         ▼
              ┌──────────────────────┐
              │    Portfolio API     │
              │ Express + TypeScript │
              └──────────┬───────────┘
                         │
              ┌──────────┴──────────┐
              │                     │
              ▼                     ▼
       ┌──────────────┐      ┌──────────────┐
       │   MongoDB    │      │  Cloudinary  │
       │    Atlas     │      │    Images    │
       └──────────────┘      └──────────────┘
                         ▲
                         │
                         │
             ┌───────────┴───────────┐
             │     Admin CMS         │
             │       Next.js         │
             └───────────────────────┘

```

API

Base API path:

```text

/api/v1

```
Health check:

```text

GET /api/v1/health

```

The API exposes public endpoints for portfolio content and protected endpoints for administrative operations.

Main Backend Modules
Authentication
Admin Management
Invitations
Dashboard
Projects
About
Experience
Education
Achievements
Leadership Team
Products
Case Studies
Insights
Industries
Testimonials
Newsletter
Contact Messages
Courses
Course Registrations
Cloudinary
Email
Tech Stack
Runtime
Node.js
Express
TypeScript
Database
MongoDB
Mongoose
Validation
Zod
Authentication
JWT
Media
Cloudinary
Email
Nodemailer
Deployment
Render
Environment Variables

Create a .env file:

```text

NODE_ENV=development
PORT=5000

MONGODB_URI=your_mongodb_connection_string

CLIENT_URL=http://localhost:3000
ADMIN_URL=http://localhost:3001

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

EMAIL_FROM=your_email
EMAIL_USER=your_email
EMAIL_PASS=your_app_password

```
Never commit environment variables or credentials to the repository.

Getting Started
1. Clone

```text
   
git clone https://github.com/PeterManassehOz/portfolio-server.git
cd portfolio-server

```

3. Install dependencies

```text

npm install

```
4. Configure environment variables

Create the .env file and provide the required values.

4b. Run development server
```text
npm run dev

```
The API runs locally on:

```text
http://localhost:5000

```
5. Build

```text
npm run build

```

7. Start production server

```text

npm start

```
Production

The API is deployed separately from the frontend applications.

The production architecture consists of:

Vercel — Public Portfolio
Vercel — Admin CMS
Render — REST API
MongoDB Atlas — Database
Cloudinary — Media storage
Author
Oz Peter Manasseh

Full-Stack Engineer focused on building scalable web applications, APIs, and modern user experiences.
