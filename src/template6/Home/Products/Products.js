import React from 'react';
import { Button, Container } from 'react-bootstrap';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import ProductsSummery from './ProductsSummery';


const Products = () => {
  const {products, getStarting, handleClearAllProductsPage} = useAuth();
    return (
        <>
             {
                 products?.length === 0 ?
                //  <div style={{ color: `${getStarting?.primaryColor}`, margin: '100px auto', textAlign: 'center'}}>
                //      <Spinner animation="border" />
                //  </div>
                ''
                 :
                <div className="tmp6-products pb-4">
                    <Container>
                        <div className="d-flex align-items-center justify-content-between p-2 mb-2 bg-white rounded">
                            <h2 className="mb-0 me-2" style={{color: `${getStarting?.primaryColor}`}}>All Products</h2>
                            <Link to="/products" onClick={handleClearAllProductsPage}>
                                <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}><FontAwesomeIcon icon={faEye} />  View All</Button>
                            </Link>
                        </div>
                        <div className="tmp6-products-container">
                            {  
                                products?.slice(0).reverse().map(product => <ProductsSummery product={product} key={product._id}></ProductsSummery>)
                            }
                        </div>
                    </Container>
                </div>
             }
        </>
    );
};

export default Products;