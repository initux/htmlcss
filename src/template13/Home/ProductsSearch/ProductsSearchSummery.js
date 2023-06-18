import React, { useEffect, useState } from 'react';
import './ProductsSearchSummery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import ImageLoader from '../../../GlobalShared/pages/Shared/ImageLoader/ImageLoader';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Rating from 'react-rating';


const ProductsSearchSummery = (props) => {
    const {thumbnail, name, sell_price, discount, slug, rating} = props.product;
    const {handleAddToCart, getStarting} = useAuth();

    const navigate = useNavigate();
    const handleProductDetails = () => {
        navigate(`/product/${slug}`);
    }

    // const image = `{${process.env.IMAGE_URL/thumbnail}}`
    const image =  `${process.env.REACT_APP_CDN_URL + thumbnail +'?w=300&h=300&q=100'}`;  

    return (
        <>  
            <style type="text/css">
            {
                `.tmp13-search-products-add-cart-btn:hover {
                    background-color: ${getStarting?.primaryColor} !important;
                    color: #fff !important;
                }
                `
            }
            </style>
            <div className="tmp13-all-search-products-summery">
                <div>
                    <div className="tmp13-all-search-products-offer">
                        {   discount > 0 &&
                            <span style={{backgroundColor: `${getStarting?.primaryColor}`}}>{discount}%</span>
                        }
                    </div>
                    <div className="tmp13-search-products-image">
                        <ImageLoader
                            url={image}
                            thumb='https://i.ibb.co/VxJvZC0/blank.jpg'
                        />
                        {/* <img src={image} alt="" /> */}
                    </div>
                    <div style={{padding: '20px'}}>
                        <h4>{name}</h4>
                        <p style={{color: 'rgba(107,114,128)', marginBottom: '0px'}}>{getStarting?.currency}{sell_price}</p>

                        <div className="d-flex align-items-center mb-2">
                            <Rating
                                readonly
                                placeholderRating={rating?.score || 0}
                                emptySymbol={<span style={{color: '#dadada', fontSize: '20px'}}>★</span>}
                                placeholderSymbol={<span style={{color: '#faca51', fontSize: '20px'}}>★</span>}
                                fullSymbol={<span style={{color: '#faca51', fontSize: '20px'}}>★</span>}
                            />
                            <p style={{marginBottom: '0px', fontSize: '15px', fontWeight: '400', color: '#9e9e9e'}}>&nbsp;({ rating?.total || 0 })</p>
                        </div>

                        <div className="d-flex align-items-center mt-2">
                            <Button onClick={() => handleAddToCart(props.product)} className="tmp13-search-products-add-cart-btn" style={{color: `${getStarting?.primaryColor}`, border: `1px solid ${getStarting?.primaryColor}`}}>Add To Cart</Button>
                            <span className="tmp13-search-products-eye" onClick={handleProductDetails} style={{color: `${getStarting?.primaryColor}`, border: `1px solid ${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faEye}/></span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsSearchSummery;
