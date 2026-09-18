# Notes App — MERN Stack CRUD Lab

A simple full-stack notes manager built with MongoDB, Express, React (Vite), and Node.js.

## Student Details

- Name: Kavyanth Munagala
- Roll Number: 2026204016
- GitHub Repository: https://github.com/kavyanthmunagala/Notes-App

## Tech Stack

- **Frontend:** React (Vite) + Axios
- **Backend:** Node.js + Express
- **Database:** MongoDB (via Mongoose)

## Project Structure

notes-app/
|-- server/
|-- client/
|-- screenshots/

## Setup & Run Instructions

### Backend
cd server
npm install
npm start

The server runs on http://localhost:5000.

### Frontend
cd client
npm install
npm run dev

The client runs on http://localhost:5173.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | /api/notes | Create a new note |
| GET | /api/notes | Fetch all notes |
| DELETE | /api/notes/:id | Delete a note by ID |
