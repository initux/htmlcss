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
        const newCategories = homeCategories?.filter(homeCategory => homeCategory.products.length > 5 );
        setNewCtProducts(newCategories);
    }, [ homeCategories])
    

    return (
        <div>
            <Container>
                {
                    newCtProducts?.length === 0 ?
                    <div style={{ padding: '154px 0px', textAlign: 'center', color: `${getStarting?.primaryColor}`, backgroundColor: '#fff', boxShadow: '0 0px 4px 0 rgb(0 0 0 / 8%', borderRadius: '8px'}}>
                        <Spinner animation="border" />
                    </div>
                    :
                    <div>
                        {
                            newCtProducts?.map(category => <div key={category.category_id} className="tmp17-categories-container">
                                <div className="d-flex align-item-center justify-content-between">
                                    <h3 style={{marginTop: '15px', marginBottom: '0px'}}>{category.name}</h3>
                                    <Link to="/products" onClick={handleClearWithoutCategories}>
                                        <button className="tmp17-categories-products-btn" style={{border: `1px solid ${getStarting?.primaryColor}`, color: `${getStarting?.primaryColor}`}}>
                                            <span>Shop More <div onClick={handleCategory} className="tmp17-categories-products-btn-inner">{category.name}</div></span> 
                                        </button>
                                    </Link>
                                </div>
                                <div className="tmp17-categories-products">
                                    {
                                        category?.products?.slice(0, 6).map( product => <CategoriesSummery product={product} key={product._id}></CategoriesSummery>)
                                    }
                                </div>
                        </div>)
                        }
                    </div>
                }
            </Container>
        </div>
    );
};

export default Categories;

