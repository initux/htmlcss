import React, { useState } from 'react';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch, faHome, faCartPlus, faUser, faSignOutAlt} from '@fortawesome/free-solid-svg-icons'
import './Header.css';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import CartDetails from '../../Home/CartDetails/CartDetails';
import SearchBar from '../../../GlobalShared/pages/Shared/SearchBar/SearchBar';
import HeaderMobileMenu from '../../../GlobalShared/pages/Shared/HeaderMobileMenu/HeaderMobileMenu';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooterTwo from './../../../GlobalShared/pages/Shared/MobileFooterTwo/MobileFooterTwo';

const Header = () => {
  const { getStarting, cart, handleLogout, handleClearAllProductsPage} = useAuth();

  const user = JSON.parse(localStorage.getItem('AuthInfo'));

  const [menuShow, setMenuShow] = useState(false);
  const [cartShow, setCartShow] = useState(false);
  const [searchBarShow, setSearchBarShow] = useState(false);

  const handleCartClose = () => setCartShow(false);
  const handleCartShow = () => setCartShow(true);

  const handleMenuClose = () => setMenuShow(false);
    const handleMenuShow = () => setMenuShow(true);

  const handleSearchBarClose = () => setSearchBarShow(false);
  const handleSearchBarShow = () => setSearchBarShow(true);


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
      <div className="tmp2-header sticky-top">
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand as={HashLink} to="/" style={{width: '300px'}}>
                {   getStarting.logo ?
                    <div style={{maxWidth: '200px'}}>
                        <img src={process.env.REACT_APP_CDN_URL + getStarting.logo} style={{width: '45%'}} alt="" />
                    </div>
                    :
                    <div className="mx-auto" style={{maxWidth: '200px', color: `${getStarting?.primaryColor}`}}>
                        <Spinner animation="border" variant="danger"/>
                    </div>
                }
            </Navbar.Brand>
            <Nav className="ms-auto" onClick={handleClearAllProductsPage}>
                {/* <Nav.Link as={HashLink} to="/">Shop</Nav.Link>
                <Nav.Link as={HashLink} to="/">FAQ</Nav.Link>
                <Nav.Link as={HashLink} to="/">Contact</Nav.Link> */}
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                {/* <Nav.Link as={Link} to="/products" onClick={handleClearAllProductsPage}>Products</Nav.Link> */}
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            </Nav>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="ms-auto" onClick={handleClearAllProductsPage}>
                {/* <Nav.Link as={HashLink} to="/">Shop</Nav.Link>
                <Nav.Link as={HashLink} to="/">FAQ</Nav.Link>
                <Nav.Link as={HashLink} to="/">Contact</Nav.Link> */}
                {/* <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link> */}
                { 
                    user?.phone ?
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    :
                    ''
                }
                {
                    user?.phone?
                    <Nav.Link as={Link} to="/login"><button onClick={handleLogout} style={{border: 'none', backgroundColor: 'transparent'}}>Logout <FontAwesomeIcon icon={faSignOutAlt}/></button></Nav.Link>
                    :
                    <Nav.Link as={Link} to="/login"><FontAwesomeIcon icon={faUser}/> Login</Nav.Link>
                }
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </div>
      <MobileHeader></MobileHeader>
      <MobileFooterTwo></MobileFooterTwo>
    </>

  );
};

export default Header;


