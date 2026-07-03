# 🔌 API Design

## Overview

Telephonum exposes a RESTful API that enables users to upload customer support call recordings, monitor processing status, retrieve AI-generated insights, and view analytics.

The API follows REST conventions and returns JSON responses.

Base URL

```text
/api/v1
```

---

# Authentication

Authentication is handled using JWT.

Protected endpoints require:

```http
Authorization: Bearer <access_token>
```

---

# API Modules

| Module         | Purpose                      |
| -------------- | ---------------------------- |
| Authentication | User registration and login  |
| Calls          | Upload and manage recordings |
| Analysis       | AI-generated insights        |
| Dashboard      | Analytics and statistics     |

---

# Authentication

## Register

```http
POST /api/v1/auth/register
```

### Request

```json
{
  "name": "Harshdeep Singh",
  "email": "harsh@example.com",
  "password": "Password123"
}
```

### Response

```json
{
  "success": true,
  "message": "Account created successfully"
}
```

---

## Login

```http
POST /api/v1/auth/login
```

### Request

```json
{
  "email": "harsh@example.com",
  "password": "Password123"
}
```

### Response

```json
{
  "accessToken": "...",
  "user": {
    "id": "...",
    "name": "Harshdeep Singh",
    "role": "admin"
  }
}
```

---

## Get Current User

```http
GET /api/v1/auth/me
```

---

# Calls

## Upload Recording

```http
POST /api/v1/calls/upload
```

### Request

Multipart Form Data

```text
audio: recording.mp3
```

### Response

```json
{
  "success": true,
  "callId": "65ab123",
  "status": "PROCESSING"
}
```

The backend will:

* Save the recording
* Create a database record
* Add a BullMQ job
* Return immediately

---

## Get All Calls

```http
GET /api/v1/calls
```

Optional query parameters

```text
?page=1
&limit=20
&status=ANALYZED
```

### Response

```json
{
  "calls": [],
  "total": 42
}
```

---

## Get Call Details

```http
GET /api/v1/calls/:callId
```

Returns

* Call metadata
* Transcript (if available)
* Analysis (if available)

---

## Delete Call

```http
DELETE /api/v1/calls/:callId
```

Deletes

* Database records
* Stored audio file

---

# Analysis

## Get AI Analysis

```http
GET /api/v1/analysis/:callId
```

Example Response

```json
{
  "summary": "...",
  "qaScore": {
    "overall": 91,
    "communication": 90,
    "empathy": 87
  },
  "customerSentiment": {
    "overall": "Positive"
  },
  "resolution": {
    "resolved": true
  }
}
```

---

# Dashboard

## Dashboard Overview

```http
GET /api/v1/dashboard/overview
```

Returns

* Total Calls
* Calls Processed
* Average QA Score
* Average Customer Satisfaction

---

## Recent Calls

```http
GET /api/v1/dashboard/recent
```

Returns the latest analyzed calls.

---

## Analytics

```http
GET /api/v1/dashboard/analytics
```

Returns aggregated metrics for charts.

---

# Processing Flow

```text
POST /calls/upload
        │
        ▼
Save Audio
        │
        ▼
Create Call Record
        │
        ▼
BullMQ Job
        │
        ▼
Return Response
```

Background Worker

```text
Queue
    │
    ▼
AssemblyAI
    │
    ▼
Transcript
    │
    ▼
Gemini
    │
    ▼
Analysis
    │
    ▼
Update Call Status
```

---

# Standard Response Format

## Success

```json
{
  "success": true,
  "data": {}
}
```

---

## Error

```json
{
  "success": false,
  "message": "Something went wrong"
}
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Resource Created      |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 500  | Internal Server Error |

---

# Validation Rules

## Upload

* Audio formats: mp3, wav, m4a
* Maximum file size: 100 MB
* One recording per request

---

## Authentication

Password

* Minimum 8 characters
* At least one uppercase letter
* At least one lowercase letter
* At least one number

---

# Future Endpoints

These endpoints are planned for future releases and are **not** part of the MVP.

```http
GET    /api/v1/search

GET    /api/v1/reports

POST   /api/v1/reports/export

GET    /api/v1/agents

GET    /api/v1/organizations

POST   /api/v1/copilot/chat
```
