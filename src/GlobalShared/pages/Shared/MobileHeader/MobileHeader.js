import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './MobileHeader.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import useAuth from '../../../hooks/useAuth';
import { Spinner } from 'react-bootstrap';
import CallIcon from "@mui/icons-material/Call";


const MobileHeader = () => {
    const { headerSearchText, setHeaderSearchText, headerSuggestBox, handleSuggestClick, setHeaderSuggestBox,
            handleSearch, handleSearchClick, displayProducts, getStarting } = useAuth();
    const [mobileSearchBox, setMobileSearchBox] = useState(false);

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

    const handleMobileSearchBoxClose = () => {
        setMobileSearchBox(!mobileSearchBox);
        setHeaderSearchText('');
    };
    return (
      <>
        <style type="text/css">
          {`
                    .tmp-header-mobile-form .suggest-search-btn:hover{
                        color: ${getStarting?.primaryColor};
                    }
                    `}
        </style>
        <div
          className="tmp-header-mobile-logo sticky-top"
          style={{ backgroundColor: `${getStarting?.primaryColor}` }}
        >
          {mobileSearchBox === false ? (
            <div className="d-flex align-items-center justify-content-between">
              <Link to="/">
                {getStarting.logo ? (
                  <img
                    src={process.env.REACT_APP_CDN_URL + getStarting.logo}
                    style={{ height: "32px" }}
                    alt=""
                  />
                ) : (
                  <div
                    className="mx-auto"
                    style={{ color: `${getStarting?.primaryColor}` }}
                  >
                    Logo Here
                  </div>
                )}
              </Link>

              <div className="d-flex">
                <div
                  //   onClick={() => setMobileSearchBox(!mobileSearchBox)}
                  style={{
                    color: `${getStarting?.primaryColor}`,
                    backgroundColor: "#F6F6F6",
                    width: "35px",
                    height: "35px",
                    lineHeight: "35px",
                    borderRadius: "5px",
                  }}
                >
                  {/* <FontAwesomeIcon
                    icon={faSearch}
                    onClick={() => setHeaderSearchText("")}
                  /> */}
                  <a
                    href={`tel:${getStarting?.phone}`}
                    style={{ color: `${getStarting?.primaryColor}` }}
                  >
                    <CallIcon />
                  </a>
                </div>
                &nbsp;&nbsp;
                <div
                  onClick={() => setMobileSearchBox(!mobileSearchBox)}
                  style={{
                    color: `${getStarting?.primaryColor}`,
                    backgroundColor: "#F6F6F6",
                    width: "35px",
                    height: "35px",
                    lineHeight: "35px",
                    borderRadius: "5px",
                  }}
                >
                  <FontAwesomeIcon
                    icon={faSearch}
                    onClick={() => setHeaderSearchText("")}
                  />
                </div>
              </div>
            </div>
          ) : (
            <div
              className="d-flex align-items-center justify-content-between"
              style={{ transition: "2s" }}
            >
              <span
                onClick={handleMobileSearchBoxClose}
                style={{ fontSize: "23px", color: "#fff" }}
              >
                ←
              </span>
              <form className="tmp-header-mobile-form">
                <div style={{ position: "relative" }}>
                  <input
                    value={headerSearchText}
                    onChange={handleSearchChange}
                    onKeyPress={handleSearchKeypress}
                    type="text"
                    placeholder="Search here..."
                  />
                  <span
                    onClick={() => setHeaderSearchText("")}
                    style={{
                      position: "absolute",
                      right: "10px",
                      top: "6px",
                      color: `${getStarting?.primaryColor}`,
                      cursor: "pointer",
                    }}
                  >
                    <FontAwesomeIcon icon={faTimes} />
                  </span>
                </div>
                <Link to="/products">
                  <button
                    onClick={() => handleSearchClick(headerSearchText)}
                    className="search-btn"
                  >
                    <FontAwesomeIcon icon={faSearch} />
                  </button>
                </Link>
                {headerSearchText.length > 0 ? (
                  <div
                    className="tmp-header-mobile-suggestSearch"
                    style={{
                      padding:
                        displayProducts.length === 0 ? "0px" : "15px 20px",
                      display: headerSuggestBox === false ? "block" : "none",
                    }}
                  >
                    {displayProducts?.map((product) => (
                      <div key={product._id}>
                        <Link to="/products">
                          <button
                            onClick={() => suggestClick(product.name)}
                            className="suggest-search-btn"
                          >
                            <span className="tmp-header-mobile-search-text-line-climb">
                              {product.name}
                            </span>
                          </button>
                        </Link>
                      </div>
                    ))}
                  </div>
                ) : (
                  ""
                )}
              </form>
            </div>
          )}
        </div>
      </>
    );
};

export default MobileHeader;