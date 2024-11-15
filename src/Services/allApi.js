import commonAPI from "./commonAPI";
import SERVERURL from "./serverURL";

// Fetch all employees
export const getAllEmployeesAPI = async () => {
  return await commonAPI("GET", `${SERVERURL}/employeeDetails`, []);
};

// Save a new employee
export const saveEmployeeAPI = async (employeeData) => {
  return await commonAPI("POST", `${SERVERURL}/employeeDetails`, employeeData);
};

// Update an existing employee
export const updateEmployeeAPI = async (id, updatedData) => {
  return await commonAPI("PUT", `${SERVERURL}/employeeDetails/${id}`, updatedData);
};

// Delete an employee
export const deleteEmployeeAPI = async (id) => {
  return await commonAPI("DELETE", `${SERVERURL}/employeeDetails/${id}`, []);
};
