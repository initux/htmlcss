import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './AllBrandsList.css';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';

const AllBrandsList = () => {
    const { brands, handleAllBrands, handleBrands, getStarting, handleClearWithoutBrands } = useAuth();

    useEffect(() => {
        handleAllBrands();
    }, [])
    
    return (
        <>  
            <style type="text/css">
                {
                    `
                    .tmp15-brands-list-inner:hover span{
                        transform : translate(5px) ;
                        transition: 1s;
                    }
                    `
                }
            </style>
            <div style={{margin: '30px 0px'}}>
            <Container>
                    <Link to="/products" onClick={handleClearWithoutBrands}>
                        <div className="tmp15-brands-list">
                            {
                                brands?.slice(0).reverse().map(brand => <div key={brand.name} className="tmp15-brands-list-inner" onClick={() => handleBrands(brand._id)}>
                                    <div className="d-flex align-items-center mx-auto" style={{height: '60px', width: '60px'}}>
                                        <img src={brand?.logo_url ? process.env.REACT_APP_CDN_URL + brand?.logo_url + '?w=60&h=60&q=72' : categoriesImage} style={{width: '100%'}} alt="" />
                                    </div>
                                    <h6 className="d-flex align-items-center" onClick={() => handleBrands(brand._id)}>{brand.name}</h6>
                                    <span className="d-flex align-items-center justify-content-center" style={{fontSize: '20px', color: `${getStarting?.primaryColor}`}}>></span>
                                </div>)
                            }
                        </div>
                    </Link>
            </Container>
            </div>
        </>
    );
};

export default AllBrandsList;