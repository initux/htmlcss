import React from 'react';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram, faVimeoV} from '@fortawesome/free-brands-svg-icons'
import { faSearch, faHeadset, faCartPlus, faTimes, faSignOutAlt, faEnvelope, faUser  } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooter from './../../../GlobalShared/pages/Shared/MobileFooter/MobileFooter';

const Header = () => {
  const {headerSearchText, setHeaderSearchText, headerSuggestBox, setHeaderSuggestBox, handleSearchClick, handleSearch,
         handleSuggestClick, handleLogout, cart, displayProducts, getStarting, customer, handleClearAllProductsPage} = useAuth();

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
};

const suggestClick = (e) =>{
    setHeaderSearchText(e);
    handleSuggestClick(e);
    setHeaderSuggestBox(true);
}

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
      <style type="text/css">
          {
            ` 
            .tmp16-suggestSearch .suggest-search-btn:hover {
              color: ${getStarting?.primaryColor} !important;
            }

            `
          }
      </style>
      <div className="sticky-top">
        <div className="tmp16-top-header" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
            <Navbar collapseOnSelect expand="lg"  variant="dark">
              <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                  <Navbar.Brand>
                      <Nav>
                          <Nav.Link href="#" target="_blank"><span><FontAwesomeIcon icon={faEnvelope}/></span>&nbsp;Email: {getStarting?.email}</Nav.Link>&nbsp;&nbsp;
                          {/* <Nav.Link href="https://goo.gl/maps/LoyMKqQgUKqS3zEK9" target="_blank"><span><FontAwesomeIcon icon={faMapMarkerAlt}/></span>&nbsp; California, TX 70240</Nav.Link> */}
                          <Nav.Link href="#" target="_blank"><span><FontAwesomeIcon icon={faHeadset}/></span>&nbsp;Hotline: {getStarting?.phone}</Nav.Link>
                      </Nav>
                  </Navbar.Brand>
                  <Nav className="ms-auto" onClick={handleClearAllProductsPage}>
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                    {
                      user?.phone ?
                      <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                      :
                      ''
                    } 
                  </Nav>
                  <Nav>
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
                </Navbar.Collapse>
              </Container>
            </Navbar>
        </div>

        <div className="tmp16-header" style={{backgroundColor: '#2a2a4d'}}>
          <Navbar collapseOnSelect expand="lg" variant="dark">
            <Container>
              <Nav as={Link} to="/" onClick={handleClearAllProductsPage}>
                <div style={{width: '300px'}}>
                    {   getStarting.logo ?
                        <div style={{maxWidth: '200px'}}>
                            <img src={process.env.REACT_APP_CDN_URL + getStarting.logo} style={{width: '65%'}} alt="" />
                        </div>
                        :
                        <div className="mx-auto" style={{maxWidth: '200px', color: `${getStarting?.primaryColor}`}}>
                            <Spinner animation="border" variant="danger"/>
                        </div>
                    }
                </div>
              </Nav>
              <Nav>
                  <form className="tmp16-header-form">
                      <input value={headerSearchText} onChange={handleSearchChange} onKeyPress={handleSearchKeypress} type="text" placeholder="Search here..."/>
                      <span onClick={() => setHeaderSearchText('')} style={{position: 'absolute', right: '90px', top: '12px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                          <FontAwesomeIcon icon={faTimes}/>
                      </span>
                      <Link to="/products">
                          <button onClick={()=> handleSearchClick(headerSearchText)} className="search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`, color: '#fff'}}><FontAwesomeIcon icon={faSearch}/></button>
                      </Link>
                      {   
                          headerSearchText.length > 0 ?
                          <div className="tmp16-suggestSearch" style={{padding: displayProducts.length === 0 ? '0px' : '15px 20px', display: headerSuggestBox === false ? 'block' : 'none'}}>
                              {
                                  displayProducts?.map(product => <div key={product._id}>
                                      <Link to="/products">
                                          <button onClick={()=> suggestClick(product.name)} className="suggest-search-btn"><span className="tmp6-search-text-line-climb">{product.name}</span></button>
                                      </Link>
                                  </div>)
                              }
                          </div>
                          :
                          ''
                      }
                  </form>
              </Nav>
              <Nav style={{width: '212px'}}>
                  <Nav.Link as={Link} to="/cart" style={{marginLeft: '20px'}}><span className="tmp16-header-cart" style={{color: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faCartPlus} /><span>{cart?.length === 0 ? 0 : cart?.length}</span></span></Nav.Link>
                  &nbsp;&nbsp;&nbsp;&nbsp;
                  <div style={{display: 'flex', alignItems: 'center', margin: 'auto'}}>
                      <FontAwesomeIcon icon={faUser} style={{color: `${getStarting?.primaryColor}`}}/> &nbsp;&nbsp;
                      <span>
                        <h6 style={{marginBottom: '0px', fontSize: '12px', color: `${getStarting?.primaryColor}`}}>Hello {user?.phone ? customer?.name : 'Guest!'}</h6>
                        {  user?.phone ?
                          <Link to="/login" onClick={handleLogout}><span style={{color: '#fff'}}>LogOut <FontAwesomeIcon icon={faSignOutAlt}/></span></Link>
                          :
                          <>
                            <Link to="/login"><span style={{color: '#fff', fontSize: '14px'}}>Login</span></Link>
                            <span> / </span>
                            <Link to="/register"><span style={{color: '#fff', fontSize: '14px'}}>Sign Up</span></Link>
                          </>
                        }  
                      </span>
                  </div>
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


