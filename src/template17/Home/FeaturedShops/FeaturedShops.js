import React, { useEffect } from 'react';
import { Container, Spinner } from 'react-bootstrap';
import './FeaturedShops.css';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';
import {useNavigate } from 'react-router-dom';

const featureData = [
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/6YsI7lZR8urvdnvLvaCBJBCVfO4VKbSkfUw3TVrX.jpg',
        "title": 'RIBANA'
    },
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/aHHLUNouFsLOsnV5RblsgOK58cmXhhw5BRDej8vp.jpg',
        "title": 'Square Toiletries Limited'
    },
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/z6xziPfVG0zavWUL6XDWkzRCuqqfBuUwToNbhSvI.jpg',
        "title": 'ACI Limited'
    },
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/zVt156ZV90CV20VnHM3gPg5coZAbeE8UaPF5Fzm3.jpg',
        "title": 'Nestlé Bangladesh Limited'
    },
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/z77sNNMq0Hr24pLBfb0GKkCzuhd89npH7AIl6Vwb.jpg',
        "title": 'Minister Group'
    },
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/rj2jqLlFqunEuN76nS4goCyVGwFyd8Dx2Tp7ltSZ.jpg',
        "title": 'Unilever Bangladesh'
    },
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/mapyuZQw9hgWjoX9ajtpAQ5qFnmWeuoAsRgrjU9V.jpg',
        "title": 'PRAN'
    },
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/BIODCxoADP54t1tF2XY17bsK8vEnhzJrkhtnYw2H.jpg',
        "title": 'Meghna Group Of Industries'
    },
];


const FeaturedShops = () => {
    const {  getStarting, vendors, handleAllVendors } = useAuth();
    const navigate = useNavigate();

    const handleVendorsDetails = (vendorName) => {
        navigate(`/products/vendors/${vendorName}`);
    }

    useEffect(() => {
        handleAllVendors()
    }, [])
    

    return (
        <Container>
            {
                 vendors?.length < 1 ?
                 ''
                 :
                <div className="tmp14-featured-container">
                    <div className="d-flex align-items-center justify-content-between py-1" style={{ margin: '30px 10px 8px', borderBottom: '1px solid #eaeaea'}}>
                        <h2>FEATURED SHOPS</h2>
                        <Link to="/products/vendors">
                            <button style={{backgroundColor: `${getStarting?.primaryColor}`}} className="more-btn">More All</button>
                        </Link>
                    </div>
                    <div className='tmp14-featured-list'>
                        {   
                            vendors?.map((data, i) => <div className="tmp14-featured" key={i}>
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
                                    <button onClick={() => handleVendorsDetails(data.name)} >VISIT SHOP</button>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            }
        </Container>
    );
};

export default FeaturedShops;