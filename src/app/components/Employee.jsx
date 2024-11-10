// components/Employees.js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

const Employees = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchEmployees = async () => {
      const query = router.query.search || '';  
      setSearchQuery(query); 

      if (query.trim()) {
        const response = await fetch(`http://localhost:5000/dash/employees?search=${query}`);
        const data = await response.json();
        setEmployees(data);  
      } else {
        setEmployees([]);  
      }
    };

    fetchEmployees(); 
  }, [router.query.search]); 

  return (
    <div>
      <h1>Employees</h1>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <ul>
          {employees.map((employee) => (
            <li key={employee._id}>
              <p>{employee.name}</p>
              <p>{employee.role}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Employees;
