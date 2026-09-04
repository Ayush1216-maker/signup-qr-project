const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const User = require("./models/Users");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.error("MongoDB connection failed:");
        console.error(error.message);
    });

// Test route
app.get("/", (req, res) => {
    res.json({
        message: "Signup API is running"
    });
});

// Signup API
app.post("/api/signup", async (req, res) => {

    try {

        const { name, email, phone, password } = req.body;

        // Check required fields
        if (!name || !email || !phone || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            });
        }

        // Check if email already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already registered"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Save user to MongoDB
        const user = await User.create({
            name: name,
            email: email,
            phone: phone,
            password: hashedPassword
        });

        console.log("User saved successfully:", user.email);

        // Send response
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });

    } catch (error) {

        console.error("Signup error:", error);

        res.status(500).json({
            success: false,
            message: "Server error"
        });
    }
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});