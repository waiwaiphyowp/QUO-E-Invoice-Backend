require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const logger = require("morgan");

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("connected", () => {
	console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(logger("dev"));

// Route
app.get("/", (req, res) => {
  res.send("E-Invoice API is running...");
});

// Start the server and listen on port 3000
app.listen(3000, () => {
	console.log("The express app is ready!");
});
