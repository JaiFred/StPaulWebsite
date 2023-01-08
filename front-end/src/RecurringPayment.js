//Hooks
import { Elements, CardElement, useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import {useState, useEffect} from 'react'
import {loadStripe} from '@stripe/stripe-js';
import "./stripeElementStyles.scss";
import RecurringCheckoutForm from "./RecurringCheckoutForm";


// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
// console.log(`process.env.REACT_APP_STRIPE_PUBLIC_KEY: ${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function RecurringPayment(){
    const [ clientSecret, setClientSecret] = useState(null);

    useEffect(() => {
        fetch(`/api/client_secret`)
        .then((r) => r.json())
        .then(res => setClientSecret(res.client_secret))
      },[])
    
      const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
        fonts: [
            {
              cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
            },
          ],
      };     
    
    return(
      <div className="stripe-container">
        <div className="AppWrapper">
        { clientSecret && 
        <Elements stripe={stripePromise} options={options}>
            <RecurringCheckoutForm />
        </Elements>
        }
        </div>
      </div>
    )
}

export default RecurringPayment;