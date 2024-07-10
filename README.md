# Full-Stack Task Management System

This project is a full-stack application built using Next.js for the frontend and Nest.js for the backend. It includes functionalities such as user authentication, task management, and a dashboard to view and manage tasks.

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v12.x or newer)
- npm or Yarn
- Git

## Setup

To get this project up and running locally, follow these steps:

### 1. Clone the Repository

Start by cloning this repository to your local machine:

```bash
git clone https://github.com/NtimaniNhlanhla/task-management-system.git
cd task-management-system
```
## Frontend Setup

1. Navigate to the `frontend` directory.

```bash
cd frontend
```

2. Install the required dependencies.

```bash
npm install
```

3. Create an environment variable file (`.env`) in the `frontend` directory and define the following variables:

```bash
NEXT_PUBLIC_API_URL='http://localhost:5000'
```

## Backend Setup

1. Navigate to the `backend` directory.

```bash
cd backend
```

2. Install the required dependencies.

```bash
npm install
```

## Database Connection Details

1. Update the `backend/.env` file with your database configurations.

```bash
# Database configuration
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=576108
DATABASE_NAME=postgres
```

## Running the Application

1. Start the backend server. From the `backend` directory:

```bash
npm run start:dev
```
The backend server will start port 5000.  `http://localhost:5000`

2. Start the frontend development server. From the `frontend` directory:

```bash
npm run dev
```
The frontend development server will start, and you can access the application in your web browser at `http://localhost:3000`.

## User Registration and Login

To register an account browse to `http://localhost:3000/auth/signup', you will need to create an account using Name, Email and password.

To login in browse to `http://localhost:3000/auth/login` and enter in the email and password you created.



