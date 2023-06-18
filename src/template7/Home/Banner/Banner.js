import React, {useEffect} from 'react';
import { Container, Nav } from 'react-bootstrap';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Banner.css';
import blankSliderImage from '../../../GlobalShared/images/blank-slider.jpg';
import { Link } from 'react-router-dom';

const Banner = () => {
    const {additionalOffers} = useAuth();
    // const bannerBGStyle = {
    //     backgroundImage: `url(${additionalOffers[0]?.image === undefined ? blankSliderImage : process.env.REACT_APP_CDN_URL + additionalOffers[0]?.image + '?w=500&h=500&q=72'})`,
    //     backgroundSize: 'cover',
    //     backgroundRepeat: 'no-repeat',
    //     backgroundPosition: 'center center',
    // }

    return (
        <Container className="my-3">
            <Link to={`${additionalOffers[0]?.link}`}>
                <div className="tem7-banner">
                   <img src={additionalOffers[0]?.image === undefined ? blankSliderImage : process.env.REACT_APP_CDN_URL + additionalOffers[0]?.image + '?w=500&h=500&q=72'} className="w-100"  alt="" />
                   {!additionalOffers[0]?.image && <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 1 <br/> 800 x 624</h2>}
                </div>
            </Link>

           {/* <div className="tem7-dot-image">
               <img src="https://i.ibb.co/t83vsb6/main-bg-dot.png;" className="w-50" alt="" />
           </div> */}
        </Container>
    );
};

export default Banner;