import React from 'react'
import { useQuery } from "@apollo/client";
import {  QUERY_ITEM } from "../utils/queries";

function IndividualCartItems({ item }) {
    const id = item
    const { loading2, data:data2 } = useQuery(QUERY_ITEM,
    { variables: { id } }
    )
    const itemData = data2?.item || [];
    let price = itemData.price
    console.log(price)

    return (
        <>{loading2?<div>...loading</div>:
        <>
            <h1>{itemData.item}</h1>
            <h1>{price}</h1>
        </>
        }</>
    )
}

export default IndividualCartItems;