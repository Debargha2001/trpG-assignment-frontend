import React, { useState } from "react";
import { IoMdClose } from "react-icons/io";
import "../AddEmployeePopup/style.scss";
const EditEmployeePopup = ({ onClose, editData,refreshData }) => {
  const [formData, setFormData] = useState({
    position: editData?.position,
    salary: editData?.salary,
    name: editData?.name,
    email: editData?.email,
  });
  const handleEditEmployee = () => {
    try {
      const requestOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      };
      fetch(
        `http://3.7.71.179:8080/v1/employees/${editData?.id}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => {
          if (response?.error === false) {
            refreshData();
            onClose()
          }
        })
        .catch((error) => {
          console.error(error.message);
        });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div className="add-employee-popup-wrapper">
      <div className="add-employee-popup-content">
        <div className="edit-employee-popup-header">
          <h1>Edit Employee Details</h1>
        </div>
        <div className="add-employee-form-wrapper">
          <div className="add-employee-input-wrapper">
            <label>Enter your Name</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
              }}
              value={formData?.name}
              type="text"
            />
          </div>
          <div className="add-employee-input-wrapper">
            <label>Enter your Email</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
              }}
              value={formData?.email}
              type="text"
            />
          </div>
          <div className="add-employee-input-wrapper">
            <label>Enter your Position</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, position: e.target.value });
              }}
              value={formData?.position}
              type="text"
            />
          </div>
          <div className="add-employee-input-wrapper">
            <label>Enter your Salary</label>
            <input
              onChange={(e) => {
                setFormData({ ...formData, salary: e.target.value });
              }}
              value={formData?.salary}
              type="text"
            />
          </div>
          <div className="add-employee-btn">
            <button onClick={onClose}>Cancel</button>
            <button onClick={() => handleEditEmployee()}>Submit</button>
          </div>
        </div>
      </div>
      <div className="add-employee-close-btn">
        <IoMdClose onClick={onClose} size={24} />
      </div>
    </div>
  );
};

export default EditEmployeePopup;
