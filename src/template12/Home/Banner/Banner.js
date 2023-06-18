import React, { useContext, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Banner.css';
import { Link, useNavigate } from 'react-router-dom';
import { SearchContext } from '../../assets/Template12';
import blankImage from '../../../GlobalShared/images/blank-slider.png';

const Banner = () => {
    const { handleSearch, additionalOffers, getStarting} = useAuth();
    // const [searchText, setSearchText] = useState('');
    const [searchText, setSearchText] = useContext(SearchContext)
    const navigate = useNavigate();

    const handleSearchChange = e => {
        handleSearch(e.target.value);
        setSearchText( e.target.value );
        navigate(`/search/${e.target.value}`)
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



    const sliderImage = `${additionalOffers[0]?.image ? process.env.REACT_APP_CDN_URL + additionalOffers[0]?.image +'?w=500&h=500&q=100' : blankImage}`;

    const loginBGStyle = {
        backgroundImage: `url(${sliderImage})`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center'
    }

    return (
        <div className="tmp12-banner-container" style={loginBGStyle}>
            <div className="text-center">
                <h1 className="pb-2">{additionalOffers[0]?.title || 'Banner 1, 820 x 486'}</h1>
                {/* <p>Get your healthy foods & snacks delivered at your doorsteps all day everyday</p> */}
                <form className="search">
                    <input value={searchText} onChange={handleSearchChange} onKeyPress={handleSearchKeypress} type="text" placeholder="Search here..." />
                    <span onClick={() => setSearchText('')} style={{position: 'absolute', right: '142px', top: '21px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    {/* <HashLink to="/#product">
                        <button onClick={handleSearchClick} className="search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faSearch}/></button>
                    </HashLink> */}
                    <Link to="/search">
                        <button onClick={handleSearchClick} className="search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faSearch}/></button>
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Banner;