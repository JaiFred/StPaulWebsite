//Hooks
import { Modal, ModalFooter, ModalTitle, Button, ModalBody } from 'react-bootstrap'
import { Elements, CardElement, useStripe, useElements, } from "@stripe/react-stripe-js";
import {useState, useEffect} from 'react'
import {loadStripe} from '@stripe/stripe-js';

//Components
import CheckoutForm from './CheckoutForm';
import RecurringCheckoutForm from "./RecurringCheckoutForm";
import useDropdown from "./useDropdown";
import { Input } from './Forms/Input';
import { DarkHeader } from './Modal/Header'

// styles
import './GivingModal.scss'
import Cross from "./images/Cross.png"
import { ErrorMessage } from "./Forms/ErrorMessage";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
console.log(`process.env.REACT_APP_STRIPE_PUBLIC_KEY: ${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`)
const stripePromise = loadStripe(`${process.env.REACT_APP_STRIPE_PUBLIC_KEY}`);

function GivingModal({ currentUser, givingIsOpen, setGivingIsOpen }){

    const API_ENDPOINT = process.env.NODE_ENV == "development" ? "http://localhost:3000" : "https://st-paul-baptist-church.herokuapp.com";


    const [ clientSecret, setClientSecret] = useState(null);
    const [ clientSecretRecurring, setClientSecretRecurring] = useState(null);
    const [ amount, setAmount ] = useState(null);
    const [showAmountForm, setShowAmountForm] = useState(true);
    const [showRecurringForm, setShowRecurringForm] = useState(true);
    const [error, setError] = useState(null);
    const [billingDetails, setBillingDetails] = useState({
        email: '',
        phone: '',
        name: '',
    });
    
    const [paymentOption, PaymentOptionDropdown, setPaymentOption] = useDropdown("Choose a Payment option", "One Time Payment", "", ["One Time Payment", "Regularly"], true, 'giving-dropdown');

    // console.log(`paymentOption: ${paymentOption}`);
    // console.log(`clientSecretRecurring: ${clientSecretRecurring}`);
    // console.log(`showRecurringForm: ${showRecurringForm}`);

    const resetForm = () => {
        setPaymentOption("One Time Payment")        
        setAmount(null);
        setClientSecret(null);
        setGivingIsOpen(false);
        setShowAmountForm(true);
        setShowRecurringForm(true);
        setBillingDetails('');
    }

    const handleAmountChange = (e) => {
        setAmount(e.target.value);
    };

    const handleEmailChange = (e) => {
        setBillingDetails({...billingDetails, email: e.target.value});
    };

    const handleNameChange = (e) => {
        setBillingDetails({...billingDetails, name: e.target.value});
    };

    const validateEmail = (email) => {
        return email.match(
          /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    };

    useEffect(() => {
        fetch(`/api/client_secret_recurring?amount=1`)
        .then((r) => r.json())
        .then(res => setClientSecretRecurring(res.client_secret))
      }, [])

    const fetchClientSecret = (e) => {
        e.preventDefault();
        
        console.log(`amount: ${amount}`)

        if (!billingDetails.name && billingDetails.email ) {
            setError('please fill out your full name before proceeding')
            return
        }

        if (!billingDetails.email && billingDetails.name ) {
            setError('please fill out your email before proceeding')
            return
        }

        if (!billingDetails.email && billingDetails.name && !(amount && parseFloat(amount) > 0)) {
            setError('please fill out your email before proceeding')
            return
        }

        if (!billingDetails.name && billingDetails.email && !(amount && parseFloat(amount) > 0)) {
            setError('please fill out your full name before proceeding')
            return
        }

        if (billingDetails.email && !validateEmail(billingDetails.email)) {
            setError('Invalid email format!')
            return
        }

        if (!billingDetails.email && billingDetails.name && (amount && parseFloat(amount) > 0)) {
            setError('please fill out your email before proceeding')
            return
        }

        if (!billingDetails.name && billingDetails.email && (amount && parseFloat(amount) > 0)) {
            setError('please fill out your full name before proceeding')
            return
        }

        if (!billingDetails.name || !billingDetails.email && (amount && parseFloat(amount) > 0)) {
            setError('please fill out your full name and email before proceeding')
            return
        }


        if (!(amount && parseFloat(amount) > 0.50)) {
            setError('Amount must be at least $0.51')
            return
        }

        setError(null);

        setShowAmountForm(false);

        const reqBody = {
            amount: amount,
            billing_details: billingDetails
        }

        fetch(`${API_ENDPOINT}/api/client_secret`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
              },
            body: JSON.stringify(reqBody)
        })
        .then((res) => res.json())
        .then((res) => setClientSecret(res.client_secret))

    }

      const options = {
        // passing the client secret obtained from the server
        clientSecret: clientSecret,
        fonts: [
            {
              cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
            },
          ],
      };

        const optionsRecurring = {
        // passing the client secret obtained from the server
        clientSecret: clientSecretRecurring,
        fonts: [
            {
              cssSrc: 'https://fonts.googleapis.com/css?family=Roboto',
            },
          ],
      };

    console.log('One form?', paymentOption == 'One Time Payment' && clientSecret )

    return(
        <div className='overlay_giving_modal'>
            <Modal className='modal modal-light giving-modal'
                show={ givingIsOpen }
            >
            <DarkHeader onCancel={resetForm} />                  
                <ModalBody>
                    <div className="giving-modal-one-time-pay-page">
                        {showAmountForm && (
                            <>
                                <h1 className="give-title text-center">
                                    {paymentOption === 'One Time Payment' && 'One Time Offering'}
                                    {paymentOption === 'Regularly' && 'Recurring Offering'}
                                </h1>
                                {error && paymentOption == 'One Time Payment' &&
                                    <ErrorMessage message={error}/>
                                }
                            </>
                        )}
                    
                        { currentUser  && <PaymentOptionDropdown />}
                        { paymentOption == 'One Time Payment' && showAmountForm &&
                        <form onSubmit={fetchClientSecret}>                
                            <div className="one-time-payment-container">
                                <h3 className="give-subtitle text-center text-bold">Give Box</h3>
                                <div className="amount-input-container">
                                    <Input
                                        label="Amount"
                                        type="text"
                                        id="amount"
                                        name="amount"
                                        value={amount}
                                        required
                                        onChange={handleAmountChange}
                                        placeholder="Type your amount here"
                                    >
                                        <div className="currency-display">$ USD</div>
                                    </Input>
                                </div>
                                <Input
                                    label="Email"
                                    id="email"
                                    name="email"
                                    type="text"
                                    placeholder="Email..."
                                    required
                                    autoComplete="email"
                                    value={billingDetails.email}
                                    onChange={handleEmailChange}
                                />
                                <Input
                                    label="Name"
                                    id="name"
                                    type="text"
                                    name="name"
                                    placeholder="Full name on card"
                                    required
                                    autoComplete="name"
                                    value={billingDetails.name}
                                    onChange={handleNameChange}
                                />
                            </div>
                        </form>
                        }
        
                        { paymentOption == 'One Time Payment' && clientSecret &&
                            <Elements stripe={stripePromise} options={options}>
                                <CheckoutForm
                                    setGivingIsOpen={setGivingIsOpen}
                                    setAmount={setAmount}
                                    setClientSecret={setClientSecret}
                                    setShowAmountForm={setShowAmountForm}
                                    setShowRecurringForm={setShowRecurringForm}
                                >
                                    {paymentOption == 'One Time Payment' && showAmountForm === false && amount && parseFloat(amount) > 0 &&
                                        <div className="billing-details-paying">{billingDetails.name}, you are paying: ${amount}</div>
                                    }
                                </CheckoutForm>
                            </Elements>
                        }

                    </div>
        
                    { currentUser && <div className="AppWrapper">
                        { paymentOption == 'Regularly' && clientSecretRecurring && showRecurringForm &&
                        <div className="recurring-payment-container">
                            <h3 className="give-subtitle text-center">Give Box</h3>
                            <Elements stripe={stripePromise} options={optionsRecurring}>
                                <RecurringCheckoutForm currentUser={currentUser} resetForm={resetForm} />
                            </Elements>
                        </div>
                        }
                    </div>}
    
                    <div className="giving-buttons d-flex justify-content-end gap-2">
                        {paymentOption == 'One Time Payment' && showAmountForm &&
                            <button
                                id='submitBtn'
                                className="btn btn-primary"
                                type="button"
                                onClick={fetchClientSecret}>Confirm Amount</button>
                        }
                        <button type="button" className="btn btn-secondary" onClick={resetForm}>Cancel</button>
                    </div>
                </ModalBody>
            </Modal> 
        </div>
    )
}

export default GivingModal