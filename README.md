# TodoList Project

A full-stack Todo List application built with React (Frontend) and Node.js/Express (Backend).

## Project Structure

- **root/**: Contains the Frontend (React) application.
- **backend/**: Contains the Backend (Node/Express) API.

## Prerequisites

- [Node.js](https://nodejs.org/) (v14 or higher recommended)
- [MongoDB](https://www.mongodb.com/try/download/community) (Make sure MongoDB is installed and running locally)

## Installation & Setup

### 1. Backend Setup

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install backend dependencies:
    ```bash
    npm install
    ```
3.  **Configure Environment Variables**:
    - The project uses environment variables for configuration.
    - Copy the example environment file to create your local `.env` file:
      ```bash
      cp .env.example .env
      # On Windows (Command Prompt):
      copy .env.example .env
      # On Windows (PowerShell):
      Copy-Item .env.example .env
      ```
    - The `.env` file should contain:
      ```
      PORT=5000
      MONGO_URI=mongodb://localhost:27017/todo
      ```

4.  Start the Backend Server:
    ```bash
    node server.js
    # OR if nodemon is installed
    npx nodemon server.js
    ```
    The server will run on `http://localhost:5000`.

### 2. Frontend Setup

1.  Navigate back to the root directory (if inside backend):
    ```bash
    cd ..
    ```
2.  Install frontend dependencies:
    ```bash
    npm install
    ```
3.  **Environment Variables**:
    - `.env.development` and `.env.production` have been created for you.
    - They define `REACT_APP_API_URL`.
    - Default Value: `http://localhost:5000`

4.  Start the React Application:
    ```bash
    npm start
    ```
    The application will run on `http://localhost:3000`.

## Deployment

### Backend Deployment

1.  Set the `PORT` environment variable on your hosting provider (e.g., Render, Heroku) to the port provided by the platform (usually automated).
2.  Set `MONGO_URI` to your production MongoDB connection string (e.g., MongoDB Atlas).
3.  Deploy the `backend` folder contents.
4.  Start command: `node server.js`.

### Frontend Deployment

1.  Update `.env.production` with your production backend URL:
    ```
    REACT_APP_API_URL=https://your-backend-url.com
    ```
2.  Build the project:
    ```bash
    npm run build
    ```
3.  Deploy the contents of the `build/` folder to your static hosting provider (e.g., Vercel, Netlify, Github Pages).

## Features

- Add, Edit, Delete Todos
- Mark Todos as Completed
- Data persisted in MongoDB

## Troubleshooting

- **Connection Error**: Ensure MongoDB is running locally (`mongod`).
- **Network Error**: Ensure the backend server is running on port 5000 (or the port specified in `.env`).
