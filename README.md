# Full Stack User Management Application

This is a full-stack application with a Spring Boot backend and vanilla JavaScript frontend for managing users.

## Features

- **Backend (Spring Boot)**:
  - RESTful API endpoints for CRUD operations
  - PostgreSQL database integration
  - JPA/Hibernate for data persistence
  - CORS configuration for frontend communication
  - Input validation

- **Frontend (Vanilla JavaScript)**:
  - Create, Read, Update, Delete users
  - Real-time table updates
  - Form validation
  - Responsive design
  - Modern UI with dark theme

## Prerequisites

- Java 17 or higher
- Maven
- PostgreSQL database
- Web browser

## Database Setup

1. Create a PostgreSQL database named `userdb`
2. Update the database credentials in `demo/src/main/resources/application.properties` if needed:
   ```properties
   spring.datasource.username=postgres
   spring.datasource.password=your_password
   ```

## Running the Application

### Backend (Spring Boot)

1. Navigate to the demo directory:
   ```bash
   cd demo
   ```

2. Run the Spring Boot application:
   ```bash
   mvn spring-boot:run
   ```

   The backend will start on `http://localhost:8080`

### Frontend

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. Serve the frontend files using a local server. You can use:
   - Python: `python -m http.server 5500`
   - Node.js: `npx serve -p 5500`
   - VS Code Live Server extension
   - Any other local server

3. Open your browser and go to `http://localhost:5500`

## API Endpoints

- `GET /api/users` - Get all users
- `GET /api/users/{id}` - Get user by ID
- `POST /api/users` - Create new user(s)
- `PUT /api/users/{id}` - Update user
- `DELETE /api/users/{id}` - Delete user
- `GET /api/users/page` - Get users with pagination

## Usage

1. **Create User**: Fill in the name and email fields, then click "Submit"
2. **View Users**: All users are displayed in the table below the form
3. **Edit User**: Click the "Edit" button next to any user to load their data into the form
4. **Update User**: Modify the form data and click "Update User"
5. **Delete User**: Click the "Delete" button next to any user to remove them
6. **Clear Form**: Click "Clear" to reset the form fields

## Project Structure

```
firstProject/
├── demo/                          # Spring Boot backend
│   ├── src/main/java/com/example/demo/
│   │   ├── Controller/            # REST controllers
│   │   ├── Model/                 # Entity classes
│   │   ├── Repository/            # Data access layer
│   │   └── FirstProjectApplication.java
│   └── src/main/resources/
│       └── application.properties # Database configuration
└── frontend/                      # Frontend files
    ├── index.html                 # Main HTML file
    ├── index.css                  # Styles
    └── index.js                   # JavaScript functionality
```

## Troubleshooting

- **CORS Issues**: Make sure the backend is running and CORS is properly configured
- **Database Connection**: Verify PostgreSQL is running and credentials are correct
- **Port Conflicts**: Ensure ports 8080 (backend) and 5500 (frontend) are available 