import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER} from "../utils/queries";
import Auth from "../utils/auth";
import CartItems from "../components/CartItems"

function authCheck() {
    if (Auth.loggedIn() === false) {
        return (
            <p className="text-primary">
                You need to be logged in to see this. Use the navigation links above to
                sign up or log in!
            </p>
        );
    }
}

function Cart() {
    let cartItems=[]
    const email = Auth.getProfile().data.email
    const { loading, data } = useQuery(QUERY_USER,
        { variables: { email: email } }
    )
    const cUser = data?.user || [];
    const cart = cUser.cart
    
    for(let c in cart){
        cartItems.push(cart[c]._id)
    }
    
    return (
        <>{loading ? <div>Loading...</div> :
            <>
                <h1>Cart</h1>
                <div className='item'>
                            {cartItems.map((item) => (
                                <CartItems item={item}
                                    key={item} />
                            ))}
                        </div>
                
            </>
        }</>
    )
}

export default Auth.loggedIn() ? Cart : authCheck;