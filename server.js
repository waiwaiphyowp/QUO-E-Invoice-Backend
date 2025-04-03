// npm
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

// Import routers
const testJwtRouter = require("./controllers/test-jwt");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const invoiceRoutes = require("./routes/invoiceRoutes"); 

const app = express();

// Middleware
app.use(cors()); 
app.use(express.json()); 
app.use(logger("dev")); 

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log(`Connected to MongoDB ${mongoose.connection.name}`))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1); 
  });

// Root route
app.get("/", (req, res) => {
  res.send("QUO E-Invoice API is running!");
});

// Routes
app.use("/test-jwt", testJwtRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/invoices", invoiceRoutes); 

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});