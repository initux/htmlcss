import React, { useEffect } from 'react';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import MoreToLove from '../MoreToLove/MoreToLove';
import Offers from '../Offer/Offer';

const Home = () => {
    const { handleHomeCategory, handleAdminProfile } = useAuth();

    useEffect(() => {
        handleHomeCategory();
        handleAdminProfile();
    },[])
    return (
        <div> 
            <Banner></Banner>
            <Offers></Offers> 
            <Categories></Categories>
            <MoreToLove></MoreToLove>
        </div>
    );
};

export default Home;