# Notification System Design

## Architecture

Frontend -> Backend -> MongoDB

The frontend is built using React and communicates with the backend using REST APIs.

The backend is built using Express.js and handles notification creation and retrieval.

MongoDB is used for storing notifications.

---

## Notification Flow

1. User enters notification data in frontend
2. Frontend sends request to backend API
3. Backend stores data in MongoDB
4. Backend sends response to frontend
5. Logging middleware logs API activity

---

## Logging Middleware

A reusable logging middleware was implemented using the provided evaluation API.

The logger sends:

* stack
* level
* package
* message

using the provided access token.

---

## Database Schema

Notification Schema:

* title
* message
* read
* createdAt
* updatedAt

---

## APIs

### Create Notification

POST /api/notifications

### Get Notifications

GET /api/notifications
