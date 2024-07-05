<p align="center">
     <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Threads_%28app%29.svg/1200px-Threads_%28app%29.svg.png" alt="alt text" width="50"/>
</p>


# Threads Clone with MERN Stack

## Introduction

This project is a UI clone of Threads, created using the MERN stack. It serves as a practical exercise for brushing up on the MERN stack concepts and implementing state management with Recoil and real-time chatting with Socket.IO.

## Features

- **User Authentication:** Sign up, log in, and log out functionality.
- **User Profiles:** Users can view and edit their profiles.
- **Posts:** Create, read, update, and delete posts.
- **Likes and Comments:** Like posts and comment on them in real-time.
- **Real-Time Chat:** Real-time messaging using Socket.IO.
- **State Management:** Managed with Recoil.

## Tech Stack

- **Frontend:**
  - React
  - Recoil for state management
  - Socket.IO-client for real-time chat features
- **Backend:**
  - Node.js
  - Express.js
  - MongoDB
  - Socket.IO for real-time chat features
- **Authentication:**
  - JWT (JSON Web Tokens)

## Getting Started

### Prerequisites

Make sure you have the following installed on your local machine:

- Node.js
- MongoDB

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/mukundmadhav054/threads-clone.git
    ```

2. Navigate to the project directory:

    ```bash
    cd threads-clone
    ```

3. Install dependencies for both frontend and backend:

    ```bash
    # Install backend dependencies
    cd server
    npm install

    # Install frontend dependencies
    cd ../client
    npm install
    ```

### Configuration

1. Create a `.env` file in the `server` directory and add the following:

    ```env
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    ```

2. Update the `client/.env` file with your backend URL.

### Running the Application

1. Start the backend server:

    ```bash
    cd server
    npm run dev
    ```

2. Start the frontend development server:

    ```bash
    cd ../client
    npm run dev
    ```

The application should now be running on `http://localhost:5173`.

## Special Thanks

A special thanks to [As a Programmer](https://www.youtube.com/@asaprogrammer_) for providing the tutorial. The resources were incredibly helpful and easy to follow.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request.
