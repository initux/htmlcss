import React, {useEffect} from 'react';
import './VideoReview.css';
import { Container } from 'react-bootstrap';
import useAuth from '../../../../GlobalShared/hooks/useAuth';
// import PropTypes from "prop-types";

const VideoReview = () => {
    const {additionalOffers} = useAuth();

    return (
        <Container>
            {   additionalOffers?.length < 4 ?
                ''
                :
                <div className="video-review-container">
                    <div style={{borderBottom: '1px solid var(--color9)'}}>
                        <h3 style={{marginTop: '15px', marginBottom: '0px'}}>Customer Review</h3>
                    </div>
                    <div className="video-review-inner">
                        <div className="video-responsive">
                            <iframe
                            width="100px"
                            height="100px"
                            src={additionalOffers[0]?.link === '#' ? '' : additionalOffers[0]?.link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                            />
                        </div>
                        <div className="video-responsive">
                            <iframe
                            width="100%"
                            height="100%"
                            src={additionalOffers[1]?.link === '#' ? '' : additionalOffers[1]?.link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                            />
                        </div>
                        <div className="video-responsive">
                            <iframe
                            width="100%"
                            height="100%"
                            src={additionalOffers[2]?.link === '#' ? '' : additionalOffers[2]?.link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                            />
                        </div>
                        <div className="video-responsive">
                            <iframe
                            width="100%"
                            height="100%"
                            src={additionalOffers[3]?.link === '#' ? '' : additionalOffers[3]?.link}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title="Embedded youtube"
                            />
                        </div>
                    </div>
                </div>
            }
        </Container>
    );
};

// VideoReview.propTypes = {
//     embedId: PropTypes.string.isRequired
//   };

export default VideoReview;
