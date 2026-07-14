# Student Management System

## Overview

The Student Management System is a full-stack web application developed using the MERN stack. It enables efficient management of student records through a user-friendly interface and provides complete CRUD (Create, Read, Update, Delete) functionality. The application is integrated with MongoDB Atlas for cloud-based data storage and follows a RESTful architecture.

---

## Features

- Add new student records
- View all student records
- Update existing student information
- Delete student records
- Search students by name
- Filter students by department and year
- Pagination for better data management
- Dashboard with student statistics
- Responsive user interface
- MongoDB Atlas cloud database integration

---

## Technology Stack

### Frontend

- React.js
- Vite
- Bootstrap 5
- Axios
- React Router DOM

### Backend

- Node.js
- Express.js

### Database

- MongoDB Atlas
- Mongoose

### Development Tools

- Git
- GitHub
- Visual Studio Code
- Postman
- npm

---

## Project Structure

```
SMS_FullStack
│
├── client
│   ├── src
│   ├── public
│   └── package.json
│
├── server
│   ├── config
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── services
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## Installation

### Clone the Repository

```bash
git clone https://github.com/vinayagamvarshini65-create/Student-Management-System.git
```

### Navigate to the Project

```bash
cd Student-Management-System/SMS_FullStack
```

### Install Backend Dependencies

```bash
cd server
npm install
```

### Start Backend Server

```bash
npm run dev
```

### Install Frontend Dependencies

```bash
cd ../client
npm install
```

### Start Frontend

```bash
npm run dev
```

---

## Environment Variables

Create a `.env` file inside the `server` folder and configure the following variables.

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

## REST API Endpoints

### Student Management

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/students | Retrieve all students |
| POST | /api/students | Create a student |
| PUT | /api/students/:id | Update a student |
| DELETE | /api/students/:id | Delete a student |

---

## Future Enhancements

- User Authentication using JWT
- Role-Based Access Control
- Profile Image Upload
- Export Student Records to Excel/PDF
- Email Notifications
- Advanced Search and Filtering

---
## License

This project is developed for educational and portfolio purposes.
