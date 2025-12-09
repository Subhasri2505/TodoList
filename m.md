# TodoList Project - Complete Guide

A full-stack Todo List application built with **React** (Frontend) and **Node.js/Express** (Backend) with **MongoDB** database.

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Prerequisites](#prerequisites)
3. [Project Structure](#project-structure)
4. [Installation Instructions](#installation-instructions)
5. [Development Workflow](#development-workflow)
6. [Production Deployment](#production-deployment)
7. [Available Scripts](#available-scripts)
8. [Environment Variables](#environment-variables)
9. [Technologies Used](#technologies-used)
10. [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

This TodoList application provides:
- ✅ Create, Read, Update, Delete (CRUD) operations for todos
- ✅ Mark todos as completed/incomplete
- ✅ Persistent storage with MongoDB
- ✅ RESTful API backend
- ✅ Modern React frontend
- ✅ Separate development and production environments

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v14.x or higher ([Download here](https://nodejs.org/))
- **npm**: v6.x or higher (comes with Node.js)
- **MongoDB**: 
  - Local installation ([Download here](https://www.mongodb.com/try/download/community))
  - OR MongoDB Atlas account ([Sign up here](https://www.mongodb.com/cloud/atlas))

### Verify Installation

```bash
# Check Node.js version
node --version

# Check npm version
npm --version

# Check if MongoDB is running (if using local)
mongod --version
```

---

## 📂 Project Structure

```
TodoList/
├── backend/                  # Backend server code
│   ├── models/              # Mongoose models
│   │   └── Todo.mjs         # Todo schema
│   ├── routes/              # API routes
│   │   └── todoRoutes.mjs   # Todo endpoints
│   └── server.mjs           # Express server entry point
├── public/                  # Static files
├── src/                     # React frontend code
│   ├── App.js              # Main React component
│   ├── App.css             # App styles
│   ├── index.js            # React entry point
│   └── index.css           # Global styles
├── .env.development        # Development environment variables
├── .env.production         # Production environment variables
├── .gitignore             # Git ignore rules
├── package.json           # Project dependencies & scripts
├── README.md              # Project documentation
└── m.md                   # This file - Step-by-step guide
```

---

## 🚀 Installation Instructions

### Step 1: Clone or Download the Project

If you already have the project, navigate to its directory:

```bash
cd "d:\Saravana Saran\Files\TodoList"
```

### Step 2: Install Dependencies

Install **all** project dependencies (both frontend and backend):

```bash
npm install
```

This will install:
- **Frontend dependencies**: React, testing libraries, etc.
- **Backend dependencies**: Express, Mongoose, CORS, etc.
- **Dev dependencies**: Concurrently, cross-env, etc.

> ⏱️ This may take a few minutes depending on your internet connection.

### Step 3: Set Up MongoDB

#### Option A: Using Local MongoDB

1. Start MongoDB service:
   
   **Windows:**
   ```bash
   # Start MongoDB as a service (if installed as service)
   net start MongoDB
   
   # OR run mongod directly
   mongod
   ```
   
   **macOS/Linux:**
   ```bash
   sudo systemctl start mongod
   # OR
   sudo service mongod start
   ```

2. Verify MongoDB is running:
   ```bash
   mongo
   # You should see MongoDB shell
   ```

#### Option B: Using MongoDB Atlas (Cloud)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free cluster
3. Get your connection string (looks like: `mongodb+srv://username:password@cluster.mongodb.net/`)
4. Update the `MONGODB_URI` in your `.env` files (see Step 4)

### Step 4: Configure Environment Variables

The project has two environment files:

#### `.env.development` (Already configured)
```env
APP_ENV=development
REACT_APP_API_URL=http://localhost:5000
MONGODB_URI=mongodb+srv://todo_db:todo_psw@cluster0.v3ve0gw.mongodb.net/
```

#### `.env.production` (Already configured)
```env
APP_ENV=production
REACT_APP_API_URL=http://localhost:5000
MONGODB_URI=mongodb+srv://todo_db:todo_psw@cluster0.v3ve0gw.mongodb.net/
```

> ⚠️ **Security Note**: For production, you should:
> - Change the MongoDB credentials
> - Update `REACT_APP_API_URL` to your deployed backend URL
> - Never commit sensitive credentials to Git

### Step 5: Verify Setup

Run the following to verify everything is installed correctly:

```bash
npm test -- --version
```

---

## 💻 Development Workflow

### Option 1: Run Both Frontend and Backend Together (Recommended)

This is the easiest way to develop:

```bash
npm run dev
```

This command will:
- ✅ Start the backend server on `http://localhost:5000`
- ✅ Start the React frontend on `http://localhost:3000`
- ✅ Automatically use `.env.development` configuration
- ✅ Support hot-reloading for both frontend and backend

**Expected Output:**
```
[0] Server running on port 5000
[0] Connected to MongoDB
[1] Compiled successfully!
[1] webpack compiled successfully
```

### Option 2: Run Frontend and Backend Separately

#### Terminal 1 - Start Backend Server:
```bash
npm run server
```

This will:
- Start Express server on port 5000
- Connect to MongoDB
- Enable CORS for frontend communication

**Expected Output:**
```
Server running on port 5000
Connected to MongoDB
```

#### Terminal 2 - Start Frontend:
```bash
npm start
```

This will:
- Start React development server on port 3000
- Open browser automatically
- Enable hot module replacement

**Expected Output:**
```
Compiled successfully!

You can now view todolist in the browser.

  Local:            http://localhost:3000
  On Your Network:  http://192.168.x.x:3000
```

### Accessing the Application

Once both servers are running:

1. **Frontend**: Open [http://localhost:3000](http://localhost:3000) in your browser
2. **Backend API**: The backend API is available at [http://localhost:5000](http://localhost:5000)

### API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/todos` | Get all todos |
| POST | `/api/todos` | Create a new todo |
| PUT | `/api/todos/:id` | Update a todo |
| DELETE | `/api/todos/:id` | Delete a todo |

---

## 🌍 Production Deployment

### Step 1: Update Production Environment Variables

Edit `.env.production`:

```env
APP_ENV=production
REACT_APP_API_URL=https://your-backend-url.com
MONGODB_URI=your-production-mongodb-uri
```

### Step 2: Deploy Backend

#### Option A: Deploy to Render

1. Create account at [Render](https://render.com)
2. Create new **Web Service**
3. Connect your repository
4. Configure:
   - **Root Directory**: `backend`
   - **Build Command**: `npm install`
   - **Start Command**: `node server.mjs`
5. Add environment variables:
   - `NODE_ENV`: `production`
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `PORT`: (Auto-set by Render)

#### Option B: Deploy to Railway

1. Go to [Railway.app](https://railway.app)
2. Create new project
3. Deploy from GitHub repository
4. Add environment variables (same as above)

#### Option C: Deploy to Heroku

```bash
# Install Heroku CLI
# Login to Heroku
heroku login

# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set NODE_ENV=production
heroku config:set MONGODB_URI=your-mongodb-uri

# Deploy
git subtree push --prefix backend heroku main
```

### Step 3: Build Frontend for Production

```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

### Step 4: Deploy Frontend

#### Option A: Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm install -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Follow prompts and set environment variables

#### Option B: Deploy to Netlify

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Deploy:
   ```bash
   netlify deploy --prod
   ```

3. Choose `build` folder when prompted

#### Option C: Manual Deployment

1. Upload the entire `build/` folder to your hosting provider
2. Configure your web server to serve `index.html` for all routes

---

## 📜 Available Scripts

In the project directory, you can run:

### `npm start`
Runs the React app in development mode on [http://localhost:3000](http://localhost:3000).

### `npm run server`
Runs the backend server in development mode on [http://localhost:5000](http://localhost:5000).

### `npm run server:prod`
Runs the backend server in production mode.

### `npm run dev`
Runs both frontend and backend concurrently (recommended for development).

### `npm run build`
Builds the React app for production to the `build` folder.

### `npm test`
Launches the test runner in interactive watch mode.

### `npm run eject`
⚠️ **Warning**: This is a one-way operation. Use only if you need full control over webpack config.

---

## 🔐 Environment Variables

### Frontend Variables (Must start with `REACT_APP_`)

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `http://localhost:5000` |

### Backend Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `NODE_ENV` | Environment mode | `development` or `production` |
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/todo` |
| `PORT` | Server port (optional) | `5000` |

### Environment Files

- **`.env.development`**: Used when running `npm run server` or `npm run dev`
- **`.env.production`**: Used when running `npm run server:prod` or building for production

---

## 🛠️ Technologies Used

### Frontend
- **React 19.2.0** - JavaScript library for building user interfaces
- **React DOM 19.2.0** - React package for working with the DOM
- **Axios 1.13.2** - Promise-based HTTP client
- **React Scripts 5.0.1** - Configuration and scripts for Create React App

### Backend
- **Express 5.2.1** - Fast, minimalist web framework for Node.js
- **Mongoose 9.0.0** - MongoDB object modeling tool
- **CORS 2.8.5** - Middleware for enabling CORS
- **Dotenv 17.2.3** - Environment variable loader

### Development Tools
- **Concurrently 9.2.1** - Run multiple commands concurrently
- **Cross-env 7.0.3** - Set environment variables across platforms

### Testing
- **@testing-library/react 16.3.0** - React testing utilities
- **@testing-library/jest-dom 6.9.1** - Custom jest matchers
- **@testing-library/user-event 13.5.0** - User interaction simulation

---

## 🐛 Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Symptoms:**
```
Could not connect to MongoDB: MongoNetworkError
```

**Solutions:**
1. Verify MongoDB is running:
   ```bash
   # Windows
   net start MongoDB
   
   # macOS/Linux
   sudo systemctl status mongod
   ```

2. Check MongoDB URI in `.env` file is correct

3. If using MongoDB Atlas, check:
   - Network access whitelist (add your IP or use `0.0.0.0/0` for testing)
   - Database user credentials are correct

### Issue: "Port 3000/5000 already in use"

**Symptoms:**
```
Error: listen EADDRINUSE: address already in use :::3000
```

**Solutions:**

**Windows:**
```bash
# Find the process using the port
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /PID <PID> /F
```

**macOS/Linux:**
```bash
# Find and kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Find and kill process on port 5000
lsof -ti:5000 | xargs kill -9
```

### Issue: "Network Error" in Frontend

**Symptoms:**
- Frontend can't fetch data from backend
- Console shows CORS errors

**Solutions:**
1. Verify backend is running on port 5000
2. Check `REACT_APP_API_URL` in `.env.development` is correct
3. Ensure CORS is enabled in `backend/server.mjs`
4. Restart both frontend and backend

### Issue: "Module not found" Errors

**Symptoms:**
```
Error: Cannot find module 'express'
```

**Solutions:**
1. Delete `node_modules` folder:
   ```bash
   # Windows
   rmdir /s /q node_modules
   
   # macOS/Linux
   rm -rf node_modules
   ```

2. Delete `package-lock.json`:
   ```bash
   # Windows
   del package-lock.json
   
   # macOS/Linux
   rm package-lock.json
   ```

3. Reinstall dependencies:
   ```bash
   npm install
   ```

### Issue: React App Won't Start

**Solutions:**
1. Clear npm cache:
   ```bash
   npm cache clean --force
   ```

2. Delete `.cache` folder in `node_modules`:
   ```bash
   # Windows
   rmdir /s /q node_modules\.cache
   
   # macOS/Linux
   rm -rf node_modules/.cache
   ```

3. Restart the development server

### Issue: Changes Not Reflecting

**Solutions:**
1. Hard refresh browser: `Ctrl + Shift + R` (Windows) or `Cmd + Shift + R` (Mac)
2. Clear browser cache
3. Restart development server
4. Check if correct environment file is being used

---

## 📞 Getting Help

If you encounter issues not covered here:

1. **Check the Console**: Look for error messages in both terminal and browser console
2. **Check MongoDB Logs**: Review MongoDB logs for connection issues
3. **Verify Environment Variables**: Ensure all `.env` files are properly configured
4. **Check Dependencies**: Ensure all packages are installed correctly

---

## 📝 Quick Start Checklist

- [ ] Node.js and npm installed
- [ ] MongoDB running (local or Atlas)
- [ ] Dependencies installed (`npm install`)
- [ ] Environment variables configured
- [ ] Backend server running (`npm run server`)
- [ ] Frontend server running (`npm start`)
- [ ] Application accessible at `http://localhost:3000`
- [ ] API responding at `http://localhost:5000/api/todos`

---

## 🎉 Success!

If you can see the TodoList application in your browser and can create/edit/delete todos, congratulations! Your setup is complete.

---

**Last Updated**: December 9, 2025
**Project Version**: 0.1.0
**Node.js Version**: v14+ required
**Package Manager**: npm@10.2.4
