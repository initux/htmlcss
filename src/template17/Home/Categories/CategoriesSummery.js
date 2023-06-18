import React from 'react';
import './CategoriesSummery.css';
import { useNavigate } from 'react-router-dom';
import ImageLoader from '../../../GlobalShared/pages/Shared/ImageLoader/ImageLoader';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import Rating from 'react-rating';

const CategoriesSummery = (props) => {
    const {getStarting} = useAuth();
    const {thumbnail, name, slug, rating, sell_price, discount, _id} = props.product;
    
    const navigate = useNavigate();
    const handleProductDetails = () => {
        navigate(`/product/${slug}`);
        // localStorage.setItem('productId', JSON.stringify(_id))
    }

    // const image = `{${process.env.IMAGE_URL/thumbnail}}`
    const image =  `${process.env.REACT_APP_CDN_URL + thumbnail +'?w=300&h=300&q=100'}`;

    
    const offer = ( sell_price * discount ) / 100;
    const offerPrice = parseInt(sell_price - offer);
    return (
        <div className="tmp17-categories-summery-container"  onClick={handleProductDetails}>
            <div className="tmp17-categories-summery-image">
                <div className="image">
                    {/* <img src={image} className="" alt="" /> */}
                    <ImageLoader
                        url={image}
                        thumb='https://i.ibb.co/VxJvZC0/blank.jpg'
                    />
                </div>
            </div>
           <div className="p-2">
                <h4>{name}</h4>
                <p style={{color: `${getStarting?.primaryColor}`}}>{getStarting?.currency}{offerPrice}</p>
                <div style={{height: '24px'}}>
                    {
                        discount > 0 &&
                        <div className="d-flex align-items-center">
                            <h6 style={{textDecoration: 'line-through', color: '#9e9e9e'}}>{getStarting?.currency}{sell_price}</h6> &nbsp;
                            <h6><span>-{discount}%</span></h6>
                        </div>
                    }
                </div>
                <div className="d-flex align-items-center">
                    <Rating
                        readonly
                        placeholderRating={rating?.score || 0}
                        emptySymbol={<span style={{color: '#dadada', fontSize: '20px'}}>★</span>}
                        placeholderSymbol={<span style={{color: '#faca51', fontSize: '20px'}}>★</span>}
                        fullSymbol={<span style={{color: '#faca51', fontSize: '20px'}}>★</span>}
                    />
                    <p style={{marginBottom: '0px', fontSize: '15px', fontWeight: '400', color: '#9e9e9e'}}>&nbsp;({ rating?.total || 0 })</p>
                </div>
           </div>
        </div>
    );
};

export default CategoriesSummery;