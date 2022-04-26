import React from 'react';
import useServices from '../../Hooks/useServices';

const ManageUser = () => {

    const [services,setServices] = useServices();

    const handleDelete = (id) => {
        console.log(id);
        const procced = window.confirm(`Are you sure you want delete this user`);
        if (procced) {
            fetch(`http://localhost:5000/service/${id}`, {
                method: 'DELETE',
            })
            .then(res => res.json())
            .then(data => {
                const restUser = services.filter(service => service._id !== id)
                setServices(restUser);
            })
        }
    }

    return (
        <div>
            <h1 className='text-center my-4'>Mange services</h1>
            <div className='App'>
                {
                    services.map(service => <h5 key={service._id}>{service.name} <button onClick={() => handleDelete(service._id)}>Delete</button></h5>)
                }
            </div>
        </div>
    );
};

export default ManageUser;