import React, { useEffect } from 'react';
import { Container, Nav, Navbar, NavDropdown, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeadset, faCartPlus, faTimes } from '@fortawesome/free-solid-svg-icons'
import { faFacebookF, faTwitter } from '@fortawesome/free-brands-svg-icons';
import {  faYoutubeSquare } from '@fortawesome/free-brands-svg-icons';
import './Header.css';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooter from './../../../GlobalShared/pages/Shared/MobileFooter/MobileFooter';

const Header = () => {
  const {headerSearchText, setHeaderSearchText, headerSuggestBox, setHeaderSuggestBox, handleSearchClick, handleSearch, handleSuggestClick, handleLogout, cart, displayProducts,
          getStarting, additionalInfo, handleAdminProfile, handleClearAllProductsPage} = useAuth();

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
    useEffect(() => {
      handleAdminProfile();
  },[])
  return (
    <>
      <style type="text/css">
          {
            ` 
            .tmp6-suggestSearch .suggest-search-btn:hover {
              color: ${getStarting?.primaryColor} !important;
            }

            `
          }
      </style>
      <div className="sticky-top">
        <div className="tmp6-top-header">
            <Navbar collapseOnSelect expand="lg"  variant="dark">
                <Container>
                  <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                  <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav as={Link} to="/">
                      <div style={{width: '300px'}} onClick={handleClearAllProductsPage}>
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
                    <Nav className="mx-auto" onClick={handleClearAllProductsPage}>
                      <Nav.Link as={Link} to="/">Home</Nav.Link>
                      <Nav.Link as={Link} to="/products" onClick={handleClearAllProductsPage}>Products</Nav.Link>
                      <Nav.Link as={Link} to="/about">About</Nav.Link>
                      <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                      <Nav.Link as={Link} to="/about"><img src="https://qcoom.com/pub/media/qcoom/Comp-1_1_1.gif" alt=""/></Nav.Link>
                    </Nav>
                    <Nav>
                    <Navbar.Brand>
                        <Nav className="tmp6-header-icon-container">
                          <Nav.Link href={`https://${additionalInfo?.social?.facebook}`} target="_blank"><div className="tmp6-header-icon" style={{backgroundColor: '#3B5998', color: '#fff'}}><FontAwesomeIcon icon={faFacebookF}/></div></Nav.Link>
                          <Nav.Link href={`https://${additionalInfo?.social?.twitter}`} target="_blank"><div className="tmp6-header-icon" style={{backgroundColor: '#26A6D1', color: '#fff'}}><FontAwesomeIcon icon={faTwitter}/></div></Nav.Link>
                          <Nav.Link href={`https://${additionalInfo?.social?.youtube}`} target="_blank"><div className="tmp6-header-icon" style={{backgroundColor: 'red', color: '#fff'}}><FontAwesomeIcon icon={faYoutubeSquare}/></div></Nav.Link>
                          <Nav.Link href={"callto:"+ getStarting?.phone} target="_blank"><div className="tmp6-header-icon"><FontAwesomeIcon icon={faHeadset}/></div></Nav.Link>
                        </Nav>
                    </Navbar.Brand>
                    </Nav>
                  </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>

        <div className="tmp6-header" style={{backgroundColor: `${getStarting?.primaryColor}`}}>
          <Navbar collapseOnSelect expand="lg" variant="dark">
            <Container>
              {/* <Navbar.Brand as={HashLink} to="/home#home">
                <Nav className="">
                  <Nav.Link href="https://www.facebook.com/" target="_blank"><span><FontAwesomeIcon icon={faBars} /></span></Nav.Link>
                </Nav>
              </Navbar.Brand> */}
              <Nav>
                  {/* <div className="tmp6-searchbar">
                    <input onBlur={handleSearchBlur} type="text" placeholder="Search anything..." />
                    <Link to='/products'>
                      <button onClick={()=>handleSearchClick(searchBlur)}><FontAwesomeIcon icon={faSearch} /></button>
                    </Link>
                  </div> */}
                  <form className="tmp6-header-form">
                      <input value={headerSearchText} onChange={handleSearchChange} onKeyPress={handleSearchKeypress} type="text" placeholder="Search here..."/>
                      <span onClick={() => setHeaderSearchText('')} style={{position: 'absolute', right: '90px', top: '12px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                          <FontAwesomeIcon icon={faTimes}/>
                      </span>
                      <Link to="/products">
                          <button onClick={()=> handleSearchClick(headerSearchText)} className="search-btn" style={{backgroundColor: `#736a6a`, color: '#fff'}}><FontAwesomeIcon icon={faSearch}/></button>
                      </Link>
                      {   
                          headerSearchText.length > 0 ?
                          <div className="tmp6-suggestSearch" style={{padding: displayProducts.length === 0 ? '0px' : '15px 20px', display: headerSuggestBox === false ? 'block' : 'none'}}>
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
              <Nav onClick={handleClearAllProductsPage}>
                <Nav>
                  {/* <div className="tmp6-dropdown-container">
                    <button className="tmp6-dropbtn">My Account</button>
                    <div className="tmp6-dropdown-content">
                      {
                        user?.phone ?
                        <>
                          <Link to="/">Welcome to Qcoom !</Link>
                          <Link to="/dashBoard">Dashboard</Link>
                          <Link to="/login" onClick={handleLogout}>LogOut</Link>
                        </>
                        :
                        <Link to="/login">Sign in</Link>
                      }
                        <Link to="/">Welcome to Qcoom !</Link>
                        <Link to="/dashBoard">Dashboard</Link>
                        <Link to="/login" onClick={handleLogout}>LogOut</Link>
                      </div>
                  </div> */}
                </Nav>
                {
                  user?.phone ?
                  <NavDropdown title="My Account" id="collasible-nav-dropdown">
                    {/* <NavDropdown.Item href="#action/3.1">Welcome to Qcoom !</NavDropdown.Item> */}
                    <NavDropdown.Item as={Link} to="/dashBoard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/login" onClick={handleLogout}>LogOut</NavDropdown.Item>
                  </NavDropdown>
                  :
                  <NavDropdown title=" My Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item as={Link} to="/login">Sign in</NavDropdown.Item>
                  </NavDropdown>

                }
                {/* <NavDropdown title="My Account" id="collasible-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Welcome to Qcoom !</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/dashBoard">Dashboard</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="/login" onClick={handleLogout}>LogOut</NavDropdown.Item>
                  </NavDropdown> */}
                {/* <Nav.Link href="https://www.facebook.com/" target="_blank"><span className="header-cart"><FontAwesomeIcon icon={faCartPlus} /><strong><sup style={{color: `${getStarting.primaryColor}`}}>{cartLength === 0 ? '' : cart.length}</sup></strong></span></Nav.Link> */}
                <Nav.Link as={Link} to="/cart"><span className="tmp6-header-cart"><FontAwesomeIcon icon={faCartPlus} /><strong><sup style={{color: '#fff'}}>{cart?.length === 0 ? '' : cart?.length}</sup></strong></span></Nav.Link>
              </Nav>
            </Container>
          </Navbar>
        </div>
        <MobileHeader></MobileHeader>
        <MobileFooter></MobileFooter>
      </div>
    </>

  );
};

export default Header;


