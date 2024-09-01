# Music App

A full-stack music application built with React, Redux, Redux-Saga, Emotion CSS, and Node.js. This app allows users to upload, play, and manage music tracks, with user authentication and authorization. The backend is powered by Express.js and MongoDB, and the frontend is styled using Emotion, styled-systems,styled-components and Rebass.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Folder Structure](#folder-structure)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication:** Register, login, and manage user sessions with JWT.
- **Music Upload:** Upload music files to Cloudinary.
- **Music Management:** List, update, and delete music tracks.
- **Pagination:** Efficiently browse music with pagination.
- **Responsive Design:** Fully responsive UI using Emotion and Rebass.
- **User Profile:** Update user profile and manage account settings.
- **Search Functionality:** Search music by title, artist, album, or genre.

## Technologies

- **Frontend:**

  - React
  - Redux Toolkit
  - Redux-Saga
  - Emotion CSS, styled-systems,styled-components & Rebass
  - TypeScript

- **Backend:**
  - Node.js
  - Express.js
  - MongoDB & Mongoose
  - Cloudinary for file storage
  - JWT for authentication
  - bcrypt for password hashing

## Prerequisites

- Node.js (>=14.x)
- MongoDB (Local or Atlas)
- Cloudinary Account

## Getting Started

### Backend Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/abrsh6266/music-app.git
   cd music-app/backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file in the `backend` directory and add the following:

   ```env
   DBCONNECTION=your_mongodb_connection_string
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_APIKEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   TOKENKEY=your_jwt_secret_key
   ```

4. **Run the backend server:**

   ```bash
   npm run dev
   ```

   The backend server will start on `http://localhost:4000`.

### Frontend Setup

1. **Navigate to the frontend directory:**

   ```bash
   cd ../frontend
   ```

2. **Install dependencies for backend as well as for frontend:**

   ```bash
   npm install
   ```

3. **Run the frontend development server:**

   ```bash
   npm start
   ```

   The frontend server will start on `http://localhost:3000`.

## Environment Variables

The `.env` file in the backend directory should include:

```env
DBCONNECTION=your_mongodb_connection_string
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_APIKEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
TOKENKEY=your_jwt_secret_key
```

## Available Scripts

### Backend

- **`npm run dev`**: Runs the backend server in development mode.
- **`npm run start`**: Runs the backend server in production mode.

### Frontend

- **`npm run dev`**: Runs the frontend server in development mode.
- **`npm run build`**: Builds the frontend application for production.

## Folder Structure

```plaintext
music-app/
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── .env
│   ├── index.js
│   └── ...
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── features/
│   │   ├── pages/
│   │   ├── store/
│   │   └── ...
│   ├── public/
│   ├── .env
│   └── ...
└── README.md
```

## Endpoints

### User Endpoints

- **`POST /api/v1/users/register`**: Register a new user.
- **`POST /api/v1/users/login`**: Login an existing user.
- **`GET /api/v1/users/profile`**: Get the logged-in user's profile.
- **`PUT /api/v1/users/profile`**: Update the logged-in user's profile.
- **`DELETE /api/v1/users/profile`**: Delete the logged-in user's profile.

### Music Endpoints

- **`GET /api/v1/musics`**: Fetch all music tracks (with pagination).
- **`POST /api/v1/musics`**: Upload a new music track.
- **`PUT /api/v1/musics/:id`**: Update a music track by ID.
- **`DELETE /api/v1/musics/:id`**: Delete a music track by ID.
