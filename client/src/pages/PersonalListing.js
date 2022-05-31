import React from "react";
import PersonalListedItems from "../components/PersonalListingItems";
import { useQuery } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_USER, QUERY_PERSONAL_ITEMS } from "../utils/queries";

function authCheck(){
    if (Auth.loggedIn()===false) {
        return (
          <p className="text-primary">
            You need to be logged in to see this. Use the navigation links above to
            sign up or log in!
          </p>
        );
      }
}

function PersonalListing() {
    const email = Auth.getProfile().data.email
    const {loading, data}= useQuery(QUERY_USER,
        { variables: { email: email } }
    )
    const cUser= data?.user || [];
    
    const username=cUser.username
    console.log(username)
    const {loading:loading2, data:data2}= useQuery(QUERY_PERSONAL_ITEMS,
        { variables: { username: username } }
    )
    const items= data2?.listing || [];

    return (
        <> {loading||loading2? <div>Loading...</div> :
        <div>
            <h1 className="user-greeting">Welcome {cUser.username}</h1>
            <div>
                <button>Make Listing Public</button>
                <div>
                    <button className="add-item-btn">Add Item to listing</button>
                    <h2>Current Listed Items</h2>
                    <div className='listing'>
                        {items.map((item) => (
                            <PersonalListedItems item={item}
                            key={item._id} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    }</>
    )
}

export default Auth.loggedIn() ? PersonalListing : authCheck;