import React, { useEffect, useState } from "react";
import { Container, Navbar, NavDropdown } from "react-bootstrap";
import "./Checkout.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import useAuth from "../../../hooks/useAuth";
import { toast } from "react-toastify";

import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Paper, Divider } from "@mui/material";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

import nagad from "../../../images/nagad.png";
import sslcommerz from "../../../images/sslcommerz.png";
import bkash from "../../../images/bkash.png";
import cod from "../../../images/cod.png";
import aamarpay from "../../../images/aamarpay.png";
import paypal from "../../../images/paypal.webp";
import { Link } from "react-router-dom";

const steps = ["Checkout Summary", "Shipping address", "Payment details"];

const getFromLocalStorage = () => {
  const cartList = localStorage.getItem("shopping_cart");
  if (cartList) {
    return JSON.parse(localStorage.getItem("shopping_cart"));
  } else {
    return [];
  }
};

const Checkout = () => {
  document.title =
    "Checkout | Best Home Decor &amp; Room Decor &amp; Islamic Calligraphy Collection in BD | Room Decor Bangladesh";
  <meta
    name="description"
    content="Room Decor is the biggest Bangladeshi Framing Online Platform. Starting from Islamic Calligraphy Framing, Canvas Framing, Clock and Real Art. Room Decor is the Best Home Decor Platform in BD."
  />;

  const { cart, setCart, customer, getStarting } = useAuth();
  const [shoppingCart] = useState(getFromLocalStorage());
  const navigate = useNavigate();

  const [couriers, setCouriers] = useState([]);
  const [courierName, setCourierName] = useState("");
  const [courierCharge, setCourierCharge] = useState(0);
  const [courierId, setCourierId] = useState();
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [receiver_name, set_receiver_name] = useState(null);
  const [receiver_phone, set_receiver_phone] = useState(null);
  const [receiver_location, set_receiver_location] = useState(null);
  const [others, set_others] = useState("");
  const [alertMessage, setAlertMessage] = React.useState("");
  const [deliveryCharge, setDeliveryCharge] = React.useState(0);

  const [couponCode, setCouponCode] = useState("");
  const [couponCodeAmount, setCouponCodeAmount] = useState(0);

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const { register, handleSubmit, reset } = useForm();
  // console.log(customer)

  const getUserToken = JSON.parse(localStorage.getItem("userToken"));
  const starting = JSON.parse(localStorage.getItem("starting"));

  const onSubmit = (data) => {
    let products = [];
    shoppingCart.map((cart) =>
      products.push({
        prod_id: cart._id,
        quantity: cart.quantity,
        color_id: cart.color_id,
      })
    );

    data.products = products;
    data.payment_amount = 0;
    data.courier_id = courierId;
    data.coupon_code = couponCode;
    data.payment_method = paymentMethod;
    // data.receiver_name = customer.name;
 

    fetch(`${process.env.REACT_APP_BASE_URL}api/productOrders`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getUserToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result : ",  result);
        if (result.paymentUrl) {
          navigate(result.paymentUrl);
        }
        else if (result.error === false) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${result.message}`,
            showConfirmButton: false,
            timer: 2000,
          });
          navigate("/dashboard/orders");
        }
        // else {
        //   Swal.fire({
        //     position: "center",
        //     icon: "error",
        //     title: `${result.message}`,
        //     showConfirmButton: false,
        //     timer: 2000,
        //   });
        // }
        reset();
      });

    // all cart delete
    localStorage.removeItem("shopping_cart");
    setCart([]);
  };



  let multiVendor = starting?.multiVendor;
  let customerAuthentication = starting?.customerAuthentication;
  // Order submit 
  const submitOrder = () => {
    let data = {};
    let products = [];
    let url = `api/productOrders`;
    let token = getUserToken;
    if (!customerAuthentication && !token) {
      token = starting.token;
      url = `${url}/withoutCustomer`;
    }
      if (multiVendor) {
        url = `${url}/multi_vendor/new`;
        products.push({
          vendor_id: shoppingCart[0]?.vendor?._id,
          products: [
            {
              prod_id: shoppingCart[0]?._id,
              quantity: shoppingCart[0]?.quantity,
              // color_id: shoppingCart[0]?.color_id,
              size: shoppingCart[0]?.size,
              color: shoppingCart[0]?.color,
            },
          ],
        });
        for (let i = 1; i < shoppingCart.length; i++) {
          let k = 0;
          for (let j = 0; j < products.length; j++) {
            if (shoppingCart[i]?.vendor?._id === products[j]?.vendor_id) {
              products[j].products.push({
                prod_id: shoppingCart[i]?._id,
                quantity: shoppingCart[i]?.quantity,
                // color_id: shoppingCart[i]?.color_id,
                size: shoppingCart[i]?.size,
                color: shoppingCart[i]?.color,
              });
              k = 1;
              break;
            }
          }
          if (k === 0) {
            products.push({
              vendor_id: shoppingCart[i]?.vendor?._id,
              products: [
                {
                  prod_id: shoppingCart[i]?._id,
                  quantity: shoppingCart[i]?.quantity,
                  // color_id: shoppingCart[i]?.color_id,
                  size: shoppingCart[i]?.size,
                  color: shoppingCart[i]?.color,
                },
              ],
            });
          }
        }
      } else {
        shoppingCart.map((cart) =>
          products.push({
            prod_id: cart._id,
            quantity: cart.quantity,
            // color_id: cart.color_id,
            size: cart.size,
            color: cart.color,
          })
        );
      }
    
    console.log("products ::::::::::::: ", products)

    data.products = products;
    data.payment_amount = 0;
    data.courier_id = courierId;
    data.coupon_code = couponCode;
    data.payment_method = paymentMethod;
    data.receiver_name = receiver_name;
    data.receiver_phone = receiver_phone;
    data.receiver_location = receiver_location;
    data.others = others;

    // alert(url);

    fetch(`${process.env.REACT_APP_BASE_URL + url}`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        console.log("result : ", result);
        if (result.paymentUrl) {
          // navigate(result.paymentUrl);
          localStorage.removeItem("shopping_cart");
          window.location.replace(result.paymentUrl);
        } else if (result.error === false) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: `${result.message}`,
            showConfirmButton: false,
            timer: 2000,
          });
          // all cart delete
          localStorage.removeItem("shopping_cart");
          setCart([]);
          if (customerAuthentication) navigate("/dashboard/orders");
          else {
            navigate("/");
          }
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: `${result.message}`,
            showConfirmButton: false,
            timer: 2000,
          });
        }
        reset();
      });

    
  };
  const cartPrice = cart.reduce(
    (previous, product) => previous + product.sell_price * product.quantity,
    0
  );

  // -------------------------------------------------------------------------
  // Courier Information
  // -------------------------------------------------------------------------

  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/couriers`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setCouriers(data.data);
        // console.log(data.data);
      });
  }, [getStarting.token]);

  // -------------------------------------------------------------------------
  // Payment Methods
  // -------------------------------------------------------------------------
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/payment-methods`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("payment methods : ", data.payment_methods);
        let methods = [];
        data?.payment_methods?.map((pay) => methods.push(pay.prefix));
        setPaymentMethods(methods);
      });
  }, [getStarting.token]);

  // Delivery information
  const handleDeliveryCharge = (id, name, charge) => {
    setCourierId(id);
    setCourierName(name);
    setCourierCharge(charge);
  };

  useEffect(() => {
    if (!customer) return;
    // let tmp = {
    //     ...customer,
    //     receiver_name: customer.name,
    //     receiver_phone: customer.phone
    // }
    // reset(tmp)
    set_receiver_name(customer.name);
    set_receiver_phone(customer.phone);
    set_receiver_location(customer.address);
  }, [customer, reset]);

  const handleCouponCode = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/coupon/check_validity`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getUserToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({ coupon_code: couponCode }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === true) {
          setErrorMessage(data.message);
          setSuccessMessage("");
          setCouponCode("");
        } else {
          setCouponCodeAmount(data.amount);
          setErrorMessage("");
          setSuccessMessage(`Discount ${getStarting?.currency}${data.amount}`);
        }
      });
  };

  //stepper

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };
  const handleNextTwo = () => {
    // alert("ok")
    if (!receiver_name) {
      setAlertMessage("Receiver name can't be null");
      return;
    }
    if (!receiver_phone) {
      setAlertMessage("Receiver phone can't be null");
      return;
    }
    if (!receiver_location) {
      setAlertMessage("Receiver location can't be null");
      return;
    }
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  let prod = [];

  if (multiVendor) {
    prod.push({
      vendor_id: shoppingCart[0]?.vendor?._id,
      products: [
        {
          // prod_id: shoppingCart[0]?._id,
          // quantity: shoppingCart[0]?.quantity,
          // color_id: shoppingCart[0]?.color_id,

          ...shoppingCart[0],
        },
      ],
    });
    for (let i = 1; i < shoppingCart.length; i++) {
      let k = 0;
      for (let j = 0; j < prod.length; j++) {
        if (shoppingCart[i]?.vendor?._id === prod[j]?.vendor_id) {
          prod[j].products.push({
            // prod_id: shoppingCart[i]?._id,
            // quantity: shoppingCart[i]?.quantity,
            // color_id: shoppingCart[i]?.color_id,
            ...shoppingCart[i]
          });
          k = 1;
          break;
        }
      }
      if (k === 0) {
        prod.push({
          vendor_id: shoppingCart[i]?.vendor?._id,
          products: [
            {
              // prod_id: shoppingCart[i]?._id,
              // quantity: shoppingCart[i]?.quantity,
              // color_id: shoppingCart[i]?.color_id,
              ...shoppingCart[i],
            },
          ],
        });
      }
    }
  } else {
    shoppingCart.map((cart) =>
      prod.push({
        // prod_id: cart._id,
        // quantity: cart.quantity,
        // color_id: cart.color_id,
        ...cart
      })
    );
  }

  // console.log("prod :::: ", prod);
 let shipingCharge =0
  if (multiVendor) {
    if (prod.length !== 0) {
      prod.map((pro) => {shipingCharge += pro?.products[0]?.vendor?.delivery_charge;})
    }
    
  }
  else {
    shipingCharge = getStarting.deliveryCharge;
  }
  //  console.log("de :::: ", vendorCharge);
  
    function getStepContent(stepIndex) {
      switch (stepIndex) {
        case 0:
          return (
            <Container>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="tmp-checkout-payment-container pt-3">
                  <div className="tmp-checkout-payment-left">
                    <div style={{ paddingBottom: "0px" }}>
                      {multiVendor ? (
                        <div>
                          {prod.length !== 0 ? (
                            <div>
                              {/* hii {prod[0].products[0].prod_id} */}
                              {prod.map((pro, index) => (
                                <Paper style={{ marginBottom: "10px" }}>
                                  {/* <h5
                                    style={{
                                      backgroundColor: "",
                                      padding: "10px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    {pro?.products[0]?.vendor?.name}
                                  </h5> */}
                                  <p
                                    style={{
                                      backgroundColor: "#eaeaea",
                                      marginBottom: "0px",
                                      padding: "10px",
                                    }}
                                  >
                                    Package {index + 1}
                                  </p>
                                  <div
                                    style={{
                                      backgroundColor: "",
                                      padding: "10px",
                                      marginBottom: "0px",
                                    }}
                                  >
                                    <h5
                                    // style={{ marginBottom: "3px" }}
                                    >
                                      {pro?.products[0]?.vendor?.name}
                                    </h5>
                                    <span>
                                      Delivery Charge {getStarting?.currency}
                                      {
                                        pro?.products[0]?.vendor
                                          ?.delivery_charge
                                      }
                                    </span>
                                  </div>
                                  <Divider />

                                  <List
                                    sx={{
                                      width: "100%",
                                      bgcolor: "background.paper",
                                      paddingBottom: "0px",
                                      paddingtop: "0px",
                                    }}
                                  >
                                    {pro?.products.map((product) => (
                                      <div>
                                        {" "}
                                        <ListItem>
                                          <ListItemAvatar>
                                            {/* <Avatar>
                                                    <ImageIcon />
                                                </Avatar> */}
                                            <Link to={`/product/${product.slug}`}>
                                              <img
                                                src={`${
                                                  process.env
                                                    .REACT_APP_CDN_URL +
                                                  product.thumbnail +
                                                  "?w=60&h=60&q=72"
                                                }`}
                                                width="50px"
                                                height="50px"
                                                alt=""
                                              />
                                            </Link>
                                          </ListItemAvatar>
                                          <ListItemText
                                            primary={product.name}
                                            secondary={
                                              "Quantity: " +
                                              product.quantity +
                                              " | Price: " +
                                              product.sell_price
                                            }
                                          />
                                        </ListItem>
                                        <Divider />
                                      </div>
                                    ))}
                                  </List>
                                </Paper>
                              ))}{" "}
                            </div>
                          ) : (
                            <div style={{ padding: "15px" }}>No product</div>
                          )}
                        </div>
                      ) : shoppingCart.length !== 0 ? (
                        <List
                          sx={{
                            width: "100%",
                            bgcolor: "background.paper",
                            paddingBottom: "0px",
                            paddingtop: "0px",
                          }}
                        >
                          {shoppingCart.map((product) => (
                            <div>
                              {" "}
                              <ListItem>
                                <ListItemAvatar>
                                  {/* <Avatar>
                                                    <ImageIcon />
                                                </Avatar> */}
                                  <img
                                    src={`${
                                      process.env.REACT_APP_CDN_URL +
                                      product.thumbnail +
                                      "?w=60&h=60&q=72"
                                    }`}
                                    width="50px"
                                    height="50px"
                                    alt=""
                                  />
                                </ListItemAvatar>
                                <ListItemText
                                  primary={product.name}
                                  secondary={
                                    "Price: " +
                                    product.sell_price +
                                    ", Quantity: " +
                                    product.quantity
                                  }
                                />
                              </ListItem>
                              <Divider />
                            </div>
                          ))}
                        </List>
                      ) : (
                        <div style={{ padding: "15px" }}>No product</div>
                      )}
                    </div>
                  </div>

                  <div className="tmp-checkout-payment-right">
                    {/* <div className="tmp-checkout-payment-left-inner"> */}
                    <Paper style={{ padding: "16px", marginBottom: "15px" }}>
                      <h4>Checkout Summary</h4>
                      <hr />
                      <div
                        className="d-flex justify-content-between"
                        style={{ borderBottom: "1px dashed #eaeaea" }}
                      >
                        <span>Products</span>
                        <span>
                          <span style={{ fontSize: "22px" }}>
                            {getStarting?.currency}{" "}
                          </span>
                          {cartPrice}
                        </span>
                      </div>
                      <div
                        className="d-flex justify-content-between"
                        style={{ borderBottom: "1px dashed #eaeaea" }}
                      >
                        <span>Delivery Charge</span>
                        <span>
                          <span style={{ fontSize: "22px" }}>
                            {getStarting?.currency}{" "}
                          </span>
                          {shipingCharge}
                          .00
                        </span>
                      </div>
                      <div
                        className="d-flex justify-content-between"
                        style={{ borderBottom: "1px dashed #eaeaea" }}
                      >
                        <span>Discount</span>
                        <span>
                          <span style={{ fontSize: "22px" }}>
                            {getStarting?.currency}{" "}
                          </span>
                          {couponCodeAmount}.00
                        </span>
                      </div>
                      <div className="d-flex justify-content-between">
                        <span>
                          <strong>Total</strong>
                        </span>
                        <span>
                          <span style={{ fontSize: "22px" }}>
                            {getStarting?.currency}{" "}
                          </span>
                          <strong>
                            {cartPrice + shipingCharge - couponCodeAmount}
                          </strong>
                        </span>
                      </div>
                    </Paper>
                    {/* </div> */}
                    {/* <div className="tmp-checkout-payment-left-inner" style={{ padding: '12px 25px' }}>
                                <Navbar>
                                    <NavDropdown title="Select Courier" id="basic-nav-dropdown">
                                        {couriers?.length === 0 ?
                                            <NavDropdown.Item><h6>No couriers data found</h6></NavDropdown.Item>
                                            :
                                            couriers?.map(courier => <NavDropdown.Item key={courier._id}><h6 onClick={() => handleDeliveryCharge(courier._id, courier.name, courier.delivery_charge)}>{courier.name} ( {courier.delivery_charge} TK )</h6></NavDropdown.Item>)
                                        }
                                    </NavDropdown>
                                    <input className="courier-name" defaultValue={courierName} required />
                                </Navbar>
                            </div> */}

                    {/* <div className="tmp-checkout-payment-left-inner"> */}
                    <Paper style={{ padding: "16px", marginBottom: "15px" }}>
                      <div className="d-flex">
                        <input
                          value={couponCode}
                          className="coupon-code"
                          onChange={(e) => setCouponCode(e.target.value)}
                          placeholder="Coupon Code"
                        />
                        <Button
                          variant="outlined"
                          className="coupon-code-btn"
                          onClick={handleCouponCode}
                        >
                          Check
                        </Button>
                      </div>
                      {errorMessage && (
                        <p
                          style={{
                            color: "#ff4747",
                            margin: "20px 0px 0px",
                          }}
                        >
                          {errorMessage}
                        </p>
                      )}
                      {successMessage && (
                        <p
                          style={{
                            color: "green",
                            margin: "20px 0px 0px",
                          }}
                        >
                          {successMessage}
                        </p>
                      )}
                    </Paper>
                    {/* </div> */}
                  </div>
                </div>
              </form>
            </Container>
          );
        case 1:
          return (
            <Container>
              <Paper className="case1">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div
                    className=""
                    style={{ display: "flex", justifyContent: "center" }}
                  >
                    <div className="tmp-checkout-payment-right">
                      <div className="tmp-checkout-payment-right-inner">
                        <div className="d-flex align-items-center justify-content-between">
                          <h2>Shipping address</h2>
                          {/* <span className="d-flex align-items-center">
                                          <input type="checkbox" defaultValue='Out Dhaka' {...register("out_dhaka")} style={{width: '20px', padding: '0px', margin: '-5px 0px 0px'}}/>
                                          &nbsp;<h5>Out Of Dhaka</h5>
                                      </span> */}

                          <span style={{ color: "red" }}>{alertMessage}</span>
                        </div>
                        {/* <form onSubmit={handleSubmit(onSubmit)}> */}
                        <input
                          className="input"
                          placeholder="Receiver Name *"
                          //  defaultValue={customer.name}
                          value={receiver_name}
                          {...register("receiver_name")}
                          onChange={(e) => set_receiver_name(e.target.value)}
                        />
                        {/* <input defaultValue={customer.email} {...register("receiver_email")} /> */}

                        <input
                          className="input"
                          placeholder="Receiver Number *"
                          //  defaultValue={customer.phone}
                          value={receiver_phone}
                          {...register("receiver_phone")}
                          onChange={(e) => set_receiver_phone(e.target.value)}
                        />

                        <input
                          className="input"
                          value={receiver_location}
                          placeholder="Receiver Address *"
                          defaultValue={customer.address}
                          {...register("receiver_location")}
                          onChange={(e) =>
                            set_receiver_location(e.target.value)
                          }
                        />
                        <textarea
                          className="input"
                          placeholder="Orders notes (Optional)"
                          {...register("others")}
                          style={{ height: "120px" }}
                          onChange={(e) => set_others(e.target.value)}
                        />
                        {/* <input type="submit" value="PLACE ORDER" style={{ backgroundColor: `${getStarting?.primaryColor || '#157ed2'}`, border: 'none' }} /> */}
                        {/* </form> */}
                      </div>
                    </div>
                  </div>
                </form>
              </Paper>
            </Container>
          );
        case 2:
          return (
            <div className="case2">
              <div className="payment">
                {paymentMethods.includes("sslcommerz") && (
                  <Paper
                    className="payment-card"
                    style={
                      paymentMethod === "sslcommerz"
                        ? { outline: "3px solid gray" }
                        : {}
                    }
                    onClick={() => setPaymentMethod("sslcommerz")}
                  >
                    <img src={sslcommerz} alt="" />
                    <p>SSLCOMMERZ</p>
                  </Paper>
                )}
                {paymentMethods.includes("nagad") && (
                  <Paper
                    className="payment-card"
                    style={
                      paymentMethod === "nagad"
                        ? { outline: "3px solid gray" }
                        : {}
                    }
                    onClick={() => setPaymentMethod("nagad")}
                  >
                    <img src={nagad} alt="" />
                    <p>Nagad</p>
                  </Paper>
                )}
                {paymentMethods.includes("aamarpay") && (
                  <Paper
                    className="payment-card"
                    style={
                      paymentMethod === "aamarpay"
                        ? { outline: "3px solid gray" }
                        : {}
                    }
                    onClick={() => setPaymentMethod("aamarpay")}
                  >
                    <img src={aamarpay} alt="" />
                    <p>aamarPay</p>
                  </Paper>
                )}
                {paymentMethods.includes("bkash") && (
                  <Paper
                    className="payment-card"
                    style={
                      paymentMethod === "bkash"
                        ? { outline: "3px solid gray" }
                        : {}
                    }
                    onClick={() => setPaymentMethod("bkash")}
                  >
                    <img src={bkash} alt="" />
                    <p>Bkash</p>
                  </Paper>
                )}
                {paymentMethods.includes("paypal") && (
                  <Paper
                    className="payment-card"
                    style={
                      paymentMethod === "paypal"
                        ? { outline: "3px solid gray" }
                        : {}
                    }
                    onClick={() => setPaymentMethod("paypal")}
                  >
                    <img src={paypal} alt="" />
                    <p>Paypal</p>
                  </Paper>
                )}
                {paymentMethods.includes("cash") && (
                  <Paper
                    className="payment-card"
                    style={
                      paymentMethod === "cash"
                        ? { outline: "3px solid gray" }
                        : {}
                    }
                    onClick={() => setPaymentMethod("cash")}
                  >
                    <img src={cod} alt="" />
                    <p>Cash On Delivery</p>
                  </Paper>
                )}
              </div>
            </div>
          );

        default:
          return "Unknown stepIndex";
      }
    }
  if (shoppingCart.length === 0) return (
    <>
      <div style={{ minHeight: "540px" }}>
        <Container>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <div>
              <img
                src="https://islamimart.com/media/products/noproduct.png"
                alt=""
              />
              <h5 className="text-center">
                <Link to="/products">Click to shop</Link>
              </h5>
            </div>
          </div>
        </Container>
      </div>
    </>
  );
    return (
      <>
        <style type="text/css">
          {`
                        .tmp-checkout-payment-left-inner{
                            border: 2px solid ${getStarting?.primaryColor};
                        }
                        .tmp-checkout-payment-left-inner input,
                        .tmp-checkout-payment-left .courier-name,
                        .tmp-checkout-payment-right input,
                        .tmp-checkout-payment-right textarea{
                            border: 1px solid ${getStarting?.primaryColor};
                        }
                        .tmp-checkout-payment-left h6:hover{
                            color: ${getStarting?.primaryColor};
                            border: 1px solid ${getStarting?.primaryColor};
                        }
                        .tmp-checkout-payment-left .coupon-code-btn{
                            border: 1px solid ${getStarting?.primaryColor};
                            background-color: ${getStarting?.primaryColor};
                        }
                        .tmp-checkout-payment-left .coupon-code-btn:hover{
                            color: ${getStarting?.primaryColor};
                            border: 1px solid ${getStarting?.primaryColor};
                            background-color: transparent;
                        }
                    `}
        </style>

        <div className="tmp-checkout-details-banner">
          {/* <Container>
                    <h2 className="pt-3">Checkout</h2>
                </Container> */}
        </div>
        <div style={{ minHeight: "540px" }}>
          <Container>
            <h1 style={{ textAlign: "center", margin: "10px 0px" }}>
              Checkout
            </h1>

            <div className="stepper">
              <Stepper activeStep={activeStep}>
                {steps.map((label, index) => {
                  const stepProps = {};
                  const labelProps = {};
                  if (isStepOptional(index)) {
                  }

                  return (
                    <Step key={label} {...stepProps}>
                      <StepLabel {...labelProps}>{label}</StepLabel>
                    </Step>
                  );
                })}
              </Stepper>
            </div>
            <div className="stepper-content">
              <React.Fragment>
                <Typography sx={{ mt: 2, mb: 1 }}>
                  {getStepContent(activeStep)}
                </Typography>
                <div className="btn-area">
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "row",
                      pt: 0,
                      mx: 2,
                      mb: 3,
                      justifyContent: "right",
                    }}
                  >
                    <Button
                      color="inherit"
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      sx={{ mr: 1 }}
                    >
                      Back
                    </Button>

                    {activeStep === 0 && (
                      <Button
                        onClick={handleNext}
                        disabled={activeStep === 3}
                        variant="contained"
                      >
                        {activeStep === steps.length - 1
                          ? "place order"
                          : "Next"}
                      </Button>
                    )}
                    {activeStep === 1 && (
                      <Button
                        onClick={handleNextTwo}
                        disabled={activeStep === 3}
                        variant="contained"
                      >
                        {activeStep === steps.length - 1
                          ? "place order"
                          : "Next"}
                      </Button>
                    )}
                    {activeStep === 2 && (
                      <Button
                        onClick={submitOrder}
                        disabled={activeStep === 3}
                        variant="contained"
                      >
                        Place order
                      </Button>
                    )}
                  </Box>
                </div>
              </React.Fragment>
            </div>
          </Container>
        </div>
      </>
    );
};

export default Checkout;
