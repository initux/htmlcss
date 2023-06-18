import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './AllBrands.css';
import { Link } from 'react-router-dom';
import categoriesImage from './../../../images/categories.jpg';
import useAuth from './../../../hooks/useAuth';

const AllBrands = () => {
    const { brands, handleAllBrands, handleBrands, getStarting, handleClearWithoutBrands } = useAuth();

    useEffect(() => {
        handleAllBrands();
    }, [])
    return (
        <Container>
                <style type="text/css">
                    {
                        `
                            .tmp14-all-brands-list span:hover{
                                color: ${getStarting?.primaryColor}
                            }
                        `
                    }
                </style>
                <div className="tmp14-all-brands-container" onClick={handleClearWithoutBrands}>
                    <div className="d-flex align-items-center justify-content-between" style={{borderBottom: '1px solid #dee2e6'}}>
                        <h4 style={{color: `${getStarting?.primaryColor}`}}>FEATURED BRANDS</h4>
                        <Link to="/products">
                            <button style={{backgroundColor: `${getStarting?.primaryColor}`}}>More All</button>
                        </Link>
                    </div>
                    <Link to={`/products`}>
                        <div className='tmp14-all-brands-list'>
                        {/* <div className="tmp14-all-brands-list"> */}
                            {   
                                brands?.length === 0 ?
                                <div style={{ color: `${getStarting?.primaryColor}`, margin: '37px auto'}}>
                                    <Spinner animation="border" />
                                </div>
                                :
                                brands?.slice(0, 8).map(unique => <div onClick={() => handleBrands(unique._id)} className="tmp14-categories" key={unique.name}>
                                    <div style={{height: '60px', width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                        <img src={unique?.logo_url ? process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=60&h=60&q=72' : categoriesImage} style={{width: '100%'}} alt="" />
                                    </div>
                                    <span className="mt-2">{unique.name}</span>
                                </div>)
                            }       
                        </div>
                    </Link>
                </div>
        </Container>
    );
};

export default AllBrands;