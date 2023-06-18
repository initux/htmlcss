import React, { useEffect, useState } from 'react';
import { Button, Container, Table } from 'react-bootstrap';
import { Link, useParams } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import './OrderDetails.css';

const OrderDetails = () => {
    const {getStarting} = useAuth();
    const [order, setOrder] = useState([]);
    const [info, setInfo] = useState({});
    const {orderId} = useParams();

    const getUserToken = JSON.parse(localStorage.getItem('userToken'));

    useEffect( () => {
        fetch(`${process.env.REACT_APP_BASE_URL}api/productOrders/${orderId}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${getUserToken}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then(data => {
            setOrder(data.order.products_list);
            setInfo(data.order);
        })
    }, [getUserToken, orderId]);

    const totalPrice = order.reduce((previous, product) => previous + product.product_price, 0);
    const GrandTotal = parseInt(totalPrice + info.delivery_charge + info.vat_tax);

    return (
        <Container>
            <style type="text/css">
                {
                    `.tmp-invoice-container .table>:not(:first-child) {
                        border-top-width: 0.1px !important;
                        border-color: ${getStarting?.primaryColor} !important;
                     }`
                }
            </style>
            <div className="tmp-invoice-container my-5">
                <div className="tmp-invoice-top">
                    <div>
                        <div style={{maxWidth: '200px'}}>
                            <img src={process.env.REACT_APP_CDN_URL + getStarting.logo} className="w-75" alt="" />
                        </div>
                        <p>{getStarting?.companyName?.length < 50 ? getStarting?.companyName : `${getStarting?.companyName.slice(0, 50)}...`}</p>
                        <p>{getStarting?.phone}</p>
                        <p>{getStarting?.email}</p>
                    </div>
                    <div className="text-end">
                        <p><strong>Invoice #{info.invoice_id}</strong></p>
                        <p>{info.order_date}</p>
                        <p>{info.receiver_name}</p>
                        <p>{info.receiver_phone}</p>
                        <p>{info.receiver_location}</p>
                    </div>
                </div>
                <div>
                {
                    order?.length === 0 ?
                    <h2 style={{ color: `${getStarting?.primaryColor}`, margin: '50px 0', textAlign: 'center'}}>No Any Product Show</h2>
                    :
                    <Table responsive style={{border: `0.1px solid ${getStarting?.primaryColor}`}}>
                        <thead>
                            <tr>
                                <th>SL.NO.</th>
                                <th>Item Name</th>
                                <th>Price</th>
                                <th>Quantity</th>
                                <th>Total</th>
                            </tr>
                        </thead>
                        {
                            order?.map((item,i) => <tbody key={i}>
                                <tr>
                                    <td>{i + 1}</td>
                                    <p style={{width: '400px', marginBottom: '0px'}}>{item.product_name}</p>
                                    <td>{item.product_price}</td>
                                    <td>{item.product_quantity}</td>
                                    <td>{item.product_price * item.product_quantity}</td>
                                </tr>
                            </tbody>                           
                        )}
                    </Table>
                }
                </div>
                <div className="tmp-invoice-bottom">
                    <div>
                        
                    </div>
                    <div>
                        <div className="text-end">
                            <p>Total amount: <span style={{fontSize: '15px'}}>{getStarting?.currency}</span>{totalPrice}</p>
                            <p>Delivery Charge: <span style={{fontSize: '15px'}}>{getStarting?.currency}</span>{info.delivery_charge}</p>
                            <p>VAT: <span style={{fontSize: '15px'}}>{getStarting?.currency}</span>{info.vat_tax}</p>
                            <h4>Grand Total: <span style={{fontSize: '25px'}}>{getStarting?.currency}</span>{GrandTotal}</h4>
                        </div>
                        <div>
                            <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}>Proceed to payment</Button>&nbsp;&nbsp;
                            <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}>Print</Button>
                        </div>
                    </div>
                </div>
            </div>
           <div className="my-5 text-center">
                <Link to="/dashboard/orders">
                    <Button style={{backgroundColor: `${getStarting?.primaryColor}`, border: 'none'}}>Back Total Order</Button>
                </Link>
           </div>
        </Container>
    );
};

export default OrderDetails;
