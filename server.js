// npm
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

// Import routers
const testJwtRouter = require("./controllers/test-jwt");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");

// Connect to MongoDB with error handling
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}`))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Routes
app.use("/test-jwt", testJwtRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});