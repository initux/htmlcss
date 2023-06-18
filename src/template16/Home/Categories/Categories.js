import React, { useEffect, useState } from 'react';
import './Categories.css';
import { Container, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import CategoriesSummery from './CategoriesSummery';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import blankCategoriesBanner from '../../image/blank-categories-banner.jpg';

const Categories = () => {
    const { homeCategories, handleCategory, additionalOffers, getStarting, handleClearWithoutCategories} = useAuth();
    const [newCtProducts, setNewCtProducts] = useState([]);

    // useEffect( () => {
    //     const newCategories = homeCategories?.filter(homeCategory => homeCategory.products.length > 5 );
    //     setNewCtProducts(newCategories);
    // }, [ homeCategories, additionalOffers])

    // useEffect( () => {
    //     const newCategories = homeCategories?.filter(homeCategory => homeCategory.products.length > 5 );
    //     const offerImage = additionalOffers?.slice(6, additionalOffers?.length).filter(data => data );
    //     let i = 0;
    //     let newArray = [];
    //     for(const result of offerImage){
    //         const obj =  { ...newCategories[i], offerImg: result.image};
    //         // console.log(newCategories)
    //         newArray.push(obj);
    //         i++;
    //     }
    //     setNewCtProducts(newArray);
    // }, [ homeCategories, additionalOffers])


    useEffect( () => {
        const newCategories = homeCategories?.filter(homeCategory => homeCategory.products.length > 5 );
        const offerImage = additionalOffers?.slice(6, additionalOffers?.length).filter(data => data );
     
        let newArray = [];
        for(let i=0; i<newCategories.length; i++){
            const obj =  { ...newCategories[i], offerImg: offerImage[i]?.image === undefined ? '' : offerImage[i]?.image};
            newArray.push(obj);
        }
        setNewCtProducts(newArray);

    }, [ homeCategories, additionalOffers])


    
    return (
        <div>
            <Container>
                {
                    newCtProducts?.length === 0 ?
                    <div style={{ padding: '154px 0px', textAlign: 'center', color: `${getStarting?.primaryColor}`, backgroundColor: '#fff', boxShadow: '0 0px 4px 0 rgb(0 0 0 / 8%', borderRadius: '8px'}}>
                        <Spinner animation="border" />
                    </div>
                    :
                    <div>
                        {
                            newCtProducts?.map(( category, i ) => <div key={category.category_id} className="tmp16-categories-container">
                                <div style={{paddingBottom: '10px'}}>
                                    <div className="d-flex align-item-center justify-content-between" style={{borderBottom: '1px solid #eaeaea'}}>
                                        <h3 style={{marginTop: '15px', marginBottom: '0px'}}>{category?.name}</h3>
                                        <Link to="/products" onClick={handleClearWithoutCategories}>
                                            <button className="tmp16-categories-products-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
                                                <span>View More <div onClick={handleCategory} className="tmp16-categories-products-btn-inner">{category.name}</div></span> 
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                                <div className="tmp16-categories-products-container">
                                    <div className="tmp16-categories-products-image">
                                        {/* <img src="https://www.banglashoppers.com/media/wysiwyg/banner/standing-banner-home-big.jpg" alt="" style={{width: '100%'}}/> */}
                                        <img src={category?.offerImg ? process.env.REACT_APP_CDN_URL + category?.offerImg + '?w=1000&h=1000&q=100' : blankCategoriesBanner} alt="" style={{width: '100%'}}/>
                                        {category?.offerImg ? '' : <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%'}}>Banner {i + 6}</h2>}
                                    </div>
                                    <div className="tmp16-categories-products">
                                        {
                                            category?.products?.slice(0, 10).map( product => <CategoriesSummery product={product} key={product._id}></CategoriesSummery>)
                                        }
                                    </div>
                                </div>
                        </div>)
                        }
                    </div>
                }
            </Container>
        </div>
    );
};

export default Categories;

