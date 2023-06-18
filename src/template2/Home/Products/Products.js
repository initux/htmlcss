import React, { useEffect } from 'react';
import './Products.css';
import { Container, Placeholder, Spinner } from 'react-bootstrap';
import Cart from '../Cart/Cart';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
  import { faBars } from '@fortawesome/free-solid-svg-icons';
import ProductsSummery from './ProductsSummery';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';

const Products = () => {
    
    const {getStarting, displayProducts, uniqueCategory, handleCategory, selectedCategory, uniqueCategoryLogo, handleAllCategory} = useAuth()

    useEffect(() => {
        handleAllCategory()
    }, [])
    
    return (
        <div id="product">
            <style type="text/css">
                {
                  `
                   .tmp2-all-product-btn:hover{
                        background: ${getStarting?.primaryColor} !important;
                        color: #fff !important;
                        padding-left: 10px;
                    }
                    .tmp2-products-dropdown-content span:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                    .
                   `
                }
            </style>
            <Container className="tmp2-all-products-container">
                <div className="">
                    <div className="tmp2-search-container">
                        <h6><strong>Category</strong></h6>
                        <div style={{position: 'relative'}}>
                            <div style={{maxHeight: '100vh', overflowY: 'auto'}}>
                                {   
                                    uniqueCategoryLogo?.length === 1 ?
                                    <>
                                        {Array.from(Array(10)).map((_, i) => (
                                            <div style={{padding: '10px 0px'}} key={i}><Placeholder animation="glow"><Placeholder xs={8} /></Placeholder></div>
                                        ))}
                                    </>
                                    :
                                    uniqueCategoryLogo?.map(unique => <div key={unique.name} style={{display: 'flex', alignItems: 'center'}}>
                                        <div style={{height: '17px', width: '17px', margin: '-12px 10px 0px 0px'}}>
                                            <img src={unique?.logo_url === '' ? categoriesImage : process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=20&h=20&q=72'} style={{height: '100%', width: '100%'}} alt="" />
                                        </div>
                                        <div className="tmp2-products-dropdown-container w-100">
                                            <button onClick={handleCategory} className='tmp2-all-product-btn' style={{color: `${selectedCategory === unique.name ? getStarting?.primaryColor : '#4b5563'}`}} >{unique.name}</button>  
                                            <div className="tmp2-products-dropdown-content" style={{height: unique?.subCategories?.length > 0 ? '650px' : '0px', padding: unique?.subCategories?.length > 0 ? '30px' : '0px'}}>
                                                {   unique?.subCategories?.map( subCat =>  <div key={subCat._id} style={{paddingBottom: '20px'}}>
                                                        <span onClick={handleCategory} style={{fontSize: '15px', color: `${selectedCategory === subCat.name ? getStarting?.primaryColor :'#000'}`}}>{subCat.name}</span>   
                                                    <hr style={{height: '0.1px', margin: '10px 0px 10px'}}/>
                                                    {
                                                        subCat?.childs?.map( subCatChild =>  <div key={subCatChild._id}>
                                                            <span onClick={handleCategory} style={{fontSize: '13px', color: `${selectedCategory === subCatChild.name ? getStarting?.primaryColor :'#4b5563'}`}}>{subCatChild.name}</span>
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
                    <div className="d-flex flex-column justify-content-between h-100">
                        <div>
                            {   displayProducts?.length === 0 ?
                                    <h2 style={{ color: `${getStarting?.primaryColor}`, margin: '50px 0', textAlign: 'center'}}>No Any Product Show</h2>
                                :
                                <div className="tmp2-all-products-inner">
                                    {
                                        displayProducts?.map(product => <ProductsSummery product={product} key={product._id}></ProductsSummery>)
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </Container>
            <Cart/>
        </div>
    );
};

export default Products;