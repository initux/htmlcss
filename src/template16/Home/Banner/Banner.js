import React, { useEffect, useState } from 'react';
import { Container, Nav, Placeholder, Spinner } from 'react-bootstrap';
import './Banner.css';
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faArrowDown, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import blankSlider from '../../../GlobalShared/images/blank-slider.png';
import categoriesImage from '../../image/blank-slider.png';
import blankSmallSlider from '../../image/blank-small-slider.png';
import useAuth from '../../../GlobalShared/hooks/useAuth';

// function CustomArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//       <div
//         // className={className+' custom_arrow'}
//         style={{ ...style, display: "block", background: "red" }}
//         onClick={onClick}
//       />
//     );
// }

const Banner = () => {
    const { getStarting, additionalImages, additionalOffers, categories, handleAllCategory, handleCategory, selectedCategory, setHeaderSearchText} = useAuth();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        // nextArrow : <CustomArrow />,
        // prevArrow : <CustomArrow />
      };

    //   const navigate = useNavigate();
    //   const handleProductCategory = (e) => {
    //     navigate(`/products/${e}`);
    //     handleCategory(e)
    // }
    
    useEffect(() => {
        handleAllCategory();
    }, [])
    
    return (
        <div>
            <style type="text/css">
                {
                `.tmp16-banner-slider .slick-prev, .tmp16-banner-slider .slick-next{
                        background-color: ${getStarting?.primaryColor} !important;
                        display: none !important;
                }
                .tmp16-banner-slider .slick-dots li.slick-active button:before{
                        color: ${getStarting?.primaryColor} !important;
                        font-size: 14px !important;
                    }
                .tmp16-banner-dropdown-container span:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                `
                }
            </style>
            <Container>
                <div className="tmp16-banner-menu-container">
                    <div className="tmp16-banner-menu-header" style={{backgroundColor: `${getStarting?.primaryColor}`, border: `1px solid ${getStarting?.primaryColor}`}}>
                        <h4>All Categories</h4>
                        <div>
                        <FontAwesomeIcon icon={faBars} />
                        </div>
                    </div>
                    <Nav>
                        <Nav.Link  href="#" target="_blank" style={{color: `${getStarting?.primaryColor}`}}>Home</Nav.Link>
                        <Link to={`/products/`}>
                            <div className="d-flex" onClick={() => setHeaderSearchText('')}>
                                {   
                                    categories.length === 0 ?
                                    <>
                                        {/* {Array.from(Array(1)).map((_, i) => (
                                            <div key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                                        ))} */}
                                        <span style={{marginTop: '8px', color: '#000'}}>Loading...</span>
                                        {/* <Placeholder animation="glow"><Placeholder xs={1} /></Placeholder> */}
                                    </>
                                    :
                                    categories?.slice(-5).reverse().map(unique => <div key={unique.name} style={{position: 'relative', cursor: 'pointer'}}>
                                        <div className="tmp16-banner-top-dropdown-container w-100">
                                            <div className="d-flex align-items-center me-4">
                                                <span onClick={handleCategory} style={{marginRight: '10px', color: `${selectedCategory === unique.name ? getStarting?.primaryColor : '#666666'}`}}>{unique.name}</span>
                                                {unique?.subCategories?.length > 0 && <FontAwesomeIcon icon={faArrowDown} style={{color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#666666'}`}}/>}
                                            </div>
                                            <div className="tmp16-banner-top-dropdown-content" style={{height: unique?.subCategories?.length > 0 ? '570px' : '0px', padding: unique?.subCategories?.length > 0 ? '30px' : '0px'}}>
                                                {   unique?.subCategories?.map( subCat =>  <div key={subCat._id} style={{paddingBottom: '20px'}}>
                                                        <span onClick={handleCategory} style={{fontSize: '15px', color: `${selectedCategory === subCat.name ? getStarting?.primaryColor : '#000'}`}}>{subCat.name}</span>   
                                                    <hr style={{height: '0.1px', margin: '10px 0px 10px'}}/>
                                                    {
                                                        subCat?.childs?.map( subCatChild =>  <div key={subCatChild._id}>
                                                            <span onClick={handleCategory} style={{fontSize: '13px', color: `${selectedCategory === subCatChild.name ? getStarting?.primaryColor :'#666666'}`}}>{subCatChild.name}</span>
                                                        </div>)
                                                    }
                                                    </div>)
                                                }
                                            </div>
                                        </div>
                                    </div>)
                                }
                            </div>
                        </Link>
                    </Nav>
                </div>
            </Container>
            <hr style={{height: '2px', margin: '0px', padding: '0px', backgroundColor: `${getStarting?.primaryColor}`, opacity: '1'}}/>
            <Container>
                <div className="tmp16-banner-container">
                    <div className="tmp16-banner-categories">
                        <div style={{position: 'relative'}}>
                            <div className="tmp16-banner-categories-inner">
                                    <Link to={`/products/`} onClick={() => setHeaderSearchText('')}>
                                        {   
                                            categories.length === 0 ?
                                            <>
                                                {Array.from(Array(9)).map((_, i) => (
                                                    <div className="tmp16-banner-menu-categories" key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                                                ))}
                                            </>
                                            :
                                            categories?.slice().reverse().map(unique => <div key={unique.name} className="tmp16-banner-menu-categories d-flex align-items-center w-100">
                                                <div style={{height: '17px', width: '17px', marginTop: '-12px'}}>
                                                    <img src={unique?.logo_url ? process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=20&h=20&q=72' : categoriesImage} style={{height: '100%', width: '100%'}} alt="" />
                                                </div>
                                                <div className="tmp16-banner-dropdown-container w-100">
                                                    <span onClick={handleCategory} style={{marginLeft: '10px', color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#666666'}`, fontSize: '13px'}}>{unique.name}</span>
                                                    {/* <div className="d-flex align-items-center justify-content-between me-4">
                                                        <span onClick={handleCategory} style={{marginLeft: '10px', color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#666666'}`}}>{unique.name}</span>
                                                        {unique?.subCategories?.length > 0 && <FontAwesomeIcon icon={faArrowRight} style={{color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#4b5563'}`}}/>}
                                                    </div> */}
                                                    <div className="tmp16-banner-dropdown-content" style={{height: unique?.subCategories?.length > 0 ? '570px' : '0px', padding: unique?.subCategories?.length > 0 ? '30px' : '0px'}}>
                                                        {   unique?.subCategories?.map( subCat =>  <div key={subCat._id} style={{paddingBottom: '20px'}}>
                                                                <span onClick={handleCategory} style={{fontSize: '15px', color: `${selectedCategory === subCat.name ? getStarting?.primaryColor :'#000'}`}}>{subCat.name}</span>   
                                                            <hr style={{height: '0.1px', margin: '10px 0px 10px'}}/>
                                                            {
                                                                subCat?.childs?.map( subCatChild =>  <div key={subCatChild._id}>
                                                                    <span onClick={handleCategory} style={{fontSize: '13px', color: `${selectedCategory === subCatChild.name ? getStarting?.primaryColor :'#4b5563'}`}}>{subCatChild.name}</span>
                                                                </div>)
                                                            }
                                                            </div>)
                                                        }
                                                    </div>
                                                </div>
                                            </div>)
                                        }       
                                    </Link>
                            </div>
                        </div>
                    </div>
                    <div className="tmp16-banner-slider-container">
                        {   !additionalImages.image1 ?
                            <div className="tmp16-banner-slider">
                                <div className="banner-image">
                                    <img src={blankSlider} alt=""/>
                                    <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 1 <br/> 420 x 120</h2>
                                </div>
                            </div>
                            :
                            <div className="tmp16-banner-slider">
                                <Slider {...settings}>
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
                        <div className="tmp16-banner-small-slider-container">
                            <div className="tmp16-banner-small-slider">
                                <Link to={`${additionalOffers[0]?.link}`}>
                                    <img src={`${additionalOffers[0]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[0]?.image +'?w=800&h=800&q=100' : blankSmallSlider}`} alt=""/>
                                    {additionalOffers[0]?.image ? " " : <h5 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 1 <br/> 600 x 340</h5>}
                                </Link>
                            </div>
                            <div className="tmp16-banner-small-slider">
                                <Link to={`${additionalOffers[1]?.link}`}>
                                    <img src={`${additionalOffers[1]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[1]?.image +'?w=800&h=800&q=100' : blankSmallSlider}`} alt=""/>
                                    {additionalOffers[1]?.image ? " " : <h5 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 2 <br/> 600 x 340</h5>}
                                </Link>
                            </div>
                            <div className="tmp16-banner-small-slider">
                                <Link to={`${additionalOffers[2]?.link}`}>
                                    <img src={`${additionalOffers[2]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[2]?.image +'?w=800&h=800&q=100' : blankSmallSlider}`} alt=""/>
                                    {additionalOffers[2]?.image ? " " : <h5 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 3 <br/> 600 x 340</h5>}
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};
export default Banner;