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
            <h1>hello { currentUser.data.user.username}</h1>
        </div>
    )
}

export default PersonalListing;