import React from 'react';
import { Container, Nav, Navbar, NavDropdown, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartPlus, faHeart, faSearch, faUser, faSignOutAlt, faTimes } from '@fortawesome/free-solid-svg-icons'
import './Header.css';
import { Link } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooter from './../../../GlobalShared/pages/Shared/MobileFooter/MobileFooter';

const Header = () => {
  const { headerSearchText, setHeaderSearchText, headerSuggestBox, setHeaderSuggestBox, handleSearchClick, cart, getStarting,
           handleLogout, handleSearch, handleSuggestClick, displayProducts, handleClearAllProductsPage} = useAuth();

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
            .tmp5-suggestSearch .suggest-search-btn:hover {
              color: ${getStarting?.primaryColor} !important;
            }

            `
          }
      </style>
      <div className="tmp5-top-header" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
        <Navbar collapseOnSelect expand="lg" variant="dark">
              <Container>
                <Navbar.Brand onClick={handleClearAllProductsPage}>
                  <Nav className="me-auto tmp5-top-header-left-nav">
                    <Nav.Link as={Link} to="/products">Products</Nav.Link> 
                    <Nav.Link as={Link} to="/about" >About Us</Nav.Link>
                    <Nav.Link as={Link} to="/contact" >Contact</Nav.Link>
                    {
                      user?.phone ?
                      <Nav.Link as={Link} to="/dashboard" >Dashboard</Nav.Link> 
                      :
                      ''
                    }
                  </Nav>
                </Navbar.Brand>
                <Nav className="tmp5-top-header-right-nav">
                    <div className="d-flex align-items-center">
                      <span style={{color: '#3e445a'}}>Need help? Call Us:</span>
                      <Nav.Link href="callto: info12@example.com" target="_blank">+0020500</Nav.Link>
                    </div>
                    
                    <NavDropdown title="Language" id="navbarScrollingDropdown">
                      <NavDropdown.Item href="#action3">Arabic</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">French</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">Hindi</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">English</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">Chinese</NavDropdown.Item>
                      <NavDropdown.Item href="#action4">Bengali</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
              </Container>
          </Navbar>
      </div>

      <div className="tmp5-header">
        <Navbar collapseOnSelect expand="lg" variant="dark">
          <Container>
            <Navbar.Brand as={Link} to="/" style={{width: '300px'}} onClick={handleClearAllProductsPage}>
                {   getStarting.logo ?
                    <div style={{maxWidth: '200px'}}>
                        <img src={process.env.REACT_APP_CDN_URL + getStarting.logo} style={{width: '65%'}} alt="" />
                    </div>
                    :
                    <div className="mx-auto" style={{maxWidth: '200px', color: `${getStarting?.primaryColor}`}}>
                        <Spinner animation="border" variant="danger"/>
                    </div>
                }
            </Navbar.Brand>
            <Navbar.Brand onClick={handleClearAllProductsPage}>
                <form className="tmp5-header-form">
                    <input value={headerSearchText} onChange={handleSearchChange} onKeyPress={handleSearchKeypress} type="text" placeholder="Search here..." style={{border: `2px solid ${getStarting?.primaryColor}`}}/>
                    <span onClick={() => setHeaderSearchText('')} style={{position: 'absolute', right: '90px', top: '8px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    <Link to="/products">
                        <button onClick={()=> handleSearchClick(headerSearchText)} className="tmp5-search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faSearch}/></button>
                    </Link>
                    {   
                        headerSearchText.length > 0 ?
                        <div className="tmp5-suggestSearch" style={{padding: displayProducts.length === 0 ? '0px' : '15px 20px', display: headerSuggestBox === false ? 'block' : 'none'}}>
                            {
                                displayProducts?.map(product => <div key={product._id}>
                                    <Link to="/products">
                                        <button onClick={()=> suggestClick(product.name)} className="tmp5-suggest-search-btn"><span className="tmp5-search-text-line-climb">{product.name}</span></button>
                                    </Link>
                                </div>)
                            }
                        </div>
                        :
                        ''
                    }
                </form>
            </Navbar.Brand>
            <Navbar.Brand>
              <div className="tmp5-header-icon-container">
                <div className="tmp5-header-icon"><FontAwesomeIcon icon={faHeart} /></div>
                <Link to="/cart"><div className="tmp5-header-icon"><FontAwesomeIcon icon={faCartPlus}/><strong><sup style={{color: `${getStarting.primaryColor}`}}>{cart?.length === 0 ? '' : cart?.length}</sup></strong></div></Link>
                {  user?.phone ?
                  <Link to="/login"><div className="tmp5-header-icon" onClick={handleLogout}><FontAwesomeIcon icon={faSignOutAlt}/></div></Link>
                  :
                  <Link to="/login"><div className="tmp5-header-icon"><FontAwesomeIcon icon={faUser} /></div></Link>
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


