import React from "react"
import {Link} from "react-router-dom"

function ListedUsers({listedUser}){
    
    return (
        <div className="">
            <Link to={`Listing/${listedUser._id}`}>
                <h2>{listedUser.username}</h2>
            </Link>
        </div>
    )
}

export default ListedUsers;