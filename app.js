require("dotenv").config();

// Make sure you have the environment variable JWT_SECRET set in your .env file
const jwtSecret = process.env.JWT_SECRET;

const express = require("express");
const app = express();
const cors = require("cors");

// Enable all CORS requests
app.use(cors());
const db = require("./config/db");
const jwt = require("jsonwebtoken");
const initializeServer = require("./initializer");
const userRoutes = require("./routes/userRoutes");
const organizationRoutes = require("./routes/organizationRoutes");

// Middleware to parse JSON bodies
app.use(express.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/org", organizationRoutes); 

// Call initialization function when the server starts
initializeServer()
  .then(() => {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.error("Error initializing server:", err));
