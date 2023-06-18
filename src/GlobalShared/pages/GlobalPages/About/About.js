import React, { useEffect } from 'react';
import HTMLRenderer from 'react-html-renderer';
import { Container } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import { Helmet } from 'react-helmet';

const About = () => {
    const { getStarting, additionalInfo, handleAdminProfile } = useAuth();
    document.title = `About Us | ${getStarting.companyName}`;
    //<meta name="description" content={'About Us' | getStarting.companyName}/>
    

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        
        <div style={{ padding: '30px 0px'}}>

            <Container>
                <HTMLRenderer
                    html={additionalInfo.about}    
                />
            </Container>
        </div>
    );
};

export default About;