import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './FeaturedCategories.css';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';

const FeaturedCategories = () => {
    const { categories, handleAllCategory, handleCategory, getStarting } = useAuth();

    useEffect(() => {
        handleAllCategory();
    }, [])
    return (
        <Container>
                <div className="tmp12-featured-categories-container mb-3">
                    {/* <div className="d-flex align-items-center justify-content-between">
                        <h4 style={{color: `${getStarting?.primaryColor}`}}>FEATURED</h4>
                        <Link to="/products">
                            <button style={{backgroundColor: `${getStarting?.primaryColor}`}}>More All</button>
                        </Link>
                    </div> */}
                    <div className='tmp12-featured-categories-list'>
                    {/* <div className="tmp12-featured-categories-list"> */}
                        {   
                            categories?.length === 0 ?
                            <div style={{ color: `${getStarting?.primaryColor}`, margin: '37px auto'}}>
                                <Spinner animation="border" />
                            </div>
                            :
                            categories?.map(unique => <div onClick={handleCategory} className="tmp12-categories" key={unique.name}>
                                <div style={{height: '60px', width: '60px'}}>
                                    <img src={unique?.logo_url ? process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=60&h=60&q=72' : categoriesImage} style={{height: '100%', width: '100%'}} alt="" />
                                </div>
                                <span onClick={handleCategory} className="mt-2">{unique.name}</span>
                            </div>)
                        }       
                    </div>
                </div>
        </Container>
    );
};

export default FeaturedCategories;