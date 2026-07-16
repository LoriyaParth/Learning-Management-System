# Learning Management System (LMS)

A full-stack Learning Management System built with a React frontend and an Express/MongoDB backend.

## Project Structure

This repository is divided into two main directories:

- **`Client`**: Contains the React frontend application.
- **`Server`**: Contains the Node.js/Express backend API.

## Technologies Used

### Frontend (`Client`)
- **React (v19)**: UI library for building user interfaces.
- **Vite**: Next-generation frontend tooling for fast development.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **daisyUI**: Component library for Tailwind CSS.
- **React Router DOM**: Declarative routing for React applications.
- **Lucide React / React Icons**: Icon libraries.

### Backend (`Server`)
- **Node.js & Express.js**: Server environment and web framework.
- **MongoDB & Mongoose**: NoSQL database and Object Data Modeling (ODM) library.
- **bcryptjs**: Library for hashing and securing passwords.
- **CORS**: Middleware to enable Cross-Origin Resource Sharing.
- **dotenv**: Module to load environment variables from a `.env` file.

## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) installed on your machine.
- [MongoDB](https://www.mongodb.com/) (running locally or a cloud instance like MongoDB Atlas).

### Installation & Setup

#### 1. Backend Setup (`Server`)
1. Open a terminal and navigate to the `Server` directory:
   ```bash
   cd Server
   ```
2. Install the backend dependencies:
   ```bash
   npm install
   ```
3. Ensure your MongoDB connection string and any other required environment variables are set up in a `.env` file inside the `Server` folder (e.g., `MONGO_URI`, `PORT`).
4. Start the backend server (typically with `node server.js` or a defined npm script).

#### 2. Frontend Setup (`Client`)
1. Open a new terminal window and navigate to the `Client` directory:
   ```bash
   cd Client
   ```
2. Install the frontend dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to the local URL provided by Vite (usually `http://localhost:5173`).
