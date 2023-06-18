import React, {useEffect} from 'react';
import { Container, Nav, Spinner } from 'react-bootstrap';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Banner.css';
import blankSliderImage from '../../../GlobalShared/images/blank-slider.jpg';

const Banner = () => {
    const {additionalOffers, getStarting, handleAdminProfile} = useAuth();

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div className="tem8-banner-container">
           <Container className="h-100">
               <div className="tem8-banner h-100">
                    <div className="d-flex align-items-center h-100">
                        <div>
                            <h1><span style={{fontWeight: '100'}}>Live For</span> <br /> <span style={{fontWeight: '700', color: 'white'}}>Fashion</span></h1>
                            <h3>Save Up To 50%</h3>
                            <Nav.Link href={additionalOffers[2]?.link} target="_blank" style={{padding: '0px'}}>
                                <button className="tem8-banner-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>SHOP NOW</button>
                            </Nav.Link>
                        </div>
                    </div>
                    {  
                        additionalOffers?.length === 0 ?
                        <div className="d-flex align-items-center h-100">
                            <img src={blankSliderImage} className="w-100" alt="" />
                        </div>
                        :
                        <div className="d-flex align-items-center h-100">
                            <img src={process.env.REACT_APP_CDN_URL + additionalOffers[0]?.image +'?w=1000&h=1000&q=100'} className="w-100" alt="" />
                        </div>
                    }
                </div>
           </Container>
        </div>
    );
};

export default Banner;