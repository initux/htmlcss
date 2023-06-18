import React, {useEffect} from 'react';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import Banner from '../Banner/Banner';
import BannerSmall from '../BannerSmall/BannerSmall';
import Offers from '../Offers/Offers';
import Products from '../Products/Products';
import ProductsNew from '../Products/ProductsNew';

const Home = () => {
    const { handleAdminProfile } = useAuth();

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div> 
            <Banner></Banner>
            {/* <BannerSmall></BannerSmall> */}
            <Offers></Offers>
            <Products></Products>
        </div>
    );
};

export default Home;