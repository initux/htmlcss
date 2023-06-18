import React from 'react';
import './Offer.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ProductsTimeCounter from '../../../GlobalShared/pages/Shared/ProductsTimeCounter/ProductsTimeCounter';
import OfferSummery from './OfferSummery';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const Offer = () => {
    const {superOffer, getStarting, handleClearWithoutSuperOffer} = useAuth();
    const hoursMinSecs = {days: 5, hours:0, minutes: 0, seconds: 10};

    const navigate = useNavigate()
    const handleSuperOffer = () =>{
        handleClearWithoutSuperOffer();
        navigate('/products');
    }
    return (
        <div>
           {    superOffer.length === 0 ?
                ''
                :
                <Container>
                    <div className="tmp15-offers-container">
                            <div className="tmp15-offers-title" style={{borderBottom: '1px solid #eaeaea', marginBottom: '10px'}}>
                                <div className="d-flex align-items-center">
                                    {/* <img src="https://i.ibb.co/zrjgGsM/super-deal.png" className="w-100" alt="" /> */}
                                    <h3 style={{borderBottom: `2px solid ${getStarting?.primaryColor}`}}>Flash Day</h3>
                                    <ProductsTimeCounter hoursMinSecs={hoursMinSecs}/>
                                </div>
                                {/* <Link to="/products">
                                    <button className="tmp15-offers-btn">More All</button>
                                </Link> */}
                                <button onClick={handleSuperOffer} className="tmp15-offers-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>View More</button>
                            </div>
                            <div className="tmp15-offers">
                                {
                                    superOffer?.slice(0, 6).map( product => <OfferSummery product={product} key={product._id}></OfferSummery>)
                                }
                            </div>
                    </div>
                </Container>
            }
        </div>
    );
};

export default Offer;


// #ff4747