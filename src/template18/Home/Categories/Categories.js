import React, { useEffect, useState } from 'react';
import './Categories.css';
import { Container } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import CategoriesSummery from './CategoriesSummery';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const Categories = () => {
    const { homeCategories, handleClearWithoutCategories, setCategoriesCheckbox } = useAuth();
    const [newCtProducts, setNewCtProducts] = useState([]);

    useEffect( () => {
        const newCategories = homeCategories?.filter(homeCategory => homeCategory.products.length > 3 );
        setNewCtProducts(newCategories);
    }, [ homeCategories])
    
    const navigate = useNavigate();
    const handleProductAllProducts = (ctName) => {
        setCategoriesCheckbox(ctName)
        handleClearWithoutCategories();
        navigate(`/products/${ctName}`);
    }


    return (
        <>
            {   newCtProducts?.length === 0 ?
                ''
                :
                <div>
                    <h3 className="tmp18-categories-title">
                        <div style={{height: '1px', width: '123px', borderTop: '1px solid hsla(0,0%,59.2%,.3)'}}></div>
                        <div style={{margin: '0px 18px', fontWeight: '700'}}>Featured Categories</div>
                        <div style={{height: '1px', width: '123px', borderTop: '1px solid hsla(0,0%,59.2%,.3)'}}></div>
                    </h3>
                    <Container>
                        <div className="tmp18-categories-container">
                            {
                                newCtProducts?.map(category => <div key={category.category_id} className="tmp18-categories-inner" onClick={() => handleProductAllProducts(category.name)}>
                                    <div>
                                        <h3 style={{ marginBottom: '0px'}}>{category.name}</h3>
                                    </div>
                                    <div className="tmp18-categories-products">
                                        {
                                            category?.products?.slice(0, 3).map( product => <CategoriesSummery product={product} key={product._id}></CategoriesSummery>)
                                        }
                                    </div>
                                </div>)
                            }
                        </div>
                    </Container>
                </div>
                
            }
        </>
    );
};

export default Categories;

