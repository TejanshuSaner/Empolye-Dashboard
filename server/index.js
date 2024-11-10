import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Employee from "./models/Employee.js";
import Login from "./models/Login.js";

const app = express();
app.use(cors());
app.use(bodyParser.json());

const PORT = 5000;
const MONGODB_URI = "mongodb://localhost:27017/employee_management";

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Login Route
app.post("/login", async (req, res) => {
  const { f_userName, f_Pwd } = req.body;

  const user = await Login.findOne({ f_userName });
  if (user && user.f_Pwd === f_Pwd) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid credentials" });
  }
});

// Employee CRUD Routes
app.post("/dash/employees", async (req, res) => {
  console.log("Received data:", req.body);  // Log incoming request data
  try {
    const employee = new Employee(req.body); // Create a new employee instance with the request body
    await employee.save();  // Save the employee to the database
    res.json(employee);  // Respond with the saved employee data
  } catch (error) {
    console.error("Error adding employee:", error);  // Log the error
    res.status(500).json({ message: "Error adding employee", error });  // Include the error in the response
  }
});

app.get("/dash/employees", async (req, res) => {
  try {
    const employees = await Employee.find();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees" });
  }
});

app.put("/dash/employees/:id", async (req, res) => {
  try {
    const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: "Error updating employee" });
  }
});

app.delete("/dash/employees/:id", async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ message: "Employee deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting employee" });
  }
});



app.get("/dash/employees", async (req, res) => {
  const searchQuery = req.query.search || '';  

  try {
    const employees = await Employee.find({
      name: { $regex: searchQuery, $options: 'i' },  
    });
    res.json(employees); 
  } catch (error) {
    res.status(500).json({ message: "Error fetching employees" });
  }
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
