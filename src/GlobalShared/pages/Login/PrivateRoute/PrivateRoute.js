import React from 'react';
import { useLocation, Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, ...rest }) => {
    const authUser = JSON.parse(localStorage.getItem('AuthInfo'));
    const starting = JSON.parse(localStorage.getItem("starting"));
    
    let location = useLocation();
    
    if (starting?.customerAuthentication && !authUser?.phone) {
      return (
        <div style={{ height: "100vh" }}>
          <Navigate to="/login" state={{ from: location }} />
        </div>
      );
    }
    return children;
};

export default PrivateRoute;