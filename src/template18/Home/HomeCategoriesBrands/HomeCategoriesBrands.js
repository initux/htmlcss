import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './HomeCategoriesBrands.css';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';

const HomeCategoriesBrands = () => {
    const { categories, handleAllCategory, handleCategory, brands, handleAllBrands, handleBrands, getStarting } = useAuth();

    useEffect(() => {
        handleAllCategory();
        handleAllBrands();
    }, [])

    return (
        <>  
            <style type="text/css">
                {
                    `
                    .tmp15-home-categories-brands-inner:hover span{
                        transform : translate(10px) ;
                        transition: 1s;
                    }
                    `
                }
            </style>
            <div>
                <Container>
                        <div className="tmp15-home-categories-brands-container">
                            <div style={{margin: '30px 0px 0px'}}>
                                <div className="d-flex align-item-center justify-content-between" style={{borderBottom: '1px solid #eaeaea', marginBottom: '20px'}}>
                                    <h3 style={{borderBottom: `2px solid ${getStarting?.primaryColor}`}}>Top 10 Categories</h3>
                                    <Link to="/products/categories">
                                        <button style={{backgroundColor: `${getStarting?.primaryColor}`}}>View All Categories</button>
                                    </Link>
                                </div>
                                <Link to="/products">
                                    <div className="tmp15-home-categories-brands">
                                        {
                                            categories?.slice(-10).reverse().map(category => <div key={category.name} className="tmp15-home-categories-brands-inner" onClick={handleCategory}>
                                                <div className="d-flex align-items-center" style={{height: '60px', width: '60px'}}>
                                                    <img src={category?.logo_url ? process.env.REACT_APP_CDN_URL + category?.logo_url + '?w=60&h=60&q=72' : categoriesImage} style={{width: '100%'}} alt="" />
                                                </div>
                                                <h6 className="d-flex align-items-center">{category.name}</h6>
                                                <span className="d-flex align-items-center" style={{fontSize: '20px', color: `${getStarting?.primaryColor}`}}>></span>
                                            </div>)
                                        }
                                    </div>
                                </Link>
                            </div>
                            <div style={{margin: '30px 0px 0px'}}>
                                <div className="d-flex align-item-center justify-content-between" style={{borderBottom: '1px solid #eaeaea', marginBottom: '20px'}}>
                                    <h3 style={{borderBottom: `2px solid ${getStarting?.primaryColor}`}}>Top 10 Brands</h3>
                                    <Link to="/products/brands">
                                        <button style={{backgroundColor: `${getStarting?.primaryColor}`}}>View All Brands</button>
                                    </Link>
                                </div>
                                <Link to="/products">
                                    <div className="tmp15-home-categories-brands">
                                        {
                                            brands?.slice(-10).reverse().map(brand => <div key={brand.name} className="tmp15-home-categories-brands-inner" onClick={handleBrands}>
                                                <div className="d-flex align-items-center" style={{height: '60px', width: '60px'}}>
                                                    <img src={brand?.logo_url ? process.env.REACT_APP_CDN_URL + brand?.logo_url + '?w=60&h=60&q=72' : categoriesImage} style={{width: '100%'}} alt="" />
                                                </div>
                                                <h6 className="d-flex align-items-center">{brand.name}</h6>
                                                <span className="d-flex align-items-center" style={{fontSize: '20px', color: `${getStarting?.primaryColor}`}}>></span>
                                            </div>)
                                        }
                                    </div>
                                </Link>
                            </div>
                        </div>
                </Container>
            </div>
        </>
    );
};

export default HomeCategoriesBrands;