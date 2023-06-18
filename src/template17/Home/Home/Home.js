import React, {useEffect} from 'react';
import Banner from '../Banner/Banner';
import FeaturedCategories from '../FeaturedCategories/FeaturedCategories';
import FeaturedShops from '../FeaturedShops/FeaturedShops';
import Categories from '../Categories/Categories';
import HomeBrands from '../HomeBrands/HomeBrands';
import Services from '../Services/Services';
import Offer from '../Offer/Offer';
import JustForYou from '../JustForYou/JustForYou';
import { Container } from 'react-bootstrap';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import blankSmallSlider from '../../image/blank-small-slider.jpg';

const Home = () => {
    const {additionalOffers, handleHomeCategory, handleAdminProfile} = useAuth();

    useEffect(() => {
        handleHomeCategory();
        handleAdminProfile();
    },[])
    return (
        <div> 
            <Banner></Banner>
            <Container>
                <div style={{position: 'relative', margin: '40px 0px'}}>
                    <img src={additionalOffers[0]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[0]?.image +'?w=1000&h=1000&q=100' : blankSmallSlider} alt="" style={{width: '100%'}}/>
                    {additionalOffers[0]?.image ? '' : <h2 style={{position: 'absolute', transform: 'translate(-50%, -50%)', top: '50%', left: '50%', color: '#000'}}>Banner 1 <br/> 800 x 123</h2>}
                </div>
            </Container>
            <Offer></Offer>
            <FeaturedCategories></FeaturedCategories>
            <Categories></Categories>
            {/* <FeaturedShops></FeaturedShops>
            <JustForYou></JustForYou> 
            <HomeBrands></HomeBrands> */}
            <Services></Services> 
        </div>
    );
};

export default Home;