
"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import AddEmployeeForm from "../components/AddEmployeeForm";
import Navbar from "../components/Navbar";
import EmployeeTable from "../components/EmployeeTable"; 
function App() {
  const [employees, setEmployees] = useState([]);
  const [isAddFormVisible, setIsAddFormVisible] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:5000/dash/employees");
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const addEmployee = async (employee) => {
    try {
      if (selectedEmployee) {
        await axios.put(
          `http://localhost:5000/dash/employees/${selectedEmployee._id}`,
          employee
        );
      } else {
        await axios.post("http://localhost:5000/dash/employees", employee);
      }
      setIsAddFormVisible(false);
      setSelectedEmployee(null);
      fetchEmployees();
    } catch (error) {
      console.error("Error adding employee:", error);
    }
  };

  const deleteEmployee = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/dash/employees/${id}`);
      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setIsAddFormVisible(true);
  };


  const handleCloseForm = () => {
    setIsAddFormVisible(false);
    setSelectedEmployee(null);
  };

  return (
    <div className="p-6">
      <Navbar />


      <h1 className="text-3xl font-semibold text-center text-blue-600 mb-6">
        Employee Management System
      </h1>

      <button
        onClick={() => {
          setIsAddFormVisible(true);
          setSelectedEmployee(null);
        }}
        className="px-6 py-2 bg-blue-500 text-white rounded mb-6 hover:bg-blue-600"
      >
        Add Employee
      </button>

      {isAddFormVisible && (
        <AddEmployeeForm onSubmit={addEmployee} onClose={handleCloseForm} employee={selectedEmployee} />
      )}

      <EmployeeTable
        employees={employees}
        handleEdit={handleEdit}
        deleteEmployee={deleteEmployee}
      />
    </div>
  );
}

export default App;
