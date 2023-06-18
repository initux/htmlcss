import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import useAuth from '../../../hooks/useAuth';
import Orders from '../Orders/Orders';
import DashboardHome2 from './DashboardHome2';

const DashboardHome = () => {
    // const { getStarting, customer, dashboardOrders, handleProductOrders} = useAuth();
    // const [pending, setPending] = useState([]);
    // const [processing, setProcessing] = useState([]);
    // const [delivered, setDelivered] = useState([]);
    // const [orderReturn, setOrderReturn] = useState([]);

    // const dashboardData = [
    //     { title: 'Order', order : dashboardOrders?.length },
    //     { title: 'Pending', order : pending?.length },
    //     { title: 'Processing', order : processing?.length },
    //     { title: 'Delivered', order : delivered?.length },
    //     { title: 'Return', order : orderReturn?.length }
    // ]

    // useEffect( () => {
    //     setPending(dashboardOrders?.filter(data => data.order_status === 1))
    //     setProcessing(dashboardOrders?.filter(data => data.order_status === 2))
    //     setDelivered(dashboardOrders?.filter(data => data.order_status === 4))
    //     setOrderReturn(dashboardOrders?.filter(data => data.order_status === 6))
    // }, [dashboardOrders])

    // useEffect(() => {
    //     handleProductOrders();
    // },[])
    return (
        <>
            <DashboardHome2 />
            <Orders />





        {/* Old code */}
        {/* <div>
          <style type="text/css">
            {`
                    .dashboard-home-content{
                        background-color: #fff;
                        border: 1px solid rgba(0,0,0,.125);
                        padding: 20px;
                        width: 200px
                    }
                    @media only screen and (min-width: 0px) and (max-width: 500px) {
                        .dashboard-home-content{
                            width: 150px
                        }
                    }
                    `}
          </style>
          <h2>
            Hello{" "}
            <span style={{ color: `${getStarting?.primaryColor}` }}>
              {customer.name}
            </span>
          </h2>
        
          <div className="d-flex align-items-center flex-wrap text-center">
            {dashboardData?.map((data, i) => (
              <div key={i}>
                <div className="dashboard-home-content">
                  <h4>{data.title}</h4>
                  <h5>{data.order || 0}</h5>
                </div>
              </div>
            ))}
          </div>
        </div> */}
      </>
    );
};

export default DashboardHome;