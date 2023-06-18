import React, { useEffect } from 'react';
import './Header.css';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faCheck, faLock, faShoppingBasket, faSlidersH, faHome, faSearch, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import { faFacebookSquare, faTwitterSquare, faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import { Link } from 'react-router-dom';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooter from './../../../GlobalShared/pages/Shared/MobileFooter/MobileFooter';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const Header = () => {
    const { headerSearchText, setHeaderSearchText, headerSuggestBox, setHeaderSuggestBox, cart, handleSearchClick, handleSearch,
             handleSuggestClick,  displayProducts, handleLogout, getStarting, additionalInfo, handleAdminProfile, handleClearAllProductsPage} = useAuth();

    const user = JSON.parse(localStorage.getItem('AuthInfo'));
    
    const handleSearchChange = e => {
        handleSearch(e.target.value);
        setHeaderSearchText( e.target.value );
        e.target.value = '';
        setHeaderSuggestBox(false);
    }
    
    const handleSearchKeypress = e => {
      if (e.keyCode === 13) {
        handleSearchClick(e.target.value);
        e.target.value = '';
      }
    //   setHeaderSuggestBox(true);
    };

    const suggestClick = (e) =>{
        setHeaderSearchText(e);
        handleSuggestClick(e);
        setHeaderSuggestBox(true);
    }

    //    const cartLength = cart.reduce((previous, product) => previous + product.quantity, 0)
   let cartLength = 0;
   let cartPrice = 0;
   let offerPrice = 0;
   if(!cart){

   }
   else{
    for(const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        }
        cartLength = cartLength + product.quantity ;
        cartPrice =  cartPrice + product.sell_price * product.quantity;

        // const offer = ( product.sell_price * product.discount ) / 100;
        // const discount = product.sell_price - offer;
        // offerPrice = offerPrice + discount * product.quantity;
    }
}

    useEffect(() => {
        handleAdminProfile();
    },[])

    return (
        <>  
            <style type="text/css">
                {
                    ` 
                    .tmp1-suggestSearch .suggest-search-btn:hover {
                    color: ${getStarting?.primaryColor} !important;
                    }


                    `
                }
            </style>
            <div className="tmp1-header-container-top" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
                <Navbar expand="lg">
                    <Container className="my-0">
                        <Nav className="me-auto my-2 my-lg-0"></Nav>
                        <Nav onClick={handleClearAllProductsPage}>
                            <Nav.Link href={"tel:" + getStarting?.phone} target="_blank">Call: {getStarting?.phone}</Nav.Link>
                            <Nav.Link href={`https://${additionalInfo?.social?.facebook}`} target="_blank"><FontAwesomeIcon icon={faFacebookSquare}/></Nav.Link>
                            <Nav.Link href={`https://${additionalInfo?.social?.twitter}`} target="_blank"><FontAwesomeIcon icon={faTwitterSquare}/></Nav.Link>
                            <Nav.Link href={`https://${additionalInfo?.social?.youtube}`} target="_blank"><FontAwesomeIcon icon={faYoutubeSquare}/></Nav.Link>
                            <Nav.Link as={Link} to="/products" onClick={handleClearAllProductsPage}>Products</Nav.Link>
                            <Nav.Link as={Link} to="/checkout"><FontAwesomeIcon icon={faCheck} /> Checkout</Nav.Link>
                            {
                                 user?.phone ? 
                                 <Nav.Link as={Link} to="/dashboard"><FontAwesomeIcon icon={faTachometerAlt} /> Dashboard</Nav.Link>
                                 :
                                 ''
                            }
                            {
                                user?.phone ? 
                                <Nav.Link as={Link} to="/login" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/> LogOut</Nav.Link>
                                :
                                <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faLock} /> Login</Nav.Link>
                            }
                        </Nav>
                    </Container>
                </Navbar>
            </div>

            <div className="sticky-top">
                <div className="tmp1-header-container-logo" style={{boxShadow: '0 2px 4px 0 rgb(0 0 0 / 8%', backgroundColor: `${getStarting?.primaryColor}99`}}>
                    <Navbar expand="lg">
                        <Container className="py-2">
                            <div style={{width: '300px'}}>
                                <Link to="/" onClick={handleClearAllProductsPage}>
                                    {   getStarting.logo ?
                                        <div style={{maxWidth: '200px'}}>
                                            <img src={process.env.REACT_APP_CDN_URL + getStarting.logo} style={{width: '68%'}} alt="" />
                                        </div>
                                        :
                                        <div className="mx-auto" style={{Width: '200px', color: `${getStarting?.primaryColor}`}}>
                                            <Spinner animation="border" variant="danger"/>
                                        </div>
                                    }
                                </Link>
                            </div>
                            <Navbar.Toggle aria-controls="navbarScroll" />
                            <Nav className="mx-auto">
                                <form className="tmp1-header-form">
                                    <input value={headerSearchText} onChange={handleSearchChange} onKeyPress={handleSearchKeypress} type="text" placeholder="Search here..."/>
                                    <span onClick={() => setHeaderSearchText('')} style={{position: 'absolute', right: '100px', top: '12px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                                        <FontAwesomeIcon icon={faTimes}/>
                                    </span>
                                    <Link to="/products">
                                        <button onClick={()=> handleSearchClick(headerSearchText)} className="search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faSearch}/></button>
                                    </Link>
                                    {   
                                        headerSearchText.length > 0 ?
                                        <div className="tmp1-suggestSearch" style={{padding: displayProducts.length === 0 ? '0px' : '15px 20px', display: headerSuggestBox === false ? 'block' : 'none'}}>
                                            {
                                                displayProducts?.map(product => <div key={product._id}>
                                                    <Link to="/products">
                                                        <button onClick={()=> suggestClick(product.name)} className="suggest-search-btn"><span className="tmp1-search-text-line-climb">{product.name}</span></button>
                                                    </Link>
                                                </div>)
                                            }
                                        </div>
                                        :
                                        ''
                                    }
                                </form>
                            </Nav>
                            <Nav>
                                <Link to="/cart" onClick={handleClearAllProductsPage}>
                                    <div className="tmp1-header-cart" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
                                        <FontAwesomeIcon icon={faShoppingBasket}/> &nbsp;&nbsp;
                                        <span className="cart" >{cart?.length}</span> &nbsp;&nbsp;
                                        <span><span style={{fontSize: '19px'}}>{getStarting?.currency}</span> {cartPrice}</span>
                                    </div>
                                </Link>
                            </Nav>
                        </Container>
                    </Navbar>
                </div>
            </div>
            <MobileHeader></MobileHeader>
            <MobileFooter></MobileFooter>

        </>
    );
};

export default Header;


// https://reactgo.com/react-trigger-button-click/