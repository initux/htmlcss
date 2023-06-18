import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import "./Login.css";

const Login = () => {
  const { getStarting, handleSubmit, onLoginSubmit, register, loginMessage } =
    useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    onLoginSubmit(data, navigate);
  };
    
    const handleGuestLogin = () => {
        alert("Want to login as a guest")
    }
  return (
    <Container>
      <>
        <style type="text/css">
          {`.tmp-login-container button:hover {
                            color: ${getStarting?.primaryColor} !important;
                            background-color: transparent !important;
                            border: 2px solid ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        `}
        </style>
      </>
      <div className="tmp-login-container">
        <h3
          className="pb-3 text-center"
          style={{ color: `${getStarting.primaryColor}` }}
        >
          Please Login
        </h3>
        <div className="tmp-login-with-phone">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Phone number *"
              {...register("phone")}
              required
              style={{ border: `2px solid ${getStarting.primaryColor}` }}
            />
            <br />
            <input
              type="password"
              placeholder="Password *"
              {...register("password")}
              required
              style={{ border: `2px solid ${getStarting.primaryColor}` }}
            />
            <br />
            <input
              type="submit"
              value="Login"
              style={{ backgroundColor: `${getStarting.primaryColor}` }}
            />
          </form>
        </div>
        <p
          className="text-center"
          style={{
            color:
              loginMessage === "Successfully send OTP" ? "green" : "#ff4747",
          }}
        >
          {loginMessage ? loginMessage : ""}
        </p>
        <div className="text-center">
          <Link to="/register">
            <span>
              New Member?{" "}
              <Button
                style={{ backgroundColor: `${getStarting.primaryColor}` }}
              >
                Register
              </Button>{" "}
              here
            </span>
          </Link>
        </div>
        {/* <div className="text-center mt-3">
          <input
            className="guest"
            type="submit"
            value="Login as a guest"
                      style={{ backgroundColor: `${getStarting.primaryColor}` }}
                      onClick={handleGuestLogin}
          />
        </div> */}
      </div>
    </Container>
  );
};

export default Login;
