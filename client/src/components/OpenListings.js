import React from "react"
import {Link} from 'react-router-dom'

function OpenListings(){
    
return(
    <>
    <Link to={"/Listing/"+name}>
        <div>
            <h2>Listing 1</h2>
        </div>
    </Link>
    </>
)
}

export default OpenListings;