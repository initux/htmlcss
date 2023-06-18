import React from 'react';
import './CategoriesSummery.css';
import ImageLoader from '../../../GlobalShared/pages/Shared/ImageLoader/ImageLoader';

const CategoriesSummery = (props) => {
    const {thumbnail} = props.product;
    
    // const image = `{${process.env.IMAGE_URL/thumbnail}}`
    const image =  `${process.env.REACT_APP_CDN_URL + thumbnail +'?w=300&h=300&q=100'}`;

    
    // const offer = ( sell_price * discount ) / 100;
    // const offerPrice = sell_price - offer;
    return (
        <div className="tmp18-categories-summery-container">
            <div className="tmp18-categories-summery-image">
                <div className="image">
                    {/* <img src={image} className="" alt="" /> */}
                    <ImageLoader
                        url={image}
                        thumb='https://i.ibb.co/VxJvZC0/blank.jpg'
                    />
                </div>
            </div>
        </div>
    );
};

export default CategoriesSummery;