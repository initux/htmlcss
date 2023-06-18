import React, { useEffect, useState } from 'react';
import { Container, Nav, Placeholder, Spinner } from 'react-bootstrap';
import './Banner.css';
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import blankSlider from '../../../GlobalShared/images/blank-slider.png';
import blankImage from '../../../GlobalShared/images/blunk-image.png';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';
import blankSmallSlider from '../../image/blank-small-slider.png';
import man from '../../image/man.webp';
import useAuth from '../../../GlobalShared/hooks/useAuth';


const Banner = () => {
    const { getStarting, additionalImages, handleLogout, categories, handleAllCategory, superOffer,
             handleCategory, selectedCategory, products, handleClearWithoutCategories, setHeaderSearchText} = useAuth();

    const user = JSON.parse(localStorage.getItem('AuthInfo'));

    const navigate = useNavigate();
    const handleProductDetails = (slug) => {
        navigate(`/product/${slug}`);
    }
    const handleBannerCategory = (e) => {
        navigate(`/products/${e.target.textContent}`);
        handleCategory(e)
    }

    const settingsBannerOne = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 2000,
        slidesToShow: 1,
        slidesToScroll: 1,
    };
    const settingsBannerTwo = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 1500,
        slidesToShow: 6,
        slidesToScroll: 1,
        responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3,
              },
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 5,
              },
            },
            {
              breakpoint: 768,
              settings: {
                slidesToShow: 4,
              },
            },
            {
              breakpoint: 500,
              settings: {
                slidesToShow: 3,
              },
            },
          ],
    };
    const settingsBannerThree = {
        dots: true,
        infinite: true,
        autoplay: true,
        speed: 500,
        autoplaySpeed: 1000,
        slidesToShow: 2,
        slidesToScroll: 1,
    };


    useEffect(() => {
        handleAllCategory();
    }, [])

    return (
        <div>
            <style type="text/css">
                {
                `.tmp18-banner-slider .slick-prev, .tmp18-banner-slider .slick-next{
                        background-color: ${getStarting?.primaryColor} !important;
                        display: none !important;
                }
                .tmp18-banner-slider .slick-dots li.slick-active button:before{
                        color: ${getStarting?.primaryColor} !important;
                        font-size: 12px !important;
                    }
                .tmp18-banner-dropdown-container span:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                `
                }
            </style>
            <Container>
                <div className="tmp18-banner-container">
                    <div className="tmp18-banner-categories">
                        <div className="tmp18-banner-menu-header">
                            <div style={{marginRight: '12px'}}><FontAwesomeIcon icon={faBars} /></div>
                            <h4 style={{fontWeight: 'bold'}}>Categories</h4>
                        </div>
                        <div style={{position: 'relative'}}>
                            <div className="tmp18-banner-categories-inner" onClick={() => setHeaderSearchText('')}>
                                {   
                                    categories.length === 0 ?
                                    <>
                                        {Array.from(Array(12)).map((_, i) => (
                                            <div className="tmp18-banner-menu-categories" key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                                        ))}
                                    </>
                                    :
                                    categories?.slice().reverse().map(unique => <div key={unique.name} className="tmp18-banner-menu-categories d-flex align-items-center w-100" onClick={handleClearWithoutCategories}>
                                        <div style={{height: '17px', width: '17px', marginTop: '-7px'}}>
                                            <img src={unique?.logo_url ? process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=20&h=20&q=72' : categoriesImage} style={{height: '100%', width: '100%'}} alt="" />
                                        </div>
                                        <div className="tmp18-banner-dropdown-container w-100">
                                            <span onClick={handleBannerCategory} style={{marginLeft: '10px', color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#666666'}`}}>{unique.name}</span>
                                            <div className="tmp18-banner-dropdown-content" style={{height: unique?.subCategories?.length > 0 ? '570px' : '0px', padding: unique?.subCategories?.length > 0 ? '30px' : '0px'}}>
                                                {   unique?.subCategories?.map( subCat =>  <div key={subCat._id} style={{paddingBottom: '20px'}}>
                                                        <span onClick={handleBannerCategory} style={{fontSize: '15px', color: `${selectedCategory === subCat.name ? getStarting?.primaryColor :'#000'}`}}>{subCat.name}</span>   
                                                    <hr style={{height: '0.1px', margin: '10px 0px 10px'}}/>
                                                    {
                                                        subCat?.childs?.map( subCatChild =>  <div key={subCatChild._id}>
                                                            <span onClick={handleBannerCategory} style={{fontSize: '13px', color: `${selectedCategory === subCatChild.name ? getStarting?.primaryColor :'#4b5563'}`}}>{subCatChild.name}</span>
                                                        </div>)
                                                    }
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                    </div>)
                                }       
                            </div>
                        </div>
                    </div>
                    <div className="tmp18-banner-slider-container">
                        <div>
                            <div>
                                {   !additionalImages.image1 ?
                                    <div className="tmp18-banner-slider">
                                        <div className="banner-image">
                                            <img src={blankSlider} alt=""/>
                                            <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 1 <br/> 750 x 300</h2>
                                        </div>
                                    </div>
                                    :
                                    <div className="tmp18-banner-slider">
                                        <Slider {...settingsBannerOne}>
                                            <div className="banner-image">
                                                <Link to={`${additionalImages.image1.link}`}>
                                                    <img src={`${process.env.REACT_APP_CDN_URL + additionalImages.image1.image +'?w=800&h=800&q=100'}`} alt=""/>
                                                    {/* <img src='https://themepure.net/template/topico-prev/topico/assets/img/slider/03/slider-01.jpg' alt=""/> */}
                                                </Link>
                                            </div>
                                            <div className="banner-image">
                                                <Link to={`${additionalImages.image1.link}`}>
                                                    <img src={`${process.env.REACT_APP_CDN_URL + additionalImages.image2.image +'?w=800&h=800&q=100'}`} alt=""/>
                                                </Link>
                                            </div>
                                            <div className="banner-image">
                                                <Link to={`${additionalImages.image1.link}`}>
                                                    <img src={`${process.env.REACT_APP_CDN_URL + additionalImages.image3.image +'?w=800&h=800&q=100'}`} alt=""/>
                                                </Link>
                                            </div>
                                        </Slider>
                                    </div> 
                                }
                            </div>
                            <div className="tmp18-banner-products-container">
                               {
                                   products?.length === 0 ?
                                   <Slider {...settingsBannerTwo}>
                                        {Array.from(Array(6)).map((_, i) => (
                                            <div key={i} className='d-flex align-items-center justify-content-center position-relative px-1'>
                                                <div style={{height: '159px', width: '100%', background: '#fff', borderRadius: '8px'}}>
                                                    <img src={blankImage} alt=""/>
                                                </div>
                                                <button style={{position: 'absolute', top: '75%', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', width: '75%', border: 'none', outline: 'none', borderRadius: '50px', padding: '2px', backgroundImage: 'linear-gradient(94deg,#ff0a0a,#ff7539)', color: '#fff'}}>{getStarting?.currency} 00</button>
                                            </div>
                                        ))}
                                   </Slider>
                                   :
                                    <Slider {...settingsBannerTwo}>
                                        {
                                            products?.map( product => <div key={product._id}>
                                                    <div className='d-flex align-items-center justify-content-center position-relative px-1' onClick={() => handleProductDetails(product?.slug)}>
                                                       <div style={{height: '159px', width: '100%', background: '#fff', borderRadius: '8px', cursor: 'pointer'}}>
                                                            <img src={`${process.env.REACT_APP_CDN_URL + product?.thumbnail +'?w=800&h=800&q=100'}`} alt=""/>
                                                       </div>
                                                        <button style={{position: 'absolute', top: '75%', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', width: '75%', border: 'none', outline: 'none', borderRadius: '50px', padding: '2px', backgroundImage: 'linear-gradient(94deg,#ff0a0a,#ff7539)', color: '#fff'}}>{getStarting?.currency} {product.sell_price}</button>
                                                    </div>
                                                </div>)
                                        }
                                    </Slider>
                               }
                            </div>
                        </div>
                        <div className="tmp18-banner-small-slider-container">
                            <div className="text-center">
                                <div style={{height: '50px'}}>
                                    <img src={man} alt="" style={{width: '20%'}}/>
                                </div>
                                <h5 style={{marginTop: '10px'}}>Welcome</h5>
                                {
                                    user?.phone ?
                                    <div className="d-flex align-items-center justify-content-between mx-auto my-4 tmp18-login-btn">
                                        <Link to={`/dashboard`}><button style={{width: '100px', border: 'none', outline: 'none', borderRadius: '50px', padding: '5px', fontSize: '13px', backgroundImage: 'linear-gradient(94deg,#ff0a0a,#ff7539)', color: '#fff'}}>Dashboard</button></Link>
                                        <Link to={`/login`}><button onClick={handleLogout} style={{width: '100px', border: 'none', outline: 'none', borderRadius: '50px', padding: '5px', fontSize: '13px', background: '#f5f5f5'}}>LogOut <FontAwesomeIcon icon={faSignOutAlt}/></button></Link>
                                    </div>
                                    :
                                    <div className="d-flex align-items-center justify-content-between mx-auto my-4 tmp18-login-btn">
                                        <Link to={`/register`}><button style={{width: '100px', border: 'none', outline: 'none', borderRadius: '50px', padding: '5px', fontSize: '13px', backgroundImage: 'linear-gradient(94deg,#ff0a0a,#ff7539)', color: '#fff'}}>Join</button></Link>
                                        <Link to={`/login`}><button style={{width: '100px', border: 'none', outline: 'none', borderRadius: '50px', padding: '5px', fontSize: '13px', background: '#f5f5f5'}}>Sign in</button></Link>
                                    </div>
                                }
                            </div>
                            <div className="tmp18-banner-small-slider">
                                <p style={{fontSize: '14px', color: '#fff'}}>Exclusive offers</p>
                                <p style={{fontSize: '15px', fontWeight: 'bold', color: '#fff'}}>Just for new AliExpress members!</p>
                                {   superOffer?.length === 0 ?
                                    <Slider {...settingsBannerThree}>
                                        {Array.from(Array(3)).map((_, i) => (
                                            <div key={i} className='d-flex align-items-center justify-content-center position-relative px-1 tmp18-banner-small-slider-content'>
                                                <img src={blankImage} alt=""/>
                                                <button style={{position: 'absolute', top: '70%', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', width: '75%', border: 'none', outline: 'none', borderRadius: '50px', padding: '2px', backgroundImage: 'linear-gradient(94deg,#ff0a0a,#ff7539)', color: '#fff'}}>{getStarting?.currency} 00</button>
                                            </div>
                                        ))}
                                    </Slider>
                                    :
                                    <Slider {...settingsBannerThree}>
                                        {
                                            superOffer?.map( offer => <div key={offer._id}>
                                                    <div onClick={() => handleProductDetails(offer?.slug)} className='d-flex align-items-center justify-content-center position-relative px-1 tmp18-banner-small-slider-content'>
                                                        <img src={`${process.env.REACT_APP_CDN_URL + offer?.thumbnail +'?w=800&h=800&q=100'}`} alt=""/>
                                                        <button style={{position: 'absolute', top: '70%', left: '50%', transform: 'translateX(-50%)', fontSize: '12px', width: '75%', border: 'none', outline: 'none', borderRadius: '50px', padding: '2px', backgroundImage: 'linear-gradient(94deg,#ff0a0a,#ff7539)', color: '#fff'}}>{getStarting?.currency} {offer.sell_price}</button>
                                                    </div>
                                            </div>)
                                        }
                                    </Slider>
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