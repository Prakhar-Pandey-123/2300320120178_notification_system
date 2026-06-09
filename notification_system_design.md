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



-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------

# Stage 2

## Database Choice

For this notification system, I would prefer using MongoDB as the database.

MongoDB is suitable because:

* Notifications are simple document-based data
* Flexible schema support
* Faster development for full stack applications
* Good read and write performance

Since notifications may increase very quickly in a real system, MongoDB can scale better horizontally compared to traditional relational databases.

---

## Notification Schema

The notification collection can have the following structure:

```js id="urjlwm"
{
  studentId: "1642",
  title: "Placement Drive",
  message: "Amazon placement drive starts tomorrow",
  notificationType: "Placement",
  isRead: false,
  createdAt: Date
}
```

---

## Problems as Data Increases

As the number of students and notifications grows, some problems may occur:

* Slower query execution
* Increased database load
* Longer response times
* Difficulty in sorting large amounts of notifications
* Storage growth

---

## Solutions for Scaling

To improve performance at larger scale:

### 1. Indexing

Indexes can be added on:

* studentId
* createdAt
* isRead

This helps in faster searching and sorting.

---

### 2. Pagination

Instead of fetching all notifications at once, only limited notifications should be fetched.

Example:

* first 10 notifications
* next 10 notifications

This reduces server load.



## Example Queries

### Create Notification

```js id="7p2v6v"
db.notifications.insertOne({
  studentId: "1642",
  title: "Placement Drive",
  message: "Amazon placement drive starts tomorrow",
  notificationType: "Placement",
  isRead: false
})
```

---

### Fetch Notifications of a Student

```js id="p75k8r"
db.notifications.find({
  studentId: "1642"
})
```

---

### Mark Notification as Read

```js id="n6b2a4"
db.notifications.updateOne(
  { _id: 101 },
  {
    $set: {
      isRead: true
    }
  }
)
```



-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------


# Stage 3

## Query Analysis

```sql 
SELECT * FROM notifications
WHERE studentID = 1642 AND isRead = false
ORDER BY createdAt ASC;
```

This query is correct because it fetches unread notifications of a student and sorts them by time.

---

## Why is the Query Slow?

The database now has millions of notifications.

If proper indexing is not used, the database checks many rows one by one which makes the query slow.

Sorting also becomes slower when data size increases.

---

## Better Solution

A composite index can be added on:

* studentID
* isRead
* createdAt

```sql 
CREATE INDEX idx_notifications
ON notifications(studentID, isRead, createdAt);
```

This helps the database find data faster.

---

## Computation Cost

Without index:

* database scans many rows
* slower performance

With index:

* faster searching
* reduced scanning

---

## Should We Add Indexes on Every Column?

No.

Too many indexes can:

* increase storage
* slow down inserts and updates

Indexes should only be added on important columns that are searched frequently.

---

## Query for Placement Notifications in Last 7 Days

```sql 
SELECT  studentID
FROM notifications
WHERE notificationType = 'Placement'
AND createdAt >= NOW() - INTERVAL '7 days';
```



-----------------------------------------------------------------------------------------------------------
-----------------------------------------------------------------------------------------------------------


# Stage 4

## Problem

Currently, notifications are fetched from the database every time the page loads.

As the number of students increases, this creates:

* high database load
* slower API response
* poor user experience

---

## Solutions to Improve Performance

### 1. Pagination

Instead of fetching all notifications together, notifications can be loaded in smaller batches.

Example:

* first 10 notifications
* next 10 notifications

This reduces database load and improves response time.

---


### 2. Real-Time Notifications

Instead of repeatedly calling APIs, WebSockets or Socket.IO can be used.

When a new notification arrives:

* backend instantly pushes notification to frontend

Advantages:

* fewer API requests
* reduced database load
* better user experience

Tradeoff:

* persistent socket connections are required

---

### 3. Lazy Loading

Older notifications can be loaded only when the user scrolls down.

This improves frontend performance and reduces unnecessary data fetching.

---

## Conclusion

Using pagination, caching, and real-time updates together can significantly improve performance and reduce database load in large-scale notification systems.

