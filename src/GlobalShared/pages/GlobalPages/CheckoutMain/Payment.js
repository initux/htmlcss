import React from 'react';
import { Navbar, NavDropdown } from 'react-bootstrap';

const Payment = ({getStarting, cartPrice, courierCharge, couponCodeAmount, courierName, couriers, handleDeliveryCharge, couponCode, setCouponCode, handleCouponCode, errorMessage, successMessage}) => {
     
    
    return (
        <div className="checkout-main-payment-container my-5">
            <div className="">
                <p>Please select your favorite Web language:</p>
                <div className="d-flex align-items-center">
                    <div style={{border: '1px solid red', borderRadius: '3px', padding: '20px 20px 0px'}}>
                        <input type="radio" id="sslcommerz" name="select_payment" value="sslcommerz"/>
                        <label htmlFor="sslcommerz">
                            <img src="https://kholabazaar.com.bd/public/assets/img/cards/sslcommerz.png" style={{width: '150px'}}alt="" />
                            {/* <p>sslcommerz</p> */}
                        </label><br/>
                        <label htmlFor="sslcommerz">
                            <p className="mt-2">sslcommerz</p>
                        </label><br/>
                    </div>&nbsp;&nbsp;

                    <div style={{border: '1px solid red', borderRadius: '3px', padding: '20px 20px 0px'}}>
                        <input type="radio" id="nagad" name="select_payment" value="nagad"/>
                        <label htmlFor="nagad">
                            <img src="https://kholabazaar.com.bd/public/assets/img/cards/nagad.png" style={{width: '150px'}}alt="" />
                        </label><br/>
                        <label htmlFor="nagad">
                            <p className="mt-2">Nagad</p>
                        </label><br/>
                    </div>&nbsp;&nbsp;

                    <div style={{border: '1px solid red', borderRadius: '3px', padding: '20px 20px 0px'}}>
                        <input type="radio" id="cash" name="select_payment" value="cash"/>
                        <label htmlFor="cash">
                            <img src="https://kholabazaar.com.bd/public/assets/img/cards/cod.png" style={{width: '150px'}}alt="" />
                        </label><br/>
                        <label htmlFor="cash">
                            <p className="mt-2">Cash on Delivery</p>
                        </label>
                    </div>&nbsp;&nbsp;
                </div>
            </div>
            <div>
                <div className="tmp-checkout-payment-left-inner">
                    <h4>Checkout Summary</h4>
                    <hr />
                    <div className="d-flex justify-content-between" style={{borderBottom: '1px dashed #eaeaea'}}>
                        <span>Products</span>
                        <span><span style={{fontSize: '22px'}}>{getStarting?.currency} </span>{cartPrice}</span>
                    </div>
                    <div className="d-flex justify-content-between" style={{borderBottom: '1px dashed #eaeaea'}}>
                        <span>Delivery Charge</span>
                        <span><span style={{fontSize: '22px'}}>{getStarting?.currency} </span>{courierCharge}.00</span>
                    </div>
                    <div className="d-flex justify-content-between" style={{borderBottom: '1px dashed #eaeaea'}}>
                        <span>Discount</span>
                        <span><span style={{fontSize: '22px'}}>{getStarting?.currency} </span>{couponCodeAmount}.00</span>
                    </div>
                    <div className="d-flex justify-content-between">
                        <span><strong>Total</strong></span>
                        <span><span style={{fontSize: '22px'}}>{getStarting?.currency} </span><strong>{(cartPrice + courierCharge) - couponCodeAmount}</strong></span>
                    </div>
                </div>
                
                <div className="tmp-checkout-payment-left-inner" style={{padding: '12px 25px'}}>
                    <Navbar>
                        <NavDropdown title="Select Courier" id="basic-nav-dropdown">
                            {   couriers?.length === 0 ?
                                <NavDropdown.Item><h6>No couriers data found</h6></NavDropdown.Item>
                                :
                                couriers?.map(courier => <NavDropdown.Item key={courier._id}><h6 onClick={() => handleDeliveryCharge(courier._id, courier.name, courier.delivery_charge)}>{courier.name} ( {courier.delivery_charge} TK )</h6></NavDropdown.Item>)
                            }
                        </NavDropdown>
                        <input className="courier-name" defaultValue={courierName} required/>
                    </Navbar>
                </div>

                <div className="tmp-checkout-payment-left-inner">
                    <div className="d-flex">
                        <input value={couponCode} className="coupon-code" onChange={(e) => setCouponCode(e.target.value)} placeholder="Coupon Code"/>
                        <div className="coupon-code-btn" onClick={handleCouponCode}>Check</div>
                    </div>
                    {
                        errorMessage && <p style={{color:'#ff4747', margin: '20px 0px 0px'}}>{errorMessage}</p>
                    }
                    {
                        successMessage && <p style={{color:'green', margin: '20px 0px 0px'}}>{successMessage}</p>
                    }
                </div>
            </div>
        </div>
    );
};

export default Payment;