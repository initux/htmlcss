import React, {useEffect} from 'react';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Banner.css';
import blankImage from '../../../GlobalShared/images/blank-slider.png';

const Banner = () => {
    const {additionalOffers} = useAuth();


    const sliderImage = `${additionalOffers[0]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[0]?.image +'?w=500&h=500&q=100' : blankImage}`;

    const loginBGStyle = {
        backgroundImage: `url(${sliderImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
    }

    return (
        <div className="tmp13-banner-container" style={loginBGStyle}>
           {!additionalOffers[0]?.image && <h1 style={{position: 'absolute', transform: 'translate(-50%, -50%)', left: '50%', top: '50%'}}>Banner 1, 820 x 486</h1>}
        </div>
    );
};

export default Banner;