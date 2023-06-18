import React, {useEffect} from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './BannerSmall.css';
import blankSmallSlider from '../../../GlobalShared/images/blank-small-slider.png';
import useAuth from "../../../GlobalShared/hooks/useAuth";

const BannerSmall = () => {
    const {additionalOffers, additionalError, handleAdminProfile} = useAuth();

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div>
            <Container>
                    {   
                        additionalError === true ?
                        <div className="tmp13-banner-small-container pt-2 pb-3">
                            <div className="tmp13-banner-small-inner">
                                <img src={blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                            </div>
                            <div className="tmp13-banner-small-inner">
                                <img src={blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                            </div>
                            <div className="tmp13-banner-small-inner">
                                <img src={blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                            </div>
                        </div>
                        :
                        <div className="tmp13-banner-small-container pt-2 pb-3">
                            <div className="tmp13-banner-small-inner">
                                <img src={additionalOffers[1]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[1]?.image +'?w=300&h=300&q=100' : blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                            </div>
                            <div className="tmp13-banner-small-inner">
                                <img src={additionalOffers[2]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[2]?.image +'?w=300&h=300&q=100' : blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                            </div>
                            <div className="tmp13-banner-small-inner">
                                <img src={additionalOffers[3]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[3]?.image +'?w=300&h=300&q=100' : blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                            </div>
                        </div>
                    }
            </Container>
       </div>
    );
};

export default BannerSmall;