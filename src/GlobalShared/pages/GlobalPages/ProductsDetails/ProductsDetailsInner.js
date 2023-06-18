import React from 'react';
import './ProductsDetailsInner.css';
import useAuth from '../../../hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import ImageLoader from '../../Shared/ImageLoader/ImageLoader';
import Rating from 'react-rating';

const ProductsDetailsInner = (props) => {
    const {thumbnail, name, slug, product_code, sell_price, discount, rating} = props.product;
    const { getStarting } = useAuth();
    
    const navigate = useNavigate();
    const handleProductDetails = () => {
        navigate(`/product/${slug}`);
        // localStorage.setItem('productId', JSON.stringify(_id))
    }

    // const image = `{${process.env.IMAGE_URL/thumbnail}}`
    const image =  `${process.env.REACT_APP_CDN_URL + thumbnail +'?w=300&h=300&q=100'}`;  

    
    const offer = ( sell_price * discount ) / 100;
    const offerPrice = parseInt(sell_price + offer);
    return (
        <div className="tmp-ProductsDetailsInner-summery-container" onClick={handleProductDetails}>
            <div className="tmp-ProductsDetailsInner-summery-image">
                <div className="image">
                    {/* <img src={image} className="" alt="" /> */}
                    <ImageLoader
                        url={image}
                        thumb='https://i.ibb.co/VxJvZC0/blank.jpg'
                    />
                </div>
            </div>
            {
                discount > 0 ?
                <h6 className="hot" style={{backgroundColor: `${getStarting?.primaryColor}`}}><span>{discount}%</span></h6>
                :
                ''
            }
            <div className="p-2">
                <Link to={`/product/${slug}`}>
                    <h4>{name}</h4>
                </Link>
                <div className="d-flex align-items-center">
                    <Rating
                        readonly
                        placeholderRating={rating?.score || 0}
                        emptySymbol={<span style={{color: '#dadada', fontSize: '20px'}}>★</span>}
                        placeholderSymbol={<span style={{color: '#faca51', fontSize: '20px'}}>★</span>}
                        fullSymbol={<span style={{color: '#faca51', fontSize: '20px'}}>★</span>}
                    />
                    <p style={{marginTop: '0px', fontSize: '15px', fontWeight: '400', color: '#9e9e9e'}}>&nbsp;({ rating?.total || 0 })</p>
                </div>
                <div className="d-flex align-items-center">
                    <p style={{color: `${getStarting?.primaryColor}`}}>{getStarting?.currency} {sell_price}</p> &nbsp;&nbsp;
                    {   discount > 0 ?
                        <p style={{textDecoration: 'line-through', fontWeight: '400'}}>{getStarting?.currency} {offerPrice}</p>
                        :
                        ''
                    }
                </div>
            </div>
        </div>
    );
};

export default ProductsDetailsInner;