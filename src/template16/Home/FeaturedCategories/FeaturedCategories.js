import React, { useEffect } from 'react';
import { Container, Placeholder, Spinner } from 'react-bootstrap';
import './FeaturedCategories.css';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';

const FeaturedCategories = () => {
    const { categories, handleAllCategory, handleCategory, getStarting, handleClearAllProductsPage, handleClearWithoutCategories } = useAuth();

    useEffect(() => {
        handleAllCategory();
    }, [])
    return (
        <Container>
                <div className="tmp16--featured-categories-container">
                    <div className="d-flex align-items-center justify-content-between">
                        <h4 style={{color: `${getStarting?.primaryColor}`, marginTop: '10px'}}>FEATURED</h4>
                        <Link to="/products" onClick={handleClearAllProductsPage}>
                            <button style={{backgroundColor: `${getStarting?.primaryColor}`}}>View More</button>
                        </Link>
                    </div>
                    {
                         categories?.length === 0 ?
                         <div>
                             {Array.from(Array(3)).map((_, i) => (
                                 <Placeholder animation="glow" key={i}><Placeholder xs={8} style={{width: '100%', margin: '20px 0px'}}/></Placeholder>
                             ))}
                         </div>
                         :
                        <Link to={`/products/`} onClick={handleClearWithoutCategories}>
                            <div className='tmp16--featured-categories-list'>
                            {/* <div className="tmp16--featured-categories-list"> */}
                                {   
                                    categories?.map(unique => <div onClick={handleCategory} className="tmp16--categories" key={unique.name}>
                                        <div style={{height: '60px', width: '60px'}}>
                                            <img src={unique?.logo_url ? process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=60&h=60&q=72' : categoriesImage} style={{height: '100%', width: '100%'}} alt="" />
                                        </div>
                                        <span className="mt-2">{unique.name}</span>
                                    </div>)
                                }       
                            </div>
                        </Link>
                    }
                </div>
        </Container>
    );
};

export default FeaturedCategories;