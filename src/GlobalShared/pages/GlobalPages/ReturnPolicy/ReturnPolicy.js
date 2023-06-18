import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import HTMLRenderer from 'react-html-renderer';
import useAuth from '../../../hooks/useAuth';

const ReturnPolicy = () => {
    const {additionalInfo, handleAdminProfile} = useAuth();
    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <div style={{ padding: '30px 0px'}}>
            <Container>
             <HTMLRenderer
                html={additionalInfo?.return_policy || 'return_policy'}    
            />
            </Container>
        </div>
    );
};

export default ReturnPolicy;