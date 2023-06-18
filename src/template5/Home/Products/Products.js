import React from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faEye } from '@fortawesome/free-solid-svg-icons';
import './Products.css';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import ProductsSummery from './ProductsSummery';


const Products = () => {
  const {products, getStarting, handleClearAllProductsPage} = useAuth();
    return (
        <div className="py-4">
            <Container>
                <div className="tmp5-product-container">
                    {   products.length === 0 ?
                        <div style={{ color: `${getStarting?.primaryColor}`, margin: '100px 0', textAlign: 'center'}}>
                            <Spinner animation="border" />
                        </div>
                        :
                        products?.slice(0, 10).map(product => <ProductsSummery product={product} key={product._id}></ProductsSummery>)
                    }
                </div>
                <div className="text-center mt-4">
                    <Link to="/products" onClick={handleClearAllProductsPage}>
                        <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none', width: '50%'}}><FontAwesomeIcon icon={faEye} />  View All</Button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default Products;