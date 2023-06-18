import React, { useEffect, useState } from 'react';
import './JustForYou.css';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import JustForYouSummery from './JustForYouSummery';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const JustForYou = () => {
    const {superOffer, getStarting, handleClearWithoutSuperOffer} = useAuth();

    return (
        <div>
           {    superOffer.length === 0 ?
                ''
                :
                <Container>
                    <div className="tmp15-foryou-container" style={{marginTop: '40px'}}>
                            <div style={{borderBottom: '1px solid #eaeaea', marginBottom: '10px', paddingTop: '15px'}}>
                                <h3 >Just For You</h3>
                            </div>
                            <div className="tmp15-foryou">
                                {
                                    superOffer?.slice(-6).reverse().map( product => <JustForYouSummery product={product} key={product._id}></JustForYouSummery>)
                                }
                            </div>
                           <div className="text-center mt-2">
                                <Link to="/products" onClick={handleClearWithoutSuperOffer}>
                                    <button className="tmp15-foryou-btn" style={{width: '60%', backgroundColor: `${getStarting?.primaryColor}`}}>View More</button>
                                </Link>
                           </div>
                    </div>
                </Container>
            }
        </div>
    );
};

export default JustForYou;


