// components/Navbar.js
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      router.push(`/employees?search=${searchTerm}`);  
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/");
  };

  return (
    <nav className="bg-blue-500 text-white shadow-md w-screen">
      <div className="w-full mx-auto px-8 py-3 flex justify-between items-center">
        <div className="text-xl font-bold">Dashboard</div>
        <div className="flex space-x-6">
          <a href="/DashBoard" className="hover:text-blue-200">Dashboard</a>
          <a href="/employees" className="hover:text-blue-200">Employees</a>
          <a href="/settings" className="hover:text-blue-200">Settings</a>
          <button onClick={handleLogout} className="hover:text-blue-200">Logout</button>
        </div>
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search employees"
            className="px-4 py-2 rounded-md text-black"
          />
          <button type="submit" className="bg-blue-600 px-4 py-2 rounded-md text-white">
            Search
          </button>
        </form>
      </div>
    </nav>
  );
};

export default Navbar;
