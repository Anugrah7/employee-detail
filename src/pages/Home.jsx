import React, { useState, useEffect } from 'react';
import { getAllEmployeesAPI, saveEmployeeAPI, updateEmployeeAPI, deleteEmployeeAPI } from '../Services/allApi';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [newEmployee, setNewEmployee] = useState({ name: '', email: '', status: 'Active' });
  const [editingIndex, setEditingIndex] = useState(null);
  const [editingId, setEditingId] = useState(null);

  // Fetch all employees from the server on component mount
  useEffect(() => {
    fetchEmployees();
  }, []);

  // Fetch employees from API
  const fetchEmployees = async () => {
    const response = await getAllEmployeesAPI();
    if (response && response.data) {
      setEmployees(response.data);
    }
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewEmployee({ ...newEmployee, [name]: value });
  };

  // Add or Edit Employee
  const handleAddOrEditEmployee = async () => {
    if (editingIndex !== null) {
      // Update existing employee
      const updatedEmployee = await updateEmployeeAPI(editingId, newEmployee);
      if (updatedEmployee && updatedEmployee.data) {
        fetchEmployees(); // Refresh the employee list
      }
      setEditingIndex(null);
      setEditingId(null);
    } else {
      // Add new employee
      const savedEmployee = await saveEmployeeAPI(newEmployee);
      if (savedEmployee && savedEmployee.data) {
        fetchEmployees(); // Refresh the employee list
      }
    }
    // Reset input fields
    setNewEmployee({ name: '', email: '', status: 'Active' });
  };

  // Delete Employee
  const handleDelete = async (id) => {
    const deletedEmployee = await deleteEmployeeAPI(id);
    if (deletedEmployee) {
      fetchEmployees(); // Refresh the employee list
    }
  };

  // Edit Employee
  const handleEdit = (employee, index) => {
    setNewEmployee(employee);
    setEditingIndex(index);
    setEditingId(employee.id); // Store the id for updating
  };

  return (
    <div className="container">
      <h1 className="heading">Employee Management</h1>

      {/* Employee Form */}
      <div className="form-container">
        <input
          type="text"
          name="name"
          value={newEmployee.name}
          onChange={handleChange}
          placeholder="Employee Name"
          className="input-field"
        />
        <input
          type="email"
          name="email"
          value={newEmployee.email}
          onChange={handleChange}
          placeholder="Employee Email"
          className="input-field"
        />
        <select
          name="status"
          value={newEmployee.status}
          onChange={handleChange}
          className="select-field"
        >
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <button onClick={handleAddOrEditEmployee} className="form-button">
          {editingIndex !== null ? 'Update Employee' : 'Add Employee'}
        </button>
      </div>

      {/* Employees Table */}
      <table className="employees-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={employee.id}>
              <td>{employee.id}</td>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.status}</td>
              <td>
                <button onClick={() => handleEdit(employee, index)} className="edit-button">
                  Edit
                </button>
                <button onClick={() => handleDelete(employee.id)} className="delete-button">
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

export default Home;
