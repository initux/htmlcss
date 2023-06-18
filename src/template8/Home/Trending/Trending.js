import React, {useEffect} from 'react';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Trending.css';
import blankSlider from '../../../GlobalShared/images/blank-small-slider.png'
import { Link } from 'react-router-dom';

const Trending = () => {
    const {additionalOffers, getStarting} = useAuth();

    const bannerBGStyle = {
        backgroundImage: `url(${additionalOffers[7]?.image === undefined ? blankSlider : process.env.REACT_APP_CDN_URL + additionalOffers[7]?.image + '?w=1000&h=1000&q=100'})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
    }
    return (
        <div className="tmp8-trending-container" style={bannerBGStyle}>
            <div className="text-center">
                <h4 style={{color: `${getStarting?.primaryColor}`}}>TRENDING</h4>
                <h2>{additionalOffers[7]?.title || 'Banner 7'}</h2>
                {/* <p>Consectetur adipisicing elit. Dolores nisi distinctio <br/> magni, iure deserunt doloribus optio</p> */}
                <Link to={`${additionalOffers[7]?.link}`}>
                    <button className="tmp8-trending-btn">SHOP NOW</button>
                </Link>
            </div>
        </div>
    );
};

export default Trending;