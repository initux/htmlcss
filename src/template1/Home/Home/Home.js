import React, {useEffect} from 'react';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import Offer from '../Offer/Offer';
import VideoReview from '../Reviews/VideoReview/VideoReview';

const Home = () => {
    const { getStarting, handleHomeCategory, handleAllCategory, handleAdminProfile } = useAuth();
    document.title = `${getStarting.companyName}`;
    <meta name="description" content={getStarting.companyName}/>

    useEffect(() => {
        handleHomeCategory();
        handleAllCategory();
        handleAdminProfile();
    },[])
    return (
        <div id="home">
            <Banner></Banner>
            <Offer></Offer>
            <Categories></Categories>
            <VideoReview></VideoReview>
        </div>
    );
};

export default Home;