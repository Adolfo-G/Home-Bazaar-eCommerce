import React from 'react'
import image1 from '../images/image1.jpg'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import Auth from "../utils/auth";
import { ADD_TO_CART } from '../utils/mutations';

function ListedItems({ item }) {
    const images = [image1]
    let image = images[item.imageRef]
    console.log(item)

    const [addToCart, { data, loading, error }] = useMutation(ADD_TO_CART);
    if (loading) { return "Loading" }
    async function addItemToCart() {
        try {
            const { data } = await addToCart({
                variables: {
                    itemId: item._id,
                    stock:item.stock,
                },
            });
            window.location.assign('/');
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div className="listing-container">
            <div className="listed-image"><img src={image}></img></div>
            <div className="listed-item">
                <h2 className="item-title">{item.item}</h2>
                <p className="item-description">{item.description}</p>
                <p className="item-stock">In Stock: {item.stock}</p>
                <p className="item-price">Price: ${item.price}</p>
            </div>
            {Auth.loggedIn() ?
            <div className="item-buttons-container">
                <button className="item-btn" onClick={()=>addItemToCart()} >Add To Cart</button>
            </div>:""
            }
        </div>
    )
}

export default ListedItems;