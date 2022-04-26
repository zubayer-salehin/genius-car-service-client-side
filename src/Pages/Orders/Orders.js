import axios from 'axios';
import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../../firebase.init';

const Orders = () => {

    const [orders, setOrders] = useState([]);
    const [user] = useAuthState(auth);
    const navigate = useNavigate();

    useEffect(() => {
        const email = user.email;
        try{
            axios.get(`http://localhost:5000/orders?email=${email}`, {
            headers: {
                authorization: `Bearer ${localStorage.getItem("accessToken")}`
            }
        })
            .then(res => {
                const { data } = res;
                setOrders(data);
            })
        }
        catch(error){
            console.log(error);
            if (error.response.status === 401 || error.response.status === 403) {
                signOut(auth);
                navigate("/login");
            }
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