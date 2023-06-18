import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import './Cart.css';
import CartDetails from '../CartDetails/CartDetails';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const Cart = () => {
  const {cart, getStarting} = useAuth();
  const [cartShow, setCartShow] = useState(false);

  const handleCartClose = () => setCartShow(false);
  const handleCartShow = () => setCartShow(true);


  let cartLength = 0;
  let cartPrice = 0;
  if(!cart){

  }
  else{
   for(const product of cart){
       if(!product.quantity){
           product.quantity = 1;
       }
       cartLength = cartLength + product.quantity ;
       cartPrice =  cartPrice + product.sell_price * product.quantity;
   }
  }
    return (
        <div className="tmp11-cart-container" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
            <div className="w-100 h-100" onClick={handleCartShow}>
               {
                   cartPrice === 0 ? 
                   <div className="d-flex align-items-center justify-content-center h-100 text-center">
                       <div>
                            <FontAwesomeIcon icon={faCartPlus} /> 0 <br/> Items
                       </div>
                   </div>
                   :
                   <>
                        <div>
                            <FontAwesomeIcon icon={faCartPlus} /> <span>{cart?.length} Items</span>
                        </div>
                        <div className="tmp11-cart-price">
                            <span style={{color: `${getStarting?.primaryColor}`}}>{getStarting?.currency}{cartPrice}</span>
                        </div>
                    </>
               }
            </div>
            { cart.length > 0 && <CartDetails cart={cart} cartShow={cartShow} handleCartClose={handleCartClose} placement='end' />}
        </div>
    );
};

export default Cart;