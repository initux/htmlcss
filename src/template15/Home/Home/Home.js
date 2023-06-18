import React, {useEffect} from 'react';
import Banner from '../Banner/Banner';
import Categories from '../Categories/Categories';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import Offer from '../Offer/Offer';
import blankSmallSlider from '../../../GlobalShared/images/blank-small-slider.png';
import { Container } from 'react-bootstrap';
import BannerSmall from '../BannerSmall/BannerSmall';
import useAuth from './../../../GlobalShared/hooks/useAuth';
import Services from '../Services/Services';
import HomeCategoriesBrands from './../HomeCategoriesBrands/HomeCategoriesBrands';
import JustForYou from '../JustForYou/JustForYou';

const Home = () => {
    const {additionalOffers, handleHomeCategory, handleAdminProfile} = useAuth();

    useEffect(() => {
        handleHomeCategory();
        handleAdminProfile();
    },[])
    return (
        <div> 
            <Banner></Banner>
            <FeaturedCategories></FeaturedCategories>
            <Offer></Offer>
            <Categories></Categories>
            <Container>
                <div style={{position: 'relative'}}>
                    <img src={additionalOffers[0]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[0]?.image +'?w=1000&h=1000&q=100' : blankSmallSlider} alt="" style={{width: '100%'}}/>
                    {additionalOffers[0]?.image ? '' : <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 1 <br/> 420 x 120</h2>}
                </div>
            </Container>
            <BannerSmall></BannerSmall>
            <HomeCategoriesBrands></HomeCategoriesBrands>
            <JustForYou></JustForYou>
            <Services></Services>
        </div>
    );
};

export default Home;