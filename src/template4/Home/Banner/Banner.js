import React, { useEffect } from 'react';
import Slider from "react-slick";
import { Container } from 'react-bootstrap';
import './Banner.css';
import blankSlider from '../../../GlobalShared/images/blank-slider.png';
import blankSmallSlider from '../../../GlobalShared/images/blank-small-slider.png';
import useAuth from "../../../GlobalShared/hooks/useAuth";
import { Link } from "react-router-dom";


const Banner = () => {
    const {additionalImages, additionalOffers, getStarting} = useAuth();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
  
    return (
        <div>
            <Container>
                <style type="text/css">
                    {
                        `   .tmp4-banner-left-slider .slick-dots li.slick-active button:before{
                                color: ${getStarting?.primaryColor}  !important;
                                font-size: 14px !important;
                            }
                        `
                    }
                </style>
                <div className="tmp4-banner-container">
                    <div>
                        {   
                            !additionalImages.image1 ?
                            <div className="tmp4-banner-left-slider">
                                <div className="banner-image">
                                    <img src={blankSlider} alt=""/>
                                    <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Slider 1 <br/> 800 x 486</h2>
                                </div>
                            </div>
                            :
                            <div className="tmp4-banner-left-slider">
                                <Slider {...settings}>
                                    <div className="banner-image">
                                        <Link to={`${additionalImages.image1.link}`}>
                                            <img src={`${additionalImages.image1 ? process.env.REACT_APP_CDN_URL + additionalImages.image1.image +'?w=800&h=800&q=100' : blankSlider}`} alt=""/>
                                            {/* <img src='https://themepure.net/template/topico-prev/topico/assets/img/slider/03/slider-01.jpg' alt=""/> */}
                                        </Link>
                                    </div>
                                    <div className="banner-image">
                                        <Link to={`${additionalImages.image2.link}`}>
                                            <img src={`${additionalImages.image2 ? process.env.REACT_APP_CDN_URL + additionalImages.image2.image +'?w=800&h=800&q=100' : blankSlider}`} alt=""/>
                                        </Link>
                                    </div>
                                    <div className="banner-image">
                                        <Link to={`${additionalImages.image3.link}`}>
                                            <img src={`${additionalImages.image3 ? process.env.REACT_APP_CDN_URL + additionalImages.image3.image +'?w=800&h=800&q=100' : blankSlider}`} alt=""/>
                                        </Link>
                                    </div>
                                </Slider>
                            </div> 
                        }
                    </div>
                    {/* style={{backgroundImage: `url(${process.env.REACT_APP_CDN_URL + additionalOffers[0].image +'?w=300&h=300&q=100'})`}} */}
                    <div>
                        <div className="tmp4-banner-right-container">
                            <div className="tmp4-banner-right">
                                {   additionalOffers[0]?.image === '' ?
                                    <div className="tmp4-banner-right-slider">
                                        <img src={blankSmallSlider} className="w-100 h-100" alt="" />
                                        <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 1 <br/> 420 x 120</h2>
                                    </div>
                                    :
                                    <div className="tmp4-banner-right-slider">
                                        <Link to={`${additionalOffers[0]?.link}`}>
                                            <img src={additionalOffers[0]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[0].image +'?w=300&h=300&q=100' : blankSmallSlider} className="w-100" alt="" />
                                        </Link>
                                    </div>
                                }
                            </div>
                            <div className="tmp4-banner-right">
                                {   additionalOffers[1]?.image === '' ?
                                    <div className="tmp4-banner-right-slider">
                                        <img src={blankSmallSlider} className="w-100 h-100" alt="" />
                                        <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 2 <br/> 420 x 120</h2>
                                    </div>
                                    :
                                    <div className="tmp4-banner-right-slider">
                                        <Link to={`${additionalOffers[1]?.link}`}>
                                            <img src={additionalOffers[1]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[1].image +'?w=300&h=300&q=100' : blankSmallSlider} className="w-100" alt="" />
                                        </Link>
                                    </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Banner;