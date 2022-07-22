import React from "react";
import PersonalListedItems from "../components/PersonalListingItems";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { Link } from 'react-router-dom'
import { QUERY_USER, QUERY_PERSONAL_ITEMS } from "../utils/queries";
import { UPDATE_LISTING_VISIBILITY } from "../utils/mutations";

function authCheck() {
    if (Auth.loggedIn() === false) {
        return (
            <p className="logged-out-text">
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </p>
        );
    }
}

function PersonalListing() {

    const email = Auth.getProfile().data.email
    const { loading, data } = useQuery(QUERY_USER,
        { variables: { email: email } }
    )
    const cUser = data?.user || [];

    const username = cUser.username

    const { loading: loading2, data: data2 } = useQuery(QUERY_PERSONAL_ITEMS,
        { variables: { username: username } }
    )
    const items = data2?.listing || [];

    const [editIspublic, { data: isPublicData, loading: isPublicLoading, error }] = useMutation(UPDATE_LISTING_VISIBILITY)

    const HandlePublicVisibility = async () => {

        let isPublic;
        if (cUser.isListingPublic === false) {
            isPublic = true;
        }
        if (cUser.isListingPublic === true) {
            isPublic = false;
        }

        try {
            const { data } = await editIspublic({
                variables: {
                    isListingPublic: isPublic || false
                },
            });
            window.location.assign('/');
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <> {loading || loading2 || isPublicLoading ? <div>Loading...</div> :
            <div>
                <h1 className="user-greeting">Welcome {cUser.username}</h1>
                <div>
                    <>{cUser.isListingPublic === false ?
                        <button onClick={() => HandlePublicVisibility()}>Make Listing Public</button> :
                        <button onClick={() => HandlePublicVisibility()}>Make Listing Private</button>}
                    </>
                    <div>
                        <Link to="/addItem">
                            <button className="add-item-btn">Add Item to listing</button>
                        </Link>
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