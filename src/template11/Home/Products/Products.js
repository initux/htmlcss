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
    
    const {getStarting, products, handleCategory, selectedCategory, uniqueCategoryLogo, handleAllCategory} = useAuth()

    useEffect(() => {
        handleAllCategory()
    }, [])
    return (
        <div id="product">
             <style type="text/css">
                {
                  `
                   .tmp11-all-product-btn:hover{
                        background: ${getStarting?.primaryColor} !important;
                        color: #fff !important;
                        padding-left: 10px;
                    }
                    .tmp11-products-dropdown-content span:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                    .
                   `
                }
            </style>
            <div className="tmp11-all-products-container">
                <div className="">
                    <div className="tmp11-search-container">
                        <h6><strong>Category</strong></h6>
                        <div style={{position: 'relative'}}>
                            <div style={{maxHeight: '100vh', overflowY: 'auto'}}>
                                {   
                                    uniqueCategoryLogo?.length === 1 ?
                                    <>
                                        {/* {Array.from(Array(10)).map((_, i) => (
                                            <div style={{padding: '10px 0px'}} key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                                        ))} */}
                                    </>
                                    :
                                    uniqueCategoryLogo?.map(unique => <div key={unique.name} style={{display: 'flex', alignItems: 'center'}}>
                                        <div style={{height: '17px', width: '17px', margin: '-12px 10px 0px 0px'}}>
                                            <img src={unique?.logo_url === '' ? categoriesImage : process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=20&h=20&q=72'} style={{height: '100%', width: '100%'}} alt="" />
                                        </div>
                                        <div className="tmp11-products-dropdown-container w-100">
                                            <Link to={`/${unique.name}`}>
                                                <button onClick={handleCategory} className='tmp11-all-product-btn' style={{color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#4b5563'}`}} >{unique.name}</button>  
                                            </Link>
                                            <div className="tmp11-products-dropdown-content" style={{height: unique?.subCategories?.length > 0 ? '650px' : '0px', padding: unique?.subCategories?.length > 0 ? '30px' : '0px'}}>
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
                        </div>
                    </div>
                </div>
                <div>
                    <Banner></Banner>
                    <BannerSmall></BannerSmall>
                    <FeaturedCategories></FeaturedCategories>
                    <Container>
                        <div className="d-flex flex-column justify-content-between">
                            <div>
                                {   products?.length === 0 ?
                                        <h2 style={{ color: `${getStarting?.primaryColor}`, margin: '50px 0', textAlign: 'center'}}>No Any Product Show</h2>
                                    :
                                    <div className="tmp11-all-products-inner">
                                        {/* {
                                            products?.map(product => <ProductsSummery product={product} key={product._id}></ProductsSummery>)
                                        } */}
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