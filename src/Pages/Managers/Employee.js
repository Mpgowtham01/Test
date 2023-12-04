import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../../Component/Css/Sidebar.css";
import { Button, Pagination } from "react-bootstrap";
import Api from "../../Api";
import DeleteConfirmationPopup from "./DeleteConfirmPopup";
import AssignModal from "./Assign";

function Employee() {
  const [data, setData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [AssignFormData, setAssignFormData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [showAssignModal, setShowAssignModel] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await Api.get("/signup/getEmployee");
      const employeeData = response.data.data.filter(
        (item) => item.role === "employee"
      );
      setData(employeeData);
      setFilteredData(employeeData);
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleDeleteClick = (id) => {
    setShowDeletePopup(true);
    setSelectedItemId(id);
  };

  const handleDeleteConfirm = async () => {
    try {
      const response = await Api.delete(
        `/signup/deleteemployee/${selectedItemId}`
      );
      getData();
      if (response.data && Array.isArray(response.data.data)) {
        setData(response.data.data);
      } else {
        console.error("Invalid response format after deletion");
      }
      handleCloseDeletePopup();
    } catch (err) {
      console.log("err", err);
    }
  };
  const handleCloseDeletePopup = () => {
    setShowDeletePopup(false);
    setSelectedItemId(null);
  };

  const handleUpdateConfirm = async () => {
    try {
      await Api.put(
        `/signup/updatedepartmentName/${selectedItemId}`,
        AssignFormData
      );
      getData();
    } catch (err) {
      console.log("err", err);
    }
    handleCloseAssignModal();
  };

  const handleAssign = (id) => {
    const selectedItem = data.find((item) => item._id === id);
    setShowAssignModel(true);
    setSelectedItemId(id);
    setAssignFormData(selectedItem);
  };
  const handleCloseAssignModal = () => {
    setShowAssignModel(false);
    setSelectedItemId(null);
  };
  const handleFilter = (filterValue, filterType) => {
    const filterColumn =
      filterType === "name"
        ? "name"
        : filterType === "location"
        ? "location"
        : "";

    const filteredResult = data.filter((item) => {
      const itemValue = (item[filterColumn] || "").toLowerCase();
      return itemValue.includes(filterValue.toLowerCase());
    });

    setFilteredData(filteredResult);
  };
  const uniqueLocations = [...new Set(data.map((item) => item.location))];

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  const renderTableRows = () => {
    return currentItems.map((row) => (
      <tr key={row._id}>
        <td>{row.name}</td>
        <td>{row.email}</td>
        <td>{row.location}</td>
        <td>
          <Button onClick={() => handleAssign(row._id)}>Assign</Button>
          &nbsp; &nbsp;
          <Button onClick={() => handleDeleteClick(row._id)}>Delete</Button>
        </td>
      </tr>
    ));
  };

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredData.length / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div style={{ marginLeft: "250px", padding: "20px" }}>
        <div className="table-container">
          <div>
            <h3>Employee List :</h3>
            <br />
            <p>Filter :</p>
            <input
              type="text"
              placeholder="Filter by Name"
              onChange={(e) => handleFilter(e.target.value, "name")}
              style={{
                width: "200px",
                borderRadius: "5px",
                border: "1px solid gray",
                height: "40px",
              }}
            />{" "}
            &nbsp;
            <select
              id="locationFilter"
              onChange={(e) => handleFilter(e.target.value, "location")}
              style={{
                width: "200px",
                borderRadius: "5px",
                border: "1px solid gray",
                height: "40px",
              }}
            >
              <option value="">All Locations</option>
              {uniqueLocations.map((location) => (
                <option key={location} value={location}>
                  {location}
                </option>
              ))}
            </select>
          </div>
          <br />
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Location</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{renderTableRows()}</tbody>
          </table>
          <Pagination style={{ display: "flex", justifyContent: "center" }}>
            {pageNumbers.map((number) => (
              <Pagination.Item
                key={number}
                active={number === currentPage}
                onClick={() => handlePageChange(number)}
              >
                {number}
              </Pagination.Item>
            ))}
          </Pagination>
        </div>
        <DeleteConfirmationPopup
          show={showDeletePopup}
          handleClose={handleCloseDeletePopup}
          handleDelete={handleDeleteConfirm}
        />
        <AssignModal
          show={showAssignModal}
          handleClose={handleCloseAssignModal}
          formData={AssignFormData}
          setFormData={setAssignFormData}
          handleUpdate={handleUpdateConfirm}
        />
      </div>
    </div>
  );
}

export default Employee;
