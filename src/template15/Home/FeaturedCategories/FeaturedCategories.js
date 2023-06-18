import React, { useEffect } from 'react';
import { Container, Placeholder } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import useAuth from '../../../GlobalShared/hooks/useAuth';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';
import './FeaturedCategories.css';
// import './Sponsor.css';

function CustomArrow(props) {
    const { className, style, onClick } = props;
    const {getStarting} = useAuth();

    return (
      <>
        <style type="text/css">
        {
          `.customsSlider:before {
              color: ${getStarting?.primaryColor} !important;
              font-size: 30px !important;
            }
          `
        }
        </style>
        <div
          className={className + " customsSlider"}
          style={{ ...style }}
          onClick={onClick}
        />
      </>
    );
}

const FeaturedCategories = () => {
  const {getStarting, categories, handleAllCategory, handleCategory, handleClearWithoutCategories } = useAuth();

  useEffect(() => {
    handleAllCategory();
  }, [])  

  var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: categories?.length > 10 ? 10 : categories?.length,
      slidesToScroll: 1,
      initialSlide: 0,
      nextArrow: <CustomArrow />,
      prevArrow: <CustomArrow />,
      responsive: [
        {
            breakpoint: 1300,
            settings: {
              slidesToShow: categories?.length < 8 ? categories?.length : 8,
            }
        }, 
        {
            breakpoint: 1100,
            settings: {
              slidesToShow: categories?.length < 6 ? categories?.length : 6,
            }
        }, 
        {
          breakpoint: 992,
          settings: {
            slidesToShow: categories?.length < 4 ? categories?.length : 4,
          }
        }, 
        {
          breakpoint: 600,
          settings: {
            slidesToShow: categories?.length < 3 ? categories?.length : 3,
          }
        }, 
        {
          breakpoint: 450,
          settings: {
            slidesToShow: categories?.length < 3 ? categories?.length : 2,
          }
        }, 
      ]
    };

      // ]
    return (
        <Container>
            <style type="text/css">
                {
                `.tmp15-featured-categories {
                    margin: 35px 0px;
                 }
                 .tmp15-featured-categories .slick-prev {
                    left: 2px !important;
                    z-index: 99 !important;
                 }
                 .tmp15-featured-categories .slick-next {
                    right: 8px;
                }
                 .tmp15-featured-categories p {
                    display: -webkit-box;
                    -webkit-line-clamp: 1;
                    -webkit-box-orient: vertical;  
                    overflow: hidden
                }
                 .tmp15-featured-categories p:hover {
                    color: ${getStarting?.primaryColor} !important;
                    transform: scale(1.1);
                    transition: 1s;
                }
                `
                }
            </style>
            <div className="tmp15-featured-categories">
              { categories?.length === 0 ?
                  <>
                    {Array.from(Array(1)).map((_, i) => (
                        <div key={i} style={{width: '100%', height: '118px', padding: '5px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center'}} onClick={handleCategory}>
                          <Placeholder animation="glow"><Placeholder xs={8} style={{width: '75vw'}}/></Placeholder>
                        </div>
                    ))}
                  </>
                :
                <Slider {...settings}>
                    {   
                        categories?.map((data, i) => <div key={i} >
                            <div style={{padding: '5px', margin: '5px', backgroundColor: '#fff'}} onClick={handleCategory}>
                                <div style={{width: '80px', height: '80px', display: 'flex', alignItems: 'center',  margin: '0 auto'}}>
                                  <img src={data?.logo_url ? process.env.REACT_APP_CDN_URL + data?.logo_url + '?w=300&h=300&q=72' : categoriesImage} style={{width: '100%'}} alt="" />
                                </div>
                                <Link to='/products' onClick={handleClearWithoutCategories}>
                                    <p style={{fontSize: '12px', textAlign: 'center', cursor: 'pointer', color: '#a1a1a1', margin: '10px 0px 4px'}}>{data?.name}</p>
                                </Link>
                            </div>
                        </div>)
                    }
                </Slider>
              }
            </div>
        </Container>
    );
};

export default FeaturedCategories;