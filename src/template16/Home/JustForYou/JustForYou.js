import React from 'react';
import './JustForYou.css';
import { Container } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import JustForYouSummery from './JustForYouSummery';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const JustForYou = () => {
    const {superOffer, getStarting, handleClearWithoutSuperOffer} = useAuth();

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
                    <div className="tmp16-foryou-container" style={{marginTop: '40px'}}>
                        <div className="d-flex align-items-center justify-content-between" style={{borderBottom: '1px solid #eaeaea', marginBottom: '10px'}}>
                            <h3 style={{marginTop: '15px'}}>Just For You</h3>
                            <Link to="/products">
                                <button onClick={handleSuperOffer} style={{backgroundColor: `${getStarting?.primaryColor}`}} className="tmp16-foryou-btn">View More</button>
                            </Link>
                        </div>
                        <div className="tmp16-foryou">
                            {
                                superOffer?.slice(0, 6).map( product => <JustForYouSummery product={product} key={product._id}></JustForYouSummery>)
                            }
                        </div>
                    </div>
                </Container>
            }
        </div>
    );
};

export default JustForYou;


