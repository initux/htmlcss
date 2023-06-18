import React, { useEffect, useState } from 'react';
import { Container, Nav, Placeholder, Spinner } from 'react-bootstrap';
import './Banner.css';
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import blankSlider from '../../../GlobalShared/images/blank-slider.png';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';
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
    const { getStarting, additionalImages, categories, handleAllCategory, handleCategory, selectedCategory, setHeaderSearchText} = useAuth();

    // console.log('additionalImages', additionalImages)
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
        <Container>
             <style type="text/css">
                {
                  `.tmp10-banner-slider .slick-prev, .tmp10-banner-slider .slick-next{
                        background-color: ${getStarting?.primaryColor} !important;
                   }
                   .tmp10-banner-slider .slick-dots li.slick-active button:before{
                        color: ${getStarting?.primaryColor} !important;
                        font-size: 14px !important;
                    }
                   .tmp10-banner-dropdown-container span:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                   `
                }
            </style>
            <div className="tmp10-banner-container">
                <div className="tmp10-banner-categories">
                    <div className="tmp10-banner-menu-header" style={{backgroundColor: `${getStarting?.primaryColor}`, border: `1px solid ${getStarting?.primaryColor}`}}>
                        <FontAwesomeIcon icon={faBars} /> &nbsp;&nbsp;
                        <h4>Categories</h4>
                    </div>
                    <div style={{position: 'relative'}}>
                        <div style={{maxHeight: '400px', overflowY: 'auto'}}>
                            <Link to={`/products/`} onClick={() => setHeaderSearchText('')}>
                                {   
                                    categories.length === 0 ?
                                    <>
                                        {Array.from(Array(9)).map((_, i) => (
                                            <div className="tmp10-banner-menu-categories" key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                                        ))}
                                    </>
                                    :
                                    categories?.slice().reverse().map(unique => <div key={unique.name} className="tmp10-banner-menu-categories d-flex align-items-center w-100">
                                        <div style={{height: '17px', width: '17px', marginTop: '-12px'}}>
                                            <img src={unique?.logo_url ? process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=20&h=20&q=72' : categoriesImage} style={{height: '100%', width: '100%'}} alt="" />
                                        </div>
                                        <div className="tmp10-banner-dropdown-container w-100">
                                            <span onClick={handleCategory} style={{marginLeft: '10px', color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#666666'}`, fontSize: '13px'}}>{unique.name}</span>
                                            <div className="tmp10-banner-dropdown-content" style={{height: unique?.subCategories?.length > 0 ? '450px' : '0px', padding: unique?.subCategories?.length > 0 ? '30px' : '0px'}}>
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
                {   
                    !additionalImages.image1 ?
                    <div className="tmp10-banner-slider">
                        <div className="banner-image" style={{height: '450px'}}>
                            <img src={blankSlider} alt=""/>
                            <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner 1 <br/> 800 x 486</h2>
                        </div>
                    </div>
                    :
                    <div className="tmp10-banner-slider">
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
            </div>
        </Container>
    );
};
export default Banner;