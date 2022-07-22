import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';

import { EDIT_LIST_ITEM } from '../utils/mutations';
import { QUERY_USER } from '../utils/queries';

import Auth from '../utils/auth';


const EditItemForm = () => {
    const params = useParams()
    console.log(params._id)
    const email = Auth.getProfile().data.email
    const { loading: ApolloLoading, data: ApolloData } = useQuery(QUERY_USER,
        { variables: { email: email } }
    )
    const cUser = ApolloData?.user || [];
    const username = cUser.username
    const [item, setItem] = useState('');
    const [description, setDescription] = useState('');
    const [stock, setStock] = useState('')
    const [price, setPrice] = useState('')
    const [editItem, { data, loading, error }] = useMutation(EDIT_LIST_ITEM);
    if (loading) { return "Loading" }
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            const { data } = await editItem({
                variables: {
                    itemId: params._id,
                    username: username,
                    item,
                    description,
                    stock: parseInt(stock),
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
        <>{ApolloLoading ? <p>Loading</p> :
            <div className="edit-container">
                <h2 className='edit-title'>Edit My Post</h2>

                {Auth.loggedIn() ? (
                    <>
                        <form
                            className="edit-form"
                            onSubmit={handleFormSubmit}
                        >
                            <div className="edit-item-name">
                                <input
                                    name="item"
                                    placeholder="Item Name"
                                    value={item}
                                    className="edit-form-input"
                                    onChange={handleChange}
                                />
                            </div>
                            <div className="">
                                <textarea
                                    placeholder="Description"
                                    className="edit-form-input"
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
                                    className="edit-form-input"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="">
                                <input
                                    name="price"
                                    placeholder="Price"
                                    value={price}
                                    className="edit-form-input"
                                    onChange={handleChange}
                                />
                            </div>

                            <div className="">
                                <button className="edit-button" type="submit">
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
                        You need to be logged in to edit. Please{' '}
                        <Link to="/login">login</Link> or <Link to="/signup">signup.</Link>
                    </p>
                )}
            </div>
        }</>
    );
};

export default EditItemForm;

