import React from 'react';
import './ProductsSummery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faEye, faHeart } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import ImageLoader from '../../../GlobalShared/pages/Shared/ImageLoader/ImageLoader';
import Rating from 'react-rating';


const ProductsSummery = (props) => {
    const {thumbnail, name, sell_price, rating, slug, discount} = props.product;
    const {handleAddToCart, getStarting} = useAuth();

    const navigate = useNavigate();
    const handleProduct = () => {
        navigate(`/product/${slug}`)
    }

    // const image = `{${process.env.IMAGE_URL/thumbnail}}`
    const image =  `${process.env.REACT_APP_CDN_URL + thumbnail +'?w=300&h=300&q=100'}`; 

    const offer = ( sell_price * discount ) / 100;
    const offerPrice = parseInt(sell_price + offer);
    return (
            <div className="tmp5-trending-summery" onClick={handleProduct}>
                <div className="image">
                    <ImageLoader
                        url={image}
                        thumb='https://i.ibb.co/VxJvZC0/blank.jpg'
                    />
                </div>
                <div style={{padding: '20px 20px 10px'}}>
                    {
                        discount > 0 ? 
                        <h6 className="hot" style={{backgroundColor: `${getStarting?.primaryColor}`}}><span>{discount}%</span></h6>
                        :
                        ''
                    }
                    <h4>{name}</h4>
                    <p style={{marginBottom: '0px'}}>{getStarting?.currency} {sell_price}</p>
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
                <div className="hover-box">
                    <ul>
                        <li style={{backgroundColor: `${getStarting?.primaryColor}`}}><button onClick={handleProduct}><FontAwesomeIcon icon={faEye} /></button></li>
                        <li style={{backgroundColor: `${getStarting?.primaryColor}`}}><button onClick={() => handleAddToCart(props.product)}><FontAwesomeIcon icon={faHeart} /></button></li>
                    </ul>
                </div>
            </div>
    );
};

export default ProductsSummery;