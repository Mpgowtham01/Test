import React from "react";
import "../../Component/Css/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";
function Sidebar() {
  const navigate = useNavigate();
  const handleOut = () => {
    localStorage.clear();
    navigate("/");
  };
  const name = localStorage.getItem("userName");
  return (
    <div>
      <div className="sidebar">
        <div className="d-flex justify-content-center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/9131/9131529.png"
            alt="user_icon"
            style={{ width: "50px" }}
          />
        </div>

        <div
          className="d-flex justify-content-center"
          style={{ marginTop: "10px" }}
        >
          <p>{name}</p>
        </div>

        <div
          style={{ borderBottom: "1px solid white", marginTop: "10px" }}
        ></div>
        <br />
        <ul>
          <li>
            <Link
              to="/manager"
              style={{ textDecoration: "none", color: "white" }}
            >
              Department
            </Link>
          </li>
          <li>
            <Link
              to="/manager/employee"
              style={{ textDecoration: "none", color: "white" }}
            >
              Employees
            </Link>
          </li>
          <div className="d-flex justify-content-center">
            <Button onClick={handleOut} style={{ marginTop: "120%" }}>
              Logout
            </Button>
          </div>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
