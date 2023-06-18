import React, {useEffect} from 'react';
import './BannerFooter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Spinner } from 'react-bootstrap';

const bannerFooters = [
    { 'img': 'https://andshop-react.netlify.app/static/media/post2.674c2953.png'},
    { 'img': 'https://andshop-react.netlify.app/static/media/post3.9bf54f31.png'},
    { 'img': 'https://andshop-react.netlify.app/static/media/post4.362f4503.png'},
    { 'img': 'https://andshop-react.netlify.app/static/media/post5.2d86a40d.png'},
    { 'img': 'https://andshop-react.netlify.app/static/media/post6.cde17268.png'}
]

const BannerFooter = () => {
    const {additionalOffers, getStarting, handleAdminProfile} = useAuth();

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div>
            <div className="tem8-banner-footer-title text-center py-5">
                <h2>Follow Us Instagram</h2>
                <p>Follow Us and get updated from our instagram</p>
            </div>
            <div className="tem8-banner-footer-content">
                {   
                    additionalOffers.length === 0 ?
                    <div style={{ color: `${getStarting?.primaryColor}`, margin: '100px 0', textAlign: 'center'}}>
                        <Spinner animation="border" />
                    </div>
                    :
                    additionalOffers?.slice(8, 10).map((img, i) => <div key={i} className="tem8-banner-footer-image">
                        <div className="image">
                            <img src={process.env.REACT_APP_CDN_URL + img.image +'?w=1000&h=1000&q=100'} className="w-100" alt=""/>
                        </div>

                        <div className="hover-box">
                            <ul>
                                <li><button><FontAwesomeIcon icon={faInstagram} /></button></li>
                            </ul>
                        </div>
                    </div>) 
                }
            </div>
        </div>
    );
};

export default BannerFooter;