import React from "react"
import { useQuery } from "@apollo/client";
import { QUERY_USERS } from "../utils/queries";
import ListedUsers from "./ListedUsers";

function HomeListings() {
    const { loading, data } = useQuery(QUERY_USERS)
    
    let listedUsers=data?.users
    console.log("homelisting: "+listedUsers)
    
    return (
        <>{loading ? <h1>Loading...</h1> :
        <>
            {listedUsers.map((listedUser) => (
                <ListedUsers listedUser={listedUser}
                    key={listedUser._id} />
            ))}
            </>}
        </>
    )
}

export default HomeListings;