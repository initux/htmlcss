import React, { useEffect, useState } from "react";
import { Button, Tab, Tabs } from "react-bootstrap";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import "./ProductsDetailsSummery.css";
import HTMLRenderer from "react-html-renderer";
import useAuth from "../../GlobalShared/hooks/useAuth";
import { Link } from "react-router-dom";
import Swal from "sweetalert2/dist/sweetalert2.js";
import ProductsDetailsInner from "./ProductsDetailsInner";
import Rating from "react-rating";
import { Rating as SimpleRating } from "react-simple-star-rating";
import ProductsDetailsRatting from "./ProductsDetailsRatting";
import ReactPlayer from "react-player";
import { FcVideoFile, FcAddColumn, FcStart } from "react-icons/fc";
import muiButton from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import SliderDetails from "./SliderDetails";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import CallIcon from "@mui/icons-material/Call";
import { Helmet } from 'react-helmet';
import { borderRadius } from "@mui/system";
const ProductsDetailsSummery = (props) => {
  const {
    product_images,
    product_code,
    product_colors,
    product_size,
    productSize,
    rating,
    name,
    product_features,
    description,
    categories,
    discount,
    sell_price,
    brand,
    thumbnail,
    product_video,
    _id,
  } = props.product;
  console.log("......", props.product);
  const {
    handleAddToCart,
    newQuantity,
    setNewQuantity,
    getStarting,
    handleAllCategory,
    handleCategory,
    handleProductColor,
    productColorId,
    handleClearWithoutCategories,
  } = useAuth();

  console.log("colors : ", product_colors);

  const [prodPrice, setProductPrice] = useState(
    productSize?.length > 0 ? productSize[0].price : sell_price
  );
  const [prodSize, setProductSize] = useState(
    productSize?.length > 0 ? productSize[0].size : ""
  );
  const [prodColor, setProductColor] = useState(
    product_colors?.length > 0 ? product_colors[0].name : ""
  );

  const [relatedProducts, setRelatedProducts] = useState([]);
  const [rattingShow, setRattingShow] = useState(false);
  const [rattingValue, setRattingValue] = useState(0);
  const [rattingErrorMessage, setRattingErrorMessage] = useState("");
  const handleRattingShow = () => setRattingShow(true);
  const handleRattingClose = () => {
    setRattingShow(false);
    setRattingValue(0);
    setRattingErrorMessage("");
  };

  const user = JSON.parse(localStorage.getItem("AuthInfo"));

  document.title = `${name} | ${getStarting.companyName}`;
  <meta name="description" content={name | getStarting.companyName} />;

  const offer = (prodPrice * discount) / 100;
  const offerPrice = parseInt(prodPrice + offer);

  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetch(
      `${process.env.REACT_APP_BASE_URL}api/products/search/then-paginate?categories=${props.product.categories[0].name}`,
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
        const newRelatedProducts = data?.data?.filter((pd) => pd._id !== _id);
        setRelatedProducts(newRelatedProducts);
      });
  }, [_id, props.product.categories, getStarting.token]);

  const handleImageShow = (img) => {
    Swal.fire({
      imageUrl: `${img}`,
      imageWidth: "auto",
      imageHeight: "auto",
      imageAlt: "Custom image",
    });
  };
  const handleRatting = (rate) => {
    let value;
    if (rate === 20) {
      value = 1;
    } else if (rate === 40) {
      value = 2;
    } else if (rate === 60) {
      value = 3;
    } else if (rate === 80) {
      value = 4;
    } else if (rate === 100) {
      value = 5;
    }
    setRattingValue(value);
  };

  useEffect(() => {
    handleAllCategory();
  }, []);

  const handleProductPrice = (variant) => {
    setProductPrice(variant.price);
    setProductSize(variant.size);
  };
  const handleProdColor = (color) => {
    setProductColor(color);
  };

  return (
    <>

<Helmet>
  <title>{name}</title>
  <link rel="icon" type="image/png" href={process.env.REACT_APP_CDN_URL + getStarting?.logo} />
    <meta name="description" content={description} />
    <meta name="keywords" content={name} />
    <meta name="og:title" content={name} />
    <meta name="og:description" content={description} />
    <meta name="og:image" content={process.env.REACT_APP_CDN_URL + thumbnail + "?w=300&h=300&q=100"} />
    <meta property="og:url" content={window.location.href} />
  </Helmet>

      <style type="text/css">
        {`
                        .product-details-summery .carousel .thumb.selected, .product-details-summery .carousel .thumb:hover {
                            border: 3px solid ${getStarting?.primaryColor} !important;
                        }
                        .swal2-styled.swal2-confirm{
                            background-color: ${getStarting?.primaryColor} !important;
                        }
                        .carousel .slide img, carousel img {
                            width: auto !important;
                        }
                        .carousel .slider-wrapper.axis-horizontal .slider .slide {
                            background: #e0e0e0;
                            height: 500px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                        }
                        .product-details-summery .quantity-btn button:hover{
                            color: #fff !important;
                            background-color: ${getStarting?.primaryColor};
                            transition: 1s;
                        }
                        .product-details-summery-description .nav-link {
                            color: #495057 !important;
                        }
                        .product-details-summery-description .nav-link.active {
                            color: ${getStarting?.primaryColor} !important;
                        }
                        @media only screen and (min-width: 0px) and (max-width: 768px) {
                            .carousel .slide img, carousel img {
                                width: 100% !important;
                            }
                        }
                    `}
      </style>
      <div className="product-details-summery">
        <div
          className="image-slider-area"
          // style={{ borderRight: '2px solid gray' }}
        >
          {/* <Carousel
            showArrows={false}
            showStatus={false}
            thumbWidth={80}
            showIndicators={false}
            selectedItem={0}
          >
            {product_images?.map((image, i) => (
              <div key={i} style={{ cursor: "pointer" }}>
                <img
                  src={`${
                    process.env.REACT_APP_CDN_URL +
                    image +
                    "?w=1000&h=1000&q=100"
                  }`}
                  style={{ maxHeight: "500px", width: "100%" }}
                  alt=""
                />
              </div>
            ))}
          </Carousel> */}
          <SliderDetails>
            {product_video && (
              <ReactPlayer
                url={product_video}
                volume="1"
                muted
                width="100%"
                playing={true}
                controls={true}
                // height="100%"
              />
            )}
            {product_images?.map((image, i) => (
              <img
                src={`${process.env.REACT_APP_CDN_URL + image}`}
                style={{ height: "420px", width: "100%", objectFit: "contain" }}
                // className="slider-image"
                alt=""
              />
            ))}
          </SliderDetails>
        </div>
        <div style={{ backgroundColor: "rgb(246 246 246 / 58%)" }}></div>
        <div className="tmp-product-details-summery-inner">
          <div>
            <title>{name}</title>
            <h4
              style={{
                color: `${getStarting?.primaryColor}`,
                fontWeight: "bold",
              }}
            >
              {name}{" "}
              {product_video && (
                <FcStart
                  size={34}
                  style={{ cursor: "pointer" }}
                  onClick={handleClickOpen}
                />
              )}
            </h4>
            <h6>SKU: {product_code}</h6>
            <div
              className={`${discount > 0 && "d-flex align-items-center"} price`}
              style={{ marginTop: "15px" }}
            >
              {/* {discount > 0 && (
                <p
                  style={{
                    textDecoration: discount === 0 ? "none" : "line-through",
                    marginRight: "15px",
                    color: "#a1a1a1",
                  }}
                >
                  {getStarting?.currency} {offerPrice}
                </p>
              )} */}

              <p style={{ color: `${getStarting?.primaryColor}` }}>
                <span>
                  {getStarting?.currency} {prodPrice}
                </span>
              </p>
            </div>
            {product_features?.map((feature) => (
              <div key={feature._id}>
                <span>
                  <strong>{feature.name}</strong>&nbsp;{feature.value}
                </span>
              </div>
            ))}
            {product_features?.length > 0 && <br />}
            <div className="product-summery-info">
              <strong>categories: </strong>
              <Link to="/products">
                {/* <span onClick={handleCategory} style={{cursor: 'pointer'}}>{categories[0].name}</span>  */}
                {categories?.map((ct) => (
                  <span
                    key={ct._id}
                    style={{
                      cursor: "pointer",
                      color: `${getStarting?.primaryColor}`,
                    }}
                  >
                    <span onClick={handleCategory}>{ct.name}</span>
                    {categories?.length > 1 ? ", " : ""}
                  </span>
                ))}
              </Link>
            </div>
            {brand?.name && (
              <div className="product-summery-info">
                <strong>
                  Brand: <a href="">{brand?.name}</a>
                </strong>
              </div>
            )}
            {product_size?.length > 0 && (
              <div className="product-summery-info">
                <strong>Size: </strong>
                {product_size?.map((color) => (
                  <span
                    key={color?._id}
                    style={{
                      //   color: "#fff",
                      //   backgroundColor: `${color?.value}`,
                      border: "2px solid #fff",
                      outline: `2px solid gray`,
                      padding: "2px 17px",
                      borderRadius: "50px",
                      marginRight: "10px",
                      cursor: "pointer",
                    }}
                  >
                    {color?.name}{" "}
                  </span>
                ))}
              </div>
            )}
            {productSize?.length > 0 && (
              <div className="product-size-area">
                <strong style={{ marginTop: "0.5rem" }}>
                  Size: &nbsp; &nbsp;
                </strong>
                <div>
                  {productSize?.map((variant, i) => (
                    <span
                      onClick={() => handleProductPrice(variant)}
                      key={i}
                      style={{
                        //   color: "#fff",
                        //   backgroundColor: `${color?.value}`,
                        border: `2px solid ${
                          prodSize === variant?.size ? `red` : "#fff"
                        }`,
                        outline: `2px solid ${
                          prodSize === variant?.size ? `red` : "gray"
                        }`,
                        padding: "2px 17px",
                        borderRadius: "50px",
                        marginRight: "10px",
                        // marginTop: "50px",
                        cursor: "pointer",
                      }}
                    >
                      {variant?.size}{" "}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {product_colors?.length > 0 && (
              <div className="product-size-area">
                <strong style={{ marginTop: "0.5rem" }}>
                  Color: &nbsp; &nbsp;
                </strong>
                <div>
                  {product_colors?.map((color) => (
                    <span
                      // onClick={() => handleProductColor(color?._id)}
                      onClick={() => handleProdColor(color?.name)}
                      key={color?._id}
                      style={{
                        color: "#fff",
                        backgroundColor: `${color?.value}`,
                        border: `2px solid ${
                          prodColor === color?.name ? `red` : "#fff"
                        }`,
                        // outline: `2px solid ${
                        //   productColorId === color?._id ? `red` : "gray"
                        // }`,
                        // outline: `2px solid ${
                        //   productColorId === color?._id
                        //     ? `${color?.value}`
                        //     : "red"
                        // }`,
                        padding: "2px 17px",
                        borderRadius: "50px",
                        marginRight: "10px",
                        cursor: "pointer",
                      }}
                    >
                      {color?.name}{" "}
                    </span>
                  ))}
                </div>
              </div>
            )}
            <div className="quantity-btn quantity-area">
              <button
                onClick={() =>
                  setNewQuantity(
                    newQuantity > 1 ? newQuantity - 1 : newQuantity
                  )
                }
                style={{
                  color: `${getStarting?.primaryColor}`,
                  border: `2px solid ${getStarting?.primaryColor}`,
                }}
              >
                -
              </button>
              <h2
                style={{
                  fontSize: "25px",
                  textAlign: "center",
                  width: "40px",
                  marginBottom: "0px",
                  padding: "2px",
                  borderRadius: "2px",
                }}
              >
                {newQuantity}
              </h2>
              <button
                onClick={() => setNewQuantity(newQuantity + 1)}
                style={{
                  color: `${getStarting?.primaryColor}`,
                  border: `2px solid ${getStarting?.primaryColor}`,
                }}
              >
                +
              </button>
            </div>
            <div    style={{
                    fontSize: "25px",
                    textAlign: "left",
                    width: "100%",
                    marginBottom: "0px",
                    padding: "2px",
                    borderRadius: "2px",
                  }}>
            <Button
                className="addtocart-btn"
                onClick={() =>
                  handleAddToCart(
                    props.product,
                    productColorId,
                    prodPrice,
                    prodSize,
                    prodColor
                  )
                }
                variant="outline-light"
                style={{
                  color: "#fff",
                  backgroundColor: `${getStarting?.primaryColor}`,
                  border: "none",
                }}
              >
                কার্টে যোগ করুন
              </Button>
            </div>
            {/* <button
                  onClick={() =>
                    setNewQuantity(
                      newQuantity > 1 ? newQuantity - 1 : newQuantity
                    )
                  }
                  style={{
                    color: `${getStarting?.primaryColor}`,
                    border: `1px solid ${getStarting?.primaryColor}`,
                  }}
                >
                  -
                </button> */}
            
            <div style={{
                    marginTop: "5px"
                    
                  }} className="ordernow-and-addtocart-btn-area">
              <div className="mb-2 quantity-btn quantity-for-mobile">

                <h2
                  style={{
                    fontSize: "25px",
                    textAlign: "center",
                    width: "40px",
                    marginBottom: "0px",
                    padding: "2px",
                    borderRadius: "2px",
                  }}
                >
                  {newQuantity}
                </h2>
                <button
                  onClick={() => setNewQuantity(newQuantity + 1)}
                  style={{
                    color: `${getStarting?.primaryColor}`,
                    border: `1px solid ${getStarting?.primaryColor}`,
                  }}
                >
                  +
                </button>
                
              </div>
              
              

              {/* <Link to="/checkout"> */}

              

              {!getStarting.customerAuthentication ? (

                <div style={{width:"200%"}}>
                <Button
                  className="ordernow-btn"
                  onClick={() =>
                    props.handleOpen(props.product, prodSize, prodColor)
                  }
                  //variant="outline-light"
                  style={{
                    height: "100px",
                    width: "100%",
                 backgroundColor: "white",
                    // color: `${getStarting?.primaryColor}`,
                     borderColor: `${getStarting?.primaryColor}`,
                    // backgroundColor: "transparent",
              backgroundRepeat: "no-repeat",
                    backgroundImage: `url("https://www.limoli.com/wp-content/uploads/2016/08/order-now-button.gif")` 
                    
                    // marginLeft: "10px",
                  }}
                >
                  {/* অর্ডার করুন 1 */}
                </Button>
                </div>




              ) : (
                <Link to="/checkout" className="ordernow-btn">
                  <Button
                    className="ordernow-btn-button"
                    onClick={() =>
                      handleAddToCart(
                        props.product,
                        productColorId,
                        prodPrice,
                        prodSize,
                        prodColor
                      )
                    }
                    variant="outline-light"
                    style={{
                      color: `${getStarting?.primaryColor}`,
                      borderColor: `${getStarting?.primaryColor}`,
                      backgroundColor: "transparent",
                      // marginLeft: "10px",
                      // width: "100%",
                    }}
                  >
                    অর্ডার করুন 3
                  </Button>
                </Link>
              )}
            </div>


            <div style={{ marginTop: "12px", width: "100%" }}>
              <h4
                className="call-us"
                style={{ backgroundColor: getStarting.primaryColor, textAlign: "left"  }}
              >
               
                {/* <span>{getStarting?.phone}</span> */}
                {/* <a href="tel:123-456-7890">123-456-7890</a> */}
                <a
                  style={{ color: "white" }}
                  href={`tel:${getStarting?.phone}`}
                >
                   <CallIcon style={{ textAlign: "left" }} fontSize="large" /> {" "} {getStarting?.phone}
                </a>
              </h4>
            </div>
            <div style={{ width: "100%"}}>
              <h4
                className="call-us-whatsapp"
                // style={{ backgroundColor: getStarting.primaryColor }}
              >
                   <a
                  style={{ color: "white" }}
                  href={`https://wa.me/${getStarting?.phone}`}
                  
                >
                     <img style={{ width: "100%", textAlign: "left"}}
        src="https://scontent.fdac149-1.fna.fbcdn.net/v/t39.8562-6/302524815_3448899778679909_2843186333341006023_n.png?_nc_cat=104&ccb=1-7&_nc_sid=6825c5&_nc_ohc=1y0etqEImK8AX9BqLaP&_nc_ht=scontent.fdac149-1.fna&oh=00_AfCuJCw8wy2yf2Th_PdlZ00gN5_7H9NxVfQgTlzAzNHzCg&oe=63687F4F"
        alt="car"
      />
                  {/* {getStarting?.phone} */}
                </a>
              </h4>
            </div>
            {/* </Link> */}
            <div
              style={{ cursor: "pointer", margin: "20px 0px" }}
              title="Create Ratting"
              onClick={handleRattingShow}
            >
              {/* <Rating
                                readonly
                                placeholderRating={rating?.score || 5}
                                emptySymbol={<span style={{color: '#faca51', fontSize: '40px'}}>☆</span>}
                                placeholderSymbol={<span style={{color: '#faca51', fontSize: '40px'}}>★</span>}
                                fullSymbol={<span style={{color: '#faca51', fontSize: '40px'}}>★</span>}
                            /> */}
              {/* <SimpleRating
                onClick={handleRatting}
                ratingValue={rattingValue * 20}
                // showTooltip
                tooltipArray={[
                  "Terrible",
                  "Bad",
                  "Average",
                  "Great",
                  "Prefect",
                ]}
              /> */}
            </div>

            <ProductsDetailsRatting
              show={rattingShow}
              handleClose={handleRattingClose}
              productId={_id}
              handleRatting={handleRatting}
              rattingValue={rattingValue}
              rattingErrorMessage={rattingErrorMessage}
              setRattingErrorMessage={setRattingErrorMessage}
            ></ProductsDetailsRatting>
          </div>
        </div>
      </div>

      <div
        className="my-5 px-3 pt-3 pb-1 product-details-summery-description"
        style={{
          boxShadow: "0 2px 4px 0 rgb(0 0 0 / 8%)",
          backgroundColor: "#fff",
          borderRadius: "8px",
        }}
      >
        <Tabs
          defaultActiveKey="description"
          transition={false}
          id="noanim-tab-example"
          className="mb-3"
        >
          <Tab
            eventKey="description"
            title="Description"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {description === null ? (
              <p style={{ color: "grey", textAlign: "center" }}>
                There have been no description for this product yet.
              </p>
            ) : (
              <HTMLRenderer html={description} />
            )}
          </Tab>
          <Tab
            eventKey="reviews"
            title="Reviews"
            style={{ maxHeight: "500px", overflowY: "auto" }}
          >
            {props.productRatting?.length === 0 ? (
              <p style={{ color: "grey", textAlign: "center" }}>
                There have been no reviews for this product yet.
              </p>
            ) : (
              <>
                <div style={{ borderBottom: "1px solid #dee2e6" }}>
                  {/* {props.productRatting?.length} */}
                  <Rating
                    readonly
                    placeholderRating={rating.score || 0}
                    emptySymbol={
                      <span style={{ color: "#faca51", fontSize: "25px" }}>
                        ☆
                      </span>
                    }
                    placeholderSymbol={
                      <span style={{ color: "#faca51", fontSize: "25px" }}>
                        ★
                      </span>
                    }
                    fullSymbol={
                      <span style={{ color: "#faca51", fontSize: "25px" }}>
                        ★
                      </span>
                    }
                  />
                  <p style={{ color: "grey", fontSize: "15px" }}>
                    {rating.total || 0} Ratings
                  </p>
                </div>
                <div>
                  {props.productRatting?.map((rate) => (
                    <div
                      key={rate._id}
                      style={{ borderBottom: "1px solid #dee2e6" }}
                    >
                      {/* <p>{console.log(ratting.rating)}</p> */}
                      <Rating
                        readonly
                        placeholderRating={rate?.rating || 0}
                        emptySymbol={
                          <span style={{ color: "#faca51", fontSize: "25px" }}>
                            ☆
                          </span>
                        }
                        placeholderSymbol={
                          <span style={{ color: "#faca51", fontSize: "25px" }}>
                            ★
                          </span>
                        }
                        fullSymbol={
                          <span style={{ color: "#faca51", fontSize: "25px" }}>
                            ★
                          </span>
                        }
                      />
                      <p style={{ color: "grey", fontSize: "15px" }}>
                        by: {rate?.customer_id?.name}
                      </p>
                      <p>{rate.comment}</p>
                    </div>
                  ))}
                </div>
              </>
            )}
          </Tab>
        </Tabs>
      </div>
      <div>
        <h2 className="pb-1" style={{ fontSize: "25px" }}>
          Related Products
        </h2>
        <div className="tmp-ProductsDetailsInner-container">
          <div style={{ paddingBottom: "10px" }}>
            <div
              className="d-flex align-item-center justify-content-between"
              style={{ borderBottom: "1px solid #eaeaea" }}
            >
              <h3 style={{ marginTop: "15px", marginBottom: "0px" }}>
                {props.product.categories[0].name}
              </h3>
              <Link to="/products" onClick={handleClearWithoutCategories}>
                <button
                  className="tmp-ProductsDetailsInner-products-btn"
                  style={{ backgroundColor: `${getStarting?.primaryColor}` }}
                >
                  <span>
                    View More{" "}
                    <div
                      onClick={handleCategory}
                      className="tmp-ProductsDetailsInner-products-btn-inner"
                    >
                      {props.product.categories[0].name}
                    </div>
                  </span>
                </button>
              </Link>
            </div>
          </div>
          <div className="tmp-ProductsDetailsInner-inner">
            {relatedProducts?.slice(0, 6)?.map((product) => (
              <ProductsDetailsInner
                product={product}
                key={product._id}
              ></ProductsDetailsInner>
            ))}
          </div>
        </div>
      </div>

      {/* modal */}
      <div>
        {/* <Button variant="outlined" onClick={handleClickOpen}>
          Video
        </Button> */}
        <Dialog
          fullScreen={fullScreen}
          open={open}
          onClose={handleClose}
          aria-labelledby="responsive-dialog-title"
          //   maxWidth="lg"
          fullWidth={true}
          style={{ width: "auto" }}
        >
          {/* <DialogTitle id="responsive-dialog-title">
            {"Use Google's location service?"}
          </DialogTitle> */}
          <DialogContent>
            {/* <DialogContentText>
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText> */}
            <ReactPlayer
              url={product_video}
              volume="1"
              muted
              width="100%"
              playing={true}
              controls={true}
            />
          </DialogContent>
          <DialogActions>
            {/* <Button autoFocus onClick={handleClose}>
              Disagree
            </Button> */}
            <Button onClick={handleClose} autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default ProductsDetailsSummery;
