import React from "react";
import { Button, Container } from "react-bootstrap";
import "../Products/Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../GlobalShared/hooks/useAuth";
import { Link } from "react-router-dom";
import ProductsSummery from "../Products/ProductsSummery";

// order data
import Swal from "sweetalert2/dist/sweetalert2.js";
// import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import "../../Order/direct-order.css";
import Paper from "@mui/material/Paper";

import OrderSubmitHandler from "./helperFunctions";

export const handleOrderSubmitGlobal = (selectedProduct, receiver_name, receiver_phone, receiver_address, getStarting, setMessage, setSelectedProduct, setOpen) => {
    OrderSubmitHandler({
      selectedProduct: selectedProduct,
      receiver_name: receiver_name,
      receiver_phone: receiver_phone,
      receiver_address: receiver_address,
      getStarting: getStarting,
      setMessage: setMessage,
      setSelectedProduct: setSelectedProduct,
      setOpen: setOpen,
    });
  };

const ProductsNewGlobal = () => {
  const { products, getStarting, handleClearAllProductsPage } = useAuth();

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

  // const handleOrderSubmit = () => {
  //   OrderSubmitHandler({
  //     selectedProduct: selectedProduct,
  //     receiver_name: receiver_name,
  //     receiver_phone: receiver_phone,
  //     receiver_address: receiver_address,
  //     getStarting: getStarting,
  //     setMessage: setMessage,
  //     setSelectedProduct: setSelectedProduct,
  //     setOpen: setOpen,
  //   });
  // };

  

  const [isSubmitting, setIsSubmitting] = React.useState(false);

  return (
    <>
      {products?.length === 0 ? (
        ""
      ) : (
        <div className="tmp6-products pb-4">
          <Container>
            <div className="d-flex align-items-center justify-content-between p-2 mb-2 bg-white rounded">
              <h2
                className="mb-0 me-2"
                style={{ color: `${getStarting?.primaryColor}` }}
              >
                All Products 1
              </h2>
              <Link to="/products" onClick={handleClearAllProductsPage}>
                <Button
                  style={{
                    backgroundColor: `${getStarting?.primaryColor}`,
                    border: "none",
                  }}
                >
                  <FontAwesomeIcon icon={faEye} /> View All
                </Button>
              </Link>
            </div>
            <div className="tmp6-products-container">
              {products
                ?.slice(0)
                .reverse()
                .map((product) => (
                  <ProductsSummery
                    product={product}
                    key={product._id}
                    handleOpen={handleOpen}
                    orderSubmitHandler={handleOrderSubmitGlobal}
                  ></ProductsSummery>
                ))}
            </div>
          </Container>
        </div>
      )}

  
      <div>
      
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
                </form>
              </section>
            </div>

            <div className="modal-footerr">
     

<button
  className="modal-submit-btn"
  onClick={handleOrderSubmitGlobal}
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

export default ProductsNewGlobal;
