
import React from 'react';

const EmployeeTable = ({ employees, handleEdit, deleteEmployee }) => {
  return (
    <div className="overflow-x-auto mt-6">
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead>
          <tr className="bg-gray-200 text-gray-700">
            <th className="py-3 px-4 text-left font-semibold">Name</th>
            <th className="py-3 px-4 text-left font-semibold">Email</th>
            <th className="py-3 px-4 text-left font-semibold">Mobile No</th>
            <th className="py-3 px-4 text-left font-semibold">Designation</th>
            <th className="py-3 px-4 text-left font-semibold">Gender</th>
            <th className="py-3 px-4 text-left font-semibold">Course</th>
            <th className="py-3 px-4 text-left font-semibold">Date Added</th>
            <th className="py-3 px-4 text-left font-semibold">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((emp) => (
            <tr key={emp._id} className="border-t hover:bg-gray-100">
              <td className="py-2 px-4">{emp.name}</td>
              <td className="py-2 px-4">{emp.email}</td>
              <td className="py-2 px-4">{emp.mobileNo}</td>
              <td className="py-2 px-4">{emp.designation}</td>
              <td className="py-2 px-4">{emp.gender}</td>
              <td className="py-2 px-4">{emp.course}</td>
              <td className="py-2 px-4 text-gray-500">
                {new Date(emp.createdAt).toLocaleDateString("en-GB", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </td>
              <td className="py-2 px-4 flex space-x-2">
                <button
                  onClick={() => handleEdit(emp)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteEmployee(emp._id)}
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeTable;
