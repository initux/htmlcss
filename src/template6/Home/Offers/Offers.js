import React, { useEffect, useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import './Offers.css';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import OffersSummery from './OffersSummery';
import ProductsTimeCounter from '../../../GlobalShared/pages/Shared/ProductsTimeCounter/ProductsTimeCounter';

//-------------------------------------------------------------------------------------------
                              // Custom Array
//-------------------------------------------------------------------------------------------

const CustomArrow = (props) => {
  const { className, style, onClick } = props;
  const {getStarting} = useAuth()

  return (
    <div
        className={className}
        style={{ 
            backgroundColor: `${getStarting?.primaryColor}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
           }}
        onClick={onClick}
      />
  );
}

//-------------------------------------------------------------------------------------------
                              // Offer
//-------------------------------------------------------------------------------------------

const Offers = () => {
  const {products, getStarting} = useAuth();
  const [superOffer, setSuperOffer] = useState([]);
  const hoursMinSecs = {days: 5, hours:0, minutes: 0, seconds: 10};

  useEffect( () => {
    const offerList = products?.filter(product => product.superOffer === true);
    setSuperOffer(offerList)
}, [products])

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        nextArrow: <CustomArrow />,
        prevArrow: <CustomArrow />,
        responsive: [
            {
              breakpoint: 1400,
              settings: {
                slidesToShow: 4
              }
            },
            {
              breakpoint: 1200,
              settings: {
                slidesToShow: 3
              }
            },
            {
              breakpoint: 992,
              settings: {
                slidesToShow: 2
              }
            }
          ]
      };

    return (
        <>  
            { 
              superOffer.length === 0 ?
              ''
              :
              <div className="tmp6-offers">
                <Container>
                    {/* <div>
                        <Link to="/products">
                            <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}><FontAwesomeIcon icon={faEye} />  View All</Button>
                        </Link>
                    </div> */}
                    <div className="d-flex align-items-center bg-white p-2 rounded">
                        {/* <img src="https://i.ibb.co/zrjgGsM/super-deal.png" className="w-25" alt="" /> */}
                        <h2 className="mb-0 me-2" style={{color: `${getStarting?.primaryColor}`}}>Super Offer</h2>
                        <ProductsTimeCounter hoursMinSecs={hoursMinSecs}/>
                    </div>
                    <div className="tmp6-offers-container pb-4">
                        <Slider {...settings}>
                            {
                                superOffer?.map(product => <OffersSummery product={product} key={product._id}></OffersSummery>)
                            }
                        </Slider>
                    </div>
                </Container>
              </div>
            }
        </>
    );
};

export default Offers;