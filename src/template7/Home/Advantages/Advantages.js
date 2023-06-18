import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPagelines} from '@fortawesome/free-brands-svg-icons';
import { faMedal } from '@fortawesome/free-solid-svg-icons';
import './Advantages.css';

const advantages = [
    {
        "icon": faPagelines,
        "title": "Natural",
        "description": "Non aliqua reprehenderit reprehenderit \n culpa laboris nulla minim anim velit \n adipisicing ea aliqua alluptate sit do do"

    },
    {
        "icon": faMedal,
        "title": "Quality",
        "description": "Non aliqua reprehenderit reprehenderit \n culpa laboris nulla minim anim velit \n adipisicing ea aliqua alluptate sit do do"

    },
    {
        "icon": faPagelines,
        "title": "Natural",
        "description": "Non aliqua reprehenderit reprehenderit \n culpa laboris nulla minim anim velit \n adipisicing ea aliqua alluptate sit do do"

    }
]

const Advantages = () => {
    return (
        <div style={{backgroundColor: '#fff'}}>
            <Container>
                <div className="advantages-container">
                    {
                        advantages?.map( (advantage, i) => <div key={i}>
                            <div className="advantages-icon-container">
                                <FontAwesomeIcon icon={advantage.icon} className="advantages-icon"/>
                            </div>
                            <h4>{advantage.title}</h4>
                            <p style={{whiteSpace: 'pre'}}>{advantage.description}</p>
                        </div>)
                    }
                </div>
            </Container>
        </div>
    );
};

export default Advantages;