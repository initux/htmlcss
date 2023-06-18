import React, { useContext, useState } from 'react';
import { Container, Nav, Navbar, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch, faUser, faSignOutAlt, faTimes} from '@fortawesome/free-solid-svg-icons'
import './Header.css';
import { HashLink } from 'react-router-hash-link';
import { Link, useNavigate } from 'react-router-dom';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import { SearchContext } from '../../assets/Template13';
import MobileHeader from './../../../GlobalShared/pages/Shared/MobileHeader/MobileHeader';
import MobileFooterTwo from './../../../GlobalShared/pages/Shared/MobileFooterTwo/MobileFooterTwo';

const Header = () => {
  const { getStarting, cart, handleLogout, handleSearch, handleClearAllProductsPage} = useAuth();
  // const [searchText, setSearchText] = useState('');
  const [searchText, setSearchText] = useContext(SearchContext)
  // const {searchResult} = useParams();
  const navigate = useNavigate();

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

  const handleSearchChange = e => {
    handleSearch(e.target.value);
    setSearchText( e.target.value );
    navigate(`/search/${e.target.value}`);
}

const handleSearchKeypress = e => {
  if (e.key === 'Enter') {
    const productElement = document.getElementById('product')
    if(productElement){
        setTimeout(() => {
            window.scrollTo({
                behavior: productElement ? "smooth" : "auto",
                top: productElement ? productElement.offsetTop - 100 : 0
            });
       },500)
    }
  }
};
const handleSearchClick = e => {
    const productElement = document.getElementById('product')
    if(productElement){
        setTimeout(() => {
            window.scrollTo({
                behavior: "smooth",
                top: productElement.offsetTop - 100
            });
       },100)
    }
};

// const handleSearchFocus = () => {
//   alert('hi')
// }
//  useEffect(() => {
  // if(searchText?.length > 0 ){
  //   handleSearchFocus();
  // }
//  }, [searchText])

  // console.log(searchResult)
  // onClick={handleSearchFocus}
  return (
    <>
      <div className="tmp13-header sticky-top">
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand as={HashLink} to="/" style={{width: '300px'}}>
                {   getStarting.logo ?
                    <div style={{maxWidth: '200px'}} onClick={() => setSearchText('')}>
                        <img src={process.env.REACT_APP_CDN_URL + getStarting.logo} style={{width: '45%'}} alt="" />
                    </div>
                    :
                    <div className="mx-auto" style={{maxWidth: '200px', color: `${getStarting?.primaryColor}`}}>
                        <Spinner animation="border" variant="danger"/>
                    </div>
                }
            </Navbar.Brand>
            <Nav className="ms-auto">
                {/* <Nav.Link as={Link} to="/">Home</Nav.Link>
                <Nav.Link as={Link} to="/about">About</Nav.Link>
                <Nav.Link as={Link} to="/contact">Contact</Nav.Link> */}
                <form className="search">
                    <input value={searchText}  onChange={handleSearchChange} onKeyPress={handleSearchKeypress} type="text" placeholder="Search here..." />
                    <span onClick={() => setSearchText('')} style={{position: 'absolute', right: '100px', top: '21px', color: `${getStarting?.primaryColor}`, cursor: 'pointer'}}>
                        <FontAwesomeIcon icon={faTimes}/>
                    </span>
                    {/* <HashLink to="/#product">
                        <button onClick={handleSearchClick} className="search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faSearch}/></button>
                    </HashLink> */}
                    <Link to="/search">
                        <button onClick={handleSearchClick} className="search-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faSearch}/></button>
                    </Link>
                </form>
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
                {/* <Nav.Link as={Link} to="/products" onClick={handleClearAllProductsPage}>All Products</Nav.Link> */}
                { 
                    user?.phone ?
                    <Nav.Link as={Link} to="/dashboard" onClick={() => setSearchText('')}>Dashboard</Nav.Link>
                    :
                    ''
                }
                {
                    user?.phone?
                    <Nav.Link as={Link} to="/login" onClick={() => setSearchText('')}><button onClick={handleLogout} style={{border: 'none', backgroundColor: 'transparent'}}>Logout <FontAwesomeIcon icon={faSignOutAlt}/></button></Nav.Link>
                    :
                    <Nav.Link as={Link} to="/login" onClick={() => setSearchText('')}><FontAwesomeIcon icon={faUser}/> Login</Nav.Link>
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


