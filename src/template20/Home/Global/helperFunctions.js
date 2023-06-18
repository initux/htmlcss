import React, { useState } from 'react';
import Swal from 'sweetalert2/dist/sweetalert2.js';

const OrderSubmitHandler = ({
  selectedProduct,
  receiver_name,
  receiver_phone,
  receiver_address,
  getStarting,
  setMessage,
  setSelectedProduct,
  setOpen,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrderSubmit = () => {
    // Check if the form is already being submitted
    if (isSubmitting) {
      return;
    }

    if (!selectedProduct) return;
    if (!receiver_name || !receiver_phone || !receiver_address) {
      setMessage('সব তথ্য পূরণ করুন');
      return;
    }

    // Validate phone number using a regular expression
    const phoneRegex = /^(01[3-9]|8801[3-9])\d{8}$/;
    if (!phoneRegex.test(receiver_phone)) {
      setMessage('সঠিক মোবাইল নম্বর লিখুন');
      return;
    }

    // Disable the "Send" button
    setIsSubmitting(true);

    // Submit the order data
    let data = {};
    let products = [];
    products.push({
      prod_id: selectedProduct._id,
      quantity: 1,
    });
    data.products = products;
    data.payment_amount = 0;
    data.payment_method = 'cash';
    data.receiver_name = receiver_name;
    data.receiver_phone = receiver_phone;
    data.receiver_location = receiver_address;
    fetch(`${process.env.REACT_APP_BASE_URL}api/productOrders/withoutCustomer`, {
      method: 'POST',
      headers: {
        authorization: `Bearer ${getStarting.token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log('result : ', result);
        setOpen(false);
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: `${result.message}`,
          showConfirmButton: false,
          timer: 2000,
        });
        setSelectedProduct(null);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        // Re-enable the "Send" button
        setIsSubmitting(false);
      });
  };

  return handleOrderSubmit;
};

export default OrderSubmitHandler;
