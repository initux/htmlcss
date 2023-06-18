import React from 'react';

const ShippingInfo = ({customer, register, getStarting}) => {
    return (
        <div className="my-5 text-center">
            <h2>Billing Details</h2>
            <input placeholder="Receiver Name *" defaultValue={customer.name} {...register('receiver_name')} />
            <input placeholder="Receiver Number *"  defaultValue={customer.phone} {...register("receiver_phone")} />
            <input placeholder="Receiver Address *" defaultValue={customer.address} {...register("receiver_location")} />
            <textarea placeholder="Orders notes (Optional)" {...register("others")} style={{height: '255px'}}/>
        </div>
    );
};

export default ShippingInfo;