import React from 'react';
import { Container } from 'react-bootstrap';
import './Furniture.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog, faTools, faHistory } from '@fortawesome/free-solid-svg-icons'
import useAuth from '../../../GlobalShared/hooks/useAuth';

const furnitures = [
    {
        "id": "01",
        "icon": faCog,
        "title": "Mission",
        "description": "There are many variations of passages Lorem Ipsum available, but the majority suffered alteration in some formhumour"
    },
    {
        "id": "02",
        "icon": faTools,
        "title": "Vision",
        "description": "There are many variations of passages Lorem Ipsum available, but the majority suffered alteration in some formhumour"
    },
    {
        "id": "03",
        "icon": faHistory,
        "title": "History",
        "description": "There are many variations of passages Lorem Ipsum available, but the majority suffered alteration in some formhumour"
    },
]

const Furniture = () => {
    const {getStarting} = useAuth();
    return (
        <div className="tmp9-furniture-container">
            <Container>
                <div className="tmp9-furniture-top-section">
                    <div className="tmp9-furniture-top-left">
                        <h2 style={{color: `${getStarting.primaryColor}`}}>Custom Furniture <br/> Built Only For You</h2>
                    </div>
                    <div className="tmp9-furniture-top-right">
                        <p>There are many variations of passages Lorem Ipsum available, but the majority suffered alteration in some formhumour,</p>
                    </div>
                </div>

                <div className="tmp9-furniture-inner">
                    {
                        furnitures?.map(furniture => <div key={furniture.id} className="tmp9-furniture-inner-details" style={{backgroundColor: `${getStarting.primaryColor}`}}>
                            <div>
                                <div className="tmp9-furniture-icon" style={{color: `${getStarting.primaryColor}`}}>
                                    <FontAwesomeIcon icon={furniture.icon}/>
                                </div>
                                <h3>{furniture.title}</h3>
                                <p>{furniture.description}</p>
                            </div>
                        </div>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default Furniture;