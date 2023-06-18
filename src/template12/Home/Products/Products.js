import React, { useEffect } from 'react';
import './Products.css';
import { Container, Placeholder, Spinner } from 'react-bootstrap';
import Cart from '../Cart/Cart';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faBars } from '@fortawesome/free-solid-svg-icons';
import ProductsSummery from './ProductsSummery';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';
import Banner from '../Banner/Banner';
import BannerSmall from '../BannerSmall/BannerSmall';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import { Link } from 'react-router-dom';

const Products = () => {
    
    const {getStarting, products, uniqueCategory, handleCategory, selectedCategory, uniqueCategoryLogo, handleAllCategory} = useAuth()

    useEffect(() => {
        handleAllCategory()
    }, [])
    return (
        <div>
            <style type="text/css">
                {
                  `
                    .tmp12-all-products-btn:hover, .tmp12-products-dropdown-content span:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                    .
                   `
                }
            </style>
            <div className="tmp12-all-products-container">
                <div className="tmp12-search-container">
                    <h6><strong>Category</strong></h6>
                    <div style={{position: 'relative'}}>
                        <div style={{maxHeight: '100vh', overflowY: 'auto'}}>
                            {   
                                uniqueCategoryLogo?.length === 1 ?
                                <>
                                    {Array.from(Array(15)).map((_, i) => (
                                        <div style={{padding: '10px 0px'}} key={i}><Placeholder animation="glow"><Placeholder xs={10} /></Placeholder></div>
                                    ))}
                                </>
                                :
                                <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', flexWrap: 'wrap', marginBottom: '40px'}}>
                                    {
                                        uniqueCategoryLogo?.map(unique => <div key={unique.name}>
                                            <div className="tmp12-products-dropdown-container w-100">
                                                <Link to={`/${unique.name}`}>
                                                    <div onClick={handleCategory} style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '120px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', borderRadius: '5px', margin: '8px', padding: '10px 10px 0px', cursor: 'pointer'}}>
                                                        <div style={{height: '60px', width: '60px', padding: '10px', border: `1px solid ${selectedCategory === unique.name ? '#4b5563' : getStarting?.primaryColor}`, borderRadius: '5px'}}>
                                                            <img src={unique?.logo_url === '' ? categoriesImage : process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=40&h=40&q=72'} style={{height: '100%', width: '100%'}} alt="" />
                                                        </div>
                                                        <button className='tmp12-all-products-btn' style={{color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#4b5563'}`}} >{unique.name}</button>
                                                    </div>
                                                </Link>
                                                <div className="tmp12-products-dropdown-content" style={{height: unique?.subCategories?.length > 0 ? '650px' : '0px', padding: unique?.subCategories?.length > 0 ? '30px' : '0px'}}>
                                                    {   unique?.subCategories?.map( subCat =>  <div key={subCat._id} style={{paddingBottom: '20px'}}>
                                                        <Link to={`/${subCat.name}`}>
                                                            <span onClick={handleCategory} style={{fontSize: '15px', color: `${selectedCategory === subCat.name ? getStarting?.primaryColor :'#000'}`}}>{subCat.name}</span>   
                                                        </Link>
                                                        <hr style={{height: '0.1px', margin: '10px 0px 10px'}}/>
                                                        {
                                                            subCat?.childs?.map( subCatChild =>  <div key={subCatChild._id}>
                                                                <Link to={`/${subCatChild.name}`}>
                                                                    <span onClick={handleCategory} style={{fontSize: '13px', color: `${selectedCategory === subCatChild.name ? getStarting?.primaryColor :'#4b5563'}`}}>{subCatChild.name}</span>
                                                                </Link>
                                                            </div>)
                                                        }
                                                        </div>)
                                                    }
                                                </div>
                                            </div>
                                        </div>)
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <Banner></Banner>
                    {/* <BannerSmall></BannerSmall>
                    <FeaturedCategories></FeaturedCategories> */}
                    <Container>
                        <div className="d-flex flex-column justify-content-between">
                            <div>
                                {   products?.length === 0 ?
                                        <h2 style={{ color: `${getStarting?.primaryColor}`, margin: '50px 0', textAlign: 'center'}}>No Show Any Product</h2>
                                    :
                                    <div className="tmp12-all-products-inner">
                                        {
                                            products?.map(product => <ProductsSummery product={product} key={product._id}></ProductsSummery>)
                                        }
                                    </div>
                                }
                            </div>
                        </div>
                    </Container>
                </div>
            </div>
            <Cart/>
        </div>
    );
};

export default Products;