import React from 'react';
import { useForm } from "react-hook-form";

const AddService = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data => {

        fetch('https://warm-cliffs-38517.herokuapp.com/service', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then(response => response.json())
            .then(result => {
                console.log('Success:', result);
            })
            
    };

    return (
        <div>
            <h1 className='text-center'>Services Add</h1>
            <div className='w-50 mx-auto'>
                <form className='d-flex flex-column' onSubmit={handleSubmit(onSubmit)}>
                    <input className='mb-2' placeholder='Enter your name' {...register("name", { required: true, maxLength: 20 })} />
                    <textarea className='mb-2' placeholder='please say something' {...register("description")} />
                    <input className='mb-2' placeholder='price' type="number" {...register("price")} />
                    <input className='mb-2' placeholder='Photo Url' type="text" {...register("img")} />
                    <input type="submit" value="Add Service" />
                </form>
            </div>
        </div>
    );
};

export default AddService;