import React, { useState } from 'react';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFacebookF, faTwitter, faInstagram, faVimeoV} from '@fortawesome/free-brands-svg-icons'
import { faEnvelope, faHeadset, faCartPlus, faSignOutAlt, faSearch, faUser } from '@fortawesome/free-solid-svg-icons'
import './Header.css';
import { HashLink } from 'react-router-hash-link';
import { Link } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import SearchBar from '../../../GlobalShared/pages/Shared/SearchBar/SearchBar';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooter from './../../../GlobalShared/pages/Shared/MobileFooter/MobileFooter';

const Header = () => {
  const { handleLogout, cart, getStarting, handleClearAllProductsPage} = useAuth();
  
  const user = JSON.parse(localStorage.getItem('AuthInfo'));
  const [searchBarShow, setSearchBarShow] = useState(false);

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
      <div className="tmp4-top-header" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
        <Navbar collapseOnSelect expand="lg" variant="dark">
              <Container>
                <Navbar.Brand>
                    <Nav className="tmp4-top-header-left-nav">
                        <Nav.Link href="#" target="_blank" style={{fontSize: "15px"}}><span><FontAwesomeIcon icon={faEnvelope}/></span>&nbsp; {getStarting?.email}</Nav.Link>&nbsp;&nbsp;
                        {/* <Nav.Link href="https://goo.gl/maps/LoyMKqQgUKqS3zEK9" target="_blank"><span><FontAwesomeIcon icon={faMapMarkerAlt}/></span>&nbsp; California, TX 70240</Nav.Link> */}
                        <Nav.Link href="#" target="_blank" style={{fontSize: "15px"}}><span><FontAwesomeIcon icon={faHeadset}/></span>&nbsp; {getStarting?.phone}</Nav.Link>
                    </Nav>
                </Navbar.Brand>
                <Nav className="tmp4-top-header-right-nav">
                    <Nav.Link href="https://www.facebook.com/" target="_blank"><FontAwesomeIcon icon={faFacebookF} /></Nav.Link>
                    <Nav.Link href="https://twitter.com/" target="_blank"><FontAwesomeIcon icon={faTwitter} /></Nav.Link>
                    <Nav.Link href="https://www.instagram.com/" target="_blank"><FontAwesomeIcon icon={faInstagram} /></Nav.Link>
                    <Nav.Link href="https://vimeo.com/" target="_blank"><FontAwesomeIcon icon={faVimeoV} /></Nav.Link>
                    {/* <NavDropdown title="English" id="navbarScrollingDropdown">
                      <NavDropdown.Item href="#action3">Arabic</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">French</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">Hindi</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">English</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">Chinese</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">Bengali</NavDropdown.Item>
                    </NavDropdown> */}
                </Nav>
              </Container>
          </Navbar>
      </div>

      <div className="tmp4-header sticky-top">
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/" style={{width: '300px'}} onClick={handleClearAllProductsPage}>
                {   getStarting.logo ?
                    <div style={{maxWidth: '200px'}}>
                        <img src={process.env.REACT_APP_CDN_URL + getStarting.logo} style={{width: '60%'}} alt="" />
                    </div>
                    :
                    <div className="mx-auto" style={{maxWidth: '200px', color: `${getStarting?.primaryColor}`}}>
                        <Spinner animation="border" variant="danger"/>
                    </div>
                }
            </Navbar.Brand>
            <Nav onClick={handleClearAllProductsPage}>
                <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/products" onClick={handleClearAllProductsPage}>Products</Nav.Link>
                <Nav.Link as={HashLink} to="/about">About</Nav.Link>
                <Nav.Link as={HashLink} to="/contact">Contact Us</Nav.Link>
                {
                  user?.phone ?
                  <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                  :
                  ''
                } 
              </Nav>
            <Navbar.Brand>
              <div className="tmp4-header-icon-container" onClick={handleClearAllProductsPage}>
                <Link to="/cart"><div className="tmp4-header-icon"><FontAwesomeIcon icon={faCartPlus}/><strong><sup style={{color: `${getStarting.primaryColor}`}}>{cart?.length === 0 ? '' : cart.length}</sup></strong></div></Link>

                <div onClick={handleSearchBarShow} className="tmp4-header-icon"><FontAwesomeIcon icon={faSearch} /></div>
                <SearchBar placement="end" searchBarShow={searchBarShow} handleSearchBarClose={handleSearchBarClose}></SearchBar>
                
                {  user?.phone ?
                  <Link to="/login"><div className="tmp4-header-icon" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/></div></Link>
                  :
                  <Link to="/login"><div className="tmp4-header-icon"><FontAwesomeIcon icon={faUser} /></div></Link>
                }   
              </div>
            </Navbar.Brand>
          </Container>
        </Navbar>
      </div>

      <MobileHeader></MobileHeader>
      <MobileFooter></MobileFooter>
    </>

  );
};

export default Header;


