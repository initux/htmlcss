import React from 'react';
import { Container, Placeholder, Spinner } from 'react-bootstrap';
import './FeaturedCategories.css';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';
import { useEffect } from 'react';

const FeaturedCategories = () => {
    const { categories, handleAllCategory, handleCategory, getStarting } = useAuth();

    useEffect(() => {
        handleAllCategory();
    }, [])
    return (
        <Container>
                <div className="tmp11-featured-categories-container mb-3">
                    {
                        categories?.length === 0 ?
                        // <div style={{ color: `${getStarting?.primaryColor}`, margin: '37px auto'}}>
                        //     <Spinner animation="border" />
                        // </div>
                        <div>
                            {Array.from(Array(3)).map((_, i) => (
                                <Placeholder animation="glow" key={i}><Placeholder xs={8} style={{width: '100%', margin: '20px 0px'}}/></Placeholder>
                            ))}
                        </div>
                        :
                        <div className='tmp11-featured-categories-list'>
                            {   
                                categories?.slice(0).reverse().map(unique => <div key={unique.name}>
                                    <Link to={`${unique.name}`}>
                                        <div onClick={handleCategory} className="tmp11-categories">
                                            <div style={{height: '60px', width: '60px'}}>
                                                <img src={unique?.logo_url ? process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=60&h=60&q=72' : categoriesImage} style={{height: '100%', width: '100%'}} alt="" />
                                            </div>
                                            <span onClick={handleCategory} className="mt-2">{unique.name}</span>
                                        </div>
                                    </Link>
                                </div>)
                            }       
                        </div>
                    }
                </div>
        </Container>
    );
};

export default FeaturedCategories;