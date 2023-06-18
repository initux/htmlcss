import React, {useState} from "react";
import { Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";
import useAuth from "../../../hooks/useAuth";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
const CustomerAddress = () => {
    const [ country, setCountry ] = useState('');
    const [ region, setRegion ] = useState("");
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
      <>
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
              Select your address
            </h3>
            <div className="tmp-register-with-phone">
              <form onSubmit={handleSubmit(onSubmit)}>
                <CountryDropdown
                  className="country"
                  value={country}
                  onChange={(val) => setCountry(val)}
                  style={{ border: `2px solid ${getStarting.primaryColor}` }}
                />

                <br />
                <br />

                <RegionDropdown
                  className="country"
                  country={country}
                  value={region}
                  onChange={(val) => setRegion(val)}
                  style={{ border: `2px solid ${getStarting.primaryColor}` }}
                />
                <br />
                <br />
              
                <textarea
                  className="address"
                  type="text"
                  rows={3}
                  placeholder="Address For Example: City, Area, House# 123, Street# 123, ABC Road"
                  {...register("address")}
                  required
                  style={{ border: `2px solid ${getStarting.primaryColor}` }}
                />
                <br />
                <br />
                <input
                  type="submit"
                  value="Save"
                  style={{ backgroundColor: `${getStarting.primaryColor}` }}
                />
              </form>
            </div>
            <p
              className="text-center"
              style={{
                color:
                  registerMessage ===
                  "customer created and otp sent successfully"
                    ? "green"
                    : "#ff4747",
              }}
            >
              {registerMessage ? registerMessage : ""}
            </p>
          </div>
        </Container>
      </>
    );
};

export default CustomerAddress;
