import React from "react"
import { Link } from "react-router-dom"

function ListedUsers({ listedUser }) {
    console.log(listedUser)

    return (
        <div className="listed-users-container">
            <Link to={`Listing/${listedUser._id}`} className="listed-users">
                <h2>{listedUser.username} has a sale on {listedUser.listings.length} items!</h2>
            </Link>
        </div>
    )
}

export default ListedUsers;