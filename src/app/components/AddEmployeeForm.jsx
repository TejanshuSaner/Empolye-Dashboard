import React, { useState, useEffect } from "react";

const AddEmployeeForm = ({ onSubmit, onClose, employee }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNo: "",
    designation: "",
    gender: "",
    course: [],
  });

  useEffect(() => {
    if (employee) {
      setFormData({
        name: employee.name || "",
        email: employee.email || "",
        mobileNo: employee.mobileNo || "",
        designation: employee.designation || "",
        gender: employee.gender || "",
        course: employee.course || [],
      });
    }
  }, [employee]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "course") {
      const updatedCourses = [...formData.course];
      if (updatedCourses.includes(value)) {
        const index = updatedCourses.indexOf(value);
        updatedCourses.splice(index, 1);
      } else {
        updatedCourses.push(value);
      }
      setFormData((prevState) => ({
        ...prevState,
        course: updatedCourses,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
    onClose(); // Close the form after submitting
  };

  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-2xl font-semibold mb-4">
        {employee ? "Edit Employee" : "Add Employee"}
      </h2>
      <form onSubmit={handleSubmit}>
        {/* Name */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Email */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-gray-700">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>

        {/* Mobile No */}
        <div className="mb-4">
          <label htmlFor="mobileNo" className="block text-gray-700">
            Mobile No
          </label>
          <input
            type="text"
            id="mobileNo"
            name="mobileNo"
            value={formData.mobileNo}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
        </div>

        {/* Designation (Dropdown) */}
        <div className="mb-4">
          <label htmlFor="designation" className="block text-gray-700">
            Designation
          </label>
          <select
            id="designation"
            name="designation"
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          >
            <option value="">Select Designation</option>
            <option value="HR">HR</option>
            <option value="Manager">Manager</option>
            <option value="Sales">Sales</option>
          </select>
        </div>

        {/* Gender  */}
        <div className="mb-4">
          <label className="block text-gray-700">Gender</label>
          <div className="flex space-x-4 mt-1">
            <label>
              <input
                type="radio"
                name="gender"
                value="M"
                checked={formData.gender === "M"}
                onChange={handleChange}
                className="mr-2"
              />
              M
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="F"
                checked={formData.gender === "F"}
                onChange={handleChange}
                className="mr-2"
              />
              F
            </label>
          </div>
        </div>

        {/* Course*/}
        <div className="mb-4">
          <label className="block text-gray-700">Course</label>
          <div className="flex space-x-4 mt-1">
            <label>
              <input
                type="checkbox"
                name="course"
                value="MCA"
                checked={formData.course.includes("MCA")}
                onChange={handleChange}
                className="mr-2"
              />
              MCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BCA"
                checked={formData.course.includes("BCA")}
                onChange={handleChange}
                className="mr-2"
              />
              BCA
            </label>
            <label>
              <input
                type="checkbox"
                name="course"
                value="BSC"
                checked={formData.course.includes("BSC")}
                onChange={handleChange}
                className="mr-2"
              />
              BSC
            </label>
          </div>
        </div>

   
        <div className="flex justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            {employee ? "Update" : "Add"} Employee
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddEmployeeForm;
