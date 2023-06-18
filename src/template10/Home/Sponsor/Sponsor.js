import React from 'react';
import { Container } from 'react-bootstrap';
import Slider from "react-slick";
import useAuth from '../../../GlobalShared/hooks/useAuth';
// import './Sponsor.css';

function CustomArrow(props) {
    const { className, style, onClick } = props;
    const {getStarting} = useAuth()

    return (
      <>
        <style type="text/css">
        {
          `.customsSlider:before {
              color: ${getStarting?.primaryColor} !important;
            }
          `
        }
        </style>
        <div
          className={className + " customsSlider"}
          style={{ ...style }}
          onClick={onClick}
        />
      </>
    );
}

const Sponsor = () => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 8,
        slidesToScroll: 1,
        initialSlide: 0,
        nextArrow: <CustomArrow />,
        prevArrow: <CustomArrow />,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 6,
            }
          }, 
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 4,
            }
          }, 
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
            }
          }, 
        ]
      };

    


      const data = [
          { "image": "https://kholabazaar.com.bd/public/uploads/all/ztme5qPMl3SoL4fXPHJ3CuFhJQzp0jD8MbgqWbTH.png" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/L5w63mA09apr6THHdzmVl5aamcXchhWz2kdu9x5h.jpg" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/ffaMi73uD0HN2Su2dbs0ZXbZ41gpJvHIwYzEf1Nq.jpg" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/CFCz7T9bsuyatLGHETHymoPzeuoZu1eiKh2BAECX.jpg" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/5GWKmVyGGvCM0f4DF1oyIK1rkQ2TfKHPT7ZkhxEp.jpg" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/zGLe8T6TGTAqpZ8o0woU2qVw1nuv65yuGznMTgwl.jpg" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/HYNqtXeEumfcesTIoQ74AebkzyaqbVdFuQwvByip.jpg" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/MDDd9Q74FS7QlUOxN5jRErjRrjyoXOnJpwVtIFcE.png" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/H89mSXEv7LFRp99XBYjBwqfAENA4NjhOVEbZglYI.jpg" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/S8YeDMexMJMAHIDSpYE5Gj8oaBJL7aC6OC1poqcz.jpg" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/CSMD7otp0faRb7JiOzruIpobl0tSC9blBzECoJTi.jpg" },
          { "image": "https://kholabazaar.com.bd/public/uploads/all/JdswWAyjhmKHIsXqDxza5xNawpHLkCaplmA2aoku.png" },
      ]
    return (
        <Container>
            <div style={{backgroundColor: '#fff', padding: '20px', margin: '30px 0px', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 10%), 0 2px 4px -1px rgb(0 0 0 / 6%)'}}>
                <Slider {...settings}>
                    {
                        data?.map((item, i) => <div key={i} >
                            <div style={{padding: '40px'}}>
                              <img src={item.image} width="80%" style={{maxWidth: '100%', height: '50px', margin: '0 auto'}} alt="" />
                            </div>
                        </div>)
                    }
                </Slider>
            </div>
        </Container>
    );
};

export default Sponsor;