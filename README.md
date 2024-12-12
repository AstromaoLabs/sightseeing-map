# Sightseeing Map

## Overview
This project is a collaborative Django + React application designed to help users explore and review local sightseeing spots. The app integrates geolocation to pinpoint the user's current location, displays nearby places of interest, and provides detailed information such as ratings, reviews, opening hours, and pictures. Users can filter spots based on proximity and categories, making it a convenient tool for discovering restaurants, cafes, and attractions around.

---

## Features

### **First Function: Geolocation**
- Automatically detects the user's location using the browser's **Geolocation API**.
- Displays the user's position as a pin on an interactive map.

### **Second Function: Spot Visualization**
- Plots nearby places (e.g., restaurants, sightseeing spots, cafes) on the map using styled markers.
- Incorporates circled markers for a visually appealing design.

### **Third Function: Filtering and Listing**
- Fetches place data from a backend API and filters results:
  - By proximity (e.g., within 30 minutes by foot).
  - By category (e.g., restaurants, activities).
- Displays a scrollable list with details:
  - Name
  - Image
  - Distance
  - Evaluation stars.

### **Fourth Function: Spot Details**
- Clicking on a marker opens a detailed view of the selected spot.
- Displays:
  - Name of the place.
  - Ratings and reviews.
  - Opening hours.
  - Pictures and additional details.

### **Fifth Function: User Reviews**
- Enables users to submit reviews through a simple form.
- Stores reviews in the database via a backend API.

### **Sixth Function: Mobile-Friendly UI**
- Fully responsive design for mobile and desktop users.
- Displays error messages when geolocation fails or data cannot be fetched.

---

## Future Enhancements
- Improve UI/UX for enhanced interactivity.

---

## Technology Stack
- **Backend**: Django with Django REST Framework (DRF)
  - Handles API endpoints for location data, filtering, and spot details.
- **Frontend**: React
  - Displays maps and spot details.
  - Handles filtering and user interactions.

---

## Setup and Installation

### Prerequisites
- Python 3.8+
- Node.js 16+

### Backend Setup

1. **Navigate to the `backend/` Directory**:
   ```bash
   cd backend/
   ```

2. **Create a Virtual Environment and Install Dependencies**:
   ```bash
   python -m venv env
   source env/bin/activate  # Use `env\Scripts\activate` on Windows
   pip install -r requirements.txt
   ```

3. **Set Up Environment Variables**:
   - Create a `.env` file in the `backend/` directory.
   - Add the following content:
     ```plaintext
     DJANGO_SECRET_KEY=your-secret-key
     ```
   - Replace `your-secret-key` with the secure `SECRET_KEY` shared by the team or generated using Django's `get_random_secret_key()` utility.

4. **Set Up the Database**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run the Django Development Server**:
   ```bash
   python manage.py runserver
   ```

### Frontend Setup
1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend/
   ```

### Notes:
- **Environment Variables**:
  - The `.env` file is included in `.gitignore` to prevent sensitive information from being exposed.
  - Ensure all sensitive variables (e.g., API keys) are stored securely.

- **Verify Installation**:
  - If the server runs without issues, your environment is correctly configured.

---

## Deployment
### Staging
The app will be deployed for testing and development purposes.

### Production
(Not yet available at this stage.)

---

## Collaborators

- **Frontend Developer**: [Soki Iwae](https://github.com/Sochan2)
  - Main responsibilities: Designing and implementing the user interface using React and TailwindCSS, and integrating APIs such as geolocation and backend endpoints built with Django.
- **Backend/DevOps Developer**: [Anthony Em](https://github.com/AnSiChen)
  - Main responsibilities: Implementing and engineering backend functionality with Django, Dockerized deployment, and setting up CI/CD workflows.

---

## License
This project is not currently licensed. For inquiries about usage or contributions, please contact us.