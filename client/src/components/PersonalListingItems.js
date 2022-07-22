import React from 'react'
import image1 from '../images/image1.jpg'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { DELETE_LIST_ITEM } from '../utils/mutations'

function PersonalListedItems({ item }) {
    const images = [image1]
    let image = images[item.imageRef]

    const [deleteItem, { data, loading, error }] = useMutation(DELETE_LIST_ITEM);
    if (loading) { return "Loading" }
    async function deleteCurrentItem() {
        try {
            const { data } = await deleteItem({
                variables: {
                    itemId: item._id,
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
            <div className="item-buttons-container">
                <button className="item-btn" onClick={() => deleteCurrentItem()}>Delete</button>
                <Link to={'/EditItem/' + item._id}>
                    <button className="item-btn">Edit</button>
                </Link>
            </div>
        </div>
    )
}

export default PersonalListedItems;