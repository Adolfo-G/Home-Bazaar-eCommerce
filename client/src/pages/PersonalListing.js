import React from "react";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_USER } from "../utils/queries";

function PersonalListing() {
    const email = Auth.getProfile().data.email
    const currentUser = useQuery(QUERY_USER,
        { variables: { email: email } }
    )
    if (currentUser.loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h1 className="user-greeting">Welcome {currentUser.data.user.username}</h1>
            <div>
                <button>Make Listing Public</button>
                <div>
                    <button className="add-item-btn">Add Item to listing</button>
                    <h2>Current Listed Items</h2>

                    <div className="listing-container">
                        <div className="listed-image">Image</div>
                        <div className="listed-item">
                            <h2 className="item-title">Shoes</h2>
                            <p className="item-description">White and Blue track shoes</p>
                            <p className="item-stock">In Stock: 1</p>
                            <p className="item-price">Price: $20</p>
                        </div>
                        <div className="item-buttons-container">
                            <button className="item-btn">Delete</button>
                            <button className="item-btn">Edit</button>
                        </div>
                    </div>

                    <div className="listing-container">
                        <div className="listed-image">Image</div>
                        <div className="listed-item">
                            <h2 className="item-title">Shoes</h2>
                            <p className="item-description">White and Blue track shoes</p>
                            <p className="item-stock">In Stock: 1</p>
                            <p className="item-price">Price: $20</p>
                        </div>
                        <div className="item-buttons-container">
                            <button className="item-btn">Delete</button>
                            <button className="item-btn">Edit</button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default PersonalListing;