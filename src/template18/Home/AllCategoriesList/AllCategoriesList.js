import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './AllCategoriesList.css';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';

const AllCategoriesList = () => {
    const { categories, handleAllCategory, handleCategory, getStarting } = useAuth();

    useEffect(() => {
        handleAllCategory();
    }, [])
    return (
        <>
            <style type="text/css">
                {
                    `
                    .tmp15-categories-list-inner:hover span{
                        transform : translate(5px) ;
                        transition: 1s;
                    }
                    `
                }
            </style>
            <div style={{margin: '30px 0px'}}>
                <Container>
                        <Link to="/products">
                            <div className="tmp15-categories-list">
                                {
                                    categories?.slice(0).reverse().map(category => <div key={category.name} className="tmp15-categories-list-inner" onClick={handleCategory}>
                                        <div className="d-flex align-items-center mx-auto" style={{height: '60px', width: '60px'}}>
                                            <img src={category?.logo_url ? process.env.REACT_APP_CDN_URL + category?.logo_url + '?w=60&h=60&q=72' : categoriesImage} style={{width: '100%'}} alt="" />
                                        </div>
                                        <h6 className="d-flex align-items-center">{category.name}</h6>
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

export default AllCategoriesList;