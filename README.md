## HMCTS Task Manager – Frontend

### Overview

This project is a Next.js frontend application consuming the HMCTS Task API. It provides a user interface for creating, viewing, updating and deleting tasks.

The frontend focuses on clean state management, validation handling, and RESTful API integration.

### Tech Stack

	•	Next.js (App Router)
	•	TypeScript
	•	Fetch API
	•	Tailwind CSS

### Features
	•	Create tasks
	•	Display paginated tasks
	•	Filter tasks by status
	•	Update task status
	•	Delete tasks
	•	Graceful handling of backend validation errors
	•	State-driven pagination

### Prerequisites
	•	Node.js 18+
	•	npm or yarn

### Installation & Setup

#### 1. Clone repository

git clone https://github.com/YOUR_USERNAME/hmcts-task-frontend.git
cd hmcts-task-frontend

##### 2. Install dependencies
npm install

#### 3. Configure environment

Create .env.local file:

NEXT_PUBLIC_API_URL=http://127.0.0.1:8000/api

#### 4. Run Development Server
```bash
npm run dev
```

Application will be available at:

http://localhost:3000

## Project Structure
	•	app/ – Application pages
	•	components/ – Reusable UI components
	•	lib/ – API service functions
	•	types/ – Shared TypeScript types

## Design Decisions
	•	API logic is abstracted into a lib/ folder to separate UI from network concerns.
	•	Backend validation errors (422 responses) are handled gracefully without crashing the UI.
	•	Pagination state is managed locally and synchronised with API responses.
	•	The implementation prioritises clarity and maintainability over unnecessary complexity.

## Possible Future Enhancements
	•	Authentication integration
	•	Optimistic UI updates
	•	Improved UI styling
	•	Toast notifications
	•	URL query synchronisation
