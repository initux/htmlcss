import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './Services.css';

const servicesData = [
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/noRuzDnb2zImWhtqcGN1sj51fkpZ7fSLrsgWTZ6K.png',
        "title": 'fast delivery guranteed'
    },
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/1NTI5iA96pc4bgLC4aINpGQsveg48e3hNKkrzJPB.png',
        "title": 'cash on delivery available'
    },
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/TbZIXEL1ASZ9w2pUk4dhSZs5kAsusXZIUKDAZCjW.png',
        "title": 'original authenic products'
    },
    {
        "image": 'https://kholabazaar.com.bd/public/uploads/all/TbZIXEL1ASZ9w2pUk4dhSZs5kAsusXZIUKDAZCjW.png',
        "title": 'easy return policy'
    }
];


const Services = () => {
    const {getStarting} = useAuth();
    return (
        <div style={{backgroundColor: '#fff', border: '1px solid #dee2e6'}}>
            <Container>
                <div className="tmp15-services-container">
                    <div className='tmp15-services-list'>
                        {   
                            servicesData?.length === 0 ?
                            <div style={{ color: `${getStarting?.primaryColor}`, margin: '100px 0', textAlign: 'center'}}>
                                <Spinner animation="border" />
                            </div>
                            :
                            servicesData?.map((data, i) => <div className="tmp15-services" key={i}>
                                <div style={{height: '60px'}}>
                                    <img src={data.image} style={{maxHeight: '60px', width: '100%'}} alt="" />
                                </div>
                                <h4>{data.title}</h4>
                            </div>)
                        }       
                    </div>
                </div>
            </Container>
        </div>
    );
};

export default Services;