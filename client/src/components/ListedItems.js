import React from 'react'
import image1 from '../images/image1.jpg'
import { Link } from 'react-router-dom'
import { useMutation } from '@apollo/client'

function ListedItems({ item }) {
    const images = [image1]
    let image = images[item.imageRef]
    console.log(item)

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
                <button className="item-btn" >Add To Cart</button>
            </div>
        </div>
    )
}

export default ListedItems;