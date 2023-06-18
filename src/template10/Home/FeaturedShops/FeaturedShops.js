import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './FeaturedShops.css';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';
import {useNavigate } from 'react-router-dom';

const FeaturedShops = () => {
    const {  getStarting, vendors, handleAllVendors, handleClearAllProductsPage} = useAuth();
    const navigate = useNavigate();

    const handleVendorsDetails = (id) => {
        navigate(`/products/vendors/${id}`);
    }

    useEffect(() => {
        handleAllVendors()
    }, [])

    return (
        <>  
            {
                vendors?.length === 0 ?
                ''
                :
                <Container>
                    <div className="tmp10-featured-container">
                        <div className="d-flex align-items-center justify-content-between py-1" style={{backgroundColor: `${getStarting?.primaryColor}`, marginTop: '30px'}}>
                            <h2>FEATURED SHOPS</h2>
                            <Link to="/products" onClick={handleClearAllProductsPage}>
                                <button style={{color: `${getStarting?.primaryColor}`}} className="more-btn">More All</button>
                            </Link>
                        </div>
                        <br />
                        <div className='tmp10-featured-list'>
                            {   
                                vendors?.map((data, i) => <div className="tmp10-featured" key={i}>
                                <div className="d-flex align-items-center" style={{height: '60px', width: '60px'}}>
                                    <img src={data?.logo_url ? process.env.REACT_APP_CDN_URL + data?.logo_url + '?w=60&h=60&q=72' : categoriesImage} style={{width: '100%'}} alt="" />
                                </div>
                                <div style={{marginLeft: '20px'}}>
                                    <h6>{data.name}</h6>
                                    {/* <div style={{color: '#c3c3c5', marginBottom: '10px'}}>
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                        <FontAwesomeIcon icon={faStar} />
                                    </div> */}
                                    <button onClick={() => handleVendorsDetails(data._id)} >VISIT SHOP</button>
                                </div>
                            </div>)
                            }       
                        </div>
                    </div>
                </Container>
            }
        </>
    );
};

export default FeaturedShops;