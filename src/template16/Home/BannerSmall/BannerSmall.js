import React, {useEffect} from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './BannerSmall.css';
import blankSmallSlider from '../../../GlobalShared/images/blank-small-slider.png';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';

const BannerSmall = () => {
    const {additionalOffers, additionalError} = useAuth();
  
    return (
        <div>
            <Container>
                    {   
                        additionalError === true ?
                        <div className="tmp15-banner-small-container pb-1">
                            <div className="tmp15-banner-small-inner">
                                <img src={blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                                <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 4 <br/> 800 x 453</h2>
                            </div>
                            <div className="tmp15-banner-small-inner">
                                <img src={blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                                <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 5 <br/> 800 x 453</h2>
                            </div>
                            <div className="tmp15-banner-small-inner">
                                <img src={blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                                <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 6 <br/> 800 x 453</h2>
                            </div>
                        </div>
                        :
                        <div className="tmp15-banner-small-container pb-1">
                            <div className="tmp15-banner-small-inner">
                                <Link to={`${additionalOffers[3]?.link}`}>
                                    <img src={additionalOffers[3]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[3]?.image +'?w=800&h=800&q=100' : blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                                    {additionalOffers[3]?.image ? " " : <h5 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 4 <br/> 800 x 305</h5>}
                                </Link>
                            </div>
                            <div className="tmp15-banner-small-inner">
                                <Link to={`${additionalOffers[4]?.link}`}>
                                    <img src={additionalOffers[4]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[4]?.image +'?w=800&h=800&q=100' : blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                                    {additionalOffers[4]?.image ? " " : <h5 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 5 <br/> 800 x 305</h5>}
                                </Link>
                            </div>
                            <div className="tmp15-banner-small-inner">
                                <Link to={`${additionalOffers[5]?.link}`}>
                                    <img src={additionalOffers[5]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[5]?.image +'?w=800&h=800&q=100' : blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                                    {additionalOffers[5]?.image ? " " : <h5 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 6 <br/> 800 x 305</h5>}
                                </Link>
                            </div>
                        </div>
                    }
            </Container>
       </div>
    );
};

export default BannerSmall;