import React from 'react';
import { Container, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faMobileAlt, faEnvelope } from '@fortawesome/free-solid-svg-icons';
import './Contact.css';
import useAuth from '../../../hooks/useAuth';


const Contact = () => {
    const {getStarting} = useAuth();
    const handleSubmit = () => {
        console.log('Submit')
    }
    return (
        <Container>
            <div className="tmp-contact-container py-5">
                <div>
                    <h2 className="mb-4">Contact Info</h2>
                    <div>
                        <div className="d-flex align-items-center mb-4">
                            <span style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faMapMarkerAlt} /></span>
                            <div>
                                <h6>{getStarting?.address}</h6>
                            </div>
                        </div>
                        <div className="d-flex align-items-center mb-4">
                            <span style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faMobileAlt} /></span>
                            <div>
                                <h6>{getStarting?.phone}</h6>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <span style={{backgroundColor: `${getStarting?.primaryColor}`}}><FontAwesomeIcon icon={faEnvelope} /></span>
                            <div>
                                <h6>{getStarting?.email}</h6>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-3">
                    <h2 className="mb-4">Contact Form</h2>
                    <form onSubmit={handleSubmit} className="row g-3">
                        <div className="col-md-12" style={{marginBottom: '-12px'}}>
                            <label htmlFor="name">Name</label>
                        </div>
                        <div className="col-md-12">
                            <input className="w-100" id="name" type="text" name="name" placeholder="Name..."/>
                        </div>

                        <div className="col-md-12" style={{marginBottom: '-12px'}}>
                            <label htmlFor="email">Email</label>
                        </div>
                        <div className="col-md-12">
                            <input className="w-100" id="email" type="email" name="email" placeholder="Email..."/>
                        </div>

                        <div className="col-md-12" style={{marginBottom: '-12px'}}>
                            <label htmlFor="phone">Phone number</label>
                        </div>
                        <div className="col-md-12">
                            <input className="w-100" id="phone" type="text" name="text" placeholder="phone..."/>
                        </div>
                        <div className="col-md-12">
                            <textarea id="message" name="message" className="w-100 p-2" style={{height:'100px'}} placeholder="Message..."/>
                        </div>
                        <button type="submit"  className="tmp-contact-btn" style={{backgroundColor: `${getStarting?.primaryColor}`}}>Send Message</button>
                    </form>
                </div>
            </div>
        </Container>
    );
};

export default Contact;