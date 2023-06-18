import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import FeaturedShops from '../FeaturedShops/FeaturedShops';
import Categories from '../Categories/Categories';
import HomeBrands from '../HomeBrands/HomeBrands';
import Services from '../Services/Services';
import Offer from '../Offer/Offer';
import JustForYou from '../JustForYou/JustForYou';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const Home = () => {
    const { handleHomeCategory, handleAdminProfile } = useAuth();

    useEffect(() => {
        handleHomeCategory();
        handleAdminProfile();
    },[])
    return (
        <div> 
            <Banner></Banner>
            <FeaturedCategories></FeaturedCategories>
            <Offer></Offer>
            <Categories></Categories>
            <FeaturedShops></FeaturedShops>
            <JustForYou></JustForYou> 
            <HomeBrands></HomeBrands>
            <Services></Services> 
        </div>
    );
};

export default Home;