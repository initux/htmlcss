import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import './Offers.css';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import OffersSummery from './OffersSummery';
import ProductsTimeCounter from '../../../GlobalShared/pages/Shared/ProductsTimeCounter/ProductsTimeCounter';




// order data 
import Swal from "sweetalert2/dist/sweetalert2.js";
// import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import "../../Order/direct-order.css";
import Paper from "@mui/material/Paper";




//-------------------------------------------------------------------------------------------
                              // Custom Array
//-------------------------------------------------------------------------------------------

const CustomArrow = (props) => {
  const { className, style, onClick } = props;
  const {getStarting} = useAuth()

  return (
    <div
        className={className}
        style={{ 
            backgroundColor: `${getStarting?.primaryColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
           }}
        onClick={onClick}
      />
  );
}

//-------------------------------------------------------------------------------------------
                              // Offer
//-------------------------------------------------------------------------------------------

const Offers = () => {
  const { products, getStarting } = useAuth();
  const [superOffer, setSuperOffer] = useState([]);
  const hoursMinSecs = { days: 5, hours: 0, minutes: 0, seconds: 10 };

  useEffect(() => {
    const offerList = products?.filter(
      (product) => product.superOffer === true
    );
    setSuperOffer(offerList);
  }, [products]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
    responsive: [
      {
        breakpoint: 1400,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  // order modal data
  // const getStarting = JSON.parse(localStorage.getItem("starting"));
  // const navigate = useNavigate();
  const [receiver_name, setReceiverName] = React.useState("");
  const [receiver_phone, setReceiverPhone] = React.useState("");
  const [receiver_address, setReceiverAddress] = React.useState("");
  const [delivery_area, setDeliveryArea] = React.useState("");
  const [message, setMessage] = React.useState("");
  const [selectedProduct, setSelectedProduct] = React.useState("");

  const [open, setOpen] = React.useState(false);
  const handleOpen = (product) => {
    setOpen(true);
    setSelectedProduct(product);
    console.log("prod", product);
  };
  const handleClose = () => {
    // navigate("/");
    setOpen(false);
    setSelectedProduct(null);
  };

  // const orderSubmitHandler = () => {
  //   // console.log(receiver_name, receiver_phone, receiver_address, delivery_area);
  //   if (!selectedProduct) return;

  //   if (!receiver_name) {
  //     setMessage("নাম লিখুন");
  //     return;
  //   }
  //   if (!receiver_phone) {
  //     setMessage("মোবাইল নম্বর লিখুন");
  //     return;
  //   }
  //   if (!receiver_address) {
  //     setMessage("ঠিকানা লিখুন");
  //     return;
  //   }
  //   // if (!delivery_area) {
  //   //   setMessage("ডেলিভারি এরিয়া সিলেক্ট করুন");
  //   //   return;
  //   // }
  //   let data = {};
  //   let products = [];
  //   products.push({
  //     prod_id: selectedProduct._id,
  //     quantity: 1,
  //   });
  //   data.products = products;
  //   data.payment_amount = 0;
  //   // data.courier_id = courierId;
  //   // data.coupon_code = couponCode;
  //   data.payment_method = "cash";
  //   data.receiver_name = receiver_name;
  //   data.receiver_phone = receiver_phone;
  //   data.receiver_location = receiver_address;
  //   // data.others = others;
  //   fetch(
  //     `${process.env.REACT_APP_BASE_URL + "api/productOrders/withoutCustomer"}`,
  //     {
  //       method: "POST",
  //       headers: {
  //         authorization: `Bearer ${getStarting.token}`,
  //         "content-type": "application/json",
  //       },
  //       body: JSON.stringify(data),
  //     }
  //   )
  //     .then((res) => res.json())
  //     .then((result) => {
  //       console.log("result : ", result);
  //       setOpen(false);
  //       Swal.fire({
  //         position: "center",
  //         icon: "success",
  //         title: `${result.message}`,
  //         showConfirmButton: false,
  //         timer: 2000,
  //       });
  //       setSelectedProduct(null);
  //     })
  //     .catch((err) => console.log(err));
  // };

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const orderSubmitHandler = () => {
    // Check if the form is already being submitted
    if (isSubmitting) {
      return;
    }

    if (!selectedProduct) return;
    if (!receiver_name || !receiver_phone || !receiver_address) {
      setMessage("সব তথ্য পূরণ করুন");
      return;
    }

// Validate phone number using a regular expression
const phoneRegex = /^(01[3-9]|8801[3-9])\d{8}$/;
if (!phoneRegex.test(receiver_phone)) {
  setMessage("সঠিক মোবাইল নম্বর লিখুন");
  return;
}
  
    // Disable the "Send" button
    setIsSubmitting(true);
  
    // Submit the order data
    let data = {};
    let products = [];
    products.push({
      prod_id: selectedProduct._id,
      quantity: 1,
    });
    data.products = products;
    data.payment_amount = 0;
    data.payment_method = "cash";
    data.receiver_name = receiver_name;
    data.receiver_phone = receiver_phone;
    data.receiver_location = receiver_address;
    fetch(`${process.env.REACT_APP_BASE_URL}api/productOrders/withoutCustomer`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result : ", result);
        setOpen(false);
        Swal.fire({
          position: "center",
          icon: "success",
          title: `${result.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
        setSelectedProduct(null);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        // Re-enable the "Send" button
        setIsSubmitting(false);
      });
  };


  return (
    <>
      {superOffer.length === 0 ? (
        ""
      ) : (
        <div className="tmp6-offers">
          <Container>
            {/* <div>
                        <Link to="/products">
                            <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}><FontAwesomeIcon icon={faEye} />  View All</Button>
                        </Link>
                    </div> */}
            <div className="d-flex align-items-center bg-white p-2 rounded">
              {/* <img src="https://i.ibb.co/zrjgGsM/super-deal.png" className="w-25" alt="" /> */}
              <h2
                className="mb-0 me-2"
                style={{ color: `${getStarting?.primaryColor}` }}
              >
                Super Offer
              </h2>
              <ProductsTimeCounter hoursMinSecs={hoursMinSecs} />
            </div>
            <div className="tmp6-offers-container pb-4">
              <Slider {...settings}>
                {superOffer?.map((product) => (
                  <OffersSummery
                    product={product}
                    key={product._id}
                    handleOpen={handleOpen}
                    orderSubmitHandler={orderSubmitHandler}
                  ></OffersSummery>
                ))}
              </Slider>
            </div>
          </Container>
        </div>
      )}

      {/* order modal */}
      <div>
        {/* <Button onClick={handleOpen}>Open modal</Button> */}
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Paper className={open ? "modal-window active" : "modal-window"}>
            <div className="modal-headerr">
              <div className="modal-titlee">
                <p className="modal-title-textt">Order Now</p>
              </div>
              <div className="error-message">
                <span>{message}</span>
              </div>
              <div className="modal-close-btn">
                <div
                  className="close-icon"
                  onClick={handleClose}
                  style={{ backgroundColor: getStarting.primaryColor }}
                >
                  <CloseIcon />
                </div>
              </div>
            </div>
            <Divider />
            <div className="modal-body">
              <section class="">
                <form method="" action="" class="">
                  <div class="">
                    <div className="form-controll">
                      <label for="name">
                        Full Name <span className="input-require">*</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        class=""
                        id="name"
                        placeholder="সম্পূর্ণ নামটি লিখুন"
                        value={receiver_name}
                        onChange={(e) => setReceiverName(e.target.value)}
                        required=""
                      />
                    </div>
                  </div>
                  <div class="">
                    <div className="form-controll">
                      <label for="username">
                        Mobile Number <span className="input-require">*</span>
                      </label>
                      <input
                        type="number"
                        maxlength="11"
                        oninput="javascript: if (this.value.length > this.maxLength) this.value = this.value.slice(0, this.maxLength);"
                        name="username"
                        id="username"
                        class="w-full input input-bordered focus:outline-red-400"
                        value={receiver_phone}
                        onChange={(e) => setReceiverPhone(e.target.value)}
                        placeholder="১১ ডিজিটের মোবাইল নাম্বারটি লিখুন।"
                        required=""
                      />
                    </div>
                  </div>
                  <div class="">
                    <div className="form-controll">
                      <label for="address">
                        Address <span className="input-require">*</span>
                      </label>
                      <input
                        type="text"
                        name="address"
                        class="w-full input input-bordered focus:outline-red-400"
                        placeholder="সম্পূর্ণ ঠিকানা লিখুন"
                        value={receiver_address}
                        onChange={(e) => setReceiverAddress(e.target.value)}
                        id="address"
                        required=""
                      />
                    </div>
                  </div>
                  {/* Choose Delivery Area */}

                  {/* <div class="mb-4">
                  <div className="form-controll">
                    <label>
                      Delivery Area <span className="input-require">*</span>
                    </label>
                    <select
                      name="deliveryarea"
                      id=""
                      class=""
                      required=""
                      onChange={(e) => setDeliveryArea(e.target.value)}
                    >
                      <option value="" selected="" disabled="" hidden="">
                        Select
                      </option>
                      <option value="insidedhaka">
                        ঢাকা সিটির ভিতরে হোম ডেলিভারি (60Tk )
                      </option>
                      <option value="outsidedhakaHomeService">
                        ঢাকা সিটির বাহিরে হোম ডেলিভারি (150Tk )
                      </option>
                      <option value="outsidedhaka">
                        কুরিয়ার অফিস থেকে ডেলিভারি (120Tk )
                      </option>
                    </select>
                  </div>
                </div> */}
                </form>
              </section>
            </div>

            <div className="modal-footerr">
              {/* <button
                class="modal-submit-btn"
                onClick={orderSubmitHandler}
                style={{ backgroundColor: getStarting.primaryColor }}
              >
                অর্ডার কনফার্ম করতে এখানে ক্লিক করুন
              </button> */}
              <button
  className="modal-submit-btn"
  onClick={orderSubmitHandler}
  disabled={isSubmitting}
  style={{ backgroundColor: getStarting.primaryColor }}
>
  অর্ডার কনফার্ম করতে এখানে ক্লিক করুন
</button>
            </div>
          </Paper>
        </Modal>
      </div>
    </>
  );
};

export default Offers;