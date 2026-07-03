# 🗄️ Database Design

## Overview

Telephonum uses **MongoDB** as its primary database.

The platform stores structured information about users, uploaded calls, transcripts, and AI-generated analysis. Audio recordings themselves are **not stored in MongoDB**. Instead, they are stored in object storage (local storage during development and AWS S3 in production), while MongoDB stores only the file metadata and reference.

The MVP intentionally keeps the database simple with four collections.

---

# Database Principles

The database is designed around the following principles:

* One collection should have one responsibility.
* Store structured AI output instead of plain text whenever possible.
* Avoid duplicate data.
* Keep audio storage separate from application data.
* Design for future scalability.

---

# Database Collections

| Collection    | Purpose                                       |
| ------------- | --------------------------------------------- |
| `users`       | Authentication and user management            |
| `calls`       | Metadata for uploaded audio recordings        |
| `transcripts` | Speech-to-text output and speaker information |
| `analyses`    | Structured AI-generated insights              |

---

# Entity Relationship

```text
User
 │
 │ uploads
 ▼
Call
 ├──────────────► Transcript
 │
 └──────────────► Analysis
```

Each uploaded call has:

* One transcript
* One AI analysis

---

# Collection: users

## Purpose

Stores application users who can upload calls and access analytics.

## Fields

| Field       | Type     | Description                    |
| ----------- | -------- | ------------------------------ |
| `_id`       | ObjectId | Unique identifier              |
| `name`      | String   | Full name                      |
| `email`     | String   | Unique email address           |
| `password`  | String   | Hashed password                |
| `role`      | String   | User role (`admin`, `manager`) |
| `createdAt` | Date     | Creation timestamp             |
| `updatedAt` | Date     | Last update timestamp          |

## Indexes

* `email` (Unique)

---

# Collection: calls

## Purpose

Represents a single uploaded customer support recording.

This collection stores metadata about the recording but **does not contain transcripts or AI analysis**.

## Fields

| Field              | Type     | Description                  |
| ------------------ | -------- | ---------------------------- |
| `_id`              | ObjectId | Unique identifier            |
| `uploadedBy`       | ObjectId | Reference to User            |
| `originalFileName` | String   | Uploaded filename            |
| `storageUrl`       | String   | Audio file location          |
| `duration`         | Number   | Recording duration (seconds) |
| `language`         | String   | Detected language            |
| `status`           | String   | Processing status            |
| `createdAt`        | Date     | Upload timestamp             |
| `updatedAt`        | Date     | Last update timestamp        |

## Processing Status

```text
UPLOADED
PROCESSING
TRANSCRIBED
ANALYZED
FAILED
```

## Indexes

* `uploadedBy`
* `status`
* `createdAt`

---

# Collection: transcripts

## Purpose

Stores the speech-to-text output generated from the uploaded audio.

Keeping transcripts separate allows AI analysis to be regenerated later without repeating transcription.

## Fields

| Field            | Type     | Description                           |
| ---------------- | -------- | ------------------------------------- |
| `_id`            | ObjectId | Unique identifier                     |
| `callId`         | ObjectId | Reference to Call                     |
| `fullTranscript` | String   | Complete transcript                   |
| `speakers`       | Array    | Speaker-separated transcript segments |
| `wordCount`      | Number   | Total words                           |
| `createdAt`      | Date     | Creation timestamp                    |

## Speaker Object

```json
{
  "speaker": "Agent",
  "text": "Hello, how may I help you today?",
  "start": 1200,
  "end": 4600
}
```

Where:

* `start` = start time in milliseconds
* `end` = end time in milliseconds

## Indexes

* `callId`

---

# Collection: analyses

## Purpose

Stores structured AI-generated insights created from the transcript.

This data powers dashboards, filtering, reports, and future analytics.

## Fields

| Field               | Type     | Description                    |
| ------------------- | -------- | ------------------------------ |
| `_id`               | ObjectId | Unique identifier              |
| `callId`            | ObjectId | Reference to Call              |
| `summary`           | String   | AI-generated summary           |
| `qaScore`           | Object   | Quality score breakdown        |
| `customerSentiment` | Object   | Sentiment analysis             |
| `agentTone`         | String   | Agent communication style      |
| `resolution`        | Object   | Whether the issue was resolved |
| `compliance`        | Object   | Compliance evaluation          |
| `coaching`          | Array    | Coaching recommendations       |
| `createdAt`         | Date     | Analysis timestamp             |

---

## Example QA Score

```json
{
  "communication": 91,
  "empathy": 87,
  "professionalism": 95,
  "ownership": 89,
  "listening": 92,
  "overall": 91
}
```

---

## Example Sentiment

```json
{
  "overall": "Positive",
  "confidence": 0.94
}
```

---

## Example Resolution

```json
{
  "resolved": true,
  "confidence": 0.91
}
```

---

## Example Compliance

```json
{
  "greeting": true,
  "identityVerification": true,
  "closingStatement": false
}
```

---

## Example Coaching

```json
[
  "Show more empathy during issue clarification.",
  "Provide clearer next steps before ending the call."
]
```

## Indexes

* `callId`
* `createdAt`

---

# Data Flow

```text
Upload Audio
      │
      ▼
calls
      │
      ▼
Background Worker
      │
      ▼
AssemblyAI
      │
      ▼
transcripts
      │
      ▼
Gemini
      │
      ▼
analyses
      │
      ▼
Dashboard
```

---

# Why Separate These Collections?

## Why keep transcripts separate?

Transcription is typically more expensive and time-consuming than generating AI insights.

If prompts change or a better LLM becomes available, Telephonum can regenerate the analysis without retranscribing the original audio.

---

## Why keep analysis separate?

Analysis results evolve over time.

Future versions of Telephonum may support multiple AI models, versioned prompts, or re-analysis without affecting the original transcript.

---

## Why not store audio in MongoDB?

Audio files are large binary assets.

Object storage is more cost-effective, scalable, and better suited for serving media files.

MongoDB stores only metadata and the storage reference.

---

# Summary

The MVP database consists of four collections:

* **users** → authentication and access
* **calls** → uploaded recording metadata
* **transcripts** → speech-to-text output
* **analyses** → AI-generated business insights

This separation of responsibilities keeps the system modular, simplifies future enhancements, and allows Telephonum to evolve without major database redesigns.
