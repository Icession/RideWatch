# 🚨 RideWatch

**A Ride Safety Web Application for Commuters with Admin Dashboard**

RideWatch is a full-stack application built with React frontend and Spring Boot backend to improve personal safety for commuters. It provides emergency alerting, contact management, real-time notifications, and a comprehensive admin dashboard — all in a clean, mobile-friendly interface.

---

## ✨ Features

### User Features
- **SOS Emergency Alert** — Sends an email alert with the user's live GPS coordinates via EmailJS and the browser Geolocation API
- **Emergency Contacts Manager** — Add, edit, and manage personal emergency contacts with shared state across components
- **Notifications Center** — View and manage safety-related notifications in one place
- **Trip History** — Track your rides with distance, duration, and route details
- **Tab-Based Navigation** — Smooth SPA experience with React Router and a persistent layout
- **Account Management** — Manage profile and safety settings

### Admin Features
- **Dashboard Statistics** — View real-time metrics on users, trips, safety scores, and alerts
- **User Management** — Monitor all users, view detailed profiles, and manage user status
- **Trip Analytics** — Analyze trip history and distance traveled across the platform
- **Emergency Alert Monitoring** — Track all emergency alerts and identify failed ones
- **FAQ Management** — Create, edit, and manage FAQs with categories and display order

---

## 🛠 Tech Stack

### Frontend
- **React 19** — UI framework
- **React Router 7** — Client-side routing
- **Leaflet & React Leaflet** — Interactive maps
- **EmailJS** — Email notifications
- **Axios** — HTTP client
- **React Toastify** — Toast notifications
- **Custom CSS** — Responsive styling

### Backend
- **Java 17** — Programming language
- **Spring Boot 3.3** — Framework
- **Spring Security** — Authentication & authorization
- **JWT** — Token-based authentication
- **Spring Data JPA** — ORM
- **PostgreSQL** — Database (production)
- **H2** — Database (development)

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js 16+
- Java 17+
- Maven 3.8+
- PostgreSQL 12+ (or use H2 for development)

### Frontend Setup

1. Navigate to the project root and install dependencies:
```bash
npm install
```

2. Start the React development server:
```bash
npm start
```

The app will open at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Configure database (optional - H2 is pre-configured for development):
   - Edit `src/main/resources/application.yml` with your PostgreSQL credentials
   - Or use the default H2 in-memory database

3. Build and run:
```bash
mvn clean install
mvn spring-boot:run
```

The API will be available at `http://localhost:8080/api`

---

## 📚 API Endpoints

### Admin Dashboard
- `GET /api/admin/dashboard/stats` — Dashboard statistics
- `GET /api/admin/users` — All users
- `GET /api/admin/users/{id}` — User details
- `PUT /api/admin/users/{id}/status?isActive=true` — Update user status

### FAQ Management (Admin)
- `GET /api/admin/faqs` — All FAQs
- `GET /api/admin/faqs/{id}` — FAQ details
- `POST /api/admin/faqs` — Create FAQ
- `PUT /api/admin/faqs/{id}` — Update FAQ
- `DELETE /api/admin/faqs/{id}` — Delete FAQ
- `GET /api/admin/faqs/category/{category}` — FAQs by category

---

## 📁 Project Structure

```
RideWatch/
├── src/                          # React frontend
│   ├── AdminDashboard.jsx       # Admin dashboard page
│   ├── Login.jsx
│   ├── Register.jsx
│   ├── Home.jsx
│   ├── Maps.jsx
│   ├── Account.jsx
│   └── ...
├── backend/                      # Spring Boot backend
│   ├── src/main/java/
│   │   └── com/ridewatch/
│   │       ├── controller/      # REST endpoints
│   │       ├── service/         # Business logic
│   │       ├── model/           # JPA entities
│   │       ├── repository/      # Data access
│   │       └── dto/             # Data transfer objects
│   ├── src/main/resources/
│   │   └── application.yml      # Configuration
│   └── pom.xml
├── public/
├── package.json
└── README.md
```

---

## 🔐 Security

- JWT-based authentication
- Password encryption with BCrypt
- CORS configuration for frontend-backend communication
- Role-based access control (Admin/User)

---

## 🌐 Accessing Admin Dashboard

1. Admin dashboard is accessible at `/admin` route
2. Make sure both frontend and backend are running
3. Frontend calls backend APIs at `http://localhost:8080/api`

---

## 📝 Environment Variables

### Backend (.env or application.yml)
```
JWT_SECRET=your-secret-key-min-32-chars
JWT_EXPIRATION_MS=86400000
SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/ridewatch
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=password
```

---

## 🧪 Testing

To run tests:
```bash
cd backend
mvn test
```

---

## 📄 Available Scripts

### Frontend
- `npm start` — Start development server
- `npm build` — Build for production
- `npm test` — Run tests
- `npm eject` — Eject from Create React App

### Backend
- `mvn clean install` — Build project
- `mvn spring-boot:run` — Run application
- `mvn test` — Run tests
- `mvn clean package` — Create JAR file

---

## 🤝 Contributors

- [Icession](https://github.com/Icession) — Kurt Laurence Carcueva
- [doydoyi](https://github.com/doydoyi) — Raphael Jude Alvarado
- [Cjsephhhh](https://github.com/Cjsephhhh) — Carl Joseph Alvarado

---

## 📝 License

This project is open source and available under the MIT License.

---

## 🆘 Troubleshooting

### Backend won't start
- Ensure Java 17 is installed: `java -version`
- Check if port 8080 is available
- Verify Maven is installed: `mvn -version`

### Frontend can't connect to backend
- Ensure backend is running on `http://localhost:8080`
- Check CORS settings in `application.yml`
- Clear browser cache and restart dev server

### Database issues
- Verify PostgreSQL is running
- Check connection string in `application.yml`
- Run `mvn clean install` to rebuild

---

**Last Updated:** May 2026
