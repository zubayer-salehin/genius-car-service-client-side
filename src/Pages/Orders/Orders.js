import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../../firebase.init';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);

    useEffect(() => {
        const email = user.email;
        try {
            axios.get(`https://warm-cliffs-38517.herokuapp.com/orders?email=${email}`)
                .then(res => {
                    const { data } = res;
                    setOrders(data);
                })
        }
        catch (error) {
            console.log(error);
        }
    }, [user])

    return (
        <div className='App mt-4'>
            <h2>Orders porduct are here</h2>
            {orders?.map(order => <li key={order._id}>{order?.name}-{order?.email}-{order?.service}</li>)}
        </div>
    );
};

export default Orders;