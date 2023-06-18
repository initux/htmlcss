import React, { useEffect, useState } from "react";
import {
  Accordion,
  Button,
  Container,
  Form,
  Placeholder,
  Spinner,
} from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import "./AllProducts.css";
import AllProductsSummery from "./AllProductsSummery";
import useAuth from "../../GlobalShared/hooks/useAuth";


// order data 
import Swal from "sweetalert2/dist/sweetalert2.js";
// import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import Divider from "@mui/material/Divider";
import CloseIcon from "@mui/icons-material/Close";
import "../Order/direct-order.css";
import Paper from "@mui/material/Paper";





const AllProducts = () => {
  // const {getStarting, products, displayProducts, setDisplayProducts, handleSearch, rangePrice, setRangePrice,
  //     categories, handleAllCategory, handleCategory, selectedCategory, setSelectedCategory,
  //     brands, handleAllBrands, handleBrands, selectedBrands, setSelectedBrands, handleBrandsCheckbox, brandsCheckbox, setBrandsCheckbox,
  //     vendors, handleAllVendors, handleCategoriesCheckbox, categoriesCheckbox, setCategoriesCheckbox} = useAuth();
  const {
    getStarting,
    setHeaderSearchText,
    superOffer,
    superOfferCheckbox,
    setSuperOfferCheckbox,
    products,
    displayProducts,
    setDisplayProducts,
    categories,
    handleCategory,
    selectedCategory,
    setSelectedCategory,
    handleCategoriesCheckbox,
    categoriesCheckbox,
    setCategoriesCheckbox,
    brands,
    handleBrands,
    selectedBrands,
    setSelectedBrands,
    handleBrandsCheckbox,
    brandsCheckbox,
    setBrandsCheckbox,
    vendors,
    rangePrice,
    setRangePrice,
    handleVendorsCheckbox,
    vendorsCheckbox,
    setVendorsCheckbox,
    handleAllCategory,
    handleAllBrands,
    handleAllVendors,
    handleClearAllProductsPage,
  } = useAuth();

  const { categoryBrandsName } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    handleAllCategory();
    handleAllBrands();
    handleAllVendors();
  }, []);
  useEffect(() => {
    // " _cate.searchlistcategory.ct_" === Categorys
    // "_bn.searchlistbarnds.b_" === Brands
    // "_vn.searchlistvendors.v_" === Vendors
    // "_57372f7w7LnBRK" === Line Break for categories, brands, vendors with browser url
    if (
      categoriesCheckbox?.length > 0 &&
      brandsCheckbox?.length > 0 &&
      vendorsCheckbox?.length > 0
    ) {
      navigate(
        `/products/${
          "_cate.searchlistcategory.ct_" +
          categoriesCheckbox +
          "_57372f7w7LnBRK_bn.searchlistbarnds.b_" +
          brandsCheckbox +
          "_57372f7w7LnBRK_vn.searchlistvendors.v_" +
          vendorsCheckbox
        }`
      );
    } else if (categoriesCheckbox?.length > 0 && brandsCheckbox?.length > 0) {
      navigate(
        `/products/${
          "_cate.searchlistcategory.ct_" +
          categoriesCheckbox +
          "_57372f7w7LnBRK_bn.searchlistbarnds.b_" +
          brandsCheckbox
        }`
      );
    } else if (categoriesCheckbox?.length > 0 && vendorsCheckbox?.length > 0) {
      navigate(
        `/products/${
          "_cate.searchlistcategory.ct_" +
          categoriesCheckbox +
          "_57372f7w7LnBRK_vn.searchlistvendors.v_" +
          vendorsCheckbox
        }`
      );
    } else if (brandsCheckbox?.length > 0 && vendorsCheckbox?.length > 0) {
      navigate(
        `/products/${
          "_bn.searchlistbarnds.b_" +
          brandsCheckbox +
          "_57372f7w7LnBRK_vn.searchlistvendors.v_" +
          vendorsCheckbox
        }`
      );
    } else if (categoriesCheckbox?.length > 0) {
      navigate(
        `/products/${"_cate.searchlistcategory.ct_" + categoriesCheckbox}`
      );
    } else if (brandsCheckbox?.length > 0) {
      navigate(`/products/${"_bn.searchlistbarnds.b_" + brandsCheckbox}`);
    } else if (vendorsCheckbox?.length > 0) {
      navigate(`/products/${"_vn.searchlistvendors.v_" + vendorsCheckbox}`);
    } else {
      navigate("/products");
    }
  }, [navigate, categoriesCheckbox, brandsCheckbox, vendorsCheckbox]);

  useEffect(() => {
    if (!categoryBrandsName) return;
    //  newCBV === new Categories Brands Vendor;
    const newCBVCategories = categoryBrandsName.includes(
      "_cate.searchlistcategory.ct_"
    );
    const newCBVBrands = categoryBrandsName.includes("_bn.searchlistbarnds.b_");
    const newCBVvendors = categoryBrandsName.includes(
      "_vn.searchlistvendors.v_"
    );
    if (newCBVCategories && newCBVBrands && newCBVvendors) {
      const cateBrandsData = categoryBrandsName.split("_57372f7w7LnBRK");
      if (
        cateBrandsData[0].includes("_cate.searchlistcategory.ct_") &&
        cateBrandsData[1].includes("_bn.searchlistbarnds.b_") &&
        cateBrandsData[2].includes("_vn.searchlistvendors.v_")
      ) {
        if (
          cateBrandsData[0].split(",").length >= 1 &&
          cateBrandsData[1].split(",").length >= 1 &&
          cateBrandsData[2].split(",").length >= 1
        ) {
          setCategoriesCheckbox(cateBrandsData[0].slice(28).split(","));
          setBrandsCheckbox(cateBrandsData[1].slice(23).split(","));
          setVendorsCheckbox(cateBrandsData[2].slice(24).split(","));
        }
      }
    } else if (newCBVCategories && newCBVBrands) {
      const cateBrandsData = categoryBrandsName.split("_57372f7w7LnBRK");
      if (
        cateBrandsData[0].includes("_cate.searchlistcategory.ct_") &&
        cateBrandsData[1].includes("_bn.searchlistbarnds.b_")
      ) {
        if (
          cateBrandsData[0].split(",").length >= 1 &&
          cateBrandsData[1].split(",").length >= 1
        ) {
          setCategoriesCheckbox(cateBrandsData[0].slice(28).split(","));
          setBrandsCheckbox(cateBrandsData[1].slice(23).split(","));
        }
      }
    } else if (newCBVCategories && newCBVvendors) {
      const cateBrandsData = categoryBrandsName.split("_57372f7w7LnBRK");
      if (
        cateBrandsData[0].includes("_cate.searchlistcategory.ct_") &&
        cateBrandsData[1].includes("_vn.searchlistvendors.v_")
      ) {
        if (
          cateBrandsData[0].split(",").length >= 1 &&
          cateBrandsData[1].split(",").length >= 1
        ) {
          setCategoriesCheckbox(cateBrandsData[0].slice(28).split(","));
          setVendorsCheckbox(cateBrandsData[1].slice(24).split(","));
        }
      }
    } else if (newCBVBrands && newCBVvendors) {
      const cateBrandsData = categoryBrandsName.split("_57372f7w7LnBRK");
      if (
        cateBrandsData[0].includes("_bn.searchlistbarnds.b_") &&
        cateBrandsData[1].includes("_vn.searchlistvendors.v_")
      ) {
        if (
          cateBrandsData[0].split(",").length >= 1 &&
          cateBrandsData[1].split(",").length >= 1
        ) {
          setBrandsCheckbox(cateBrandsData[0].slice(23).split(","));
          setVendorsCheckbox(cateBrandsData[1].slice(24).split(","));
        }
      }
    } else if (newCBVCategories) {
      if (categoryBrandsName.split(",").length > 1) {
        setCategoriesCheckbox(categoryBrandsName.slice(28).split(","));
      } else {
        let newArray = [];
        newArray.push(categoryBrandsName.slice(28));
        setCategoriesCheckbox(newArray);
      }
    } else if (newCBVBrands) {
      if (categoryBrandsName.split(",").length > 1) {
        setBrandsCheckbox(categoryBrandsName.slice(23).split(","));
      } else {
        let newArray = [];
        newArray.push(categoryBrandsName.slice(23));
        setBrandsCheckbox(newArray);
      }
    } else if (newCBVvendors) {
      if (categoryBrandsName.split(",").length > 1) {
        setVendorsCheckbox(categoryBrandsName.slice(24).split(","));
      } else {
        let newArray = [];
        newArray.push(categoryBrandsName.slice(24));
        setVendorsCheckbox(newArray);
      }
    }
  }, [
    categoryBrandsName,
    setCategoriesCheckbox,
    setBrandsCheckbox,
    setVendorsCheckbox,
  ]);

  const handleRangePrice = (e) => {
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setBrandsCheckbox("");
    setSelectedBrands("");
    setVendorsCheckbox("");

    setRangePrice(e.target.value);
    const newProduct = products?.filter(
      (product) => product.sell_price <= e.target.value
    );
    setDisplayProducts(newProduct);
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
  }
  const handleClose = () => {
    // navigate("/");
    setOpen(false);
    setSelectedProduct(null);
  };

  // const orderSubmitHandler = () => {
  //   // console.log(receiver_name, receiver_phone, receiver_address, delivery_area);
  //   if (!selectedProduct) return

  //     if (!receiver_name) {
  //       setMessage("নাম লিখুন");
  //       return;
  //     }
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
  //   data.payment_method = 'cash';
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
      <style type="text/css">
        {`
                   .tmp11-all-product-btn:hover{
                        background: ${getStarting?.primaryColor} !important;
                        color: #fff !important;
                        padding-left: 10px;
                    }
                    // .tmp-search-container span, .tmp-all-products-categories{
                    //     display: -webkit-box;
                    //     -webkit-line-clamp: 1;
                    //     -webkit-box-orient: vertical;  
                    //     overflow: hidden;
                    // }
                    .tmp-all-products-categories:hover,
                     .tmp-search-container span:hover, .tmp-all-products-brands:hover, .tmp-all-products-vendors:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                    .
                   `}
      </style>
      <div className="py-3 tmp-all-products-top-heading">
        <Container>
          <h2 style={{ fontSize: "18px", marginTop: "10px" }}>
            Home / Products{" "}
            <span style={{ color: `${getStarting?.primaryColor}` }}>
              {displayProducts?.length}
            </span>
          </h2>
        </Container>
        {/* <Form.Check type="checkbox" aria-label="option 1" />
                <input type="checkbox" value={categoriesCheckbox} onChange={() => setCategoriesCheckbox(!categoriesCheckbox)} /> */}
      </div>
      <Container className="tmp-all-products-container">
        <div>
          <div
            className="tmp-search-container"
            onClick={() => setHeaderSearchText("")}
          >
            {/* <input type="text" className="w-100" onChange={handleEventSearch} placeholder="Search......." /> */}

            {superOffer?.length === 0 ? (
              ""
            ) : (
              <>
                <div
                  className="d-flex align-items-center"
                  style={{ padding: "0px 17px 6px" }}
                >
                  <input
                    type="checkbox"
                    checked={superOfferCheckbox === true ? true : false}
                    onChange={() => setSuperOfferCheckbox(!superOfferCheckbox)}
                    style={{
                      accentColor: `${
                        superOfferCheckbox === true
                          ? getStarting?.primaryColor
                          : "red"
                      }`,
                      marginTop: "-8px",
                      cursor: "pointer",
                    }}
                  />
                  <h6
                    onClick={() => setSuperOfferCheckbox(!superOfferCheckbox)}
                    className="px-2"
                    style={{
                      color: `${
                        superOfferCheckbox === true
                          ? getStarting?.primaryColor
                          : "red"
                      }`,
                    }}
                  >
                    <strong>Super Offer</strong>
                  </h6>
                </div>
              </>
            )}

            <h6 className="px-3">
              <strong>Category</strong>
            </h6>
            {categories.length === 0 ? (
              <>
                {Array.from(Array(20)).map((_, i) => (
                  <div key={i} style={{ padding: "10px 17px" }}>
                    <Placeholder animation="glow">
                      <Placeholder xs={8} />
                    </Placeholder>
                  </div>
                ))}
              </>
            ) : (
              // categories?.map(unique => <div onClick={handleCategory}  className={`${selectedCategory === unique.name ? 'tmp4-all-products-active' : null} tmp4-all-products-categories`} key={unique.name}>{unique.name}</div>)
              // categories?.slice(0).reverse().map(unique => <div onClick={handleCategory}  className='tmp-all-products-categories' style={{color: `${selectedCategory === unique.name ? getStarting?.primaryColor : '#666666'}`}} key={unique.name}>{unique.name}</div>)

              categories
                ?.slice(0)
                .reverse()
                .map((unique) => (
                  <div key={unique.name}>
                    <Accordion style={{ borderBottom: "1px solid #eaeaea" }}>
                      <Accordion.Item eventKey="0">
                        {unique?.subCategories?.length === 0 ? (
                          <div
                            className="d-flex align-items-center"
                            style={{ padding: "6px 17px" }}
                          >
                            <input
                              type="checkbox"
                              checked={
                                categoriesCheckbox?.includes(unique.name) ===
                                  true || selectedCategory === unique.name
                                  ? true
                                  : false
                              }
                              onChange={() =>
                                handleCategoriesCheckbox(unique.name)
                              }
                              style={{
                                accentColor: `${
                                  categoriesCheckbox?.includes(unique.name) ===
                                    true || selectedCategory === unique.name
                                    ? getStarting?.primaryColor
                                    : ""
                                }`,
                                cursor: "pointer",
                              }}
                            />
                            {/* <input type="checkbox" value={categoriesCheckbox} onChange={() => setCategoriesCheckbox(!categoriesCheckbox)} style={{accentColor: `${getStarting?.primaryColor}`}} /> */}
                            <div
                              onClick={handleCategory}
                              className="tmp-all-products-categories"
                              style={{
                                color: `${
                                  categoriesCheckbox?.includes(unique.name) ===
                                    true || selectedCategory === unique.name
                                    ? getStarting?.primaryColor
                                    : "#666666"
                                }`,
                              }}
                              key={unique.name}
                            >
                              {unique.name}
                            </div>
                          </div>
                        ) : (
                          <>
                            <Accordion.Header style={{ marginRight: "10px" }}>
                              <div
                                className="d-flex align-items-center"
                                style={{ padding: "8px 17px" }}
                              >
                                <input
                                  type="checkbox"
                                  checked={
                                    categoriesCheckbox?.includes(
                                      unique.name
                                    ) === true ||
                                    selectedCategory === unique.name
                                      ? true
                                      : false
                                  }
                                  onChange={() =>
                                    handleCategoriesCheckbox(unique.name)
                                  }
                                  style={{
                                    accentColor: `${
                                      categoriesCheckbox?.includes(
                                        unique.name
                                      ) === true ||
                                      selectedCategory === unique.name
                                        ? getStarting?.primaryColor
                                        : ""
                                    }`,
                                    cursor: "pointer",
                                  }}
                                />
                                <div
                                  onClick={handleCategory}
                                  className="tmp-all-products-categories"
                                  style={{
                                    color: `${
                                      categoriesCheckbox?.includes(
                                        unique.name
                                      ) === true ||
                                      selectedCategory === unique.name
                                        ? getStarting?.primaryColor
                                        : "#666666"
                                    }`,
                                  }}
                                  key={unique.name}
                                >
                                  {unique.name}
                                </div>
                              </div>
                            </Accordion.Header>
                            {unique?.subCategories?.map((subCat) => (
                              <div key={subCat._id}>
                                <Accordion.Body>
                                  <Accordion>
                                    <Accordion.Item eventKey="0">
                                      {subCat?.childs?.length === 0 ? (
                                        <div
                                          className="d-flex align-items-center"
                                          style={{ padding: "8px 17px" }}
                                        >
                                          <input
                                            type="checkbox"
                                            checked={
                                              categoriesCheckbox?.includes(
                                                subCat.name
                                              ) === true ||
                                              selectedCategory === subCat.name
                                                ? true
                                                : false
                                            }
                                            onChange={() =>
                                              handleCategoriesCheckbox(
                                                subCat.name
                                              )
                                            }
                                            style={{
                                              accentColor: `${
                                                categoriesCheckbox?.includes(
                                                  subCat.name
                                                ) === true ||
                                                selectedCategory === subCat.name
                                                  ? getStarting?.primaryColor
                                                  : ""
                                              }`,
                                              cursor: "pointer",
                                            }}
                                          />
                                          <span
                                            onClick={handleCategory}
                                            style={{
                                              fontSize: "13px",
                                              color: `${
                                                categoriesCheckbox?.includes(
                                                  subCat.name
                                                ) === true ||
                                                selectedCategory === subCat.name
                                                  ? getStarting?.primaryColor
                                                  : "#4b5563"
                                              }`,
                                              padding: "1px 5px 0px",
                                              cursor: "pointer",
                                            }}
                                          >
                                            {subCat.name}
                                          </span>
                                        </div>
                                      ) : (
                                        <>
                                          <Accordion.Header>
                                            <div
                                              className="d-flex align-items-center"
                                              style={{ padding: "8px 17px" }}
                                            >
                                              <input
                                                type="checkbox"
                                                checked={
                                                  categoriesCheckbox?.includes(
                                                    subCat.name
                                                  ) === true ||
                                                  selectedCategory ===
                                                    subCat.name
                                                    ? true
                                                    : false
                                                }
                                                onChange={() =>
                                                  handleCategoriesCheckbox(
                                                    subCat.name
                                                  )
                                                }
                                                style={{
                                                  accentColor: `${
                                                    categoriesCheckbox?.includes(
                                                      subCat.name
                                                    ) === true ||
                                                    selectedCategory ===
                                                      subCat.name
                                                      ? getStarting?.primaryColor
                                                      : ""
                                                  }`,
                                                  cursor: "pointer",
                                                }}
                                              />
                                              <span
                                                onClick={handleCategory}
                                                style={{
                                                  fontSize: "13px",
                                                  color: `${
                                                    categoriesCheckbox?.includes(
                                                      subCat.name
                                                    ) === true ||
                                                    selectedCategory ===
                                                      subCat.name
                                                      ? getStarting?.primaryColor
                                                      : "#4b5563"
                                                  }`,
                                                  padding: "1px 5px 0px",
                                                }}
                                              >
                                                {subCat.name}
                                              </span>
                                            </div>
                                          </Accordion.Header>
                                          {subCat?.childs?.map(
                                            (subCatChild) => (
                                              <div key={subCatChild._id}>
                                                <Accordion.Body>
                                                  <div
                                                    className="d-flex align-items-center"
                                                    style={{
                                                      padding: "8px 17px",
                                                    }}
                                                  >
                                                    <input
                                                      type="checkbox"
                                                      checked={
                                                        categoriesCheckbox?.includes(
                                                          subCatChild.name
                                                        ) === true ||
                                                        selectedCategory ===
                                                          subCatChild.name
                                                          ? true
                                                          : false
                                                      }
                                                      onChange={() =>
                                                        handleCategoriesCheckbox(
                                                          subCatChild.name
                                                        )
                                                      }
                                                      style={{
                                                        accentColor: `${
                                                          categoriesCheckbox?.includes(
                                                            subCatChild.name
                                                          ) === true ||
                                                          selectedCategory ===
                                                            subCatChild.name
                                                            ? getStarting?.primaryColor
                                                            : ""
                                                        }`,
                                                        cursor: "pointer",
                                                      }}
                                                    />
                                                    <span
                                                      onClick={handleCategory}
                                                      style={{
                                                        fontSize: "11px",
                                                        color: `${
                                                          categoriesCheckbox?.includes(
                                                            subCatChild.name
                                                          ) === true ||
                                                          selectedCategory ===
                                                            subCatChild.name
                                                            ? getStarting?.primaryColor
                                                            : "#4b5563"
                                                        }`,
                                                        padding: "1px 5px 0px",
                                                        cursor: "pointer",
                                                      }}
                                                    >
                                                      {subCatChild.name}
                                                    </span>
                                                  </div>
                                                </Accordion.Body>
                                              </div>
                                            )
                                          )}
                                        </>
                                      )}
                                    </Accordion.Item>
                                  </Accordion>
                                </Accordion.Body>
                              </div>
                            ))}
                          </>
                        )}
                      </Accordion.Item>
                    </Accordion>
                  </div>
                ))
            )}

            {brands?.length === 0 ? (
              <>
                {/* {Array.from(Array(3)).map((_, i) => (
                                        <div className="tmp-all-products-brands" key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                                    ))} */}
              </>
            ) : (
              <>
                <h6 className="mt-3 px-3">
                  <strong>Brands</strong>
                </h6>
                {
                  // brands?.map(brand => <div onClick={() => handleBrands(brand._id)} className='tmp-all-products-brands' style={{color: `${selectedBrands === brand.name ? getStarting?.primaryColor : '#666666'}`, borderBottom: `1px solid ${selectedBrands === brand.name ? getStarting?.primaryColor : '#eaeaea'}`}} key={brand.name}>{brand.name}</div>)
                  brands?.map((brand) => (
                    <div
                      key={brand.name}
                      className="d-flex align-items-center"
                      style={{
                        padding: "6px 17px",
                        borderBottom: `1px solid ${
                          selectedBrands === brand.name
                            ? getStarting?.primaryColor
                            : "#eaeaea"
                        }`,
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={
                          brandsCheckbox?.includes(brand._id) === true ||
                          selectedBrands === brand._id
                            ? true
                            : false
                        }
                        onChange={() => handleBrandsCheckbox(brand._id)}
                        style={{
                          accentColor: `${
                            brandsCheckbox?.includes(brand._id) === true ||
                            selectedBrands === brand._id
                              ? getStarting?.primaryColor
                              : ""
                          }`,
                        }}
                      />
                      <div
                        onClick={() => handleBrands(brand._id)}
                        className="tmp-all-products-brands"
                        style={{
                          color: `${
                            brandsCheckbox?.includes(brand._id) === true ||
                            selectedBrands === brand._id
                              ? getStarting?.primaryColor
                              : "#666666"
                          }`,
                        }}
                      >
                        {brand.name}
                      </div>
                    </div>
                  ))
                }
              </>
            )}

            {vendors?.length === 0 ? (
              <>
                {/* {Array.from(Array(3)).map((_, i) => (
                                        <div className="tmp-all-products-vendors" key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                                    ))} */}
              </>
            ) : (
              <>
                <h6 className="mt-3 px-3">
                  <strong>Vendors</strong>
                </h6>
                {
                  // brands?.map(brand => <div onClick={() => handleBrands(brand._id)} className='tmp-all-products-brands' style={{color: `${selectedBrands === brand.name ? getStarting?.primaryColor : '#666666'}`, borderBottom: `1px solid ${selectedBrands === brand.name ? getStarting?.primaryColor : '#eaeaea'}`}} key={brand.name}>{brand.name}</div>)
                  vendors?.map((vendor) => (
                    <div
                      key={vendor._id}
                      className="d-flex align-items-center"
                      style={{
                        padding: "6px 17px",
                        borderBottom: "1px solid #eaeaea",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={
                          vendorsCheckbox?.includes(vendor._id) === true
                            ? true
                            : false
                        }
                        onChange={() => handleVendorsCheckbox(vendor._id)}
                        style={{
                          accentColor: `${
                            vendorsCheckbox?.includes(vendor._id) === true
                              ? getStarting?.primaryColor
                              : ""
                          }`,
                        }}
                      />
                      <Link to={`/products/vendors/${vendor._id}`}>
                        <div
                          className="tmp-all-products-vendors"
                          style={{
                            color: `${
                              vendorsCheckbox?.includes(vendor._id) === true
                                ? getStarting?.primaryColor
                                : "#666666"
                            }`,
                          }}
                        >
                          {vendor.name}
                        </div>
                      </Link>
                    </div>
                  ))
                }
              </>
            )}

            <h6 className="mt-3 px-3">
              <strong>Price</strong>
            </h6>
            <h6 className="px-3">
              {getStarting?.currency} {rangePrice}
            </h6>
            <input
              type="range"
              onChange={handleRangePrice}
              min={0}
              max={50000}
              value={rangePrice}
              name="price"
              className="mx-3"
              style={{ accentColor: `${getStarting?.primaryColor}` }}
            />

            <br />
            <br />
            <button
              onClick={handleClearAllProductsPage}
              style={{
                backgroundColor: `${getStarting?.primaryColor}`,
                border: "none",
                padding: "5px 20px",
                borderRadius: "4px",
                color: "#fff",
                marginLeft: "17px",
              }}
            >
              Clear Filter
            </button>
          </div>
        </div>
        <div>
          <div>
            {displayProducts?.length === 0 ? (
              <div
                style={{
                  color: `${getStarting?.primaryColor}`,
                  margin: "50px 0",
                  textAlign: "center",
                }}
              >
                {/* <Spinner animation="border" /> */}
                <h4>No Show Any Product</h4>
              </div>
            ) : (
              <div className="tmp-all-products-inner">
                {displayProducts?.map((product) => (
                  <AllProductsSummery
                    product={product}
                    key={product._id}
                    handleOpen={handleOpen}
                    orderSubmitHandler={orderSubmitHandler}
                  ></AllProductsSummery>
                ))}
              </div>
            )}
          </div>
        </div>
      </Container>
      <div className="py-5 text-center">
        <Link to="/">
          <Button
            variant="primary"
            style={{
              backgroundColor: `${getStarting?.primaryColor}`,
              border: "none",
            }}
          >
            Back Home
          </Button>
        </Link>
      </div>

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
                style={{ backgroundColor: getStarting.primaryColor}}
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

export default AllProducts;
