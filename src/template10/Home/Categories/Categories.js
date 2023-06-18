import React, { useEffect, useState } from 'react';
import './Categories.css';
import { Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CategoriesSummery from './CategoriesSummery';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const Categories = () => {
    const { homeCategories, handleCategory, getStarting, handleClearWithoutCategories } = useAuth();
    const [newCtProducts, setNewCtProducts] = useState([]);

    useEffect( () => {
        const newCategories = homeCategories?.filter(homeCategory => homeCategory.products.length > 6 );
        setNewCtProducts(newCategories);
    }, [ homeCategories])
    
    
    return (
        <div>
            {
                newCtProducts?.length === 0 ?
                <div style={{ color: `${getStarting?.primaryColor}`, margin: '50px 0', textAlign: 'center'}}>
                    <Spinner animation="border" />
                </div>
                :
                <Container>
                    {
                        newCtProducts?.map(category => <div key={category.category_id} className="tmp10-categories-container">
                            <div className="d-flex align-items-center justify-content-between py-1" style={{backgroundColor: `${getStarting?.primaryColor}`, marginTop: '30px'}}>
                                <h2>{category.name}</h2>
                                <Link to="/products" onClick={handleClearWithoutCategories}>
                                    <button className="tmp10-categories-products-btn" style={{color: `${getStarting?.primaryColor}`}}>
                                        <span>More All <div onClick={handleCategory} className="tmp10-categories-products-btn-inner">{category.name}</div></span> 
                                    </button>
                                </Link>
                            </div>
                            <br />
                            <div className="tmp10-categories-products">
                                {
                                    category?.products?.slice(0, 6).map( product => <CategoriesSummery product={product} key={product._id}></CategoriesSummery>)
                                }
                            </div>
                    </div>)
                    }
                </Container>
            }
        </div>
    );
};

export default Categories;

