import React from 'react';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Newsletter.css';

const Newsletter = () => {
    const {getStarting} = useAuth();
    return (
        <div style={{backgroundColor: "#E5F1FB", padding: "100px 0px 40px", width: "100%"}}>
            <div className="container">
                <div className="newsletter">
                    <div className="d-flex align-items-center">
                        <div>
                            <h2 style={{color: `${getStarting.primaryColor}`}}>Grab Our Newsletter</h2>
                            <p className="text-muted">To receive latest offers and discounts from the shop.</p>
                            <form className="row g-3">
                                <div className="col-auto">
                                    <input type="email" className="form-control" placeholder="Enter Your Email Address"/>
                                </div>
                                <div className="col-auto">
                                    <button type="submit" className="btn mb-3 text-white" style={{backgroundColor: `${getStarting.primaryColor}`}}>Subscribe</button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="newsletter-img">
                        {/* <img src="https://i.ibb.co/fDcVbKK/Email-campaign-amico.png" alt=""/> */}
                        <img src="https://i.ibb.co/dGdnZC0/news-letter.png" alt=""/>
                    </div>  
                </div>
            </div>
        </div>
    );
};

export default Newsletter;