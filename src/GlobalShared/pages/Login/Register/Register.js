import React from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import useAuth from "../../../hooks/useAuth";

const Register = () => {
  const {
    getStarting,
    handleSubmit,
    onRegisterSubmit,
    register,
    registerMessage,
  } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    onRegisterSubmit(data, navigate);
  };

  return (
    <Container>
      <>
        <style type="text/css">
          {`.tmp-register-container button:hover {
                            color: ${getStarting?.primaryColor} !important;
                            background-color: transparent !important;
                            border: 2px solid ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        `}
        </style>
      </>
      <div className="tmp-register-container">
        <h3
          className="pb-3 text-center"
          style={{ color: `${getStarting.primaryColor}` }}
        >
          Please Register
        </h3>
        <div className="tmp-register-with-phone">
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              type="text"
              placeholder="Name *"
              {...register("name")}
              required
              style={{ border: `2px solid ${getStarting.primaryColor}` }}
            />
            <br />
            <input
              type="text"
              placeholder="Phone Number *"
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
              value="Register"
              style={{ backgroundColor: `${getStarting.primaryColor}` }}
            />
          </form>
        </div>
        <p
          className="text-center"
          style={{
            color:
              registerMessage === "customer created and otp sent successfully"
                ? "green"
                : "#ff4747",
          }}
        >
          {registerMessage ? registerMessage : ""}
        </p>
        <div className="text-center">
          <Link to="/login">
            <span>
              Already member??{" "}
              <Button
                style={{ backgroundColor: `${getStarting.primaryColor}` }}
              >
                Login
              </Button>{" "}
              here
            </span>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Register;
