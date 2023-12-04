import React from "react";
import { Link } from "react-router-dom";

function Sidebar() {
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
          <li
            style={{
              background: "#555",
            }}
          >
            <Link
              to="/employee"
              style={{
                textDecoration: "none",
                color: "white",
              }}
            >
              User Details
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
