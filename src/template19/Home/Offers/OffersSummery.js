import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import "./OffersSummery.css";
import { Button } from "react-bootstrap";
import useAuth from "../../../GlobalShared/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import ImageLoader from "../../../GlobalShared/pages/Shared/ImageLoader/ImageLoader";
import blankImage from "../../../GlobalShared/images/blunk-image.png";
import Rating from "react-rating";
import { Link } from "react-router-dom";

const OffersSummery = (props) => {
  const { thumbnail, name, sell_price, slug, rating, discount } = props.product;
  const { handleAddToCart, getStarting } = useAuth();

  const navigate = useNavigate();
  const handleProduct = () => {
    navigate(`/product/${slug}`);
  };

  // const image = `{${process.env.IMAGE_URL/thumbnail}}`
  const image = `${
    process.env.REACT_APP_CDN_URL + thumbnail + "?w=300&h=300&q=100"
  }`;

  const offer = (sell_price * discount) / 100;
  const offerPrice = parseInt(sell_price + offer);
  return (
    <>
      <style type="text/css">
        {`.tmp6-offers-add-cart-btn:hover {
                    background-color: ${getStarting?.primaryColor} !important;
                    color: #fff !important;
                }
                `}
      </style>
      <div className="tmp6-products-summery-container">
        <div className="tmp6-products-summery-inner">
          <div
            className="tmp6-products-summery-inner-image"
            onClick={handleProduct}
          >
            <div className="image">
              <ImageLoader url={image} thumb={blankImage} />
            </div>
          </div>
          <div style={{ padding: "20px" }}>
            {discount > 0 ? (
              <h6
                className="hot"
                style={{ backgroundColor: `${getStarting?.primaryColor}` }}
              >
                <span>{discount}%</span>
              </h6>
            ) : (
              ""
            )}
            <div onClick={handleProduct}>
              <h4 onClick={handleProduct}>{name}</h4>
              <span>
                <strong>TK {sell_price}</strong>
              </span>
              <div className="d-flex align-items-center">
                <Rating
                  readonly
                  placeholderRating={rating?.score || 0}
                  emptySymbol={
                    <span style={{ color: "#dadada", fontSize: "20px" }}>
                      ★
                    </span>
                  }
                  placeholderSymbol={
                    <span style={{ color: "#faca51", fontSize: "20px" }}>
                      ★
                    </span>
                  }
                  fullSymbol={
                    <span style={{ color: "#faca51", fontSize: "20px" }}>
                      ★
                    </span>
                  }
                />
                <p
                  style={{
                    marginBottom: "0px",
                    fontSize: "15px",
                    fontWeight: "400",
                    color: "#9e9e9e",
                  }}
                >
                  &nbsp;({rating?.total || 0})
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center mt-2">
              {!getStarting.customerAuthentication ? (
                <Button
                  // onClick={() => handleAddToCart(props.product)}
                  onClick={() => props.handleOpen(props.product)}
                  className="tmp6-products-add-cart-btn"
                  style={{
                    color: `${getStarting?.primaryColor}`,
                    border: `1px solid ${getStarting?.primaryColor}`,
                  }}
                >
                  অর্ডার করুন
                </Button>
              ) : (
                <Link to="/checkout" className="tmp6-products-add-cart-btn">
                  <Button
                    // onClick={() => handleAddToCart(props.product)}
                    onClick={() =>
                      handleAddToCart(
                        props.product
                        // productColorId,
                        // prodPrice,
                        // prodSize,
                        // prodColor
                      )
                    }
                    className="tmp6-products-add-cart-btn"
                    style={{
                      color: `${getStarting?.primaryColor}`,
                      border: `1px solid ${getStarting?.primaryColor}`,
                    }}
                  >
                    অর্ডার করুন
                  </Button>
                </Link>
              )}
              <span
                className="tmp6-products-eye"
                onClick={handleProduct}
                style={{
                  color: `${getStarting?.primaryColor}`,
                  border: `1px solid ${getStarting?.primaryColor}`,
                }}
              >
                <FontAwesomeIcon icon={faEye} />
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OffersSummery;
