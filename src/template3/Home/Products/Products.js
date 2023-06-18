import React from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons'
import './Products.css';
import ProductsSummery from './ProductsSummery';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const Products = () => {
    const {products, getStarting, handleClearAllProductsPage} = useAuth();
    return (
        <div style={{backgroundColor:'#F2F3F9', padding: '40px 0px'}}>
            <Container>
                <div>
                    <div className="d-flex align-items-center justify-content-between flex-wrap">
                        <h2>Total Recent <span style={{color: `${getStarting?.primaryColor}`}}>{products.length}</span> Products</h2>
                        <Link to="/products" onClick={handleClearAllProductsPage}>
                            <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none', margin: '0px 0px 20px 0px'}}><FontAwesomeIcon icon={faEye} />  View All</Button>
                        </Link>
                    </div>
                   {
                      products?.length === 0 ?
                            <div style={{ color: `${getStarting.primaryColor}`, margin: '50px 0', textAlign: 'center'}}>
                                <Spinner animation="border" />
                            </div>
                        :
                        <div className="tem3-products-container">
                            {
                                products?.slice(0, 10).map(product => <ProductsSummery product={product} key={product._id}></ProductsSummery>)
                            }
                      </div>
                    }
                </div>
            </Container>
        </div>
    );
};

export default Products;