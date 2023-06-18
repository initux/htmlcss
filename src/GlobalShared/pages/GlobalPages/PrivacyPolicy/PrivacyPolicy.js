import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import HTMLRenderer from 'react-html-renderer';
import useAuth from '../../../hooks/useAuth';

const PrivacyPolicy = () => {
    const {additionalInfo, handleAdminProfile} = useAuth();
    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div style={{ padding: '30px 0px'}}>
            <Container>
             <HTMLRenderer
                html={additionalInfo?.privacy_policy || 'privacy_policy'}    
            />
            </Container>
        </div>
    );
};

export default PrivacyPolicy;