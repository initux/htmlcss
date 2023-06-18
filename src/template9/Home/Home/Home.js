import React, { useEffect } from 'react';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import Banner from '../Banner/Banner';
import BannerSmall from '../BannerSmall/BannerSmall';
import Furniture from '../Furniture/Furniture';
import Newsletter from '../Newsletter/Newsletter';
import Products from '../Products/Products';

const Home = () => {
    const { handleAdminProfile } = useAuth();

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div>
            <Banner></Banner>
            <BannerSmall></BannerSmall>
            <Products></Products>
            {/* <Furniture></Furniture> */}
            {/* <Newsletter></Newsletter> */}
        </div>
    );
};

export default Home;