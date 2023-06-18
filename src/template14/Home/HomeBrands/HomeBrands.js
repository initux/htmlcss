import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import useAuth from '../../../GlobalShared/hooks/useAuth';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';
import './HomeBrands.css';
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

const HomeBrands = () => {
  const {getStarting, brands, handleAllBrands, handleBrands, handleClearWithoutBrands} = useAuth();

  useEffect(() => {
    handleAllBrands();
  }, [])

  var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: brands?.length > 6 ? 6 : brands?.length,
      slidesToScroll: 1,
      initialSlide: 0,
      nextArrow: <CustomArrow />,
      prevArrow: <CustomArrow />,
      responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: brands?.length < 4 ? brands?.length : 4,
          }
        }, 
        {
          breakpoint: 600,
          settings: {
            slidesToShow: brands?.length < 2 ? brands?.length : 2,
          }
        }, 
      ]
    };

      // ]
    return (
        <Container>
          <style type="text/css">
                {
                  `
                    .tmp14-homebrands-container .slick-prev {
                        left: 2px !important;
                        z-index: 99 !important;
                    }
                    .tmp14-homebrands-container .slick-next {
                        right: 8px;
                    }
                    .tmp14-homebrands-container p:hover {
                        color: ${getStarting?.primaryColor} !important;
                        transform: scale(1.1);
                        transition: 1s;
                    }
                  `
                }
            </style>
            { 
              brands?.length === 0 ?
              ''
              :
              <div className="tmp14-homebrands-container" onClick={handleClearWithoutBrands}>
                  <div className="d-flex align-items-center justify-content-between py-1" style={{ margin: '30px 10px 8px', borderBottom: '1px solid #eaeaea'}}>
                      <h2>FEATURED BRANDS</h2>
                      <Link to="/products/brands">
                          <button style={{backgroundColor: `${getStarting?.primaryColor}`}} className="more-btn">More All</button>
                      </Link>
                  </div>
                  <Slider {...settings}>
                      {
                          brands?.map((data, i) => <div key={i} >
                              <div style={{padding: '40px'}} onClick={() => handleBrands(data._id)}>
                                  <div style={{width: '80px', height: '80px', display: 'flex', alignItems: 'center',  margin: '0 auto'}}>
                                    <img src={data?.logo_url ? process.env.REACT_APP_CDN_URL + data?.logo_url + '?w=300&h=300&q=72' : categoriesImage} style={{width: '100%',  }} alt="" />
                                  </div>
                                <Link to='/products'>
                                  <p style={{textAlign: 'center', cursor: 'pointer', color: `${getStarting?.primaryColor}`}}>{data?.name}</p>
                                </Link>
                              </div>
                          </div>)
                      }
                  </Slider>
              </div>
            }
        </Container>
    );
};

export default HomeBrands;