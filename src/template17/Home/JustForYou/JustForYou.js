import React, { useEffect, useState } from 'react';
import './JustForYou.css';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import JustForYouSummery from './JustForYouSummery';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const JustForYou = () => {
    const {products, setDisplayProducts, getStarting} = useAuth();
    const [superOffer, setSuperOffer] = useState([])
    const hoursMinSecs = {days: 5, hours:0, minutes: 0, seconds: 10};

    useEffect( () => {
        const offerList = products?.filter(product => product.superOffer === true);
        setSuperOffer(offerList)
    }, [products])

    const navigate = useNavigate()
    const handleSuperOffer = () =>{
        setDisplayProducts(superOffer)
        // navigate('/products/super-offer');
        navigate('/products');
    }
    return (
        <div>
           {    superOffer.length === 0 ?
                ''
                :
                <Container>
                    <div className="tmp14-foryou-container" style={{marginTop: '40px'}}>
                            <div style={{borderBottom: '1px solid #eaeaea', marginBottom: '10px', paddingTop: '15px'}}>
                                <h3 >Just For You</h3>
                            </div>
                            <div className="tmp14-foryou">
                                {
                                    superOffer?.slice(0, 6).map( product => <JustForYouSummery product={product} key={product._id}></JustForYouSummery>)
                                }
                            </div>
                           <div className="text-center mt-2">
                                <Link to="/products">
                                    <button className="tmp14-foryou-btn" style={{width: '60%', backgroundColor: `${getStarting?.primaryColor}`}}>View More</button>
                                </Link>
                           </div>
                    </div>
                </Container>
            }
        </div>
    );
};

export default JustForYou;


