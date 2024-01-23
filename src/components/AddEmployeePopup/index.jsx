import React, { useState } from "react";
import "./style.scss";
import { IoMdClose } from "react-icons/io";
const AddEmployeePopup = ({ onClose, refreshData }) => {
  const [formData, setFormData] = useState({
    position: "",
    salary: 0,
    name: "",
    email: "",
  });
  const handleAddEmployee = () => {
    try {
      const requestOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      fetch("http://3.7.71.179:8080/v1/employees", requestOptions)
        .then((response) => response.json())
        .then((response) => {
          if (response.error === false) {
            refreshData();
            onClose();
          }
        })
        .catch((error) => {
          console.log(error?.message);
        });
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="add-employee-popup-wrapper">
      <div className="add-employee-popup-content">
        <div className="add-employee-popup-header">
          <h1>Add an employee</h1>
        </div>
        <div className="add-employee-form-wrapper">
          <div className="add-employee-input-wrapper">
            <label>Enter your Name</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
              type="text"
            />
          </div>
          <div className="add-employee-input-wrapper">
            <label>Enter your Email</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              type="text"
            />
          </div>
          <div className="add-employee-input-wrapper">
            <label>Enter your Position</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, position: e.target.value });
              }}
              type="text"
            />
          </div>
          <div className="add-employee-input-wrapper">
            <label>Enter your Salary</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, salary: Number(e.target.value) });
              }}
              type="text"
            />
          </div>
          <div className="add-employee-btn">
            <button onClick={() => onClose()}>Cancel</button>
            <button onClick={() => handleAddEmployee()}>Submit</button>
          </div>
        </div>
      </div>
      <div className="add-employee-close-btn">
        <IoMdClose onClick={onClose} size={24} />
      </div>
    </div>
  );
};

export default AddEmployeePopup;
