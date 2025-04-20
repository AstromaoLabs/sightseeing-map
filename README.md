# **Sightseeing Map**

## **Overview**
This project is a collaborative Django + React application designed to help users especially local users discover and share their favorite sightseeing spots, restaurants and cafes. The app integrates geolocation to pinpoint the user's current location, displays nearby places of interest, and provides detailed information such as ratings, reviews, opening hours, and pictures. We will put effort into reviews. Users can write their very detailed reviews. For example, what they experienced, how the atomosphere looks like, how did you feel and so on including pictures. Users can filter spots based on proximity and categories, making it a convenient tool for discovering restaurants, cafes, and attractions nearby.

---

## **Features**

### **Geolocation**
- Automatically detects the user's location using the browser's **Geolocation API**.
- Displays the user's position as a pin on an interactive map.

### **Spot Visualization**
- Plots nearby places (e.g., restaurants, sightseeing spots, cafes) on the map using styled markers.
- Provides visually appealing marker designs, including circled pins.

### **Filtering and Listing**
- Fetches place data from the backend API and applies filters:
  - By proximity (e.g., within 30 minutes by foot).
  - By category (e.g., restaurants, activities).
- Displays a scrollable list with details:
  - Name
  - Image
  - Distance
  - Rating stars.

### **Spot Details**
- Clicking on a marker opens a detailed view of the selected spot.
- Displays:
  - Name of the place.
  - Ratings and reviews.
  - Opening hours.
  - Pictures and additional details.

### **User Reviews**
- Enables users to submit reviews through a simple form.
  -  Structure includes:
  - Pros / Cons
  - Atmosphere
  - Service / quality
  - What did you experienced
  - rating option
- Stores reviews in the database via the backend API.

### **Mobile-Friendly UI**
- Fully responsive design for mobile and desktop users.
- Displays error messages when geolocation fails or data cannot be fetched.

---

## **Future Enhancements**
- Advanced search features (e.g., filters by specific amenities).
- Support for multiple languages.
- Enhanced map interactivity (e.g., draggable markers, dynamic routes).

---

## **Technology Stack**
- **Backend**: Django with Django REST Framework (DRF), python
  - Handles API endpoints for location data, filtering, and spot details.
- **Frontend**: Next.js
  - Displays maps, handles filtering, and manages user interactions.
  - Integrated with backend APIs.

- **Database**: Mongo DB
 - Get the place information from google place API
 - CRUD from frontend side
 - User database

---

## **Setup and Installation**

### **Prerequisites**
- Python 3.8+
- Node.js 16+

### **Backend Setup**
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
     GOOGLE_PLACES_API_KEY=your-google-api-key
     ```
   - Replace `your-secret-key` with a secure Django `SECRET_KEY`.
   - Replace `your-google-api-key` with the key from Google Cloud Console.

4. **Set Up the Database**:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

5. **Run the Django Development Server**:
   ```bash
   python manage.py runserver
   ```

### **Frontend Setup**
1. **Navigate to the `frontend/` Directory**:
   ```bash
   cd frontend/
   ```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Start the Frontend Development Server**:
   ```bash
   npm start
   ```

---

## **Development Workflow**
To ensure a smooth and collaborative workflow, follow the guidelines in our [CONTRIBUTING.md](CONTRIBUTING.md) file.  

Key highlights:
- Work on feature branches.
- Use descriptive commit messages and link issues to pull requests.
- Test your changes thoroughly before submitting a pull request.

---

## **Collaborators**

- **Frontend Developer**: [Soki Iwae](https://github.com/Sochan2), [Kim](https://github.com/kyoushiro3)
  - Main responsibilities: Designing and implementing the user interface with React, TailwindCSS, and API integration.
- **Backend/DevOps Developer**: [Anthony Em](https://github.com/AnSiChen), [Kim](https://github.com/kyoushiro3)
  - Main responsibilities: Backend functionality using Django, setting up Google Places API, and managing deployments.

---

## **License**
This project is currently not licensed. For inquiries about usage or contributions, please contact us.

---

### **Notes**
- Ensure sensitive data (e.g., API keys) is never committed to the repository.  
- For further guidance on contribution and workflow, see the [CONTRIBUTING.md](CONTRIBUTING.md) file.  
- If you encounter issues, feel free to raise them on the [Issues page](https://github.com/AstromaoLabs/sightseeing-map/issues).