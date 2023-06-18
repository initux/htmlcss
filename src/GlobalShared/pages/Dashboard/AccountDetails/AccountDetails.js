import React, { useState } from "react";
import { Container } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import "./AccountDetails.css";
import { Modal } from "react-bootstrap";
import Paper from "@mui/material/Paper";
import {
  CountryDropdown,
  RegionDropdown,
  CountryRegionData,
} from "react-country-region-selector";
const Checkout = () => {
  const getUserToken = JSON.parse(localStorage.getItem("userToken"));
  // const { register, handleSubmit, reset } = useForm();

  const {
    customer,
    getStarting,
    handleSubmit,
    onUserInformationUpdate,
    register,
  } = useAuth();

  let coun = customer?.address?.split(",")[0];
  let regi = customer?.address?.split(",")[1];
  let len = coun?.length + regi?.length;
  // let subAdd = customer?.address?.split(",")[1];
  let c = customer?.address?.replace(coun ? coun + "," : "", "");
  let subAdd = c?.replace(regi ? regi + "," : "", "");
  console.log("country", coun);
  console.log("region", regi);
  const [country, setCountry] = useState(coun);
  const [region, setRegion] = useState(regi);
  const [show, setShow] = useState(false);
  const [city, setCity] = useState("");
  const [area, setArea] = useState("");

  const handleAddressUpdate = () => {
    let address = `${country}${country && ","} ${region}${
      region && ","
      } ${city}${city && ","} ${area}`;
    onUserInformationUpdate({ address });
    setShow(false);
    

    // fetch(`${process.env.REACT_APP_BASE_URL}api/customer-profile/update`, {
    //   method: "PUT",
    //   headers: {
    //     authorization: `Bearer ${getUserToken}`,
    //     "content-type": "application/json",
    //   },
    //   body: JSON.stringify({address}),
    // })
    //   .then((res) => res.json())
    //   .then((result) => {
    //      setShow(false);
    //     setCustomer(result.customer);
    //     // reset();
    //   });
  };

  const handleClose = () => {
    setShow(false);
  };
  const handleOpen = () => {
    setShow(true);
  };

  //  const [subAddress, setAddress] = useState(customer.address);

  const onSubmit = (data) => {
    
    onUserInformationUpdate(data);
  };

  return (
    <>
      <Paper className="tmp-account-container">
        <div
          className="tmp-account-inner"
          // style={{ border: `2px solid ${getStarting.primaryColor}` }}
        >
          <h2>Account Details</h2>
          <hr />
          <form onSubmit={handleSubmit(onSubmit)}>
            <input
              defaultValue={customer._id}
              {...register("_id")}
              style={{
                display: "none",
                border: `1px solid ${getStarting?.primaryColor}`,
              }}
            />
            <label for="name">Name</label>
            <input
              defaultValue={customer.name}
              placeholder="Enter Your Name *"
              {...register("name")}
              style={{ border: `1px solid ${getStarting?.primaryColor}` }}
            />
            <label for="name">Email</label>
            <input
              defaultValue={customer.email}
              placeholder="Enter Your Email *"
              {...register("email")}
              style={{ border: `1px solid ${getStarting?.primaryColor}` }}
            />
            <label for="name">Phone</label>
            <input
              defaultValue={customer.phone}
              placeholder="Enter Your Phone *"
              {...register("phone")}
              required
              style={{ border: `1px solid ${getStarting?.primaryColor}` }}
            />
            {/* <input
              defaultValue={customer.address}
              placeholder="Enter Your Address *"
              {...register("address")}
              style={{ border: `1px solid ${getStarting?.primaryColor}` }}
            /> */}
            <br />
            <br />
            <hr />
            <div className="address-area">
              <label for="name">Address</label>
              <span className="edit-btn" onClick={() => setShow(true)}>
                edit
              </span>
            </div>
            {/* <div className="address-area">
              <CountryDropdown
                className="country"
                defaultOptionLabel={coun ? coun : "Select Country"}
                value={country}
                onChange={(val) => setCountry(val)}
                style={{ border: `2px solid ${getStarting.primaryColor}` }}
              />

        

              <RegionDropdown
                className="region"
                country={country}
                showDefaultOption={true}
                blankOptionLabel={regi}
                // defaultOptionLabel={regi}
                value={region}
                onChange={(val) => setRegion(val)}
                // {...register("region")}
                style={{ border: `1px solid ${getStarting.primaryColor}` }}
              />
            </div> */}

            {/* <br /> */}
            <input
              className="address"
              type="text"
              //   rows={1}
              disabled
              defaultValue={customer.address}
              placeholder="Address For Example: City, Area, House# 123, Street# 123, ABC Road"
              //   defaultValue={customer.address}
              // value={subAddress}
              // onChange={(val) => setAddress(val)}
              //   required
              {...register("subAddress")}
              style={{ border: `1px solid ${getStarting.primaryColor}` }}
            />

            <br />
            <br />
            <input
              type="submit"
              value="Update Information"
              style={{
                backgroundColor: `${getStarting.primaryColor}`,
                border: `2px solid ${getStarting.primaryColor}`,
              }}
            />
          </form>
        </div>
      </Paper>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add new Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form
          // onSubmit={handleSubmit(onSubmit)}
          >
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
              blankOptionLabel={"Select Region"}
              country={country}
              value={region}
              onChange={(val) => setRegion(val)}
              style={{ border: `2px solid ${getStarting.primaryColor}` }}
            />
            <br />
            <br />
            <input
              className="country"
              type="text"
              placeholder="City"
              value={city}
              onChange={(val) => setCity(val.target.value)}
              disabled={region ? false : true}
              style={{ border: `2px solid ${getStarting.primaryColor}` }}
            />
            <br />
            <br />

            <textarea
              className="address"
              type="text"
              rows={3}
              placeholder="Area, House# 123, Street# 123, ABC Road"
              // {...register("address")}
              // required
              value={area}
              disabled={city ? false : true}
              onChange={(val) => setArea(val.target.value)}
              style={{ border: `2px solid ${getStarting.primaryColor}` }}
            />
            <br />
            <br />
            <input
              type="button"
              value="Save"
              onClick={handleAddressUpdate}
              style={{
                backgroundColor: `${getStarting.primaryColor}`,
                width: "40%",
                fontSize: "20px",
                color: "white",
              }}
            />
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Checkout;
