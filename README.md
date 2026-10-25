# Neighborhood Help — MERN v2

A clean MERN rebuild of the original Neighborhood Help PHP/MySQL project.

## Stack
- React + Vite
- Node.js + Express
- MongoDB + Mongoose
- JWT authentication
- Multer image uploads

## Run
### Backend
1. `cd backend`
2. Copy `.env.example` to `.env`
3. Put your MongoDB URI in `.env`
4. `npm install`
5. `npm run dev`

### Frontend
1. Open another terminal: `cd frontend`
2. `npm install`
3. `npm run dev`

Open http://localhost:5173

## Important
The SQL files from the legacy project are intentionally NOT included in this final MERN project. MongoDB is the only database used by the app.

Existing MySQL data is not automatically imported. If you need the old users/posts/comments migrated, export the legacy data and map MySQL integer IDs to MongoDB ObjectIds before importing.
