//Hooks
import {useState, useEffect} from 'react'
import {loadStripe} from '@stripe/stripe-js';

//components
import RecurringCheckoutForm from "./RecurringCheckoutForm";
import useDropdown from "./useDropdown";

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

export const ReccuringPaymentOption = ({}) => {

    return(
        
    )
}
