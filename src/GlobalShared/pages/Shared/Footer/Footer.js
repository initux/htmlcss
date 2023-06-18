import React, {useEffect} from 'react';
import { Container, Nav, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Footer.css';
import useAuth from '../../../hooks/useAuth';

// google analytics 
import ReactGA from "react-ga";
const Footer = () => {
    const { getStarting } = useAuth();
    
  // google analytics
    //  console.log("google analytics id ", getStarting.googleAnalyticsId);
  ReactGA.initialize(getStarting.googleAnalyticsId);
  ReactGA.pageview(window.location.pathname + window.location.search);

  useEffect(async () => {
    // Facebook Pixel
    const fbPixelId = getStarting.facebookPixelId;
    if (fbPixelId) {
      const { default: ReactPixel } = await import("react-facebook-pixel");
      ReactPixel.init(fbPixelId, null, {
        autoConfig: true,
        debug: true,
      });
      ReactPixel.pageView();
      ReactPixel.track("ViewContent");
    }
  
    // Execute stored JavaScript code
    const storedCode = getStarting.custom_header;
    if (storedCode) {
      try {
        // Execute the stored JavaScript code
        eval(storedCode);
      } catch (error) {
        console.error('Error executing stored JavaScript code:', error);
      }
    }
  }, []);
  

  const hostName = window.location.hostname;
  return (
    <div
      style={{ backgroundColor: `${getStarting?.primaryColor}`, zIndex: "99" }}
      className="footer-container"
    >
      <Container>
        <div className="footer py-3">
          <div>
            <div className="footer-logo">
              <Link to="/">
                {getStarting.logo ? (
                  <img
                    src={process.env.REACT_APP_CDN_URL + getStarting.logo}
                    style={{ width: "100%" }}
                    alt=""
                  />
                ) : (
                  <div
                    className="mx-auto"
                    style={{ color: `${getStarting?.primaryColor}` }}
                  >
                    <Spinner animation="border" variant="danger" />
                  </div>
                )}
              </Link>
            </div>
            <span
              className="footer-powered-by"
              style={{ fontSize: "14px", marginTop: "6px", color: "#fff" }}
            >
              {/* ©2022 by&nbsp;<Nav.Link  href={'https://' + hostName} target="_blank" style={{color: '#fff', padding: '0'}}>{hostName}</Nav.Link>&nbsp;Powered by&nbsp;<Nav.Link href="https://selfeb.com/" target="_blank" style={{color: '#000', padding: '0'}}>Selfeb</Nav.Link> */}
              Powered by&nbsp;
              <Nav.Link
                href="https://selfeb.com/"
                target="_blank"
                style={{ color: "#fff", padding: "0" }}
              >
                Selfeb
              </Nav.Link>
            </span>
          </div>
          <div className="footer-details">
            <div>
              <h4>Customer Care</h4>
              <div className="mt-4">
                <Link to="/contact">
                  <span>Contact Us</span>
                </Link>
                <Link to="/about">
                  <span>About Us</span>
                </Link>
              </div>
            </div>
            <div>
              <h4>Policy</h4>
              <div className="mt-4">
                <Link to="/privacy_policy">
                  <span>Privacy policy</span>
                </Link>
                <Link to="/return_policy">
                  <span>Refund Policy</span>
                </Link>
                {/* <Link to="/"><span>Return Policy</span></Link>
                                <Link to="/"><span>Shipping Policy</span></Link> */}
              </div>
            </div>
            <div>
              <h4>Contact Us</h4>
              <div className="mt-4">
                <Link to="/">
                  <span>{getStarting?.email}</span>
                </Link>
                <Link to="/">
                  <span>{getStarting?.phone}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;

// import React, { useEffect } from 'react';
// import { Container, Nav, Spinner } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import './Footer.css';
// import useAuth from '../../../hooks/useAuth';

// // google analytics 
// import ReactGA from "react-ga";

// const Footer = () => {
//     const { getStarting } = useAuth();

//     // google analytics
//     ReactGA.initialize(getStarting.googleAnalyticsId);
//     ReactGA.pageview(window.location.pathname + window.location.search);

//     useEffect(async () => {
//         const storedScript = localStorage.getItem('custom_header');
//         if (storedScript) {
//             const script = document.createElement('script');
//             script.textContent = storedScript;
//             document.body.appendChild(script);
//         }

//         // facebook pixel
//         const { default: ReactPixel } = await import("react-facebook-pixel");
//         ReactPixel.init(getStarting.facebookPixelId, null, {
//             autoConfig: true,
//             debug: true,
//         });
//         ReactPixel.pageView();
//         ReactPixel.track("ViewContent");
//     }, []);

//     const hostName = window.location.hostname;
//     return (
//         <div
//             style={{ backgroundColor: `${getStarting?.primaryColor}`, zIndex: "99" }}
//             className="footer-container"
//         >
//             <Container>
//                 <div className="footer py-3">
//                     <div>
//                         <div className="footer-logo">
//                             <Link to="/">
//                                 {getStarting.logo ? (
//                                     <img
//                                         src={process.env.REACT_APP_CDN_URL + getStarting.logo}
//                                         style={{ width: "100%" }}
//                                         alt=""
//                                     />
//                                 ) : (
//                                     <div
//                                         className="mx-auto"
//                                         style={{ color: `${getStarting?.primaryColor}` }}
//                                     >
//                                         <Spinner animation="border" variant="danger" />
//                                     </div>
//                                 )}
//                             </Link>
//                         </div>
//                         <span
//                             className="footer-powered-by"
//                             style={{ fontSize: "14px", marginTop: "6px", color: "#fff" }}
//                         >
//                             Powered by&nbsp;
//                             <Nav.Link
//                                 href="https://selfeb.com/"
//                                 target="_blank"
//                                 style={{ color: "#fff", padding: "0" }}
//                             >
//                                 Selfeb
//                             </Nav.Link>
//                         </span>
//                     </div>
//                     <div className="footer-details">
//                         <div>
//                             <h4>Customer Care</h4>
//                             <div className="mt-4">
//                                 <Link to="/contact">
//                                     <span>Contact Us</span>
//                                 </Link>
//                                 <Link to="/about">
//                                     <span>About Us</span>
//                                 </Link>
//                             </div>
//                         </div>
//                         <div>
//                             <h4>Policy</h4>
//                             <div className="mt-4">
//                                 <Link to="/privacy_policy">
//                                     <span>Privacy policy</span>
//                                 </Link>
//                                 <Link to="/return_policy">
//                                     <span>Refund Policy</span>
//                                 </Link>
//                             </div>
//                         </div>
//                         <div>
//                             <h4>Contact Us</h4>
//                             <div className="mt-4">
//                                 <Link to="/">
//                                     <span>{getStarting?.email}</span>
//                                 </Link>
//                                 <Link to="/">
//                                     <span>{getStarting?.phone}</span>
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </Container>
//         </div>
//     );
// };

// export default Footer;




