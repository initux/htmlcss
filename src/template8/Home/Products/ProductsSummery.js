import React from 'react';
import './ProductsSummery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import ImageLoader from '../../../GlobalShared/pages/Shared/ImageLoader/ImageLoader';
import Rating from 'react-rating';

const ProductsSummery = (props) => {
    const {thumbnail, name, sell_price, rating, slug, discount} = props.product;
    const {handleAddToCart, getStarting} = useAuth()

    const navigate = useNavigate();
    const handleProductDetails = () => {
        navigate(`/product/${slug}`)
    }

    // const image = `{${process.env.IMAGE_URL/thumbnail}}`
    const image =  `${process.env.REACT_APP_CDN_URL + thumbnail +'?w=300&h=300&q=100'}`; 

    const offer = ( sell_price * discount ) / 100;
    const offerPrice = parseInt(sell_price + offer);
    return (
        <>  
            <style type="text/css">
            {
                `.tmp8-products-inner .product-btn:hover{
                    background-color: ${getStarting?.primaryColor};
                    color: #fff;
                    transition: 1s;
                }
                `
            }
            </style>
            <div className="tmp8-products-inner" onClick={handleProductDetails}>
                <div>
                    {
                        discount > 0 ?
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
                        thumb='https://i.ibb.co/VxJvZC0/blank.jpg'
                    />
                </div>
                <div className="tmp8-products-hover-box">
                    <div className="add-cart">
                        <Button onClick={() => handleAddToCart(props.product)} className="product-btn">Add To Cart</Button>
                    </div>
                    <div>
                        <Button className="eye" variant="outline-light" onClick={handleProductDetails} style={{backgroundColor: `${getStarting?.primaryColor}`}}>
                            <FontAwesomeIcon icon={faEye}/>
                        </Button>
                    </div>
                </div>
                <div className="tmp8-products-summery-content">
                    <h4>{name}</h4>&nbsp;
                    <p style={{margin: '5px 0px 0px', fontSize: '20px'}}>{getStarting?.currency}{sell_price}</p>
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