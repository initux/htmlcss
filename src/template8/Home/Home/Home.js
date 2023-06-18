import React, { useEffect } from 'react';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import Banner from '../Banner/Banner';
import BannerFooter from '../BannerFooter/BannerFooter';
import Categories from '../Categories/Categories';
import OffCollection from '../OffCollection/OffCollection';
import Products from '../Products/Products';
import Trending from '../Trending/Trending';

const Home = () => {
    const { handleAdminProfile } = useAuth();

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div>
            {/* <Banner></Banner> */}
            <Categories></Categories>
            <Products></Products>
            {/* <OffCollection></OffCollection> */}
            <Trending></Trending>
            {/* <BannerFooter></BannerFooter> */}
        </div>
    );
};

export default Home;