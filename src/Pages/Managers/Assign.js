import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import Api from "../../Api";
const AssignModal = ({
  show,
  handleClose,
  handleUpdate,
  formData,
  setFormData,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, []);
  const getData = async () => {
    try {
      const data = await Api.get("/department/getdepartmentname");
      setData(data.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Department Name</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formDesignation">
            <Form.Label>Department Name</Form.Label>
            <Form.Control
              as="select"
              name="departmentName"
              value={formData.departmentName}
              onChange={handleChange}
            >
              {data.map((item) => (
                <option key={item._id} value={item.departmentName}>
                  {item.departmentName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdate}>
          Assign
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssignModal;
