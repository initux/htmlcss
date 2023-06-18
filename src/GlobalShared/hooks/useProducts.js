import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { v4 as uuid } from 'uuid';

const getFromLocalStorage = () => {
  const cartList = localStorage.getItem("shopping_cart");
  if (cartList) {
    return JSON.parse(localStorage.getItem("shopping_cart"));
  } else {
    return [];
  }
};

const useProducts = () => {
  const [user, setUser] = useState({});
  const [loginMessage, setLoginMessage] = useState();
  const [registerMessage, setRegisterMessage] = useState();
  const [loginCodeMessage, setLoginCodeMessage] = useState();
  const { register, handleSubmit, reset } = useForm();

  const [customer, setCustomer] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState([]);
  const [additionalImages, setAdditionalImages] = useState([]);
  const [additionalOffers, setAdditionalOffers] = useState([]);
  const [additionalError, setAdditionalError] = useState(false);

  const [products, setProducts] = useState([]);
  const [displayProducts, setDisplayProducts] = useState([]);
  const [homeCategories, setHomeCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [categoriesCheckbox, setCategoriesCheckbox] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [brands, setBrands] = useState([]);
  const [brandsCheckbox, setBrandsCheckbox] = useState([]);
  const [selectedBrands, setSelectedBrands] = useState("");
  const [vendors, setVendors] = useState([]);
  const [vendorsCheckbox, setVendorsCheckbox] = useState([]);
  const [rangePrice, setRangePrice] = useState(0);

  const [headerSearchText, setHeaderSearchText] = useState("");
  const [headerSuggestBox, setHeaderSuggestBox] = useState(false);

  const [superOffer, setSuperOffer] = useState([]);
  const [superOfferCheckbox, setSuperOfferCheckbox] = useState(false);

  const [cart, setCart] = useState(getFromLocalStorage());
  const [newQuantity, setNewQuantity] = useState(1);
  const [productColorId, setProductColorId] = useState(null);

  const [dashboardOrders, setDashboardOrders] = useState([]);
  // localStorage
  const getStarting = JSON.parse(localStorage.getItem("starting"));
    const getUserToken = JSON.parse(localStorage.getItem("userToken"));
    
//   const DirectOrder = () => {
//    fetch(`${process.env.REACT_APP_BASE_URL + url}`, {
//      method: "POST",
//      headers: {
//        authorization: `Bearer ${token}`,
//        "content-type": "application/json",
//      },
//      body: JSON.stringify(data),
//    }).then((res) => res.json())
//      .catch(e => { console.log(e) })
// }
   
  // -------------------------------------------------------------------------
  // Projects All Products
  // -------------------------------------------------------------------------
  useEffect(() => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/products?page=1`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.data);
        // setDisplayProducts(data.data)
      })
      .catch((error) => {
        console.log(error);
      });
    console.log("product :::: ", products);
  }, [getStarting.token]);
  // -------------------------------------------------------------------------
  // Projects Searching Result
  // -------------------------------------------------------------------------
  const showData = (searchShowData) => {
    const matchedProducts = products?.filter((product) =>
      product.name.toLowerCase().includes(searchShowData.toLowerCase())
    );
    setDisplayProducts(matchedProducts);
  };

  // allProduct.js
  const handleSearch = (searchData) => showData(searchData);
  //Search.js
  const handleSearchClick = (searchData2) => {
    showData(searchData2);
    handleClearWithoutSearch();
    setHeaderSuggestBox(true);
  };

  // header.js
  const handleSuggestClick = (searchData3) => showData(searchData3);

  // -------------------------------------------------------------------------
  // Home Page products category List and category Products
  // -------------------------------------------------------------------------
  const handleHomeCategory = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/products/group/by-category`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setHomeCategories(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // -------------------------------------------------------------------------
  // All products category / brands / vendors Checkbox List
  // -------------------------------------------------------------------------
  useEffect(() => {
    if (selectedCategory === "All") {
      setDisplayProducts([...products]);
    } else if (headerSearchText !== "") {
      handleClearWithoutSearch();
    } else if (
      (categoriesCheckbox?.length > 0) |
      (brandsCheckbox?.length > 0) |
      (vendorsCheckbox?.length > 0)
    ) {
      setRangePrice(0);
      const newBaseURL = `${process.env.REACT_APP_BASE_URL}api/products/search/then-paginate?`;
      let newCategoryBrandsVendorsAPI;
      if (
        categoriesCheckbox?.length > 0 &&
        brandsCheckbox?.length > 0 &&
        vendorsCheckbox?.length > 0
      ) {
        newCategoryBrandsVendorsAPI = `${newBaseURL}categories=${categoriesCheckbox}&brand_id=${brandsCheckbox}&vendor_id=${vendorsCheckbox}`;
      } else if (categoriesCheckbox?.length > 0 && brandsCheckbox?.length > 0) {
        newCategoryBrandsVendorsAPI = `${newBaseURL}categories=${categoriesCheckbox}&brand_id=${brandsCheckbox}`;
      } else if (
        categoriesCheckbox?.length > 0 &&
        vendorsCheckbox?.length > 0
      ) {
        newCategoryBrandsVendorsAPI = `${newBaseURL}categories=${categoriesCheckbox}&vendor_id=${vendorsCheckbox}`;
      } else if (brandsCheckbox?.length > 0 && vendorsCheckbox?.length > 0) {
        newCategoryBrandsVendorsAPI = `${newBaseURL}brand_id=${brandsCheckbox}&vendor_id=${vendorsCheckbox}`;
      } else if (categoriesCheckbox?.length > 0) {
        newCategoryBrandsVendorsAPI = `${newBaseURL}categories=${categoriesCheckbox}`;
      } else if (brandsCheckbox?.length > 0) {
        newCategoryBrandsVendorsAPI = `${newBaseURL}brand_id=${brandsCheckbox}`;
      } else if (vendorsCheckbox?.length > 0) {
        newCategoryBrandsVendorsAPI = `${newBaseURL}vendor_id=${vendorsCheckbox}`;
      }
      fetch(`${newCategoryBrandsVendorsAPI}`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${getStarting.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(),
      })
        .then((res) => res.json())
        .then((data) => {
          if (superOfferCheckbox === true) {
            const offerList = data?.data?.filter(
              (product) => product.superOffer === true
            );
            setDisplayProducts(offerList);
          } else {
            setDisplayProducts(data.data);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      if (superOfferCheckbox === true) {
        const offerList = products?.filter(
          (product) => product.superOffer === true
        );
        setDisplayProducts(offerList);
      } else {
        setDisplayProducts([...products]);
      }
    }
  }, [
    selectedCategory,
    superOfferCheckbox,
    superOffer,
    categoriesCheckbox,
    brandsCheckbox,
    vendorsCheckbox,
    getStarting.token,
    products,
    headerSearchText,
  ]);

  // category
  const handleCategoriesCheckbox = (ctName) => {
    let newArray = [];
    if (categoriesCheckbox?.length === 0) {
      newArray.push(ctName);
      setSelectedCategory(ctName);
    } else {
      const findData = categoriesCheckbox?.find((pd) => pd === ctName);
      if (findData === ctName) {
        const removeData = categoriesCheckbox.filter((pd) => pd !== ctName);
        newArray.push(...removeData);
        setSelectedCategory("");
      } else {
        newArray.push(...categoriesCheckbox, ctName);
        setSelectedCategory(ctName);
      }
    }
    setCategoriesCheckbox(newArray);
  };

  // brand
  const handleBrandsCheckbox = (id) => {
    let newArray = [];
    if (brandsCheckbox?.length === 0) {
      newArray.push(id);
      setSelectedBrands(id);
    } else {
      const findData = brandsCheckbox?.find((pd) => pd === id);
      if (findData === id) {
        const removeData = brandsCheckbox.filter((pd) => pd !== id);
        newArray.push(...removeData);
        setSelectedBrands("");
      } else {
        newArray.push(...brandsCheckbox, id);
        setSelectedBrands(id);
      }
    }
    setBrandsCheckbox(newArray);
  };
  // Vendors
  const handleVendorsCheckbox = (id) => {
    let newArray = [];
    if (vendorsCheckbox?.length === 0) {
      newArray.push(id);
    } else {
      const findData = vendorsCheckbox?.find((pd) => pd === id);
      if (findData === id) {
        const removeData = vendorsCheckbox.filter((pd) => pd !== id);
        newArray.push(...removeData);
      } else {
        newArray.push(...vendorsCheckbox, id);
      }
    }
    setVendorsCheckbox(newArray);
  };
  // -------------------------------------------------------------------------
  // All products category List
  // -------------------------------------------------------------------------
  const handleAllCategory = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/categories?page=1`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // -------------------------------------------------------------------------
  // handle products category, and new created category front end 'All'
  // -------------------------------------------------------------------------
  const uniqueCategory = [
    "All",
    ...new Set(categories.map((category) => category.name)),
  ];
  const uniqueCategoryLogo = [
    { name: "All", logo_url: "" },
    ...new Set(
      categories
        .slice(0)
        .reverse()
        .map((categoryLogo) => ({
          name: categoryLogo.name,
          logo_url: categoryLogo.logo_url,
          subCategories: categoryLogo.subCategories,
        }))
    ),
  ];
  const handleCategory = (e) => {
    setSelectedBrands("");
    setSelectedCategory(e.target.textContent);

    let newArray = [];
    newArray.push(e.target.textContent);
    setCategoriesCheckbox(newArray);
  };

  // -------------------------------------------------------------------------
  // Category filtered and Searching Product Show
  // -------------------------------------------------------------------------
  // useEffect( () => {
  //     // if(!selectedCategory) return;
  //     fetch(`${process.env.REACT_APP_BASE_URL}api/products/search/then-paginate?categories=${selectedCategory}`, {
  //         method: 'GET',
  //         headers: {
  //             'authorization': `Bearer ${getStarting.token}`,
  //             'content-type': 'application/json'
  //         },
  //         body: JSON.stringify()
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //         // if(categoriesCheckbox?.length > 1 | superOfferCheckbox === true) {

  //         // }
  //         // else if(selectedCategory === "All"){
  //         //     setDisplayProducts([...products]);
  //         // }
  //         // else if(selectedCategory !== ""){
  //         //     setDisplayProducts(data.data);
  //         // }
  //         // else{
  //         //     setDisplayProducts([...products]);
  //         // }
  //     })
  //     .catch((error) => {
  //         console.log(error)
  //     });
  // }, [selectedCategory, getStarting.token, products, categoriesCheckbox, superOfferCheckbox])
  // -------------------------------------------------------------------------
  // All products brands List
  // -------------------------------------------------------------------------
  const handleAllBrands = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/brands?page=1`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setBrands(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleBrands = (e) => {
    setSelectedCategory("");
    setSelectedBrands(e);

    let newArray = [];
    newArray.push(e);
    setBrandsCheckbox(newArray);
  };

  // -------------------------------------------------------------------------
  // Brands filtered and Searching Product Show
  // -------------------------------------------------------------------------
  // useEffect( () => {
  //     // let url;
  //     // if(selectedBrands){
  //     //     url = `${process.env.REACT_APP_BASE_URL}api/products/search/then-paginate?brands=${selectedBrands}`
  //     // }
  //     if(!selectedBrands) return;
  //     fetch(`${process.env.REACT_APP_BASE_URL}api/products/search/then-paginate?brand_id=${selectedBrands}`, {
  //         method: 'GET',
  //         headers: {
  //             'authorization': `Bearer ${getStarting.token}`,
  //             'content-type': 'application/json'
  //         },
  //         body: JSON.stringify()
  //     })
  //     .then(res => res.json())
  //     .then(data => {
  //         if(selectedBrands){
  //             // setDisplayProducts(data.data);
  //         }
  //     })
  //     .catch((error) => {
  //         console.log(error)
  //     });
  // }, [selectedBrands, getStarting.token])

  // -------------------------------------------------------------------------
  // All products Vendors filter
  // -------------------------------------------------------------------------
  const handleAllVendors = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/vendors?page=1`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        setVendors(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // -------------------------------------------------------------------------
  // Add to cart / quantity
  // -------------------------------------------------------------------------
  // Product Added to cart and quantity added
  const handleAddToCart = (product, colorId, price, size, color) => {
    console.log("prod : ", product);
    if (getStarting.multiVendor && !product?.vendor?._id) {
      toast.error("This product not available!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    } else {
        const newCart = [...cart];
        let existingIndex = -1;
        if (size && color) {
            existingIndex = newCart.findIndex(
                (c) => c._id === product._id && c.size === size && c.color === color
            );
        }
        else if (size) {
            existingIndex = newCart.findIndex(
              (c) =>
                c._id === product._id && c.size === size
            );
        }
        else if (color) {
            existingIndex = newCart.findIndex(
              (c) =>
                c._id === product._id && c.color === color
            );
        }
        else {
            existingIndex = newCart.findIndex(
              (c) =>
                c._id === product._id
            );
        }
     
      if (existingIndex >= 0) {
        newCart[existingIndex].quantity =
          newCart[existingIndex].quantity + newQuantity;
        //   newCart[existingIndex].color_id = colorId;
        // newCart[existingIndex].color = color;
        // newCart[existingIndex].sell_price = price;
        // newCart[existingIndex].size = size;
      } else {
        product.uid = uuid();
        product.quantity = newQuantity;
        //   product.color_id = colorId;
        product.color = color;
        product.sell_price = price || product.sell_price;
        product.size = size;
        newCart.push(product);
      }
        console.log("cart : ", newCart);
      setCart(newCart);
        localStorage.setItem("shopping_cart", JSON.stringify(newCart));
        setCart(getFromLocalStorage);
      setNewQuantity(1);
      setProductColorId("");
      toast.success("Product was added successfully!", {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 5000,
      });
    }
  };

  // Product quantity delete to cart
  const handleMinusToCart = (product) => {
    const newCart = [...cart];
    const existingIndex = newCart.findIndex((c) => c.uid === product.uid);
    if (existingIndex >= 0) {
      let newMinusQuantity = newCart[existingIndex].quantity - 1;
      if (newMinusQuantity === 0) {
        newCart.splice(existingIndex, 1);
      } else {
        newCart[existingIndex].quantity = newMinusQuantity;
        // newCart[existingIndex].quantity = newCart[existingIndex].quantity - 1;
      }
    }
    setCart(newCart);
    localStorage.setItem("shopping_cart", JSON.stringify(newCart));
  };
  // Product quantity delete to cart
  const handlePlusToCart = (product) => {
    const newCart = [...cart];
    const existingIndex = newCart.findIndex((c) => c.uid === product.uid);
    if (existingIndex >= 0) {
      let newMinusQuantity = newCart[existingIndex].quantity + 1;
      if (newMinusQuantity === 0) {
        newCart.splice(existingIndex, 1);
      } else {
        newCart[existingIndex].quantity = newMinusQuantity;
        // newCart[existingIndex].quantity = newCart[existingIndex].quantity - 1;
      }
    }
    setCart(newCart);
    localStorage.setItem("shopping_cart", JSON.stringify(newCart));
  };

  // Delete Product
  const handleRemove = (prod) => {
    const newCart = cart.filter((product) => {
      if (product.uid !== prod.uid)
        return product;
    });
    setCart(newCart);
    localStorage.setItem("shopping_cart", JSON.stringify(newCart));
  };

  // -------------------------------------------------------------------------
  // Authentication
  // -------------------------------------------------------------------------
  // Authentication Log Out
  const handleLogout = () => {
    localStorage.removeItem("Auth");
    localStorage.removeItem("AuthInfo");
    localStorage.removeItem("userToken");
    setUser({});
  };

  // Authentication Login User
  const onLoginSubmit = (data, navigate) => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/customers/signin`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result ", result);
        if (result.isVerified === false && result.error === false) {
          localStorage.setItem("Auth", JSON.stringify({ phone: data.phone }));
          navigate("/code");
        } else if (result.error === false) {
          localStorage.setItem("userToken", JSON.stringify(result.token));
          localStorage.setItem(
            "AuthInfo",
            JSON.stringify({ phone: data.phone })
          );
          navigate("/checkout");
          setRegisterMessage("");
        } else {
          setLoginMessage(result.message);
        }
        reset();
      });
  };

  // Authentication Register New User
  const onRegisterSubmit = (data, navigate) => {
    let BangladeshiPhoneNumber = /(^(\+8801|8801|01|008801))[1|3-9]{1}(\d){8}$/;
    if (BangladeshiPhoneNumber.test(data.phone)) {
      fetch(`${process.env.REACT_APP_BASE_URL}api/customers`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${getStarting.token}`,
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.error === false && result.otp === false) {
            localStorage.setItem("userToken", JSON.stringify(result.token));
            localStorage.setItem(
              "AuthInfo",
              JSON.stringify({ phone: data.phone })
            );
            navigate("/dashBoard");
            setRegisterMessage("");
          } 
          else if (result.error === false && result.otp === true) {
            localStorage.setItem("Auth", JSON.stringify({ phone: data.phone }));
            navigate("/code");
            setRegisterMessage("");
          }
          else {
            setRegisterMessage(result.message);
          }
          reset();
        });
    } else {
      setRegisterMessage("Not a valid phone number");
    }
  };

  // Authentication Login Code
  const onLoginCode = (data, navigate) => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/customers/verify-otp`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        if (result.error === false) {
          localStorage.setItem("userToken", JSON.stringify(result.token));
          localStorage.setItem(
            "AuthInfo",
            JSON.stringify(JSON.parse(localStorage.getItem("Auth")))
          );
          setLoginCodeMessage("");
          navigate("/dashboard/account");
        } else {
          setLoginCodeMessage(result.message);
        }
        reset();
      });
  };

  // Authentication User Information Update
  const onUserInformationUpdate = (data) => {
    console.log("customer data", data);
    fetch(`${process.env.REACT_APP_BASE_URL}api/customer-profile/update`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${getUserToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        alert("Update Successfully");
        setCustomer(result.customer);
        reset();
      });
  };
  // -------------------------------------------------------------------------
  // Customer Information
  // -------------------------------------------------------------------------
  // Customer Profile
  useEffect(() => {
    if (!getUserToken) return;
    fetch(`${process.env.REACT_APP_BASE_URL}api/customer-profile`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getUserToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "jwt expired") {
          localStorage.removeItem("userToken");
          localStorage.removeItem("Auth");
          localStorage.removeItem("AuthInfo");
        } else {
          setCustomer(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [getUserToken]);

  // -------------------------------------------------------------------------
  // Additional Information
  // -------------------------------------------------------------------------
  // Admin Profile
  const handleAdminProfile = () => {
    fetch(`${process.env.REACT_APP_BASE_URL}api/admin-profile`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log(data)
        // try{
        //     if(data.error === false){
        //         setAdditionalInfo(data.profile);
        //         setAdditionalImages(data.profile.sliderImages);
        //         setAdditionalOffers(data.profile.offers);
        //     }

        // }catch(err){
        //     console.log(err);
        // }finally{
        //     alert("Bye Everyone");
        // }

        if (data.error === false) {
          setAdditionalInfo(data.profile);
          setAdditionalImages(data.profile.sliderImages);
          setAdditionalOffers(data.profile.offers);
          setAdditionalError(false);
        } else {
          setAdditionalError(true);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  //--------------------------------------------------------------------------------
  // dashboard Order
  //--------------------------------------------------------------------------------
  const handleProductOrders = () => {
    if (!getUserToken) return;
    fetch(`${process.env.REACT_APP_BASE_URL}api/productOrders`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${getUserToken}`,
        "content-type": "application/json",
      },
      body: JSON.stringify(),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error === false) {
          setDashboardOrders(data.orders);
        } else if (data.message === "jwt expired") {
          localStorage.removeItem("userToken");
          localStorage.removeItem("Auth");
          localStorage.removeItem("AuthInfo");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  //    const profileInfo = async ()=>{
  //     try {
  //         const headers = {
  //             'Content-Type':"aplpication/json",
  //             "Authorization":"Bearer "+props.token
  //         }
  //         const result = await axios.get(process.env.REACT_APP_BASE_URL+"admin_api/auth/profile", {headers:headers})
  //         setAdmin(result.data.admin)

  //     } catch (error) {
  //         let message = error.response?.data?.message || error.message
  //         setSnackbar({
  //             open: true,
  //             message: message,
  //             severity: "error"
  //         })
  //     }
  // }

  //--------------------------------------------------------------------------------
  useEffect(() => {
    const offerList = products?.filter(
      (product) => product.superOffer === true
    );
    setSuperOffer(offerList);
  }, [products]);

  const handleProductColor = (id) => {
    setProductColorId(id);
  };

  const handleClearAllProductsPage = () => {
    setSuperOfferCheckbox(false);
    setDisplayProducts([...products]);
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setBrandsCheckbox("");
    setSelectedBrands("");
    setVendorsCheckbox("");
    setRangePrice(0);
    setHeaderSearchText("");
    setProductColorId("");
  };
  const handleClearWithoutSearch = () => {
    setSuperOfferCheckbox(false);
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setBrandsCheckbox("");
    setSelectedBrands("");
    setVendorsCheckbox("");
    setRangePrice(0);
    setProductColorId("");
  };
  const handleClearWithoutSuperOffer = () => {
    setSuperOfferCheckbox(true);
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setBrandsCheckbox("");
    setSelectedBrands("");
    setVendorsCheckbox("");
    setRangePrice(0);
    setHeaderSearchText("");
    setProductColorId("");
  };
  const handleClearWithoutCategories = () => {
    setSuperOfferCheckbox(false);
    setBrandsCheckbox("");
    setSelectedBrands("");
    setVendorsCheckbox("");
    setRangePrice(0);
    setHeaderSearchText("");
    setProductColorId("");
  };
  const handleClearWithoutBrands = () => {
    setSuperOfferCheckbox(false);
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setVendorsCheckbox("");
    setRangePrice(0);
    setHeaderSearchText("");
    setProductColorId("");
  };
  const handleClearWithoutVendors = () => {
    setSuperOfferCheckbox(false);
    setCategoriesCheckbox("");
    setSelectedCategory("");
    setBrandsCheckbox("");
    setSelectedBrands("");
    setRangePrice(0);
    setHeaderSearchText("");
    setProductColorId("");
  };

  //--------------------------------------------------------------------------------

  return {
    getStarting,
    handleClearAllProductsPage,
    handleClearWithoutSearch,
    handleClearWithoutSuperOffer,
    handleClearWithoutCategories,
    handleClearWithoutBrands,
    handleClearWithoutVendors,
    superOffer,
    superOfferCheckbox,
    setSuperOfferCheckbox,
    products,
    setProducts,
    displayProducts,
    setDisplayProducts,
    handleCategoriesCheckbox,
    categoriesCheckbox,
    setCategoriesCheckbox,
    homeCategories,
    categories,
    uniqueCategory,
    uniqueCategoryLogo,
    handleCategory,
    selectedCategory,
    setSelectedCategory,
    brands,
    handleBrands,
    selectedBrands,
    setSelectedBrands,
    handleBrandsCheckbox,
    brandsCheckbox,
    setBrandsCheckbox,
    vendors,
    handleVendorsCheckbox,
    vendorsCheckbox,
    setVendorsCheckbox,
    rangePrice,
    setRangePrice,
    handleProductColor,
    productColorId,
    headerSearchText,
    setHeaderSearchText,
    headerSuggestBox,
    setHeaderSuggestBox,
    handleSearch,
    handleSearchClick,
    handleSuggestClick,
    additionalOffers,
    additionalInfo,
    additionalImages,
    additionalError,
    dashboardOrders,
    cart,
    setCart,
    newQuantity,
    setNewQuantity,
    handleAddToCart,
    handleMinusToCart,
    handlePlusToCart,
    handleRemove,
    user,
    setUser,
    customer,
    setCustomer,
    onUserInformationUpdate,
    register,
    onRegisterSubmit,
    registerMessage,
    onLoginSubmit,
    loginMessage,
    onLoginCode,
    loginCodeMessage,
    handleLogout,
    handleSubmit,
    handleHomeCategory,
    handleAllCategory,
    handleAllBrands,
    handleAllVendors,
    handleAdminProfile,
    handleProductOrders,
  };
};

export default useProducts;
