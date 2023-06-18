import React, {useEffect} from 'react';
import { Container, Nav, Spinner } from 'react-bootstrap';
import CountDownTimer from './CountDownTimer.js';
import './OffCollection.css';
import useAuth from '../../../GlobalShared/hooks/useAuth';

const OffCollection = () => {
    const {additionalOffers, getStarting, handleAdminProfile} = useAuth();
    const hoursMinSecs = {days: 5, hours:0, minutes: 0, seconds: 10};

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <>
            {
                additionalOffers?.length === 0 ?
                <div style={{ color: `${getStarting?.primaryColor}`, margin: '100px 0', textAlign: 'center'}}>
                    <Spinner animation="border" />
                </div>
                :
                <div className="tem8-off-collection-container" style={{backgroundImage: `url(${process.env.REACT_APP_CDN_URL + additionalOffers[6]?.image +'?w=1000&h=1000&q=100'})`}}>
                    <Container>
                            <div className="tem8-off-collection-inner">
                                <div className="tem8-off-collection">
                                    <div>
                                        <CountDownTimer hoursMinSecs={hoursMinSecs}/>
                                    </div>
                                    <div className="tem8-off-collection-right">
                                        <h2>{additionalOffers[6]?.title || 'Offer Collections'}</h2>
                                        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Porro quisquam, odit assumenda sit modi commodi esse necessitatibus temporibus aperiam veritatis eveniet!</p>
                                        <Nav.Link href={additionalOffers[6]?.link} target="_blank" style={{padding: '0px'}}>
                                            <button className="tem8-off-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>VIEW MORE</button>
                                        </Nav.Link>
                                    </div>
                                </div>
                            </div>
                    </Container>
                </div>
            }
        </>
    );
};

export default OffCollection;