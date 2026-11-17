
# AutoFix - MERN Stack Project

## 1. Project Overview
AutoFix is a vehicle service management system developed using the MERN Stack. It allows customers to manage their vehicles and book vehicle maintenance and repair services.

## 2. Technology Stack

- Frontend: React.js with Vite
- Backend: Node.js and Express.js
- Database: MongoDB
- ODM: Mongoose
- Authentication: JWT (JSON Web Token)
- Password Security: bcryptjs

## 3. Database Selection

MongoDB is selected as the database for AutoFix because it is a flexible NoSQL database that stores data in JSON-like documents.

Mongoose is used to define schemas, validate data, and manage relationships between collections.

## 4. System Architecture

AutoFix follows a three-tier architecture:

1. Presentation Layer: React.js frontend handles the user interface.
2. Application Layer: Node.js and Express.js handle API requests, business logic, and authentication.
3. Database Layer: MongoDB stores users, vehicles, services, and bookings.

### Architecture Flow

React Frontend
       |
       v
Express.js REST API
       |
       v
Node.js Backend
       |
       v
MongoDB Database

## 5. Project Structure

```text
AutoFix-Task/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middleware/
│   ├── models/
│   │   ├── User.js
│   │   ├── Vehicle.js
│   │   ├── Service.js
│   │   └── Booking.js
│   ├── routes/
│   │   └── auth.js
│   ├── .env
│   ├── .gitignore
│   ├── package.json
│   └── server.js
│
└── README.md
```

## 6. Database Schema Design

### User Collection
Stores customer and mechanic information.

Fields:
- name: String
- email: String (Unique)
- password: String (Hashed)

### Vehicle Collection
Stores vehicles registered by users.

Fields:
- owner: ObjectId (Reference to User)
- brand: String
- model: String
- year: Number
- registrationNumber: String (Unique)
- color: String

### Service Collection
Stores vehicle maintenance and repair services.

Fields:
- name: String
- description: String
- price: Number
- duration: Number
- isAvailable: Boolean

### Booking Collection
Stores customer service bookings.

Fields:
- customer: ObjectId (Reference to User)
- vehicle: ObjectId (Reference to Vehicle)
- service: ObjectId (Reference to Service)
- mechanic: ObjectId (Reference to User)
- bookingDate: Date
- status: String
- notes: String

## 7. Schema Relationships

- One User can own multiple Vehicles.
- One User can create multiple Bookings.
- One Vehicle can be associated with multiple Bookings over time.
- One Service can be selected in multiple Bookings.
- One Mechanic can be assigned to multiple Bookings.

### Relationship Diagram

User (1) -------- (Many) Vehicle

User (1) -------- (Many) Booking

Vehicle (1) ----- (Many) Booking

Service (1) ----- (Many) Booking

User / Mechanic (1) ---- (Many) Booking

## 8. Authentication

The backend uses JWT for user authentication.

Passwords are hashed using bcryptjs before being stored in MongoDB.

Authentication endpoints:

- POST /api/auth/signup
- POST /api/auth/login

## 9. Environment Variables

Create a `.env` file inside the backend directory:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/autofix
JWT_SECRET=your_secure_secret

## 10. Running the Project

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

## 11. Conclusion

The AutoFix project uses MERN architecture with MongoDB schema relationships to organize users, vehicles, services, and bookings. The architecture provides a foundation for developing a vehicle service management platform.
