import React from 'react';
import './Template2.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Header from '../Home/Header/Header';
import Header from '../Home/Header/Header';
import Home from '../Home/Home/Home';
import PrivateRoute from '../../GlobalShared/pages/Login/PrivateRoute/PrivateRoute';
import Dashboard from '../../GlobalShared/pages/Dashboard/Dashboard/Dashboard';
import DashboardHome from '../../GlobalShared/pages/Dashboard/DashboardHome/DashboardHome';
import Orders from '../../GlobalShared/pages/Dashboard/Orders/Orders';
import OrderDetails from '../../GlobalShared/pages/Dashboard/OrderDetails/OrderDetails';
import AccountDetails from "../../GlobalShared/pages/Dashboard/AccountDetails/AccountDetails";
import Checkout from '../../GlobalShared/pages/GlobalPages/Checkout/Checkout';
import Login from '../../GlobalShared/pages/Login/Login/Login';
import Register from '../../GlobalShared/pages/Login/Register/Register';
import LoginCode from '../../GlobalShared/pages/Login/LoginCode/LoginCode';
import NotFound from '../../GlobalShared/pages/NotFound/NotFound';
import Footer from '../../GlobalShared/pages/Shared/Footer/Footer';
import Contact from '../../GlobalShared/pages/GlobalPages/Contact/Contact';
import About from '../../GlobalShared/pages/GlobalPages/About/About';
import TopScroll from '../../GlobalShared/pages/Shared/TopScroll/TopScroll';
import PrivacyPolicy from '../../GlobalShared/pages/GlobalPages/PrivacyPolicy/PrivacyPolicy';
import ReturnPolicy from '../../GlobalShared/pages/GlobalPages/ReturnPolicy/ReturnPolicy';
import ProductsDetails from '../../GlobalShared/pages/GlobalPages/ProductsDetails/ProductsDetails';

const getFromLocalStorageStarting = () => {
    const getSetting = localStorage.getItem('starting')
    if(getSetting) {
        return JSON.parse(localStorage.getItem('starting'))
    } else {
        return []
    }
  } 

const Template2 = () => {
    document.title = `${getFromLocalStorageStarting().companyName}`
    return (
        <div className="tmp2">
            <Router>
                <Header/>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/product/:productSlug" element={<ProductsDetails />} />
                    <Route path="/contact" element={<Contact />}></Route>
                    <Route path="/about" element={<About />}></Route>
                    <Route path="/privacy_policy" element={<PrivacyPolicy />}></Route>
                    <Route path="/return_policy" element={<ReturnPolicy />}></Route>
                    <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                        <Route path="/dashboard" element={<DashboardHome/>}></Route>
                        <Route path="/dashboard/orders" element={<Orders/>}></Route>
                        <Route path="/dashboard/account" element={<AccountDetails/>}></Route>
                    </Route>
                    <Route path="/invoice/:orderId" element={<PrivateRoute><OrderDetails/></PrivateRoute>}></Route>
                    {/* <Route path="/cart" element={<Cart />} /> */}
                    <Route path="/checkout" element={<PrivateRoute><Checkout /></PrivateRoute>} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/code" element={<LoginCode />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <TopScroll></TopScroll>
                <Footer/>
            </Router>
        </div>
    );
};

export default Template2;