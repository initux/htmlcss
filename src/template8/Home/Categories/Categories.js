import React, {useEffect} from 'react';
import './Categories.css'
import { Container, Nav, Spinner } from 'react-bootstrap';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import blankSlider from '../../../GlobalShared/images/blank-small-slider.png'
import { Link } from 'react-router-dom';

const Categories = () => {
    const {additionalOffers, getStarting} = useAuth();

    return (
        <div className="pt-4">
            <Container>
                {
                    <div className="tmp8-categories-container">
                        <div>
                            <div className="tmp8-categories-inner mb-3" style={{backgroundImage: `url(${additionalOffers[1]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[1]?.image +'?w=1000&h=1000&q=100' : blankSlider})`}}>
                                <div>
                                    {   !additionalOffers[1]?.image ?
                                            <h4>Banner 1, 150 x 86</h4>
                                            :
                                        <div>
                                            <h4 style={{color: `${getStarting?.primaryColor}`}}>Outerwear</h4>
                                            <h2>New</h2>
                                            <h4>Collection</h4>
                                            <Link to={`${additionalOffers[1]?.link}`}>
                                                <button className="tmp8-categories-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>SHOP NOW</button>
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="tmp8-categories-inner" style={{backgroundImage: `url(${additionalOffers[2]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[2]?.image +'?w=1000&h=1000&q=100' : blankSlider})`}}>
                                <div>
                                    {   !additionalOffers[2]?.image ?
                                            <h4>Banner 2, 150 x 86</h4>
                                            :
                                        <div>
                                            <h4 style={{color: `${getStarting?.primaryColor}`}}>Summer</h4>
                                            <h2>Hot</h2>
                                            <h4>Collection</h4>
                                            <Link to={`${additionalOffers[2]?.link}`}>
                                                <button className="tmp8-categories-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>SHOP NOW</button>
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="tmp8-categories-inner" style={{height: '616px', backgroundImage: `url(${additionalOffers[3]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[3]?.image +'?w=1000&h=1000&q=100' : blankSlider})`}}>
                                <div>
                                    {   !additionalOffers[3]?.image ?
                                            <h4>Banner 3, 100 x 120</h4>
                                            :
                                        <div>
                                            <h2 style={{color: `${getStarting?.primaryColor}`}}>40% Offer</h2>
                                            <h4>No Selected Models</h4>
                                            <Link to={`${additionalOffers[3]?.link}`}>
                                                <button className="tmp8-categories-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>SHOP NOW</button>
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div>
                            <div className="tmp8-categories-inner mb-3" style={{backgroundImage: `url(${additionalOffers[4]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[4]?.image +'?w=1000&h=1000&q=100' : blankSlider})`}}>
                                <div>
                                    {   !additionalOffers[4]?.image ?
                                            <h4>Banner 4, 150 x 86</h4>
                                            :
                                        <div>
                                            <h2>New</h2>
                                            <h4 style={{color: `${getStarting?.primaryColor}`}}>Arrivals</h4>
                                            <Link to={`${additionalOffers[4]?.link}`}>
                                                <button className="tmp8-categories-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>SHOP NOW</button>
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                            <div className="tmp8-categories-inner" style={{backgroundImage: `url(${additionalOffers[5]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[5]?.image +'?w=1000&h=1000&q=100' : blankSlider})`}}>
                                <div>
                                    {   !additionalOffers[5]?.image ?
                                            <h4>Banner 5, 150 x 86</h4>
                                            :
                                        <div>
                                            <h2>Hot</h2>
                                            <h4 style={{color: `${getStarting?.primaryColor}`}}>Offer</h4>
                                            <Link to={`${additionalOffers[5]?.link}`}>
                                                <button className="tmp8-categories-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>SHOP NOW</button>
                                            </Link>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                }
            </Container>
        </div>
    );
};

export default Categories;