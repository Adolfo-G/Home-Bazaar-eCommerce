import React from "react";
import { useParams } from "react-router-dom";
import {useQuery} from '@apollo/client'
import { QUERY_LISTED_USER, QUERY_PERSONAL_ITEMS } from "../utils/queries";
import ListedItems from '../components/ListedItems'


function Listing(){
    const id=useParams()._id
    const { loading:al, data } = useQuery(QUERY_LISTED_USER,
        { variables: { id:id } }
        )
        const listedUserData = data?.listedUser || [];
        
        const username = listedUserData.username
        console.log(username)
        
        const { loading: bl, data: data2 } = useQuery(QUERY_PERSONAL_ITEMS,
        { variables: { username: username } }
    )
    const items = data2?.listing || [];
    console.log(items)
    console.log("cartTotal" + listedUserData.cartTotal)

    return(
        <>
            {al||bl ? <h2>loading...</h2> :
            <>
                <h1>Listing</h1>
                <div className='listing'>
                    {items.map((item) => (
                        <ListedItems item={item} cartTotal={listedUserData.cartTotal}
                            key={item._id} />
                    ))}
                </div>
            </>
            }
        </>
    )
}

export default Listing