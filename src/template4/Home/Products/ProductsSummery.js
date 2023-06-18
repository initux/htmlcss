import React from 'react';
import './ProductsSummery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ImageLoader from '../../../GlobalShared/pages/Shared/ImageLoader/ImageLoader';
import blankImage from '../../../GlobalShared/images/blunk-image.png';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import Rating from 'react-rating';

const ProductsSummery = (props) => {
    const {thumbnail, name, sell_price, rating, slug, discount} = props.product;
    const {handleAddToCart, getStarting} = useAuth()

    const navigate = useNavigate();
    const handleProductDetails = () => {
        navigate(`/product/${slug}`)
    }

    const offer = ( sell_price * discount ) / 100;
    const offerPrice = parseInt(sell_price + offer);

    // const image = `{${process.env.IMAGE_URL/thumbnail}}`
    const image =  `${process.env.REACT_APP_CDN_URL + thumbnail +'?w=300&h=300&q=100'}`; 

    return (
        <>  
            <style type="text/css">
                {
                    `.tmp4-products-inner .product-btn:hover{
                        background-color: ${getStarting?.primaryColor};
                        color: #fff;
                        transition: 1s;
                    }
                    `
                }
            </style>
            <div className="tmp4-products-inner" onClick={handleProductDetails}>
                <div>
                    {   discount > 0 ?
                        <div className="sale-badge" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
                            <span>{discount}%</span>
                        </div>
                        :
                        ''
                    }
                    {/* <div className="heart">
                        <span><FontAwesomeIcon icon={faHeart} onClick={() => handleAddToCart(props.product)}/></span>
                    </div> */}
                </div>
                <div className="image">
                    <ImageLoader
                        url={image}
                        thumb={blankImage}
                    />
                </div>
                <div className="tmp4-products-hover-box">
                    <div className="add-cart">
                        <Button onClick={() => handleAddToCart(props.product)} className="product-btn">Add To Cart</Button>
                    </div>
                    <div>
                        <Button className="eye" style={{backgroundColor: `${getStarting?.primaryColor}`}} variant="outline-light" onClick={handleProductDetails}>
                            <FontAwesomeIcon icon={faEye}/>
                        </Button>
                    </div>
                </div>
                <div className="tmp4-products-summery-content">
                    <h4 onClick={handleProductDetails}>{name}</h4>
                    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                        {   discount > 0 ? 
                            <>
                                <p style={{marginBottom: '0px', fontWeight: 'bold', color: `${getStarting?.primaryColor}`}}>{getStarting?.currency} {sell_price}</p>
                                &nbsp;&nbsp;&nbsp;
                                <p style={{marginBottom: '0px', fontWeight: '300', color: '#928f8f', textDecoration: 'line-through'}}>{getStarting?.currency} {offerPrice}</p>
                            </>
                            :
                            <p style={{marginBottom: '0px', fontWeight: 'bold', color: `${getStarting?.primaryColor}`}}>{getStarting?.currency} {sell_price}</p>
                        }
                    </div>
                    <div className="d-flex align-items-center justify-content-center">
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
        </>
    );
};

export default ProductsSummery;