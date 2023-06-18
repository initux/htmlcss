import React, { useEffect } from 'react';
import BannerSmall from '../BannerSmall/BannerSmall';
import Advantages from '../Advantages/Advantages';
import Banner from '../Banner/Banner';
import BannerDiscount from '../BannerDiscount/BannerDiscount';
import BannerFooter from '../BannerFooter/BannerFooter';
import NewsLetter from '../NewsLetter/NewsLetter';
import Products from '../Products/Products';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const Home = () => {
    const { handleAdminProfile } = useAuth();

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div>
            <Banner></Banner>
            <Products></Products>
            <BannerSmall></BannerSmall>
            {/* <BannerDiscount></BannerDiscount> */}
            {/* <Advantages></Advantages> */}
            {/* <NewsLetter></NewsLetter> */}
            {/* <BannerFooter></BannerFooter> */}
        </div>
    );
};

export default Home;