# 🏗️ Telephonum Architecture

## Overview

Telephonum is an AI-powered Conversation Intelligence Platform designed to automate the quality assurance process for customer support teams.

The platform allows organizations to upload customer support call recordings, automatically transcribe conversations, analyze them using Large Language Models (LLMs), and present actionable insights through an analytics dashboard.

The architecture follows an **asynchronous, event-driven design**, allowing long-running AI tasks such as speech transcription and conversation analysis to execute in the background without blocking user requests.

---

# Architecture Goals

The system is designed around the following principles:

* Responsive user experience
* Modular architecture
* Separation of concerns
* Scalability
* Fault tolerance
* Extensibility
* Cloud-ready deployment

---

# High-Level Architecture

```text
                             ┌────────────────────────┐
                             │     React Frontend     │
                             └────────────┬───────────┘
                                          │
                                   HTTPS / REST API
                                          │
                                          ▼
                             ┌────────────────────────┐
                             │ Express API Server     │
                             └────────────┬───────────┘
                                          │
                   ┌──────────────────────┼──────────────────────┐
                   │                      │                      │
                   ▼                      ▼                      ▼
          Authentication           Upload Service        Analytics API
                   │                      │
                   │                      ▼
                   │              Object Storage
                   │           (Local → AWS S3)
                   │                      │
                   │                      ▼
                   │              BullMQ Queue
                   │                      │
                   │                      ▼
                   │              Background Worker
                   │                      │
                   │                      ▼
                   │           AssemblyAI Transcription
                   │                      │
                   │                      ▼
                   │            Transcript Processing
                   │                      │
                   │                      ▼
                   │            Gemini AI Analysis
                   │                      │
                   └──────────────────────┼──────────────────────┘
                                          ▼
                                     MongoDB
                                          │
                                          ▼
                                  React Dashboard
```

---

# Technology Stack

## Frontend

* React
* TypeScript
* Tailwind CSS
* React Query
* React Router
* Shadcn UI

### Responsibilities

* Authentication
* Audio Upload
* Dashboard
* Reports
* Analytics
* Transcript Viewer

---

## Backend

* Node.js
* Express.js

### Responsibilities

* Authentication
* Authorization
* File Upload API
* Job Creation
* API Endpoints
* Validation
* Error Handling

The backend is intentionally lightweight.

Its primary responsibility is to orchestrate services rather than perform heavy AI processing.

---

## Database

MongoDB stores application data including:

* Users
* Organizations
* Calls
* Transcripts
* AI Analysis
* Reports

Audio files are **not stored** inside MongoDB.

Only metadata and file references are stored.

---

## Object Storage

During development, uploaded audio recordings will be stored locally.

For production deployments, audio files will be stored in Amazon S3.

Reasons:

* Better scalability
* Lower storage cost
* Eases backup and lifecycle management
* Keeps the database lightweight

---

## Queue

BullMQ with Redis is responsible for asynchronous processing.

Why?

Speech transcription and AI analysis can take several seconds or minutes.

Without a queue, every upload request would remain open until processing completed, leading to poor user experience and timeout risks.

Instead:

1. User uploads audio.
2. API stores the file.
3. A background job is created.
4. The API immediately returns a processing status.
5. The worker completes processing asynchronously.

This architecture allows multiple conversations to be processed concurrently while keeping the application responsive.

---

# Worker Service

The Worker Service is responsible for all long-running processing.

Workflow:

```
Receive Job

↓

Load Audio

↓

Speech-to-Text

↓

Clean Transcript

↓

Gemini Analysis

↓

Store Results

↓

Update Job Status
```

Separating the worker from the API server allows each service to scale independently.

---

# AI Pipeline

The AI pipeline transforms an audio recording into structured business insights.

```
Customer Recording

↓

Speech Recognition

↓

Speaker Diarization

↓

Transcript Cleanup

↓

Prompt Construction

↓

Gemini Analysis

↓

Structured JSON

↓

MongoDB

↓

Dashboard
```

---

# AI Responsibilities

Gemini is responsible for generating structured insights including:

* Call Summary
* QA Score
* Customer Sentiment
* Agent Tone
* Customer Satisfaction Prediction
* Resolution Status
* Compliance Evaluation
* Coaching Recommendations

The application will require Gemini to return structured JSON rather than free-form text, making the results easier to validate, store, search, and visualize.

---

# Request Flow

## Upload Flow

```
Frontend

↓

POST /calls/upload

↓

Store Audio

↓

Create Queue Job

↓

Return Job ID

↓

Frontend Shows "Processing"
```

---

## Background Processing

```
BullMQ

↓

Worker

↓

AssemblyAI

↓

Transcript

↓

Gemini

↓

MongoDB

↓

Job Completed
```

---

## Dashboard Flow

```
User Opens Dashboard

↓

Frontend Requests Calls

↓

Express API

↓

MongoDB

↓

Return Analytics

↓

Display Dashboard
```

---

# Error Handling Strategy

The system should be resilient to failures.

Examples include:

### Upload Failure

* Return descriptive validation errors.
* Do not create queue jobs.

### Transcription Failure

* Mark the job as failed.
* Record the failure reason.
* Allow retry.

### Gemini Failure

* Retry the analysis.
* Log the error.
* Preserve the transcript for later processing.

### Worker Failure

* Jobs remain in the queue.
* Processing resumes when the worker restarts.

---

# Scalability Considerations

The architecture is designed so that each component can scale independently.

Examples:

* Multiple API servers behind a load balancer.
* Multiple BullMQ workers processing jobs concurrently.
* Amazon S3 for scalable object storage.
* MongoDB Atlas for managed database scaling.

This separation enables Telephonum to support increasing workloads without major architectural changes.

---

# Security Considerations

* JWT-based authentication
* Password hashing
* Input validation
* File type validation
* File size limits
* Secure object storage
* Environment variables for secrets
* HTTPS in production

Future enhancements:

* Role-Based Access Control (RBAC)
* Audit logging
* Rate limiting
* PII masking before AI processing

---

# Future Architecture

The initial MVP focuses on offline analysis of uploaded recordings.

Future versions may introduce:

* Real-time call analysis
* WebSocket-based live updates
* AI Manager Copilot
* Semantic search using vector embeddings
* CRM integrations
* Multi-language support

The current architecture has been designed to support these additions with minimal changes.

---

# Architecture Summary

Telephonum follows a modular, asynchronous architecture where each component has a clearly defined responsibility.

The API server handles client communication, the queue manages long-running jobs, the worker executes AI processing, MongoDB stores structured results, and the frontend presents insights through a modern analytics dashboard.

This architecture prioritizes responsiveness, scalability, maintainability, and future extensibility while remaining practical for a full-stack portfolio project.
