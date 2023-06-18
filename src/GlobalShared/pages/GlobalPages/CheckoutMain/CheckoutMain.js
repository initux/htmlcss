import React, { useEffect, useState } from 'react';
import StepProgressBar from 'react-step-progress';
import 'react-step-progress/dist/index.css';
import { Container } from 'react-bootstrap';
// import { useNavigate } from 'react-router-dom';
import useAuth from '../../../hooks/useAuth';
import Confirmation from './Confirmation';
import Payment from './Payment';
import ShippingInfo from './ShippingInfo';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2/dist/sweetalert2.js';
import './CheckoutMain.css';

const getFromLocalStorage = () => {
    const cartList = localStorage.getItem('shopping_cart')
    if(cartList) {
        return JSON.parse(localStorage.getItem('shopping_cart'))
    } else {
        return []
    }
}

const CheckoutMain = () => {
    const { cart, setCart, customer, getStarting} = useAuth(); 
    const [shoppingCart] = useState(getFromLocalStorage());
    // const navigate = useNavigate();

    const [couriers, setCouriers] = useState([]);
    const [courierName, setCourierName] = useState(''); 
    const [courierCharge, setCourierCharge] = useState(0);
    const [courierId, setCourierId] = useState();

    const [couponCode, setCouponCode] = useState('');
    const [couponCodeAmount, setCouponCodeAmount] = useState(0);

    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { register, handleSubmit, reset } = useForm()
    // console.log(customer)
    
    const getUserToken = JSON.parse(localStorage.getItem('userToken'));


    const onSubmit = (data) => {
        let products = []
        shoppingCart.map(cart => products.push({   
            'prod_id' : cart._id,
            'quantity' : cart.quantity,
            'color_id' : cart.color_id,
        }));

        data.products = products;
        data.payment_amount = 0;
        data.courier_id = courierId;
        data.coupon_code = couponCode;
        // data.receiver_name = customer.name;

        fetch(`${process.env.REACT_APP_BASE_URL}api/productOrders`, {
        method: 'POST',
        headers: {
                'authorization': `Bearer ${getUserToken}`,
                'content-type': 'application/json'
        },
        body: JSON.stringify(data),
        })
        .then(res => res.json())
        .then(result => {
            if(result.error === false){
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: `${result.message}`,
                        showConfirmButton: false,
                        timer: 2000
                    })
                    // navigate('/dashboard/orders');
            }
            else{
                Swal.fire({
                    position: 'center',
                    icon: 'error',
                    title: `${result.message}`,
                    showConfirmButton: false,
                    timer: 2000
                })
            }
            reset();
        })
        
        // all cart delete
        localStorage.removeItem('shopping_cart');
        setCart([]);
      };

      const cartPrice = cart.reduce((previous, product) => previous + product.sell_price * product.quantity, 0);

    // -------------------------------------------------------------------------
    // Courier Information
    // -------------------------------------------------------------------------

      useEffect( () => {
        fetch(`${process.env.REACT_APP_BASE_URL}api/couriers`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${getStarting.token}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(res => res.json())
        .then(data => {
            setCouriers(data.data);
        })
    }, [getStarting.token]);

    // Delivery information
    const handleDeliveryCharge = (id, name, charge) => {
        setCourierId(id)
        setCourierName(name)
        setCourierCharge(charge)
    }

    useEffect(() => {
        if(!customer)  return
        let tmp = {
            ...customer,
            receiver_name: customer.name, 
            receiver_phone: customer.phone
        }
        reset(tmp)
    },[customer,reset])

    const handleCouponCode = () => {
        fetch(`${process.env.REACT_APP_BASE_URL}api/coupon/check_validity`, {
            method: 'POST',
            headers: {
                'authorization': `Bearer ${getUserToken}`,
                'content-type': 'application/json'
            },
            body: JSON.stringify({coupon_code : couponCode})
        })
        .then(res => res.json())
        .then(data => {
            if(data.error === true) {
                setErrorMessage(data.message);
                setSuccessMessage('');
                setCouponCode('');
            }
            else{
                setCouponCodeAmount(data.amount);
                setErrorMessage('');
                setSuccessMessage(`Discount ${getStarting?.currency}${data.amount}`)
            }
        })
    }

    
    return (
        <div>
            <Container>
                <StepProgressBar
                    startingStep={0}
                    wrapperClass="progress-wrapper-custom"
                    onSubmit={handleSubmit(onSubmit)}
                    submitBtnName="Submit"
                    previousBtnName="Prev"
                    nextBtnName="Next"
                    steps={[
                    {
                        label: '1. Shipping info',
                        name: '1. Shipping info',
                        content: <ShippingInfo customer={customer} register={register} getStarting={getStarting} />
                    },
                    {
                        label: '2. Payment',
                        name: '2. Payment',
                        content: <Payment getStarting={getStarting} cartPrice={cartPrice} courierCharge={courierCharge} couponCodeAmount={couponCodeAmount}
                                            courierName={courierName} couriers={couriers} handleDeliveryCharge={handleDeliveryCharge}
                                            couponCode={couponCode} setCouponCode={setCouponCode} handleCouponCode={handleCouponCode}
                                            errorMessage={errorMessage} successMessage={successMessage}
                                    />
                    },
                    {
                        label: '3. Confirmation',
                        name: '3. Confirmation',
                        content: <Confirmation/>
                    }
                    ]}
                />
            </Container>
        </div>
    );
};

export default CheckoutMain;