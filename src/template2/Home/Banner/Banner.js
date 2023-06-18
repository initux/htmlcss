import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Banner.css';
import { HashLink } from 'react-router-hash-link';
import blankSmallSlider from '../../../GlobalShared/images/blank-small-slider.png';

const Banner = () => {
    const { handleSearch, handleSuggestClick, displayProducts, additionalImages, getStarting} = useAuth();
    const [searchText, setSearchText] = useState('');

    const handleSearchChange = e => {
        handleSearch(e.target.value);
        setSearchText( e.target.value );
    }
    
    const handleSearchKeypress = e => {
      if (e.key === 'Enter') {
        const productElement = document.getElementById('product')
        if(productElement){
            setTimeout(() => {
                window.scrollTo({
                    behavior: productElement ? "smooth" : "auto",
                    top: productElement ? productElement.offsetTop - 100 : 0
                });
           },500)
        }
      }
    };
    const handleSearchClick = e => {
        const productElement = document.getElementById('product')
        if(productElement){
            setTimeout(() => {
                window.scrollTo({
                    behavior: "smooth",
                    top: productElement.offsetTop - 100
                });
           },100)
        }
    };

    const sliderImage = `${additionalImages?.image1?.image ? process.env.REACT_APP_CDN_URL + additionalImages?.image1?.image +'?w=500&h=500&q=100' : blankSmallSlider}`;

    const loginBGStyle = {
        backgroundImage: `url(${sliderImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
    }

    return (
        <div className="tmp2-banner-container" style={loginBGStyle}>
            <div className="text-center">
                <h1 className="pb-2">{additionalImages?.image1?.image ? 'Groceries Delivered in 30 Minute' : 'Banner 1, 500 x 281'}</h1>
                {/* <p>Get your healthy foods & snacks delivered at your doorsteps all day everyday</p> */}
                <form className="search">
                    <input value={searchText} onChange={handleSearchChange} onKeyPress={handleSearchKeypress} type="text" placeholder="Search here..." />
                    <span onClick={() => setSearchText('')} style={{position: 'absolute', right: '220px', top: '28px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    <HashLink to="/#product">
                        {/* <Button onClick={()=> handleSearchClick(searchText)} variant="outline-light"><FontAwesomeIcon icon={faSearch}/> Search</Button> */}
                        <button onClick={handleSearchClick} className="search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faSearch}/></button>
                    </HashLink>
                </form>
            </div>
        </div>
    );
};

export default Banner;