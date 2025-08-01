# Entertainment-Library-Tracker
# Entertainment Library Tracker

A full-stack web application to track and manage your **video games** and **books**, built with PostgreSQL, Express.js, and a React frontend using Vite. This project demonstrates practical use of SQL migrations, seed data, RESTful routes, and client-side page routing.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Screenshots](#screenshots)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [Scripts](#scripts)
- [Future Improvements](#future-improvements)
- [License](#license)

---

## Features

### Books
- Add, edit, and delete books
- Link books to one or more authors
- Filter by genre or publication year

### Games
- Track video game library by title, genre, platform, and developer
- Mark games as completed or in progress
- Filter by platform or completion status

---

## Tech Stack

### Backend (Server)
- Node.js
- Express.js
- PostgreSQL
- Raw SQL (migrations and seeds)
- `pg` for database interaction
- `dotenv` for environment management

### Frontend (Client)
- React (JSX)
- Vite (build + dev server)
- Component-based architecture
- Page routing (`/books`, `/games`)

---

## Screenshots

> *(Add screenshots or GIFs from the app once the UI is built)*  
> Example:
> - `/books` page showing book table or list
> - `/games` page showing game tracker and filters

---

## Getting Started

### Prerequisites
- Node.js
- PostgreSQL
- npm

---

### Backend Setup

```bash
cd Server
npm install
cp .env.example .env        # Create your .env file with DATABASE_URL and PORT
npm run migrate              # Runs SQL migrations (creates tables)
npm run seed                 # Populates database with sample data
npm run dev                  # Starts Express server (http://localhost:3001 by default)