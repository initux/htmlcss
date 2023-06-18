import React, { useEffect, useState } from 'react';
import { Container, Dropdown, Nav, Navbar, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faCartPlus, faTimes, faSignOutAlt  } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { Link } from 'react-router-dom';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooter from './../../../GlobalShared/pages/Shared/MobileFooter/MobileFooter';

const Header = () => {
  const {headerSearchText, setHeaderSearchText, headerSuggestBox, setHeaderSuggestBox, handleSearchClick, handleSearch, handleSuggestClick,
           handleLogout, cart, displayProducts, getStarting, categories, categoriesCheckbox, handleAllCategory, handleCategory, selectedCategory,
            handleClearAllProductsPage, handleClearWithoutCategories} = useAuth();
  
  

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
      handleAllCategory();
  }, [])
  return (
    <>
      <style type="text/css">
          {
            ` 
              .tmp18-header-form{
                border: 2px solid ${getStarting?.primaryColor};
                border-radius: 5px;
              }
              .tmp18-header-form .btn-success {
                color: #666 !important;
                background-color: transparent !important;
                border: none !important;
                font-size: 14px !important;
                padding-top: 13px !important;
              }
              .tmp18-header-form .btn:focus {
                outline: 0;
                box-shadow: none !important;
             }
             .tmp18-header-form .dropdown-item {
              font-size: 14px !important;
            }
            .tmp18-suggestSearch .suggest-search-btn:hover {
              color: ${getStarting?.primaryColor} !important;
            }
            .tmp18-header-form .dropdown-item:active, .tmp18-header-cart span {
              background: ${getStarting?.primaryColor} !important;
            }
            `
          }
      </style>
      <div className="tmp18-top-header" style={{backgroundColor: '#9e9e9e33'}}>
          <Navbar collapseOnSelect expand="lg"  variant="dark">
            <Container>
              <Navbar.Toggle aria-controls="responsive-navbar-nav" />
              <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="ms-auto" onClick={handleClearAllProductsPage}>
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/products">Products</Nav.Link>
                  <Nav.Link as={Link} to="/about">About</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
                  {
                    user?.phone ?
                    <Nav.Link as={Link} to="/dashboard">Dashboard</Nav.Link>
                    :
                    ''
                  } 
                  {
                    user?.phone ?
                    <Nav.Link as={Link} to="/login" onClick={handleLogout}>LogOut <FontAwesomeIcon icon={faSignOutAlt}/></Nav.Link>
                    :
                    <>
                      <Nav.Link as={Link} to="/login" style={{padding: '0px !important'}}>Login</Nav.Link>
                      <span> / </span>
                      <Nav.Link as={Link} to="/register" style={{padding: '0px !important'}}>Sign Up</Nav.Link>
                    </>

                  } 
                </Nav>
              </Navbar.Collapse>
            </Container>
          </Navbar>
      </div>

      <div className="tmp18-header sticky-top" style={{backgroundColor: '#fff', borderBottom: '1px solid #f2f3f8'}}>
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
                <form className="tmp18-header-form">
                    <input value={headerSearchText} onChange={handleSearchChange} onKeyPress={handleSearchKeypress} type="text" placeholder="Search here..."/>
                    <span onClick={() => setHeaderSearchText('')} style={{position: 'absolute', right: '200px', top: '12px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    <Dropdown onClick={() => setHeaderSuggestBox(true)}>
                        <Dropdown.Toggle variant="success" id="dropdown-basic">All Categories</Dropdown.Toggle>
                           <Dropdown.Menu style={{maxHeight: '300px', overflowY: 'auto'}} onClick={handleClearWithoutCategories}>
                             {
                                categories.length === 0 ?
                                <span>Loading...</span>
                                :
                               categories?.slice(0).reverse().map(unique => <div key={unique.name}>
                                  <Dropdown.Item as={Link} to="/products" onClick={handleCategory} style={{backgroundColor: (categoriesCheckbox?.includes(unique.name) === true || selectedCategory === unique.name) ? getStarting?.primaryColor : '', color: (categoriesCheckbox?.includes(unique.name) === true || selectedCategory === unique.name) ? '#fff' : ''}}>{unique.name}</Dropdown.Item>
                                  {/* <span onClick={handleCategory} style={{marginRight: '10px', color: `${selectedCategory === unique.name ? getStarting?.primaryColor : '#666666'}`}}>{unique.name}</span> */}
                               </div> )
                             }
                          </Dropdown.Menu>
                    </Dropdown>
                    <Link to="/products">
                        <button onClick={()=> handleSearchClick(headerSearchText)} className="search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`, color: '#fff'}}><FontAwesomeIcon icon={faSearch}/></button>
                    </Link>
                    {   
                        headerSearchText.length > 0 ?
                        <div className="tmp18-suggestSearch" style={{padding: displayProducts.length === 0 ? '0px' : '15px 20px', display: headerSuggestBox === false ? 'block' : 'none'}}>
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
                    <div className="d-flex align-items-center justify-content-center" style={{width: '100%', position: 'absolute', top: '50px', left: '50%', transform: 'translateX(-50%)'}} onClick={() => setHeaderSearchText('')}>
                        {
                          categories.length === 0 ?
                          <span style={{fontSize: '12px', marginTop: '10px'}}>Loading...</span>
                          :
                          categories?.slice(-4).reverse().map(unique => <div key={unique.name} onClick={handleClearWithoutCategories}>
                            <Link to="/products">
                              {/* <Dropdown.Item as={Link} to="/products" onClick={handleCategory}>{unique.name}</Dropdown.Item> */}
                              <span onClick={handleCategory} style={{marginRight: '20px', fontSize: '12px', color: `${selectedCategory === unique.name ? getStarting?.primaryColor : '#666666'}`}}>{unique.name}</span>
                            </Link>
                          </div> )
                        }
                    </div>
                </form>
                {/* <Nav.Link as={Link} to="/cart" style={{marginLeft: '20px'}}><span className="tmp18-header-cart" style={{color: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faCartPlus} /><span>{cartLength === 0 ? 0 : cartLength}</span></span></Nav.Link> */}
            </Nav>
            <Nav>
              <Nav.Link as={Link} to="/cart"><span className="tmp18-header-cart" style={{color: '#000'}}><FontAwesomeIcon icon={faCartPlus} /><span>{cart?.length === 0 ? 0 : cart?.length}</span></span></Nav.Link>
            </Nav>
            <Nav>
              {/* <img src="https://icms-image.slatic.net/images/ims-web/59fc18b3-1586-469b-8238-975c6ee6ce81.png" alt="" style={{width: '80%', marginLeft: 'auto'}}/> */}
            </Nav>
          </Container>
        </Navbar>
        {/* <Navbar collapseOnSelect expand="lg"  variant="dark">
            <Container>
              <Nav className="mx-auto">
                  <Nav.Link as={Link} to="/">Home</Nav.Link>
                  <Nav.Link as={Link} to="/about">About</Nav.Link>
                  <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
              </Nav>
            </Container>
        </Navbar> */}
        
      </div>


      <MobileHeader></MobileHeader>
      <MobileFooter></MobileFooter>
    </>

  );
};

export default Header;


