import React, { useEffect, useState } from 'react';
import './ProductsSummery.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import ImageLoader from '../../../GlobalShared/pages/Shared/ImageLoader/ImageLoader';
import Rating from 'react-rating';
import { useNavigate } from 'react-router-dom';


const ProductsSummery = (props) => {
    const {thumbnail, name, sell_price, discount, _id, rating, slug} = props.product;
    const {handleAddToCart, handleMinusToCart, cart, getStarting} = useAuth();
    const [quantity, setQuantity] = useState(0);

    const navigate = useNavigate();
    const handleProduct = () => {
        navigate(`/product/${slug}`)
    }

    // const image = `{${process.env.IMAGE_URL/thumbnail}}`
    const image =  `${process.env.REACT_APP_CDN_URL + thumbnail +'?w=300&h=300&q=100'}`;  

   useEffect(() => {
        // console.log({cart})
        const isExists = cart.find(cart => cart._id === _id);
        setQuantity(isExists ? isExists.quantity : 0);
   }, [cart, _id])


    return (
        <>  
            <style type="text/css">
            {
                `
                    .tmp12-product-btn-1:hover, .tmp12-product-btn-3:hover{
                        color: #fff !important;
                        background-color: ${getStarting?.primaryColor}99 !important;
                    }
                    .tmp12-product-btn-2:hover{
                        color: #fff;
                        background-color: ${getStarting?.primaryColor} !important;
                    }
                    .tmp12-product-btn:hover .tmp12-product-btn-3{
                        color: #fff !important;
                        background-color: ${getStarting?.primaryColor}99 !important;
                    }
                `
            }
            </style>
            <div className="tmp12-all-products-summery">
                <div>
                    <div className="tmp12-all-products-offer">
                        {
                            discount > 0 &&
                            <span style={{backgroundColor: `${getStarting?.primaryColor}`}}>{discount}%</span>
                        }
                    </div>
                    <div className="tmp12-product-image" onClick={handleProduct}>
                        <ImageLoader
                            url={image}
                            thumb='https://i.ibb.co/VxJvZC0/blank.jpg'
                        />
                        {/* <img src={image} alt="" /> */}
                    </div>
                    <div style={{padding: '20px'}}>
                        <div onClick={handleProduct}>
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
                        </div>
                        
                        <div className="d-flex align-items-center tmp12-product-btn">
                            {/* <button onClick={() => handleMinusToCart(props.product)} className="tmp12-product-btn-1" style={{display: quantity < 1 ? 'none' : "", backgroundColor: "#009f7f", color: "#fff"}}><FontAwesomeIcon icon={faMinus}/></button>
                            <button onClick={() => handleAddToCart(props.product)} className="tmp12-product-btn-2" style={{width: quantity > 0 ? '60%' : '80%', backgroundColor: quantity > 0 ? '#009f7f' : "", color: quantity > 0 ? '#fff' : "", margin: quantity > 0 ? '0px -1px 0px -1px' : ""}}>{quantity < 1 ? "Add" : quantity}</button>
                            <button onClick={() => handleAddToCart(props.product)} className="tmp12-product-btn-3" style={{backgroundColor: quantity > 0 ? '#009f7f' : "", color: quantity > 0 ? '#fff' : ""}}><FontAwesomeIcon icon={faPlus}/></button> */}
                            <button onClick={() => handleMinusToCart(props.product)} className="tmp12-product-btn-1" style={{display: quantity < 1 ? 'none' : "", backgroundColor: `${getStarting?.primaryColor}`, color: "#fff"}}><FontAwesomeIcon icon={faMinus}/></button>
                            <button onClick={() => handleAddToCart(props.product)} className="tmp12-product-btn-2" style={{width: quantity > 0 ? '60%' : '80%', backgroundColor: quantity > 0 ? `${getStarting?.primaryColor}` : "", color: quantity > 0 ? '#fff' : "", margin: quantity > 0 ? '0px -1px 0px -1px' : ""}}>{quantity < 1 ? "Add" : quantity}</button>
                            <button onClick={() => handleAddToCart(props.product)} className="tmp12-product-btn-3" style={{backgroundColor: quantity > 0 ? `${getStarting?.primaryColor}` : "", color: quantity > 0 ? '#fff' : ""}}><FontAwesomeIcon icon={faPlus}/></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductsSummery;
