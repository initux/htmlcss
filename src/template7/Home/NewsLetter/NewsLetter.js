import React, {useEffect} from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap';
import useAuth from '../../../GlobalShared/hooks/useAuth';
import './NewsLetter.css';
import blankNewsLetterImage from '../../../GlobalShared/images/offer-card.jpg';

const NewsLetter = () => {
    const {additionalOffers, getStarting, handleAdminProfile} = useAuth();

    useEffect(() => {
        handleAdminProfile();
    },[])
    return (
        <Container>
            <div className="tem7-newsLetter-container">
                <div className="tem7-newsLetter-left">
                    {/* <img src="https://beshop-demo.vercel.app/assets/img/subscribe-img.png" className="w-100" alt="" /> */}
                    <img src={additionalOffers[1]?.image === undefined ? blankNewsLetterImage : process.env.REACT_APP_CDN_URL + additionalOffers[1]?.image + '?w=800&h=800&q=100'} className="w-100" alt="" />
                </div>
                <div className="tem7-newsLetter-right-container">
                    <div className="tem7-newsLetter-right">
                        <h3>{additionalOffers[1]?.title || 'News Letter'}</h3>
                        <p>Nourish your skin with toxin-free cosmetic roducts.</p>

                        <Form>
                            <Row className="align-items-center">
                                <Col xs="auto">
                                    <Form.Label htmlFor="inlineFormInput" visuallyHidden>Enter your email</Form.Label>
                                    <Form.Control className="mb-2" id="inlineFormInput" placeholder="Enter your email"/>
                                </Col>
                                <Col xs="auto">
                                    <Button type="submit" className="mb-2" style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}>Subscribe</Button>
                                </Col>
                            </Row>
                        </Form>
                    </div>
                </div>
            </div>
        </Container>
    );
};

export default NewsLetter;