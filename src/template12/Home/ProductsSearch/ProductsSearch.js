import React, { useContext, useEffect } from 'react';
import './ProductsSearch.css';
import { Placeholder } from 'react-bootstrap';
import Cart from '../Cart/Cart';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import ProductsSearchSummery from './ProductsSearchSummery';
import categoriesImage from '../../../GlobalShared/images/categories.jpg';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { SearchContext } from '../../assets/Template12';

const ProductsSearch = () => {
    const {getStarting, displayProducts, uniqueCategory, handleCategory, selectedCategory, setSelectedCategory, uniqueCategoryLogo, handleAllCategory} = useAuth()
    const [searchText, setSearchText] = useContext(SearchContext)
    const {categoriesResult} = useParams();
    const navigate = useNavigate();

    // useEffect(() => {
    //     if(searchText === ''){
    //         navigate(`/${selectedCategory}`);
    //     };
    // }, [searchText, selectedCategory])

    useEffect(() => {
        handleAllCategory()
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
                    .tmp12-all-search-products-btn:hover, .tmp12-search-products-dropdown-content span:hover{
                        color: ${getStarting?.primaryColor} !important;
                    }
                    .
                   `
                }
            </style>
            <div className="tmp12-all-search-products-container">
                    <div className="tmp12-search-products-container">
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
                                            <div className="tmp12-search-products-dropdown-container w-100">
                                                <Link to={`/${unique.name}`}>
                                                    <div onClick={handleCategory} style={{display: 'flex', alignItems: 'center', flexDirection: 'column', width: '120px', boxShadow: 'rgba(99, 99, 99, 0.2) 0px 2px 8px 0px', borderRadius: '5px', margin: '8px', padding: '10px 10px 0px', cursor: 'pointer'}}>
                                                        <div style={{height: '60px', width: '60px', padding: '10px', border: `1px solid ${selectedCategory === unique.name ? '#4b5563' : getStarting?.primaryColor}`, borderRadius: '5px'}}>
                                                            <img src={unique?.logo_url === '' ? categoriesImage : process.env.REACT_APP_CDN_URL + unique?.logo_url + '?w=40&h=40&q=72'} style={{height: '100%', width: '100%'}} alt="" />
                                                        </div>
                                                        <button className='tmp12-all-search-products-btn' style={{color: `${selectedCategory === unique.name ? getStarting?.primaryColor :'#4b5563'}`}} >{unique.name}</button>
                                                    </div>
                                                </Link>
                                                <div className="tmp12-search-products-dropdown-content" style={{height: unique?.subCategories?.length > 0 ? '650px' : '0px', padding: unique?.subCategories?.length > 0 ? '30px' : '0px'}}>
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
                    <div className="d-flex flex-column justify-content-between">
                        <div>
                            {   displayProducts?.length === 0 ?
                                    <h2 style={{ color: `${getStarting?.primaryColor}`, margin: '50px 0', textAlign: 'center'}}>No Show Any Product</h2>
                                :
                                <div className="tmp12-all-search-products-inner">
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