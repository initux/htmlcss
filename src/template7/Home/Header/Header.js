import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faSignOutAlt, faHeart, faShoppingBasket} from '@fortawesome/free-solid-svg-icons';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import './Header.css';
import { Link } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import SearchBar from '../../../GlobalShared/pages/Shared/SearchBar/SearchBar';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooter from './../../../GlobalShared/pages/Shared/MobileFooter/MobileFooter';

const Header = () => {
    const {getStarting, handleLogout, cart, handleClearAllProductsPage} = useAuth();

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
            <div className="tmp7-header-container sticky-top">
                <Navbar expand="lg">
                    <Container>
                        <Nav as={Link} to="/" onClick={handleClearAllProductsPage}>
                            <div style={{width: '300px'}}>
                                {   getStarting.logo ?
                                    <div style={{maxWidth: '200px'}}>
                                        <img src={process.env.REACT_APP_CDN_URL + getStarting.logo} style={{width: '58%'}} alt="" />
                                    </div>
                                    :
                                    <div className="mx-auto" style={{maxWidth: '200px', color: `${getStarting?.primaryColor}`}}>
                                        <Spinner animation="border" variant="danger"/>
                                    </div>
                                }
                            </div>
                        </Nav>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                            onClick={handleClearAllProductsPage}
                        >
                            <Nav.Link as={Link} to="/"><span style={{color: '#d05278'}}>HOME</span></Nav.Link>
                            <Nav.Link as={Link} to="/products" onClick={handleClearAllProductsPage}>PRODUCTS</Nav.Link>
                            <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
                            <Nav.Link as={Link} to="/contact">CONTACT</Nav.Link>
                            {       user?.phone ?
                                    <Nav.Link as={Link} to="/dashboard">DASHBOARD</Nav.Link>
                                    :
                                    ''
                            }
                        </Nav>
                        <nav className="d-flex tmp7-header-top-cart" onClick={handleClearAllProductsPage}>
                                <Nav.Link href=""><FontAwesomeIcon icon={faSearch} onClick={handleSearchBarShow}/></Nav.Link>
                                <SearchBar placement="end" searchBarShow={searchBarShow} handleSearchBarClose={handleSearchBarClose}></SearchBar>


                                <Nav.Link as={Link} to="/cart"><FontAwesomeIcon icon={faShoppingBasket}/>{cart?.length > 0 ? <span style={{backgroundColor: `${getStarting.primaryColor}`}}>{cart?.length}</span> : ''}</Nav.Link>
                                {/* <Nav.Link as={Link} to="/cart">Cart&nbsp;<FontAwesomeIcon icon={faShoppingBasket}/>{cartLength ? <span style={{backgroundColor: `${getStarting.primaryColor}`}}>{cartLength}</span> : ''}</Nav.Link> */}
                                <Nav.Link href=""><FontAwesomeIcon icon={faHeart} /></Nav.Link>
                                

                                {  user?.phone ?
                                    <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faSignOutAlt} onClick={handleLogout}/></Nav.Link>
                                    :
                                    <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faUser} /></Nav.Link>
                                }
                        </nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </div>

            <MobileHeader></MobileHeader>
            <MobileFooter></MobileFooter>
        </>
    );
};

export default Header;