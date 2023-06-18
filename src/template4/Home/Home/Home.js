import React, {useEffect} from 'react';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import Banner from '../Banner/Banner';
import Products from '../Products/Products';

const Home = () => {
    const { handleAdminProfile } = useAuth();

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div id="home">
            <Banner></Banner>
            <Products></Products>
        </div>
    );
};

export default Home;