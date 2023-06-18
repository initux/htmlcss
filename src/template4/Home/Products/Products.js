import React from 'react';
import { Button, Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Products.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight } from '@fortawesome/free-solid-svg-icons';
import ProductsSummery from './ProductsSummery';
import useAuth from '../../../GlobalShared/hooks/useAuth';


const Products = () => {
    const {products, getStarting, handleClearAllProductsPage} = useAuth();
    return (
        <div className="tmp4-products">
            <Container>
                <div className="d-flex flex-wrap align-items-center justify-content-between pb-4">
                    <h2 className="mt-1">Total Recent <span style={{color: `${getStarting?.primaryColor}`}}>{products.length}</span> Products</h2>
                    <Link to="/products" onClick={handleClearAllProductsPage}>
                        <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}>VIEW ALL <FontAwesomeIcon icon={faLongArrowAltRight}/></Button>
                    </Link>
                </div>
               { 
                    products.length === 0 ?
                        <div style={{ color: `${getStarting?.primaryColor}`, margin: '100px 0', textAlign: 'center'}}>
                            <Spinner animation="border" />
                        </div>
                    :
                    <div className="tmp4-products-container">
                        {   
                            products.map( product => <ProductsSummery product={product} key={product._id}></ProductsSummery>)
                        }
                    </div>
                }
            </Container>
        </div>
    );
};

export default Products;