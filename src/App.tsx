import React from 'react';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import {Elements, useStripe,} from '@stripe/react-stripe-js';

import './App.css';

import {CheckoutForm} from "./components/CheckoutForm/CheckoutForm";

// DOCS link => https://stripe.com/docs/stripe-js/react
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// const stripePromise = loadStripe('pk_test_51MwijxJDOB7T3U8WBleqnfqgQPlwAA1m0GGIKDPplIUqssejnYnswnCxvgmUQWx4j9gKuaRiODxt6QdCFpV43K6U00xBDgjGI8');

const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51LilovEZRXp5c1LmXX0T0S9Pk0uK11AbfRfzcHXHvRKqtlirLCv8C6LyBVBIQrf8KjUa4CwSE6pVflxrPgwbFRJZ00WdfElm1V',
};


let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
    if (!stripePromise) {
        stripePromise = loadStripe('pk_test_51MwijxJDOB7T3U8WBleqnfqgQPlwAA1m0GGIKDPplIUqssejnYnswnCxvgmUQWx4j9gKuaRiODxt6QdCFpV43K6U00xBDgjGI8');;
    }
    return stripePromise;
};


function App() {

    async function handleCheckout() {
        const stripe = await getStripe();
        // @ts-ignore
        const {error} = await stripe.redirectToCheckout({
            lineItems: [
                {
                    price: 'price_1MxnxPJDOB7T3U8WPhw9TKT5',
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            successUrl: `http://localhost:3000/success`,
            cancelUrl: `http://localhost:3000/cancel`,
            customerEmail: 'customer@email.com',
        });
        console.warn(error.message);


        console.log('stripe', stripe)
    }

    return (
        <div className="App">
            <div className="container">
                <button onClick={handleCheckout}>Checkout</button>
                    {/*<Elements stripe={stripePromise} options={options}>*/}
                    {/*    <CheckoutForm/>*/}
                    {/*</Elements>*/}
            </div>
        </div>
    );
}

export default App;
