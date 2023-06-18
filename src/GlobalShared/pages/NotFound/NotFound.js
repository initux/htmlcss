// import React from 'react';

// const NotFound = () => {
//     document.title = '404 Error';
//     return (
//         <div className="container">
//             <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
//                 <div>
//                     <h1 className="mx-4">404</h1>
//                 </div>
//                 <div>
//                     <h5>Oops! You're lost.</h5>
//                     <p>The page you are looking for was not found.</p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default NotFound;




import React from 'react';
import sadIcon from '../../images/404-sad-icon.jpg';

const NotFound = () => {
    document.title = '404 Error';
    return (
        <div className="d-flex justify-content-center align-items-center" style={{height: '100vh'}}>
            <div>
                <div className="text-center">
                    <img src={sadIcon} style={{height: '120px'}} alt="" />
                </div>
                <div className="d-flex justify-content-center align-items-center">
                    <div>
                        <h1 className="mx-4">404</h1>
                    </div>
                    <div>
                        <h5>Oops! You're lost.</h5>
                        <p>The page you are looking for was not found.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NotFound;