import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import './Orders.css';
import useAuth from '../../../hooks/useAuth';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Chip from "@mui/material/Chip";
import Paper from "@mui/material/Paper";
import moment from "moment";

const Orders = () => {
    const {getStarting, dashboardOrders, handleProductOrders} = useAuth();
    const navigate = useNavigate();

    const handleOrderDetails = (_id) => {
        navigate(`/invoice/${_id}`);
    }

    useEffect(() => {
        handleProductOrders();
    },[])
    return (
      <div className="tmp-orders-container">
        <h3 style={{ margin: "20px 10px 10px 10px" }}>Orders</h3>
        {dashboardOrders?.length === 0 ? (
          <div className="text-center">
            <h5 style={{ color: `#757575`, margin: "20px 0" }}>
              There are no items
            </h5>
            <Link to="/">
              <Button
                variant="primary"
                style={{
                  backgroundColor: `${getStarting.primaryColor}`,
                  border: "none",
                }}
              >
                Back Home
              </Button>
            </Link>
          </div>
        ) : (
          //     <Table hover responsive style={{border: `0.1px solid ${getStarting?.primaryColor}`}}>
          //     <thead>
          //         <tr>
          //             <th>Invoice_id</th>
          //             <th>Order_date</th>
          //             <th>Order_status</th>
          //             <th>Total_bill</th>
          //             <th>Total_due</th>
          //             <th>Action</th>
          //         </tr>
          //     </thead>
          //     {
          //         dashboardOrders?.slice(0).reverse().map((order, i) => <tbody key={i}>
          //             <tr>
          //                 <td>{order.invoice_id}</td>
          //                 <td>{order.order_date.slice(0, 10)}</td>
          //                 <td>{
          //                         (order.order_status === 1 && <span style={{ color: '#2196f3'}}>Pending</span>) ||
          //                         (order.order_status === 2 && <span style={{ color: '#0b62a7'}}>Processing</span>) ||
          //                         (order.order_status === 4 && <span style={{ color: '#19573a'}}>Delivered</span>) ||
          //                         (order.order_status === 5 && <span style={{ color: '#dc3545'}}>Cancel</span>) ||
          //                         (order.order_status === 6 && <span style={{ color: '#dc3545'}}>Return</span>)
          //                     }
          //                 </td>
          //                 <td>{order.total_bill}</td>
          //                 <td>{order.total_due}</td>
          //                 <td>
          //                     <Button onClick={() => handleOrderDetails(order._id)} style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}><FontAwesomeIcon icon={faEye} /> <span>View</span></Button>
          //                 </td>
          //             </tr>
          //         </tbody>
          //     )}
          // </Table>
          <div style={{ width: "100%", marginTop: "10px" }}>
            <TableContainer component={Paper} style={{ width: "100%" }}>
              <Table
                sx={{ minWidth: 650 }}
                aria-label="simple table"
                // style={{ width: "100%" }}
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Order Date</TableCell>
                    <TableCell align="left">Order ID</TableCell>
                    <TableCell align="left">Order Status</TableCell>
                    <TableCell align="left">Total Bill</TableCell>
                    <TableCell align="left">Total Due</TableCell>
                    <TableCell align="left">Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dashboardOrders
                    ?.slice(0)
                    .reverse()
                    .map((parcel, i) => (
                      <TableRow
                        key={i}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell align="left">
                          {/* {parcel.order_date.format("MMM D, YYYY")} */}
                          {moment(parcel.order_date).format("MMM D, YYYY")}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {parcel.order_id}
                        </TableCell>
                        <TableCell align="left">
                          <Chip
                            label={
                              (parcel.order_status === 1 && (
                                <span style={{ color: "#2196f3" }}>
                                  Pending
                                </span>
                              )) ||
                              (parcel.order_status === 2 && (
                                <span style={{ color: "#0b62a7" }}>
                                  Processing
                                </span>
                              )) ||
                              (parcel.order_status === 4 && (
                                <span style={{ color: "#19573a" }}>
                                  Delivered
                                </span>
                              )) ||
                              (parcel.order_status === 5 && (
                                <span style={{ color: "#dc3545" }}>Cancel</span>
                              )) ||
                              (parcel.order_status === 6 && (
                                <span style={{ color: "#dc3545" }}>Return</span>
                              ))
                            }
                            // onClick={handleClick}
                          />
                        </TableCell>
                        <TableCell align="left">{parcel.total_bill}</TableCell>

                        <TableCell align="left">{parcel.total_due}</TableCell>
                        <TableCell align="left">
                          <Button
                            onClick={() => handleOrderDetails(parcel._id)}
                            style={{
                              backgroundColor: `${getStarting?.primaryColor}`,
                              border: "none",
                            }}
                          >
                            <FontAwesomeIcon icon={faEye} /> <span>View</span>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        )}
      </div>
    );
};

export default Orders;

