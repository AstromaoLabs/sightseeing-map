### **Sightseeing Map API Key Authentication: How to Use and Test**
*Includes `users` app documentation as guide*

This documentation outlines the steps for setting up, using, and testing your Django API with API Key authentication. It includes all necessary steps for local testing, including how to temporarily disable API key protection to create a superuser and generate a token for managing API keys.

---

### **1. Setting Up the Backend Locally**

#### **Step 1. Set Up a Virtual Environment (if you haven't yet)**
```bash
cd backend/
python -m venv venv # or python3 
source venv/bin/activate  # Use venv\Scripts\activate on Windows
```

#### **Step 2. Install Dependencies**
```bash
pip install -r requirements.txt
```

#### **Step 3. Run Migrations**
Prepare the database:
```bash
python manage.py makemigrations
python manage.py migrate
```

---

### **2. Temporarily Allow Access to Create a Superuser**

To create a superuser, we need to temporarily disable API key protection on the `/login/` endpoint.

#### **Step 1. Modify `LoginAPI` to Allow Any User**
In `users/views.py`, update the `permission_classes` for `LoginAPI`:
```python
class LoginAPI(APIView):
    '''
    Temporarily allow login without API key for superuser creation.
    '''
    permission_classes = [permissions.AllowAny]  # Disable API key protection temporarily byusing this line
    originally you will see `permission_classes = [HasValidAPIKey]`here.

    def post(self, request):
        serializer = LoginSerializer(data=request.data)
        if serializer.is_valid():
            return Response(serializer.validated_data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
```

#### **Step 2. Create a Superuser**
Run the following command to create an admin user:
```bash
python manage.py createsuperuser
```
- Follow the prompts to set up a username, email, and password.

#### **Step 3. Start the Server**
Run the Django development server:
```bash
python manage.py runserver
```

#### **Step 4. Log In as Superuser**
Use Postman to obtain the admin token:

**Request**:
- **Method**: `POST`
- **URL**: `http://127.0.0.1:8000/api/v1/users/login/`
- **Headers**:
  ```
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "username": "<superuser_username>",
    "password": "<superuser_password>"
  }
  ```

**Response**:
```json
{
    "username": "admin",
    "token": {
        "refresh": "refresh_token_here",
        "access": "admin_access_token_here"
    }
}
```

Copy the `access` token for the next step.

---

### **3. Restore API Key Protection**

Once the superuser and token are created, restore the API key protection by reverting the `permission_classes` in `LoginAPI` to:
```python
permission_classes = [HasValidAPIKey]
```

---

### **4. Generate an API Key**

Use the admin access token to create an API key for the React app.

**Request**:
- **Method**: `POST`
- **URL**: `http://127.0.0.1:8000/api/v1/keys/create/`
- **Headers**:
  ```
  Authorization: Bearer admin_access_token_here
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "name": "React App"
  }
  ```

**Response**:
```json
{
    "id": 1,
    "key": "your_generated_api_key",
    "name": "React App",
    "created_at": "2024-12-24...",
    "is_active": true
}
```

Save the `key` value (`your_generated_api_key`) for use in your local environment or Postman requests.

---

### **5. Testing API Endpoints**

#### **Setup in Postman**
For all requests, include:
1. **Headers**:
   ```
   X-API-KEY: your_generated_api_key
   Content-Type: application/json
   ```

#### **Endpoint Tests**

##### **1. Create a New User (Register)**
**Request**:
- **Method**: `POST`
- **URL**: `http://127.0.0.1:8000/api/v1/users/register/`
- **Headers**:
  ```
  X-API-KEY: your_generated_api_key
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "username": "test_api",
    "email": "test_api@example.com",
    "password": "securepassword123"
  }
  ```

**Expected Response**:
```json
{
    "id": 1,
    "username": "test_api",
    "email": "test_api@example.com"
}
```

---

##### **2. Log In a User**
**Request**:
- **Method**: `POST`
- **URL**: `http://127.0.0.1:8000/api/v1/users/login/`
- **Headers**:
  ```
  X-API-KEY: your_generated_api_key
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "username": "test_api",
    "password": "securepassword123"
  }
  ```

**Expected Response**:
```json
{
    "username": "test_api",
    "token": {
        "refresh": "refresh_token_here",
        "access": "access_token_here"
    }
}
```

---

##### **3. Get User Details**
**Request**:
- **Method**: `GET`
- **URL**: `http://127.0.0.1:8000/api/v1/users/me/`
- **Headers**:
  ```
  X-API-KEY: your_generated_api_key
  Authorization: Bearer access_token_here
  ```

**Expected Response**:
```json
{
    "id": 1,
    "username": "test_api",
    "email": "test_api@example.com"
}
```

---

##### **4. Log Out a User**
**Request**:
- **Method**: `POST`
- **URL**: `http://127.0.0.1:8000/api/v1/users/logout/`
- **Headers**:
  ```
  X-API-KEY: your_generated_api_key
  Authorization: Bearer refresh_token_here
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "refresh": "refresh_token_here"
  }
  ```

**Expected Response**:
```json
{
    "message": "Successfully logged out"
}
```

---

### **6. Error Handling**

- **Missing API Key**:
  ```json
  {
    "detail": "No API key provided in the request headers.",
    "default_code": "missing_api_key"
  }
  ```

- **Invalid API Key Format**:
  ```json
  {
    "detail": "The provided API key has an invalid format.",
    "default_code": "invalid_api_key_format"
  }
  ```

- **Non-Existent or Inactive API Key**:
  ```json
  {
    "detail": "The provided API key is invalid or inactive.",
    "default_code": "invalid_or_inactive_api_key"
  }
  ```

---

### **Final Notes**
1. Always include the `X-API-KEY` header in requests.
2. Developers can use Postman or curl to test endpoints.
3. Remember to change temporary snippets (like `AllowAny`) once setup is complete. (Important if opening a PR and to make sure the code works as intended)
