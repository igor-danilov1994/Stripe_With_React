import React, {useState} from 'react';
import {loadStripe, Stripe} from '@stripe/stripe-js';
import {Elements, useStripe,} from '@stripe/react-stripe-js';

import './App.css';

import {CheckoutForm} from "./components/CheckoutForm/CheckoutForm";

// DOCS link => https://stripe.com/docs/stripe-js/react
// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe('pk_test_51MwijxJDOB7T3U8WBleqnfqgQPlwAA1m0GGIKDPplIUqssejnYnswnCxvgmUQWx4j9gKuaRiODxt6QdCFpV43K6U00xBDgjGI8');

const options = {
    // passing the client secret obtained from the server
    clientSecret: 'sk_test_51LilovEZRXp5c1LmXX0T0S9Pk0uK11AbfRfzcHXHvRKqtlirLCv8C6LyBVBIQrf8KjUa4CwSE6pVflxrPgwbFRJZ00WdfElm1V',
};

function App() {
    const [next, setNext] = useState(false)

    return (
        <div className="App">
            <div className="container">
                <Elements stripe={stripePromise}>
                    {next ? (
                        <CheckoutForm/>
                    ) : (
                        <button onClick={() => setNext(true)}>
                            send
                        </button>
                    )}
                </Elements>
            </div>
        </div>
    );
}

export default App;
