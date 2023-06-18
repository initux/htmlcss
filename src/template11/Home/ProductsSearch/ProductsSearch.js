import React, { useEffect } from 'react';
import './ProductsSearch.css';
import { Placeholder } from 'react-bootstrap';
import Cart from '../Cart/Cart';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import ProductsSearchSummery from './ProductsSearchSummery';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';

const ProductsSearch = () => {
    const {getStarting, displayProducts,  handleCategory, selectedCategory, setSelectedCategory, uniqueCategoryLogo, handleAllCategory} = useAuth()
    const {categoriesResult} = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(searchText === ''){
    //         navigate(`/${selectedCategory}`);
    //     };
    // }, [searchText, selectedCategory])

    useEffect(() => {
        handleAllCategory();
    }, [])

    useEffect(() => {
        if(!categoriesResult) return;
        setSelectedCategory(categoriesResult)
    }, [categoriesResult])
    return (
        <div id="product">
            <style type="text/css">
                {
                  `
                   .tmp11-all-search-products-btn:hover{
                        background: ${getStarting?.primaryColor} !important;
                        color: #fff !important;
                        padding-left: 10px;
                    }
                    .tmp11-search-products-dropdown-content span:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                    .
                   `
                }
            </style>
            <div className="tmp11-all-search-products-container">
                <div className="">
                    <div className="tmp11-search-products-container">
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
                                        <div className="tmp11-search-products-dropdown-container w-100">
                                            <Link to={`/${unique.name}`}>
                                                <button onClick={handleCategory} className='tmp11-all-search-products-btn' style={{color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#4b5563'}`}} >{unique.name}</button>  
                                            </Link>
                                            <div className="tmp11-search-products-dropdown-content" style={{height: unique?.subCategories?.length > 0 ? '650px' : '0px', padding: unique?.subCategories?.length > 0 ? '30px' : '0px'}}>
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
                    <div className="d-flex flex-column justify-content-between">
                        <div>
                            {   displayProducts?.length === 0 ?
                                    <h2 style={{ color: `${getStarting?.primaryColor}`, margin: '50px 0', textAlign: 'center'}}>No Any Product Show</h2>
                                :
                                <div className="tmp11-all-search-products-inner">
                                    {
                                        displayProducts?.map(product => <ProductsSearchSummery product={product} key={product._id}></ProductsSearchSummery>)
                                    }
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <Cart/>
        </div>
    );
};

export default ProductsSearch;