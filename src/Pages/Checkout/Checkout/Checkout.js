import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import auth from '../../../firebase.init';

const Checkout = () => {

    const { serviceId } = useParams();
    const [service, setService] = useState({});
    const [user] = useAuthState(auth);

    useEffect(() => {
        fetch(`https://warm-cliffs-38517.herokuapp.com/service/${serviceId}`)
            .then(res => res.json())
            .then(data => setService(data))
    }, [serviceId])

    const handlePlaceOrder = e => {
        e.preventDefault();
        const order = {
            email: user.email,
            service: service.name,
            serviceId: serviceId,
            address: e.target.address.value,
            phone: e.target.phone.value
        }

        axios.post('https://warm-cliffs-38517.herokuapp.com/order', order)
            .then(response => {
                const { data } = response;
                if (data.insertedId) {
                    toast('Your order is booked!!!');
                    e.target.reset();
                }
            })
    }

    return (
        <div>
            <h2 className='text-center mt-3'>please order {service.name}</h2>
            <div className="w-50 mx-auto">
                <form onSubmit={handlePlaceOrder}>
                    <input type="text" className='w-100 mb-3' name="name" value={user?.displayName} id="" placeholder='Enter your name' required readOnly disabled /><br />

                    <input type="text" className='w-100 mb-3' name="email" value={user?.email} id="" placeholder='Enter your email' required readOnly disabled /><br />

                    <input type="text" className='w-100 mb-3' name="service" id="" value={service?.name} placeholder='Enter your service' required readOnly disabled /><br />

                    <input type="text" className='w-100 mb-3' name="address" id="" placeholder='Enter your address' autoComplete='off' required /><br />

                    <input type="text" className='w-100 mb-3' name="phone" id="" placeholder='Enter your phone' required /><br />

                    <input className='btn btn-primary' type="submit" value="Place Order" />
                </form>
            </div>
        </div>
    );
};

export default Checkout;