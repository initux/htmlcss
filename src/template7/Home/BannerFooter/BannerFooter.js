import React from 'react';
import './BannerFooter.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram } from '@fortawesome/free-brands-svg-icons';

const bannerFooters = [
    { 'img': 'https://beshop-demo.vercel.app/assets/img/insta-photo1.jpg'},
    { 'img': 'https://beshop-demo.vercel.app/assets/img/insta-photo2.jpg'},
    { 'img': 'https://beshop-demo.vercel.app/assets/img/insta-photo3.jpg'},
    { 'img': 'https://beshop-demo.vercel.app/assets/img/insta-photo4.jpg'},
    { 'img': 'https://beshop-demo.vercel.app/assets/img/insta-photo5.jpg'},
    { 'img': 'https://beshop-demo.vercel.app/assets/img/insta-photo6.jpg'},
]

const BannerFooter = () => {
    return (
        <div className="tem7-banner-footer-container">
            {
                bannerFooters?.map((image, i) => <div key={i} className="tem7-banner-footer-image">
                    <div className="image">
                        <img src={image.img} className="w-100" alt=""/>
                    </div>

                    <div className="hover-box">
                        <ul>
                            <li><button><FontAwesomeIcon icon={faInstagram} /></button></li>
                        </ul>
                    </div>
                </div>) 
            }
        </div>
    );
};

export default BannerFooter;