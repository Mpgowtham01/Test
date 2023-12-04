import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { Button, Card, Col, Row } from "react-bootstrap";
import Api from "../../Api";
import Avathar from "../../Assets/BossImg.png";
import { useNavigate } from "react-router-dom";
import "../../Component/Css/userdetails.css";
function Index() {
  const id = localStorage.getItem("Userid");
  const [details, setDatails] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    getDetails();
  }, []);
  const getDetails = async () => {
    try {
      const res = await Api.get(`/signup/getoneuser/${id}`);
      setDatails(res.data.data);
    } catch (err) {
      console.log("err", err);
    }
  };
  const createdDate = new Date(details?.createdAt);
  const day = createdDate.getDate().toString().padStart(2, "0");
  const month = (createdDate.getMonth() + 1).toString().padStart(2, "0");
  const year = createdDate.getFullYear();

  const formattedCreatedDate = `${day}/${month}/${year}`;

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <div>
      <Sidebar />
      <div style={{ marginLeft: "250px", padding: "20px", marginTop: "10px" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <h3>User Details : </h3>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
        <br />
        <Card className="View_Profile_imgDetails">
          <Row container>
            <Col sm={12} md={6} lg={4} className="View_Profile_Container">
              <img
                className="View_Profile_ImageSide"
                src={Avathar}
                alt="viewProfile"
              ></img>
            </Col>
            <Col lg={8} sm={12} md={6}>
              <div className="View_Profile_Container_right">
                <label className="Img_Name_Heading">{details?.name}</label>
                <div>Profile created {formattedCreatedDate} </div>
                <div style={{ marginTop: "10px", fontWeight: "700" }}>
                  {details?.email}
                </div>
                <div style={{ marginTop: "10px", fontWeight: "700" }}>
                  {details?.location}
                </div>
                <div style={{ marginTop: "10px", fontWeight: "700" }}>
                  {details?.departmentName ? (
                    details.departmentName
                  ) : (
                    <span style={{ color: "red" }}>
                      Department not assigned
                    </span>
                  )}
                </div>
              </div>
              <br />
            </Col>
          </Row>
        </Card>
      </div>
    </div>
  );
}

export default Index;
