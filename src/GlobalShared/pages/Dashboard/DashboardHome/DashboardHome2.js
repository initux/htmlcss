import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import useAuth from "../../../hooks/useAuth";
import Avatar from "@mui/material/Avatar";
const DashboardHome2 = () => {
  const { getStarting, customer, dashboardOrders, handleProductOrders } =
    useAuth();
  const [pending, setPending] = useState([]);
  const [processing, setProcessing] = useState([]);
  const [delivered, setDelivered] = useState([]);
  const [orderReturn, setOrderReturn] = useState([]);

  const dashboardData = [
    { title: "Order", order: dashboardOrders?.length },
    { title: "Pending", order: pending?.length },
    { title: "Processing", order: processing?.length },
    { title: "Delivered", order: delivered?.length },
    { title: "Return", order: orderReturn?.length },
    { title: "Cancel", order: 0 },
  ];

  useEffect(() => {
    setPending(dashboardOrders?.filter((data) => data.order_status === 1));
    setProcessing(dashboardOrders?.filter((data) => data.order_status === 2));
    setDelivered(dashboardOrders?.filter((data) => data.order_status === 4));
    setOrderReturn(dashboardOrders?.filter((data) => data.order_status === 6));
  }, [dashboardOrders]);

  useEffect(() => {
    handleProductOrders();
  }, []);
  return (
    <div>
      {/* <div className="d-flex align-items-center flex-wrap text-center"> */}
      <div className="order-count-card">
        {dashboardData?.map((data, i) => (
          <div key={i}>
            <Paper className="order-count-card-content">
              {/* <Avatar
                // src="https://img.freepik.com/premium-vector/shopping-cart-with-shopping-bags-cloud-with-5-stars-white-background-flat-design-illustration-vector-graphics_668389-101.jpg"
                src="https://cdn3.vectorstock.com/i/1000x1000/33/27/shopping-bag-icon-on-white-background-flat-style-vector-24643327.jpg"
                // src="https://static.vecteezy.com/system/resources/previews/007/872/246/original/continuous-line-drawing-shopping-cart-minimal-line-icon-on-white-background-for-icon-banner-illustration-vector.jpg"
                // src="https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif"
                sx={{ width: 56, height: 56, zIndex: '0' }}
              /> */}
              <img
                src="https://cdn.dribbble.com/users/2046015/screenshots/5973727/06-loader_telega.gif"
                alt=""
                width='65px'
              />
              <div style={{ marginLeft: "10px" }}>
                <h3 style={{ margin: "0", padding: "0" }}>{data.order || 0}</h3>
                <h6 style={{ marginBottom: "0" }}>{data.title}</h6>
              </div>
            </Paper>
          </div>
        ))}
      </div>
      {/* </div> */}
    </div>
  );
};
export default DashboardHome2;
