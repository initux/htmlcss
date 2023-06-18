import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Services.css';

const servicesData = [
    {
        "image": 'https://api.kholabazaar.com.bd/uploads/images/original-authenic-products.png',
        "title": 'original authenic products'
    },
    {
        "image": 'https://api.kholabazaar.com.bd/uploads/images/fast-delivery-guranteed.png',
        "title": 'fast delivery guranteed'
    },
    {
        "image": 'https://api.kholabazaar.com.bd/uploads/images/easy-return-policy.png',
        "title": 'easy return policy'
    },
    {
        "image": 'https://api.kholabazaar.com.bd/uploads/images/cash-on-delivery-available.png',
        "title": 'cash on delivery available'
    }
];


const Services = () => {
    const {getStarting} = useAuth();
    return (
        <Container>
            <div className="tmp10-services-container" style={{margin: '30px 0px'}}>
                <div className='tmp10-services-list'>
                    {   
                        servicesData?.length === 0 ?
                        <div style={{ color: `${getStarting?.primaryColor}`, margin: '100px 0', textAlign: 'center'}}>
                            <Spinner animation="border" />
                        </div>
                        :
                        servicesData?.map((data, i) => <div className="tmp10-services" key={i}>
                            <div style={{height: '60px'}}>
                                <img src={data.image} style={{maxHeight: '60px', width: '100%'}} alt="" />
                            </div>
                            <h4>{data.title}</h4>
                        </div>)
                    }       
                </div>
            </div>
        </Container>
    );
};

export default Services;