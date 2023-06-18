import React, { useEffect, useState } from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Link, useNavigate, useParams } from 'react-router-dom';
// import { Paper } from '@mui/material';
import './ProductsDetails.css';
import ProductsDetailsSummery from './ProductsDetailsSummery';
import { Helmet } from 'react-helmet';
import ProductDetailsSkeleton from '../../GlobalShared/pages/skeleton/ProductDetailsSkeleton';


// order data 
import Swal from "sweetalert2/dist/sweetalert2.js";
// import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import "../Order/direct-order.css";
import Paper from "@mui/material/Paper";



<>
{/* <meta charset="utf-8"/>
<title>5Pcs Universele Auto Polish Pad 3/4/5/6 Inch Zachte Wol Machine Waxen Polijstmachine Auto Lichaam Polijsten discs Detailing Cleaning Goederen|Polishing Disc|   - AliExpress</title>
<meta name="keywords" content="Polishing Disc,Automobiles & Motorcycles, Cheap Polishing Disc,High Quality Automobiles & Motorcycles"/>
<meta name="description" content="5Pcs Universele Auto Polish Pad 3/4/5/6 Inch Zachte Wol Machine Waxen Polijstmachine Auto Lichaam Polijsten discs Detailing Cleaning Goederen,Koop van verkopers in China en van rond de hele wereld. Profiteer van gratis verzending, aanbiedingen beperkt in tijd, makkelijk retourneren en bescherming van de koper!
Geniet van ✓Free verzending wereldwijd! ✓ Beperkte tijd te koop ✓Gemakkelijk rendement"/>
<meta name="google-translate-customization" content="8daa66079a8aa29e-f219f934a1051f5a-ge19f8e1eaa3bf94b-e"/>

    <meta name="viewport" content="width=1260" />

<meta name="data-spm" content="a2g0o"/>


<meta property="og:url" content="//nl.aliexpress.com/item/1005002843058339.html?src=ibdm_d03p0558e02r02&sk=&aff_platform=&aff_trace_key=&af=&cv=&cn=&dp=" />
<meta property="og:title" content="6.24€ |5Pcs Universele Auto Polish Pad 3/4/5/6 Inch Zachte Wol Machine Waxen Polijstmachine Auto Lichaam Polijsten discs Detailing Cleaning Goederen|Polishing Disc|   - AliExpress" />
<meta property="og:type" content="product" />
<meta property="og:image" content="https://ae01.alicdn.com/kf/Sff6c956256944386baec93f292c46caet/5Pcs-Universele-Auto-Polish-Pad-3-4-5-6-Inch-Zachte-Wol-Machine-Waxen-Polijstmachine-Auto.jpg"/>
<meta property="og:description" content="Smarter Shopping, Better Living!  Aliexpress.com" />
<meta property="og:site_name" content="aliexpress.com" /> */}
</>


const ProductsDetails = () => {
  // document.title = 'Product | Best Home Decor &amp; Room Decor &amp; Islamic Calligraphy Collection in BD | Room Decor Bangladesh';
  // <Helmet>
  //     <title>App Title</title>
  //     <meta name="description" content="Product details" />
  //     <meta name="theme-color" content="#008f68" />
  // </Helmet>

  const navigate = useNavigate();

  const { productSlug } = useParams();
  const [product, setProduct] = useState([]);
  const [productRatting, setProductRatting] = useState([]);
  // const productId = JSON.parse(localStorage.getItem('productId'))

  const getStarting = JSON.parse(localStorage.getItem("starting"));
  const userToken = JSON.parse(localStorage.getItem("userToken"));

  useEffect(() => {
    if (!productSlug) return;
    fetch(
      `${process.env.REACT_APP_BASE_URL}api/products/by-slug/${productSlug}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${getStarting.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      }
    )
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw new Error("Something went wrong");
      })
      .then((data) => {
        setProduct(data);
      })
      .catch((error) => {
        navigate("*");
      });
  }, [productSlug, getStarting.token]);

  useEffect(() => {
    if (!productSlug) return;
    if (!product._id) return;
    fetch(
      `${process.env.REACT_APP_BASE_URL}api/products/rating/${product._id}`,
      {
        method: "GET",
        headers: {
          authorization: `Bearer ${getStarting.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setProductRatting(data.data);
      });
  }, [productSlug, product._id, getStarting.token]);

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
  const handleOpen = (product, size, color) => {
    setOpen(true);
    product.size = size
    product.color = color
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
  //     size: selectedProduct.size,
  //     color: selectedProduct.color,
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
    <div>
      <Container>
        {product?.length === 0 ? (
          // <div style={{ color: `${getStarting?.primaryColor}`, margin: '250px 0', textAlign: 'center'}}>
          //     <Spinner animation="border" />
          // </div>
          <Paper className="product-details-skeleton my-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 bg-white rounded-lg overflow-hidden">
            <ProductDetailsSkeleton />
          </Paper>
        ) : (
          <div style={{ padding: "40px 0px" }}>
            <ProductsDetailsSummery
              product={product}
              productRatting={productRatting}
              handleOpen={handleOpen}
              orderSubmitHandler={orderSubmitHandler}
            ></ProductsDetailsSummery>
          </div>
        )}
      </Container>

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
    </div>
  );
};

export default ProductsDetails;