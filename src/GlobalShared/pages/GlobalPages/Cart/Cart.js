import React from "react";
import { Button, Container, Table } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import "./Cart.css";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const Cart = () => {
  const {
    cart,
    handleAddToCart,
    handleMinusToCart,
    handlePlusToCart,
    handleRemove,
    getStarting,
    handleClearAllProductsPage,
  } = useAuth();

  let cartLength = 0;
  let cartPrice = 0;
  let offerPrice = 0;
  if (!cart) {
  } else {
    for (const product of cart) {
      if (!product.quantity) {
        product.quantity = 1;
      }
      cartLength = cartLength + product.quantity;
      cartPrice = cartPrice + product.sell_price * product.quantity;

      const offer = (product.sell_price * product.discount) / 100;
      const discount = product.sell_price - offer;
      offerPrice = offerPrice + discount * product.quantity;
    }
  }

  // const total = cart.reduce((previous, product) => previous + product.sell_price * product.quantity, 0)
  // const orderTotal = parseFloat(total).toFixed(2);

  // (c.sell_price - (( c.sell_price * c.discount ) / 100)) * c.quantity
  // {parseInt((c.sell_price - (( c.sell_price * c.discount ) / 100)) * c.quantity)}.00

  return (
    <>
      {cart?.length === 0 ? (
        <div
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div className="text-center">
            <h5 style={{ color: `#757575`, margin: "20px 0" }}>
              There are no items in this cart
            </h5>
            <Link to="/products" onClick={handleClearAllProductsPage}>
              <Button
                variant="primary"
                style={{
                  backgroundColor: `${getStarting.primaryColor}`,
                  border: "none",
                }}
              >
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      ) : (
        <Container className="tmp-cart-container">
          <div>
            <div className="mx-auto">
              <Table
                hover
                responsive="sm"
                style={{ border: `0.1px solid ${getStarting.primaryColor}` }}
              >
                <thead>
                  <tr>
                    <th></th>
                    <th>Item</th>
                    <th>Quantity</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                {cart?.map((c) => (
                  <tbody key={c._id}>
                    <tr>
                      <td
                        style={{ width: "50px", textTransform: "capitalize" }}
                      >
                        <Link to={`/product/${c.slug}`}>
                          <img
                            src={`${
                              process.env.REACT_APP_CDN_URL +
                              c.thumbnail +
                              "?w=60&h=60&q=72"
                            }`}
                            width="50px"
                            height="50px"
                            alt=""
                          />
                        </Link>
                      </td>
                      <td style={{ textTransform: "capitalize" }}>
                        <div className="tmp-cart-info">
                          <span className="d-flex align-items-center">
                            <strong>Name :</strong> &nbsp; {c.name}
                          </span>
                          <span
                            className="d-flex align-items-center"
                            style={{ width: "102px" }}
                          >
                            <strong>Price :</strong> &nbsp;
                            {/* {c.sell_price * c.quantity} */}
                            {c.sell_price}
                          </span>
                          <div className="quantity-size-color">
                            <p>
                              <strong>Quantity :</strong> &nbsp; {c.quantity}{" "}
                              &nbsp;
                            </p>
                            <p>
                              
                              <strong>Size :</strong> &nbsp;{" "}
                              {c.size ? c.size : "--"} &nbsp;
                            </p>
                            <p>
                              
                              <strong>Color :</strong> &nbsp;{" "}
                              {c.color ? c.color : "--"}
                            </p>
                          </div>
                          {/* {console.log(c)} */}
                        </div>
                      </td>
                      <td>
                        <div className="tmp-cart-quantity">
                          <button
                            onClick={() => handleMinusToCart(c)}
                            className="btn text-white"
                            style={{
                              backgroundColor: `${getStarting.primaryColor}`,
                            }}
                          >
                            <FontAwesomeIcon icon={faMinus} />
                          </button>
                          <p
                            className="text-center"
                            style={{
                              backgroundColor: `${getStarting.primaryColor}99`,
                              color: "#fff",
                            }}
                          >
                            {c.quantity}
                          </p>
                          <button
                            onClick={() => handlePlusToCart(c)}
                            className="btn text-white"
                            style={{
                              backgroundColor: `${getStarting.primaryColor}`,
                            }}
                          >
                            <FontAwesomeIcon icon={faPlus} />
                          </button>
                        </div>
                      </td>
                      <td>
                        <button
                          onClick={() => handleRemove(c)}
                          className="btn text-white"
                          style={{
                            backgroundColor: `${getStarting.primaryColor}`,
                          }}
                        >
                          <FontAwesomeIcon icon={faTrashAlt} />
                        </button>
                      </td>
                    </tr>
                  </tbody>
                ))}
              </Table>
            </div>
            <div className="pt-3 pb-5">
              <Link to="/products" onClick={handleClearAllProductsPage}>
                <Button
                  variant="primary"
                  className="continue-shopping"
                  style={{
                    backgroundColor: `${getStarting.primaryColor}`,
                    border: "none",
                  }}
                >
                  Continue Shopping
                </Button>
              </Link>
            </div>
          </div>
          <div style={{ width: "300px", margin: "0 auto" }}>
            <div
              style={{
                border: `1px solid ${getStarting.primaryColor}`,
                padding: "30px",
              }}
            >
              <h6>
                <strong>
                  Price :
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <span style={{ fontSize: "22px" }}>
                    {getStarting?.currency}
                  </span>{" "}
                  {cartPrice}
                </strong>
              </h6>
              {/* <h6>Shipping Fee : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;$0.00</h6> */}
              <hr />
              <h5>
                Order Total :{" "}
                <span style={{ fontSize: "22px" }}>
                  {getStarting?.currency}
                </span>{" "}
                {cartPrice}
              </h5>
              <Link to="/checkout">
                <Button
                  variant="primary"
                  style={{
                    backgroundColor: `${getStarting.primaryColor}`,
                    border: "none",
                    width: "100%",
                  }}
                >
                  Proceed To Checkout
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      )}
    </>
  );
};

export default Cart;

// style={{border: `1px solid ${getStarting.primaryColor}`}}
