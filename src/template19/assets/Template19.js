// import React from 'react';
// import './Template6.css';
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from '../pages/Shared/Header/Header';
// import Home from '../pages/Home/Home/Home';
// import NotFound from '../pages/NotFound/NotFound';
// import Footer from '../pages/Shared/Footer/Footer';
// import AuthProvider from '../context/AuthProvider';
// import Login from '../pages/Login/Login/Login';
// import Register from '../pages/Login/Register/Register';
// import LoginCode from '../pages/Login/LoginCode/LoginCode';
// import PrivateRoute from '../pages/Login/PrivateRoute/PrivateRoute';
// import ProductsDetails from '../pages/Home/ProductsDetails/ProductsDetails';
// import Dashboard from '../pages/Dashboard/Dashboard/Dashboard';
// import DashboardHome from '../pages/Dashboard/DashboardHome/DashboardHome';
// import Orders from '../pages/Dashboard/Orders/Orders';
// import AccountDetails from "../pages/Dashboard/AccountDetails/AccountDetails";
// import OrderDetails from '../pages/Dashboard/OrderDetails/OrderDetails';
// import Cart from '../pages/Home/Cart/Cart';
// import Checkout from '../pages/Home/Checkout/Checkout';
// import AllProducts from '../pages/Home/AllProducts/AllProducts';
// import TopScroll from '../pages/Shared/TopScroll/TopScroll';
// import About from '../pages/Home/About/About';
// import Contact from '../pages/Home/Contact/Contact';
// import PrivacyPolicy from '../pages/Home/PrivacyPolicy/PrivacyPolicy';
// import ReturnPolicy from '../pages/Home/ReturnPolicy/ReturnPolicy';
// import ProductsVendors from '../pages/Home/ProductsVendors/ProductsVendors';

// const getFromLocalStorageStarting = () => {
//     const getSetting = localStorage.getItem('starting')
//     if(getSetting) {
//         return JSON.parse(localStorage.getItem('starting'))
//     } else {
//         return []
//     }
//   } 

// const Template6 = () => {
//     document.title = `${getFromLocalStorageStarting().companyName}`
//     return (
//         <div className="tmp6">
//             <AuthProvider>
//                 <Router>
//                     <Header/>
//                     <Routes>
//                         <Route exact path="/" element={<Home />} />
//                         <Route path="/products" element={<AllProducts />}></Route>
//                         <Route path="/products/:categoryBrandsName" element={<AllProducts />} />
//                         <Route path="/products/vendors/:vendorsName" element={<ProductsVendors />} />
//                         <Route path="/product/:productSlug" element={<ProductsDetails />} />
//                         <Route path="/about" element={<About />} />
//                         <Route path="/contact" element={<Contact />} />
//                         <Route path="/privacy_policy" element={<PrivacyPolicy />}></Route>
//                         <Route path="/return_policy" element={<ReturnPolicy />}></Route>
//                         <Route path="/dashboard" element={<Dashboard />}>
//                             <Route path="/dashboard" element={<DashboardHome/>}></Route>
//                             <Route path="/dashboard/orders" element={<Orders/>}></Route>
//                             <Route path="/dashboard/account" element={<AccountDetails/>}></Route>
//                         </Route>
//                         <Route path="/invoice/:orderId" element={<PrivateRoute><OrderDetails/></PrivateRoute>}></Route>
//                         <Route path="/cart" element={<Cart />}></Route>
//                         <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>}></Route>
//                         <Route path="/login" element={<Login />}></Route>
//                         <Route path="/register" element={<Register />}></Route>
//                         <Route path="/code" element={<LoginCode />}></Route>
//                         <Route path="*" element={<NotFound />} />
//                     </Routes>
//                     <TopScroll/>
//                     <Footer/>
//                 </Router>
//             </AuthProvider>
//         </div>
//     );
// };

// export default Template6;








import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from '../../GlobalShared/pages/Dashboard/Dashboard/Dashboard';
import DashboardHome from '../../GlobalShared/pages/Dashboard/DashboardHome/DashboardHome';
import OrderDetails from '../../GlobalShared/pages/Dashboard/OrderDetails/OrderDetails';
import Orders from '../../GlobalShared/pages/Dashboard/Orders/Orders';
import AccountDetails from "../../GlobalShared/pages/Dashboard/AccountDetails/AccountDetails";
import Cart from '../../GlobalShared/pages/GlobalPages/Cart/Cart';
import Checkout from '../../GlobalShared/pages/GlobalPages/Checkout/Checkout';
import Home from '../Home/Home/Home';
import ProductsDetails from '../../template19/ProductsDetails/ProductsDetails';
import Login from '../../GlobalShared/pages/Login/Login/Login';
import LoginCode from '../../GlobalShared/pages/Login/LoginCode/LoginCode';
import PrivateRoute from '../../GlobalShared/pages/Login/PrivateRoute/PrivateRoute';
import Register from '../../GlobalShared/pages/Login/Register/Register';
import NotFound from '../../GlobalShared/pages/NotFound/NotFound';
import Header from '../Home/Header/Header';
import './Template19.css';
import AllProducts from '../AllProducts/AllProducts';
import Footer from '../../GlobalShared/pages/Shared/Footer/Footer';
import TopScroll from '../../GlobalShared/pages/Shared/TopScroll/TopScroll';
import About from '../../GlobalShared/pages/GlobalPages/About/About';
import Contact from '../../GlobalShared/pages/GlobalPages/Contact/Contact';
import PrivacyPolicy from '../../GlobalShared/pages/GlobalPages/PrivacyPolicy/PrivacyPolicy';
import ReturnPolicy from '../../GlobalShared/pages/GlobalPages/ReturnPolicy/ReturnPolicy';
import ProductsVendors from '../../GlobalShared/pages/GlobalPages/ProductsVendors/ProductsVendors';
import DirectOrder from '../Order/DirectOrder'
import HTMLRenderer from "react-html-renderer";
import { Helmet } from "react-helmet";
const getFromLocalStorageStarting = () => {
    const getSetting = localStorage.getItem('starting')
    if(getSetting) {
        return JSON.parse(localStorage.getItem('starting'))
    } else {
        return []
    }
} 



  let s = 
    <script
      id="ze-snippet"
      src="https://static.zdassets.com/ekr/snippet.js?key=5130586b-71d5-491e-b6b2-f14e164e52a4"
    >
    </script>
  

const Template19 = () => {
  document.title = `${getFromLocalStorageStarting().companyName}`;





  if (getFromLocalStorageStarting().companyName)
    return (
      <div className="tmp6">
        <Helmet>
          {/* <HTMLRenderer html={getFromLocalStorageStarting().companyName} /> */}
          <HTMLRenderer html={getFromLocalStorageStarting().companyName} />
          {/* {s} */}

          {/* <script
            id="ze-snippet"
            src={getFromLocalStorageStarting().companyName}
          >
            {" "}
          </script> */}
        </Helmet>
        <Router>
          <Header />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/products" element={<AllProducts />} />
            <Route
              path="/products/:categoryBrandsName"
              element={<AllProducts />}
            />
            <Route
              path="/products/vendors/:vendorsName"
              element={<ProductsVendors />}
            />
            <Route
              path="/product/:productSlug"
              element={<ProductsDetails />}
            ></Route>
            <Route path="/contact" element={<Contact />}></Route>
            <Route path="/about" element={<About />}></Route>
            <Route path="/privacy_policy" element={<PrivacyPolicy />}></Route>
            <Route path="/return_policy" element={<ReturnPolicy />}></Route>
            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            >
              <Route path="/dashboard" element={<DashboardHome />}></Route>
              <Route path="/dashboard/orders" element={<Orders />}></Route>
              <Route
                path="/dashboard/account"
                element={<AccountDetails />}
              ></Route>
            </Route>
            <Route
              path="/invoice/:orderId"
              element={
                <PrivateRoute>
                  <OrderDetails />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/cart" element={<Cart />}></Route>
            <Route
              path="/checkout"
              element={
                <PrivateRoute>
                  <Checkout />
                </PrivateRoute>
              }
            ></Route>
            <Route path="/login" element={<Login />}></Route>
            <Route path="/register" element={<Register />}></Route>
            <Route path="/code" element={<LoginCode />}></Route>
            <Route path="/direct-order" element={<DirectOrder />}></Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
          <TopScroll />
          <Footer />
        </Router>
      </div>
    );
};

export default Template19;