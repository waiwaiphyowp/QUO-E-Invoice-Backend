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
app.use(express.json()); 
app.use(logger("dev")); 

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'https://quo-e-invoice-frontend.vercel.app'
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Database connection
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
app.use("/api/test-jwt", testJwtRouter);
app.use("/api/auth", (req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
}, authRouter);
app.use("/api/users", usersRouter);
app.use("/api/invoices", invoiceRoutes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});