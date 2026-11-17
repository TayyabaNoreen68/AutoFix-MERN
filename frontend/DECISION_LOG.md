
# AutoFix - Database Technology Decision Log

## 1. Purpose

This document explains the database technology selected for the AutoFix Workshop Booking and Management System. It compares SQL and NoSQL databases and describes why MongoDB is suitable for this specific project.

## 2. Database Decision

**Selected Database: MongoDB (NoSQL)**

MongoDB was selected because AutoFix manages different types of information, including users, vehicles, services, and bookings. Its document-based structure provides flexibility when storing and updating this information.

Mongoose is used as the ODM to define schemas, validate data, and manage relationships between collections.

## 3. SQL vs NoSQL Comparison

| Feature | SQL Database | NoSQL Database |
|---|---|---|
| Data Structure | Tables and Rows | Documents and Collections |
| Schema | Fixed Schema | Flexible Schema |
| Relationships | Foreign Keys and Joins | References and Embedded Documents |
| Scaling | Commonly Vertical | Supports Horizontal Scaling |
| Data Format | Relational | JSON-like Documents |

## 4. Why MongoDB for AutoFix?

The AutoFix booking system contains users, vehicles, services, and booking records.

MongoDB is suitable for this use case for the following reasons:

- Flexible documents can store different booking details.
- Mongoose schemas provide validation and structured data.
- References between collections keep related records organized.
- Frequently accessed booking information can be queried using indexes.
- The database works naturally with the JavaScript-based MERN stack.

A relational database such as PostgreSQL would also be a valid option, especially when strict relational constraints and complex transactions are central requirements. MongoDB was selected for the flexibility and document-based structure needed for this project.

## 5. Collection Relationships

The database uses separate collections for Users, Vehicles, Services, and Bookings.

- One User can own multiple Vehicles.
- One User can create multiple Bookings.
- One Vehicle can have multiple Bookings over time.
- One Service can be selected in multiple Bookings.
- One Mechanic can be assigned to multiple Bookings.

ObjectId references are used to connect related documents without duplicating complete records unnecessarily.

## 6. Booking Query Indexing Strategy

Booking queries are important because customers and workshop administrators need to find bookings efficiently.

The following indexes are planned:

### Index 1: Booking Date and Status

`{ bookingDate: 1, status: 1 }`

Purpose: Helps administrators find bookings for a particular date and filter them by status, such as pending, confirmed, or completed.

### Index 2: Customer and Booking Date

`{ customer: 1, bookingDate: -1 }`

Purpose: Helps retrieve a customer's booking history, with recent bookings first.

### Index 3: Mechanic and Booking Date

`{ mechanic: 1, bookingDate: 1 }`

Purpose: Helps mechanics retrieve their assigned bookings in date order.

These indexes should be created in the Booking Mongoose schema and validated against actual query patterns. Indexes improve read performance but require additional storage and increase write costs, so unnecessary indexes should be avoided.

## 7. Trade-offs and Considerations

MongoDB provides flexibility, but it does not automatically enforce every relational constraint in the same way as a relational database.

The application must validate references and handle booking consistency carefully. For operations that require multiple documents to remain consistent, appropriate transaction handling may be needed.

Indexes also improve query performance at the cost of additional storage and write overhead.

## 8. Final Decision

MongoDB was selected for AutoFix because it provides a flexible document model, integrates with Mongoose and the MERN stack, and supports the project's user, vehicle, service, and booking data requirements.

The selected collection structure and booking indexes provide a maintainable foundation for the workshop booking system.
