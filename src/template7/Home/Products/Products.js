import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Products.css'
import ProductsSummery from './ProductsSummery';

const Products = () => {
    const { getStarting, uniqueCategory, handleAllCategory, handleCategory, selectedCategory, displayProducts,
            handleClearWithoutCategories, handleClearAllProductsPage} = useAuth();
    
    useEffect(() => {
        handleAllCategory()
    }, [])
    return (
        <div className="tmp7-products-container">
            <Container>
                <div className="tmp7-products-title text-center" onClick={handleClearWithoutCategories}>
                    {/* <span>Cosmetics</span> */}
                    {/* <h2>Trending products</h2> */}
                    {/* <p>Nourish your skin with toxin-free cosmetic <br /> products. With the offers that you can’t refuse.</p> */}
                    {   uniqueCategory?.length === 1 ?
                        <>
                            {Array.from(Array(15)).map((_, i) => (
                                <div style={{display: 'inline-table'}} key={i}>
                                    <div style={{padding: '2px 20px', backgroundColor: '#bcbcbc', margin: '10px 0px 10px 20px', width: '100px', height: '30px'}} key={i}></div>
                                </div>
                            ))}
                        </>
                        :
                        uniqueCategory.map(unique => <button onClick={handleCategory} className="tmp7-all-product-btn" style={{color: `${selectedCategory === unique ? '#fff' : '#666666'}`, backgroundColor: `${selectedCategory === unique ? getStarting?.primaryColor : '#fff'}`}} key={unique}>{unique}</button>)
                    }

                    {/* <h4 className="text-center pt-3">Total <span style={{color: '#d05278'}}>{displayProducts?.length}</span> Products Found</h4> */}
                </div>
                
                {
                     displayProducts.length === 0 ?
                     <div style={{ color: `${getStarting?.primaryColor}`, margin: '50px auto', textAlign: 'center'}}>
                         {/* <Spinner animation="border" /> */}
                         <h4>No Show Any Product</h4>
                     </div>
                     :
                    <div className="tmp7-products-inner">
                        {
                            displayProducts?.slice(0, 10).map( product => <ProductsSummery product={product} key={product._id}></ProductsSummery>)
                        }
                    </div>
                }
                <div className="text-center my-4">
                    <Link to="/products" onClick={handleClearAllProductsPage}>
                        <button style={{ background: `${getStarting?.primaryColor}`, color: '#fff', border: 'none', padding: '10px 50px', borderRadius: '22px' }}>All Products</button>
                    </Link>
                </div>
            </Container>
        </div>
    );
};

export default Products;