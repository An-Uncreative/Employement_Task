# Student Election System

## Overview

This project is a supplementary system for managing student voter information for a university's student representative council election. It allows the admin to upload CSV or Excel files with student data, processes the data asynchronously, and stores it in a database. The system also notifies the admin via email once the data processing is complete.

## Features

- Upload CSV/Excel files containing student voter information.
- Asynchronous data processing to handle large files.
- Email notification to admin upon data processing completion.
- Display list of uploaded students in a table.

## Tech Stack

- **Backend**: Django, Django REST Framework, Celery, Redis, Pandas
- **Frontend**: React, Axios
- **Email Notifications**: Django email backend
- **Asynchronous Processing**: Celery with Redis

## Setup Instructions

### Backend Setup

1. **Clone the repository**:
    ```bash
    git clone https://github.com/your-username/notes-app.git
    cd notes-app/backend
    ```

2. **Create a virtual environment and install dependencies**:
    ```bash
    python -m venv venv
    source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
    pip install -r requirements.txt
    ```

3. **Run Redis**:
    ```bash
    redis-server
    ```

4. **Run Celery**:
    ```bash
    celery -A notes_project worker -l info
    celery -A notes_project beat -l info
    ```

5. **Run Django development server**:
    ```bash
    python manage.py runserver
    ```

### Frontend Setup

1. **Navigate to the frontend directory**:
    ```bash
    cd ../frontend
    ```

2. **Install dependencies**:
    ```bash
    npm install
    ```

3. **Start React development server**:
    ```bash
    npm start
    ```

## Deployment

### Frontend Deployment

Deploy the React app to a platform like Vercel or Netlify.

### Backend Deployment

Deploy the Django app to a platform like Heroku or Render.

## Configuration

### Email Settings

Configure email settings in `backend/notes_project/settings.py` to enable email notifications.

### Celery Configuration

Ensure that Celery and Redis are correctly configured for asynchronous task processing.
