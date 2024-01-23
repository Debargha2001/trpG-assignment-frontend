import React, { useEffect, useState } from "react";
import "./style.scss";
import Modal from "./components/Modal";
import AddEmployeePopup from "./components/AddEmployeePopup";
import { MdEdit, MdDelete } from "react-icons/md";
import EditEmployeePopup from "./components/EditEmployeePopup";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
const App = () => {
  const [addEmployee, setAddEmployee] = useState(false);
  const [editData, setEditData] = useState({});
  const [searchType, setSearchType] = useState("");
  const [searchKey, setSearchKey] = useState("");
  const [editEmployee, setEditEmployee] = useState(false);
  const [sortParams, setSortParams] = useState("");
  // const data = [
  //   {
  //     id: 1,
  //     name: "John Doe",
  //     position: "Software Developer",
  //     salary: "$80,000",
  //     email: "john.doe@example.com",
  //   },
  //   {
  //     id: 2,
  //     name: "Jane Smith",
  //     position: "UI/UX Designer",
  //     salary: "$75,000",
  //     email: "jane.smith@example.com",
  //   },
  //   {
  //     id: 3,
  //     name: "Bob Johnson",
  //     position: "Database Administrator",
  //     salary: "$90,000",
  //     email: "bob.johnson@example.com",
  //   },
  //   {
  //     id: 4,
  //     name: "Alice Williams",
  //     position: "Project Manager",
  //     salary: "$95,000",
  //     email: "alice.williams@example.com",
  //   },
  //   {
  //     id: 5,
  //     name: "Charlie Brown",
  //     position: "Quality Assurance Engineer",
  //     salary: "$70,000",
  //     email: "charlie.brown@example.com",
  //   },
  // ];
  const [data, setData] = useState([]);

  const handleSortChange = (event) => {
    const selectedSort = event.target.value;
    setSortParams(selectedSort);
  };
  const handleSortDirection = (direction) => {
    const newSortParams =
      sortParams === `${direction}${sortParams.substring(1)}`
        ? sortParams.substring(1)
        : `${direction}${sortParams}`;
    setSortParams(newSortParams);
  };

  // const handleSortDirection = (direction) => {
  //   const newSortParams = direction === "up" ? sortParams : `-${sortParams}`;
  //   setSortParams(newSortParams);
  // };

  const fetchAllEmployees = () => {
    try {
      const requestOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(
        `http://3.7.71.179:8080/v1/employees?${searchType}=${searchKey}&sort=${sortParams}`,
        requestOptions
      )
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
          setData(response?.data);
        })
        .catch((error) => {
          console.error(error.message);
        });
    } catch (error) {
      console.error(error.message());
    }
  };

  const handleDelete = (id) => {
    try {
      const requestOptions = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      };
      fetch(`http://3.7.71.179:8080/v1/employees/${id}`, requestOptions)
        .then((response) => response.json())
        .then((response) => {
          if (response.error === false) {
            fetchAllEmployees();
          }
        })
        .catch((error) => {
          console.log(error?.message);
        });
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllEmployees();
  }, [searchType, searchKey, sortParams]);

  return (
    <>
      <div className="home-wrapper">
        <div className="home-container">
          <div className="home-content">
            <div className="home-header">
              <h1>Employee Management Tool</h1>
            </div>
            <div className="home-details">
              <div className="home-add-employee">
                <button
                  onClick={() => {
                    setAddEmployee(true);
                  }}
                >
                  Add Employee
                </button>
              </div>
              <div className="home-add-search">
                <select
                  onChange={(e) => {
                    setSearchType(e.target.value);
                    setSearchKey("");
                  }}
                >
                  <option value="">Search By</option>
                  <option value="id">Search by ID</option>
                  <option value="name">Search by Name</option>
                  <option value="email">Search by Email</option>
                  <option value="position">Search by Position</option>
                </select>
                <input
                  value={searchKey}
                  onChange={(e) => setSearchKey(e.target.value)}
                  type="text"
                />
              </div>
              <div className="home-sort-filter">
                <select onChange={handleSortChange} value={sortParams}>
                  <option value="">Sort By</option>
                  <option value="name">Name</option>
                  <option value="salary">Salary</option>
                </select>
                <div className="home-sort-condition">
                  <FaArrowUp
                    onClick={() => handleSortDirection("")}
                    style={{
                      cursor: "pointer",
                      background: "white",
                      border: "1px solid black",
                      borderRadius: "6px",
                      padding: "5px",
                    }}
                    size={32}
                  />
                  <FaArrowDown
                    onClick={() => handleSortDirection("-")}
                    style={{
                      cursor: "pointer",
                      background: "white",
                      border: "1px solid black",
                      borderRadius: "6px",
                      padding: "5px",
                    }}
                    size={32}
                  />
                </div>
              </div>
              <div className="table-container">
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Salary</th>
                      <th>Email</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map((row) => (
                      <tr key={row.id}>
                        <td>{row.id}</td>
                        <td>{row.name}</td>
                        <td>{row.position}</td>
                        <td>{row.salary}</td>
                        <td>{row.email}</td>
                        <td>
                          <div className="table-actions">
                            <MdEdit
                              onClick={() => {
                                setEditData(row);
                                setEditEmployee(true);
                              }}
                              style={{ cursor: "pointer" }}
                            />
                            <MdDelete
                              onClick={() => handleDelete(row.id)}
                              style={{ cursor: "pointer" }}
                            />
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={addEmployee} onRequestClose={() => setAddEmployee(false)}>
        <AddEmployeePopup
          refreshData={fetchAllEmployees}
          onClose={() => setAddEmployee(false)}
        />
      </Modal>
      <Modal isOpen={editEmployee} onRequestClose={() => setAddEmployee(false)}>
        <EditEmployeePopup
          refreshData={fetchAllEmployees}
          editData={editData}
          onClose={() => setEditEmployee(false)}
        />
      </Modal>
    </>
  );
};

export default App;
