import React from "react";
import { Button, Container } from "react-bootstrap";
import "./Products.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../../GlobalShared/hooks/useAuth";
import { Link } from "react-router-dom";
import ProductsSummery from "./ProductsSummery";

// order data
import Swal from "sweetalert2/dist/sweetalert2.js";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import "../../Order/direct-order.css";
import Paper from "@mui/material/Paper";
import handleOrderSubmitGlobal from "../Global/ProductsNewGlobal";


const ProductsNew = () => {
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
    setOpen(false);
    setSelectedProduct(null);
  };

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
                  ></ProductsSummery>
                ))}
            </div>
          </Container>
        </div>
      )}
<handleOrderSubmitGlobal></handleOrderSubmitGlobal>
    </>
  );
};

export default ProductsNew;
