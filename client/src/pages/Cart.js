import React from "react";
import { useQuery } from "@apollo/client";
import { QUERY_USER } from "../utils/queries";
import Auth from "../utils/auth";
import CartItems from "../components/CartItems"

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

function Cart() {
    let cartItems = []
    const email = Auth.getProfile().data.email
    const { loading, data } = useQuery(QUERY_USER,
        { variables: { email: email } }
    )
    const cUser = data?.user || [];
    console.log(cUser)
    const cart = cUser.cart
    const cartTotal = cUser.cartTotal

    for (let c in cart) {
        cartItems.push(cart[c]._id)
    }
    
    return (
        <>{loading ? <div>Loading...</div> :
            <>
                <h1 className="cart-title"> Your Cart</h1>
                <div className="cart-container">
                    <div className='cart-item-container'>
                        {cartItems.map((item) => (
                            <CartItems item={item}
                            key={item+Math.floor(Math.random(100))} />
                            ))}
                    </div>
                    <div>
                        <h1 className="cartTotal">Total: ${cartTotal}</h1>
                    </div>
                </div>
                <div className="cart-checkout-btn-container">
                    <button className="cart-checkout-btn">
                        Check Out
                    </button>
                </div>
            </>
        }</>
    )
}

export default Auth.loggedIn() ? Cart : authCheck;