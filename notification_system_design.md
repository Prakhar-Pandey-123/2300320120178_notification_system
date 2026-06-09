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



-----------------------------------------------------------------------------------------------------------

# Stage 1

## Notification System API Design

The notification system is designed for a campus platform where students can receive updates related to placements, events, and results. The APIs are designed in a simple RESTful structure so that the frontend can easily consume them.

---

## 1. Create Notification

This API is used to create a new notification for a student.

### Endpoint

```txt
POST /api/notifications
```

### Headers

```txt
Content-Type: application/json
```

### Request Body

```json
{
  "studentId": "1642",
  "title": "Placement Drive",
  "message": "Amazon placement drive starts tomorrow",
  "notificationType": "Placement"
}
```

### Response

```json
{
  "success": true,
  "message": "Notification created successfully"
}
```

---

## 2. Get Notifications

This API is used to fetch all notifications of a student.

### Endpoint

```txt
GET /api/notifications/1642


### Headers

```txt
Content-Type: application/json


### Response

```json
{
  "success": true,
  "notifications": [
    {
      "title": "Placement Drive",
      "message": "Amazon placement drive starts tomorrow",
      "notificationType": "Placement",
      "isRead": false
    }
  ]
}
```

---

## 3. Mark Notification as Read

This API marks a notification as read after the student opens it.

### Endpoint

```txt
PUT /api/notifications/read/101
```

### Response

```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

---

## 4. Delete Notification

This API removes a notification.

### Endpoint

```txt
DELETE /api/notifications/101
```

### Response

```json
{
  "success": true,
  "message": "Notification deleted"
}
```

---

## Real-Time Notification Mechanism

For real-time notifications, WebSockets or Socket.IO can be used.

Whenever a new notification is created:

1. Backend stores notification in the database
2. Backend emits a real-time event
3. Frontend instantly receives and displays the notification without page refresh

This improves user experience and reduces repeated API calls.
