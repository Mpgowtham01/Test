import React, { useState } from "react";
import "../../Component/Css/Signin.css";
import { Row, Col } from "react-bootstrap";
import { Controller, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import Api from "../../Api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";

export default function Form_LR() {
  const Login = () => {
    const navigate = useNavigate();
    const [passwordShown, setpasswordShown] = useState(false);
    const togglePasswordVisiblity = () => {
      setpasswordShown(!passwordShown);
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
    } = useForm();

    const handleFormSubmit = async () => {
      const Details = {
        email: getValues().email,
        password: getValues().password,
      };
      try {
        const resp = await Api.post("/signup/login", Details);
        if (resp.data.message === "user login successfully") {
          const user = resp.data.data;
          if (user) {
            toast.success("Login successful", {
              position: toast.POSITION.TOP_RIGHT,
              autoClose: 1000,
            });
            localStorage.setItem("userName", user.name);
            localStorage.setItem("userMail", user.email);
            localStorage.setItem("Userid", user._id);
            localStorage.setItem("Role", user.role);
            setTimeout(() => {
              if (user.role === "employee") {
                navigate("/employee");
              } else if (user.role === "manager") {
                navigate("/manager");
              } else {
                console.warn("Unknown role:", user.role);
              }
            }, 2000);
          }
        } else {
          toast.error("Login failed", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
      } catch (error) {
        console.error("Error during login:", error);
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    };

    return (
      <div>
        <Row>
          <Col className="NfcLogin" sm={12} mg={12} lg={12} xl={12}>
            <form
              className="form_outline"
              onSubmit={handleSubmit(handleFormSubmit)}
            >
              <label className="formP_label" htmlFor="UserName">
                User Email
              </label>
              <input
                className="loginPageInput"
                placeholder="Enter your Email"
                {...register("email", { required: true })}
              />
              {errors.email && (
                <span className="Stud-personal-error" style={{ color: "red" }}>
                  Email is required
                </span>
              )}

              <label className="formP_label" htmlFor="Password">
                Password
              </label>
              <div style={{ width: "100%" }}>
                <input
                  className="loginPageInput"
                  placeholder="Enter Your Password"
                  type={passwordShown ? "text" : "password"}
                  {...register("password", { required: true })}
                />
                <FontAwesomeIcon
                  icon={passwordShown ? faEye : faEyeSlash}
                  onClick={togglePasswordVisiblity}
                  style={{
                    cursor: "pointer",
                    color: "black",
                    marginLeft: "-25px",
                  }}
                />
                {errors.password && (
                  <span
                    className="Stud-personal-error"
                    style={{ color: "red" }}
                  >
                    Password is required
                  </span>
                )}
              </div>
              <div className="d-flex justify-content-end mt-1">
                <Link
                  style={{
                    color: "white",
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  // to="/ForgotPassword"
                >
                  ForgotPassword?
                </Link>
              </div>

              <div
                style={{
                  display: "flex",
                  justifyContent: "start",
                  alignItems: "center",
                  margin: "3%",
                  paddingLeft: "10px",
                }}
              >
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="exampleCheck1"
                />{" "}
                &nbsp;
                <label className="formP_label" htmlFor="exampleCheck1">
                  Check me out
                </label>
              </div>
              <button className="form_login_style" type="submit">
                Submit
              </button>
            </form>
          </Col>
        </Row>
      </div>
    );
  };

  const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const togglePasswordVisiblitys = () => {
      setShowPassword(!showPassword);
    };
    const {
      register,
      handleSubmit,
      formState: { errors },
      getValues,
      control,
    } = useForm();

    const handleFormSignupLogin = async () => {
      const singupDetails = {
        role: getValues().role,
        name: getValues().name,
        email: getValues().email,
        phoneNumber: getValues().phoneNumber,
        password: getValues().password,
        location: getValues().location,
      };
      try {
        const response = await Api.post("/signup/create", singupDetails);
        if (response.data.message === "User Created Successfully") {
          toast.success("Sign up successful", {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        } else {
          toast.error(response.data.message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 1000,
          });
        }
      } catch (error) {
        toast.error(error.response.data.message, {
          position: toast.POSITION.TOP_RIGHT,
          autoClose: 1000,
        });
      }
    };

    return (
      <div role="tablePanel">
        <form onSubmit={handleSubmit(handleFormSignupLogin)}>
          <div className="form_outline">
            <label className="formP_label" htmlFor="userName">
              Role
            </label>
            <Controller
              name="role"
              control={control}
              rules={{ required: "Please select a role" }}
              render={({ field }) => (
                <select
                  {...field}
                  className={`form-control ${errors.role ? "is-invalid" : ""}`}
                >
                  <option value="" disabled selected hidden>
                    Select Role
                  </option>
                  <option value="manager">Manager</option>
                  <option value="employee">Employee</option>
                </select>
              )}
            />
            {errors.role?.type === "required" && (
              <p className="form_error">This field is required</p>
            )}
          </div>
          <div className="form_outline">
            <label className="formP_label" htmlFor="userName">
              UserName
            </label>
            <input
              type="text"
              placeholder="Enter Your UserName"
              className="form-control"
              {...register("name", {
                required: true,
                maxLength: 20,
              })}
            />
            {errors.name?.type === "required" && (
              <p className="form_error">This field is required</p>
            )}
          </div>
          <div className="form_outline">
            <label className="formP_label" htmlFor="registerEmail">
              Email
            </label>
            <input
              type="text"
              placeholder="Enter Your Mail"
              id="registerEmail"
              className="form-control"
              {...register("email", {
                required: true,
              })}
            />
            {errors.email?.type === "required" && (
              <p className="form_error">This field is required</p>
            )}
          </div>
          <div className="form_outline">
            <label className="formP_label" htmlFor="location">
              Location
            </label>
            <Controller
              name="location"
              control={control}
              rules={{ required: "Please select a location" }}
              render={({ field }) => (
                <select
                  {...field}
                  className={`form-control ${
                    errors.location ? "is-invalid" : ""
                  }`}
                >
                  <option value="" disabled selected hidden>
                    Select Location
                  </option>
                  <option value="surat">Surat</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="chennai">Chennai</option>
                  <option value="gujarat">Gujarat</option>
                </select>
              )}
            />
            {errors.location?.type === "required" && (
              <p className="form_error">This field is required</p>
            )}
          </div>
          <div className="form_outline">
            <label className="formP_label" htmlFor="Password">
              Password
            </label>
            <div
              style={{ width: "100%", display: "flex", alignItems: "center" }}
            >
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                id="registerPassword"
                className="form-control"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,20}$/,
                })}
              />
              <FontAwesomeIcon
                icon={showPassword ? faEye : faEyeSlash}
                onClick={togglePasswordVisiblitys}
                style={{
                  cursor: "pointer",
                  color: "black",
                  marginLeft: "-25px",
                }}
              />
            </div>
            {errors.password && (
              <div>
                {errors.password.type === "required" && (
                  <p className="form_error">Password is required</p>
                )}
                {errors.password.type === "minLength" && (
                  <p className="form_error">Minimum Length is 8 characters</p>
                )}
                {errors.password.type === "maxLength" && (
                  <p className="form_error">Maximum Length is 20 characters</p>
                )}
                {errors.password.type === "pattern" && (
                  <p className="form_error">
                    Password should contain at least one lowercase letter, one
                    uppercase letter, one digit, and one special character.
                  </p>
                )}
              </div>
            )}
          </div>

          <div style={{ padding: "0%", marginTop: "18px" }}>
            <button type="submit" className="form_login_style">
              Sign in
            </button>
          </div>
        </form>
      </div>
    );
  };

  const [activeTable, setActiveTable] = useState("Login");

  return (
    <div className="loginPage_nfc">
      <div className="Form_A">
        <button
          onClick={() => setActiveTable("Login")}
          className={`button_form1 ${activeTable === "Login" ? "active" : ""}`}
        >
          Login
        </button>
        <button
          onClick={() => setActiveTable("Register")}
          className={`button_form ${
            activeTable === "Register" ? "active" : ""
          }`}
        >
          Register
        </button>
        {activeTable === "Login" && <Login />}
        {activeTable === "Register" && <Register />}
      </div>
      <ToastContainer />
    </div>
  );
}
