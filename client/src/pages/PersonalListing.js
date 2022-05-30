import React from "react";
import PersonalListedItems from "../components/PersonalListingItems";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_USER, QUERY_PERSONAL_ITEMS } from "../utils/queries";


function PersonalListing() {
    const email = Auth.getProfile().data.email
    console.log(email)
    const currentUser = useQuery(QUERY_USER,
        { variables: { email: email } }
    )
    console.log(currentUser)

    const username=currentUser.data.user.username
    console.log(username)
    
    const items = useQuery(QUERY_PERSONAL_ITEMS,
        { variables: { username: username} }
    )
    if (currentUser.loading) {
        return <div>Loading...</div>;
    }
    if (items.loading) {
        return <div>Loading...</div>;
    }
    const listings=items.data.listing
    return (
        <div>
            <h1 className="user-greeting">Welcome {username}</h1>
            <div>
                <button>Make Listing Public</button>
                <div>
                    <button className="add-item-btn">Add Item to listing</button>
                    <h2>Current Listed Items</h2>
                    <div className='listing'>
                        {listings.map((item) => (
                            <PersonalListedItems item={item} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PersonalListing;