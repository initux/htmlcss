import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import Offer from '../Offer/Offer';
import blankSmallSlider from '../../../GlobalShared/images/blank-small-slider.png';
import { Container } from 'react-bootstrap';
import BannerSmall from '../BannerSmall/BannerSmall';
import Services from '../Services/Services';
import HomeCategoriesBrands from './../HomeCategoriesBrands/HomeCategoriesBrands';
import JustForYou from '../JustForYou/JustForYou';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const Home = () => {
    const { handleHomeCategory, handleAdminProfile} = useAuth();
    useEffect(() => {
        handleHomeCategory();
        handleAdminProfile();
    },[])
    return (
        <div> 
            <Banner></Banner>
            <Services></Services>
            <BannerSmall></BannerSmall>
            <FeaturedCategories></FeaturedCategories>
            <JustForYou></JustForYou>
            <Categories></Categories>
        </div>
    );
};

export default Home;