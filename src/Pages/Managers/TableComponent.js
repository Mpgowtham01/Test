import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import "../../Component/Css/Sidebar.css";
import Api from "../../Api";
import DeleteConfirmationPopup from "./DeleteConfirmPopup";
import UpdateModal from "./UpdateModal";
import AddDepartmentModal from "./AddDepartment";
import { Button } from "react-bootstrap";

function TableComponent() {
  const [data, setData] = useState([]);
  const [showDeletePopup, setShowDeletePopup] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(null);
  const [AddDepartmentData, setadddepartmentData] = useState({});
  const [filteredData, setFilteredData] = useState([]);
  const [showAddDepartmentModal, setShowAddDepartmentModal] = useState(false);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await Api.get("/department/getdepartmentname");
      setData(response.data.data);
      setFilteredData(response.data.data);
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
        `/department/deletedepartmentname/${selectedItemId}`
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

  const handleUpdateClick = (id) => {
    const selectedItem = data.find((item) => item._id === id);
    setShowUpdateModal(true);
    setSelectedItemId(id);
    setadddepartmentData(selectedItem);
  };

  const handleUpdateConfirm = async () => {
    try {
      await Api.put(
        `/department/updateDepartmentName/${selectedItemId}`,
        AddDepartmentData
      );
      getData();
    } catch (err) {
      console.log("err", err);
    }
    handleCloseUpdateModal();
  };

  const handleCloseUpdateModal = () => {
    setShowUpdateModal(false);
    setSelectedItemId(null);
    setadddepartmentData({});
  };
  const handleOpenAddDepartmentModal = () => {
    setShowAddDepartmentModal(true);
  };

  const handleCloseAddDepartmentModal = () => {
    setShowAddDepartmentModal(false);
  };

  //Add department
  const handleAddDepartment = async () => {
    try {
      await Api.post(`/department/createdepartmentname`, AddDepartmentData);
      getData();
    } catch (err) {
      console.log("err", err);
    }
    handleCloseAddDepartmentModal();
  };

  return (
    <div>
      <div>
        <Sidebar />
      </div>
      <div style={{ marginLeft: "250px", padding: "20px" }}>
        <div className="table-container">
          <div>
            <h3>Department Name :</h3>
            <br />
            <Button onClick={handleOpenAddDepartmentModal}>
              Add Department
            </Button>
            <br />
            <br />
          </div>
          <table className="table">
            <thead>
              <tr>
                <th>Department Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(filteredData) && filteredData.length > 0 ? (
                filteredData.map((row) => (
                  <tr key={row._id}>
                    <td>{row.departmentName}</td>
                    <td>
                      &nbsp; &nbsp; &nbsp; &nbsp;
                      <Button onClick={() => handleUpdateClick(row._id)}>
                        Edit
                      </Button>
                      &nbsp; &nbsp;
                      <Button onClick={() => handleDeleteClick(row._id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <AddDepartmentModal
        show={showAddDepartmentModal}
        handleClose={handleCloseAddDepartmentModal}
        setFormData={setadddepartmentData}
        handleUpdate={handleAddDepartment}
      />
      <DeleteConfirmationPopup
        show={showDeletePopup}
        handleClose={handleCloseDeletePopup}
        handleDelete={handleDeleteConfirm}
      />

      <UpdateModal
        show={showUpdateModal}
        handleClose={handleCloseUpdateModal}
        handleUpdate={handleUpdateConfirm}
        formData={AddDepartmentData}
        setFormData={setadddepartmentData}
      />
    </div>
  );
}

export default TableComponent;
