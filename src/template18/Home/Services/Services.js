import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Services.css';

const servicesData = [
    {
        "image": 'https://www.banglashoppers.com/media/wysiwyg/services/icon-1.png',
        "title": 'FREE SHIPPING!\nOn Orders Over 2000 Taka.'
    },
    {
        "image": 'https://www.banglashoppers.com/media/wysiwyg/services/icon-3.png',
        "title": 'ONLINE SUPPORT\n24/7 Everyday'
    },
    {
        "image": 'https://www.banglashoppers.com/media/wysiwyg/services/icon-4.png',
        "title": 'REWARD POINTS\nEarn 1% Cashback'
    },
    {
        "image": 'https://www.banglashoppers.com/media/wysiwyg/services/icon-5.png',
        "title": 'PAYMENT METHOD\nCredit Card, bKash & PayPal'
    }
];


const Services = () => {
    const {getStarting} = useAuth();
    return (
        <Container>
            <div className="tmp16-services-container" style={{margin: '30px 0px'}}>
                <div className='tmp16-services-list'>
                    {   
                        servicesData?.length === 0 ?
                        <div style={{ color: `${getStarting?.primaryColor}`, margin: '100px 0', textAlign: 'center'}}>
                            <Spinner animation="border" />
                        </div>
                        :
                        servicesData?.map((data, i) => <div className="tmp16-services" key={i}>
                            <div style={{backgroundColor: `${getStarting?.primaryColor}`, width: '60px', height: '60px', borderRadius: '5px'}}>
                                <img src={data.image} style={{ width: '100%'}} alt="" />
                            </div> &nbsp; &nbsp;
                            <h4 style={{whiteSpace: 'pre', lineHeight: '20px'}}>{data.title}</h4>
                        </div>)
                    }       
                </div>
            </div>
        </Container>
    );
};

export default Services;