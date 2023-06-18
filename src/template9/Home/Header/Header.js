import React, { useState } from 'react';
import './Header.css';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faSearch, faUserPlus, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import SearchBar from '../../../GlobalShared/pages/Shared/SearchBar/SearchBar';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooter from './../../../GlobalShared/pages/Shared/MobileFooter/MobileFooter';


const Header = () => {
    const {getStarting, cart, handleLogout, handleClearAllProductsPage} = useAuth();
    const [searchBarShow, setSearchBarShow] = useState(false);

    const handleSearchBarClose = () => setSearchBarShow(false);
    const handleSearchBarShow = () => setSearchBarShow(true);

//    const cartLength = cart.reduce((previous, product) => previous + product.quantity, 0)
   const user = JSON.parse(localStorage.getItem('AuthInfo'));
   
   let cartLength = 0;
   let cartPrice = 0;
   if(!cart){

   }
   else{
    for(const product of cart){
        if(!product.quantity){
            product.quantity = 1;
        }
        cartLength = cartLength + product.quantity ;
        cartPrice =  cartPrice + product.sell_price * product.quantity;
    }
   }


    return (
            <>  
                <div className="tmp9-header-top-container sticky-top">
                    <Navbar collapseOnSelect expand="lg" variant="dark">
                        <Container>
                            <Navbar.Brand as={Link} to="/" className="tmp9-top-logo" style={{width: '300px'}} onClick={handleClearAllProductsPage}>
                                {   getStarting.logo ?
                                    <div style={{maxWidth: '200px'}}>
                                        <img src={process.env.REACT_APP_CDN_URL + getStarting.logo} style={{width: '40%'}} alt="" />
                                    </div>
                                    :
                                    <div className="mx-auto" style={{maxWidth: '200px', color: `${getStarting?.primaryColor}`}}>
                                        <Spinner animation="border" variant="danger"/>
                                    </div>
                                }
                            </Navbar.Brand>
                            {/* <Navbar.Toggle /> */}
                            <Navbar.Collapse className="justify-content-end tmp9-header-menu" onClick={handleClearAllProductsPage}>
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/products">Products</Nav.Link>
                                <Nav.Link as={Link} to="/about">About</Nav.Link>
                                { 
                                    user?.phone ?
                                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                                    :
                                    ''
                                }
                            </Navbar.Collapse>
                            <Navbar.Collapse className="justify-content-end tmp9-header-top-cart" onClick={handleClearAllProductsPage}>
                                <Nav.Link href="" onClick={handleSearchBarShow}>Search&nbsp;<FontAwesomeIcon icon={faSearch}/></Nav.Link>
                                <Nav.Link as={Link} to="/cart">Cart&nbsp;<FontAwesomeIcon icon={faShoppingCart}/>{cart?.length > 0 ? <span style={{backgroundColor: `${getStarting.primaryColor}`, right: `${user?.phone ? '100px' : '80px'}`}}>{cart?.length}</span> : ''}</Nav.Link>
                                {/* <Nav.Link as={Link} to="/cart">Cart&nbsp;<FontAwesomeIcon icon={faShoppingCart}/>{cartLength ? <span style={{backgroundColor: `${getStarting.primaryColor}`}}>{cartLength}</span> : ''}</Nav.Link> */}
                                {
                                    user?.phone?
                                    <Nav.Link as={Link} to="/login"><button onClick={handleLogout} style={{border: 'none', backgroundColor: 'transparent', color: '#617d98'}}>Logout <FontAwesomeIcon icon={faSignOutAlt}/></button></Nav.Link>
                                    :
                                    <Nav.Link as={Link} to="/login">Login <FontAwesomeIcon icon={faUserPlus}/></Nav.Link>
                                }
                            </Navbar.Collapse>
                        </Container>
                    </Navbar>
                </div>

                <SearchBar placement="end" searchBarShow={searchBarShow} handleSearchBarClose={handleSearchBarClose}></SearchBar>
                <MobileHeader></MobileHeader>
                <MobileFooter></MobileFooter>
            </>
    );
};

export default Header;



