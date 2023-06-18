import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './AllVendors.css';
import { Link, useNavigate } from 'react-router-dom';
import categoriesImage from './../../../images/categories.jpg';
import useAuth from './../../../hooks/useAuth';

const AllVendors = () => {
    const { vendors, handleAllVendors, handleCategory, getStarting, handleClearWithoutVendors } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        handleAllVendors()
    }, [])

    const handleVendorsDetails = (id) => {
        navigate(`/products/vendors/${id}`);
    }
    return (
        <Container>
            <style type="text/css">
                {
                    `
                        .tmp14-all-vendors-list span:hover{
                            color: ${getStarting?.primaryColor}
                        }
                    `
                }
            </style>
            <div className="tmp14-all-vendors-container" onClick={handleClearWithoutVendors}>
                <div className="d-flex align-items-center justify-content-between" style={{borderBottom: '1px solid #dee2e6'}}>
                    <h4 style={{color: `${getStarting?.primaryColor}`}}>FEATURED VENDORS</h4>
                    <Link to="/products">
                        <button style={{backgroundColor: `${getStarting?.primaryColor}`}}>More All</button>
                    </Link>
                </div>
                <div className='tmp14-all-vendors-list'>
                {/* <div className="tmp14-all-vendors-list"> */}
                    {   
                        vendors?.length === 0 ?
                        <div style={{ color: `${getStarting?.primaryColor}`, margin: '37px auto'}}>
                            <Spinner animation="border" />
                        </div>
                        :
                        vendors?.slice(0, 8).map(vendor => <div onClick={handleCategory} className="tmp14-categories" key={vendor.name}>
                            <div style={{height: '60px', width: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <img src={vendor?.logo_url ? process.env.REACT_APP_CDN_URL + vendor?.logo_url + '?w=60&h=60&q=72' : categoriesImage} style={{width: '100%'}} alt="" />
                            </div>
                            <span className="mt-2" onClick={() => handleVendorsDetails(vendor._id)}>{vendor.name}</span>
                        </div>)
                    }       
                </div>
            </div>
        </Container>
    );
};

export default AllVendors;