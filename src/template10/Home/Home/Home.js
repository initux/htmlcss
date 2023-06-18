import React, { useEffect } from 'react';
import Banner from '../Banner/Banner';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import BannerSmall from '../BannerSmall/BannerSmall';
import TodayProducts from '../TodayProducts/TodayProducts';
import FeaturedShops from '../FeaturedShops/FeaturedShops';
import Categories from '../Categories/Categories';
import Sponsor from '../Sponsor/Sponsor';
import Services from '../Services/Services';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Helmet } from 'react-helmet';

const Home = () => {
    const { getStarting , handleHomeCategory, handleAdminProfile } = useAuth();

    <Helmet>
    <title>{getStarting?.meta_og_title || "Room Decor Noman"}</title>
    <link rel="icon" type="image/png" href={process.env.REACT_APP_CDN_URL + getStarting?.logo} />
      <meta name="description" content={getStarting?.meta_description} />
      <meta name="keywords" content={getStarting?.meta_keywords} />
      <meta name="og:title" content={getStarting?.meta_og_title} />
      <meta name="og:description" content={getStarting?.meta_description} />
      <meta name="og:image" content={getStarting?.meta_og_image} />
      <meta property="og:url" content={window.location.href} />
    </Helmet>
    useEffect(() => {
        handleHomeCategory();
        handleAdminProfile();
    },[])
    return (

        

        <div> 
            <Banner></Banner>
            <FeaturedCategories></FeaturedCategories>
            <BannerSmall></BannerSmall>
            <TodayProducts></TodayProducts>
            <FeaturedShops></FeaturedShops>
            <Categories></Categories>
            <Services></Services>
            {/* <Sponsor></Sponsor> */}
        </div>
    );
};

export default Home;