import React, {useEffect} from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './BannerSmall.css';
import blankSmallSlider from '../../../GlobalShared/images/blank-small-slider.png';
import useAuth from "../../../GlobalShared/hooks/useAuth";
import { Link } from 'react-router-dom';

const BannerSmall = () => {
    const {additionalOffers, additionalError} = useAuth();

    return (
        <Container>
                {   
                    additionalError === true ?
                    <div className="tmp7-banner-small-container pb-4">
                        <div className="tmp7-banner-small-inner">
                            <img src={blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                            <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 4 <br/> 420 x 120</h2>
                        </div>
                        <div className="tmp7-banner-small-inner">
                            <img src={blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                            <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 4 <br/> 420 x 120</h2>
                        </div>
                        <div className="tmp7-banner-small-inner">
                            <img src={blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                            <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 4 <br/> 420 x 120</h2>
                        </div>
                    </div>
                    :
                    <div className="tmp7-banner-small-container pb-4">
                        <div className="tmp7-banner-small-inner">
                            <Link to={`${additionalOffers[1]?.link}`}>
                                <img src={additionalOffers[1]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[1]?.image +'?w=300&h=300&q=100' : blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                                {additionalOffers[1]?.image ? '' : <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 2 <br/> 420 x 120</h2>}
                            </Link>
                        </div>
                        <div className="tmp7-banner-small-inner">
                            <Link to={`${additionalOffers[2]?.link}`}>
                                <img src={additionalOffers[2]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[2]?.image +'?w=300&h=300&q=100' : blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                                {additionalOffers[2]?.image ? '' : <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 3 <br/> 420 x 120</h2>}
                            </Link>
                        </div>
                        <div className="tmp7-banner-small-inner">
                            <Link to={`${additionalOffers[3]?.link}`}>
                                <img src={additionalOffers[3]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[0]?.image +'?w=300&h=300&q=100' : blankSmallSlider} className="w-100 h-100 rounded" alt="" />
                                {additionalOffers[3]?.image ? '' : <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 4 <br/> 420 x 120</h2>}
                            </Link>
                        </div>
                    </div>
                }
            </Container>
    );
};

export default BannerSmall;