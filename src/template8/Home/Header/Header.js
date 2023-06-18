import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faUser, faSignOutAlt, faHeart, faShoppingBasket, faLock } from '@fortawesome/free-solid-svg-icons';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import './Header.css';
import { Link } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import SearchBar from '../../../GlobalShared/pages/Shared/SearchBar/SearchBar';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooter from './../../../GlobalShared/pages/Shared/MobileFooter/MobileFooter';

const Header = () => {
    const {getStarting, customer, handleLogout, cart, handleClearAllProductsPage} = useAuth();

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
            <div className="tmp8-header-container">
                <div style={{ backgroundColor: '#ebebeb' }}>
                    <Container>
                        <div className="tmp8-header-container-top">
                            <p>Special collection already available.
                                <Link to="/"><span style={{color: `${getStarting?.primaryColor}`}}> Read More...</span> </Link>
                            </p>
                            {  user?.phone ? 
                                <div className="d-flex align-items-center" onClick={handleClearAllProductsPage}>
                                    Hello&nbsp;<span style={{color: `${getStarting?.primaryColor}`}}>{customer.name}</span>
                                    <Nav.Link as={Link} to="/login" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/> Log Out</Nav.Link>
                                </div>
                                :
                                <div className="d-flex align-items-center" onClick={handleClearAllProductsPage}>
                                    <Link to="/login">
                                        <span style={{color: '#222'}}><FontAwesomeIcon icon={faUser} /> Login</span>
                                    </Link>
                                    <Link to="/register">
                                        <span style={{color: '#222', marginLeft: '25px'}}><FontAwesomeIcon icon={faLock} /> Register</span>
                                    </Link>
                                </div>
                            }
                        </div>
                    </Container>
                </div>
            </div>

           
            <div className="tmp8-header-container" style={{boxShadow: '0 2px 4px 0 rgb(0 0 0 / 8%)'}}>
                <Navbar expand="lg">
                    <Container>
                        <div style={{width: '300px'}} onClick={handleClearAllProductsPage}>
                            <Link to="/">
                                {   getStarting.logo ?
                                    <div style={{maxWidth: '200px'}}>
                                        <img src={process.env.REACT_APP_CDN_URL + getStarting.logo} style={{width: '50%'}} alt="" />
                                    </div>
                                    :
                                    <div className="mx-auto" style={{maxWidth: '200px', color: `${getStarting?.primaryColor}`}}>
                                        <Spinner animation="border" variant="danger"/>
                                    </div>
                                }
                            </Link>
                        </div>
                        <Navbar.Toggle aria-controls="navbarScroll" />
                        <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                            onClick={handleClearAllProductsPage}
                        >
                            <Nav.Link as={Link} to="/"><span style={{color: `${getStarting?.primaryColor}`}}>HOME</span></Nav.Link>
                            <Nav.Link as={Link} to="/products" onClick={handleClearAllProductsPage}>Products</Nav.Link>
                            <Nav.Link as={Link} to="/about">ABOUT</Nav.Link>
                            <Nav.Link as={Link} to="/contact">CONTACT</Nav.Link>
                        
                        </Nav>
                        <nav className="d-flex tmp8-header-top-cart"  onClick={handleClearAllProductsPage}>
                        {  user?.phone ? 
                            <Nav.Link as={Link} to="/dashboard">DASHBOARD</Nav.Link>
                            :
                            ''
                        }
                            <Nav.Link href=""><FontAwesomeIcon icon={faSearch} onClick={handleSearchBarShow}/></Nav.Link>
                            <Nav.Link as={Link} to="/cart"><FontAwesomeIcon icon={faShoppingBasket}/>{cart?.length > 0 ? <span style={{backgroundColor: `${getStarting?.primaryColor}`}}>{cart?.length}</span> : ''}</Nav.Link>
                            <Nav.Link href=""><FontAwesomeIcon icon={faHeart} /></Nav.Link>
                        </nav>
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


// style={{boxShadow: 'box-shadow: 0 3px 15px 0 rgb(0 0 0 / 6%)'}}