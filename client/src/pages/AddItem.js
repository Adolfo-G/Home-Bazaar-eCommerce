import React, { useState} from 'react';
import { Link } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import {ADD_LIST_ITEM} from '../utils/mutations';
import { QUERY_USER} from '../utils/queries';

import Auth from '../utils/auth';


const AddItemForm = () => {
    const email = Auth.getProfile().data.email
    const {loading:ApolloLoading, data:ApolloData}= useQuery(QUERY_USER,
        { variables: { email: email } }
    )
    const cUser= ApolloData?.user || [];
    const username = cUser.username
    console.log()
    const [item, setItem] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock]=useState('')
    const [price, setPrice]=useState('')
    
    const [addItem, { data, loading, error }] = useMutation(ADD_LIST_ITEM);
    if(loading){return "Loading"}
    
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        
        try {
            const { data } = await addItem({
                variables: {
                    username: username,
                    item,
                    description,
                    stock:parseInt(stock),
                    price,
                },
            });

            setItem('');
            setDescription('');
            setStock('');
            setPrice('');
            window.location.assign('/');
        } catch (err) {
            console.error(err);
        }
    };

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'item' && value.length <= 280) {
            setItem(value);
        }
        if (name === 'description' && value.length <= 280) {
            setDescription(value);
        }
        if (name === 'stock' && value.length <= 10) {
            setStock(value);
        }
        if (name === 'price' && value.length <= 10) {
            setPrice(value);
        }
    };

    return (
        <>{ApolloLoading? <p>Loading</p>:
        <div className="add-container">
            <h2 className='add-title'>Add Post</h2>

            {Auth.loggedIn() ? (
                <>
                    <form
                        className=""
                        onSubmit={handleFormSubmit}
                    >
                        <div className="add-item-name">
                            <input
                                name="item"
                                placeholder="Item Name"
                                value={item}
                                className="add-form-input"
                                onChange={handleChange}
                            />
                        </div>
                        <div className="">
                            <textarea
                                placeholder="Description"
                                className="add-form-input"
                                id="post-content"
                                name="description"
                                value={description}
                                onChange={handleChange}
                            ></textarea>
                        </div>

                        <div className="">
                            <input
                                name="stock"
                                placeholder="# Amount in stock"
                                value={stock}
                                className="add-form-input"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="">
                            <input
                                name="price"
                                placeholder="Price"
                                value={price}
                                className="add-form-input"
                                onChange={handleChange}
                            />
                        </div>

                        <div className="">
                            <button className="add-button" type="submit">
                                Create
                            </button>
                        </div>
                        {error && (
                            <div className="">
                                {error.message}
                            </div>
                        )}
                    </form>
            </>
            ) : (
                <p>
                    You need to be logged in to share your thoughts. Please{' '}
                    <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                </p>
            )}
        </div>
}</>
    );
};

export default AddItemForm;
