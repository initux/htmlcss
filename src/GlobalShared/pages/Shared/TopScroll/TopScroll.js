import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import './TopScroll.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import useAuth from "../../../hooks/useAuth";

const TopScroll = () => {
  const {getStarting} = useAuth();
  const { pathname } = useLocation();

  // router top scroll
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  // top scroll
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  };

  return (
    <div className="scroll-to-top">
        <button onClick={scrollToTop} style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faArrowUp}/></button>
    </div>
  )
}

export default TopScroll