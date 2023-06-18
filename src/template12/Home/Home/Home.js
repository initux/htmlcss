import React, {useEffect} from 'react';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import Banner from '../Banner/Banner';
import Products from '../Products/Products';

const getFromLocalStorageStarting = () => {
    const getSetting = localStorage.getItem('starting')
    if(getSetting) {
        return JSON.parse(localStorage.getItem('starting'))
    } else {
        return []
    }
  } 


const Home = () => {
    const { handleAdminProfile } = useAuth();
    document.title = `${getFromLocalStorageStarting().companyName}`;

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div> 
            {/* <Banner></Banner> */}
            <Products></Products>
        </div>
    );
};

export default Home;