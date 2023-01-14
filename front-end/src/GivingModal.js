//Hooks
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button, ModalBody } from 'react-bootstrap'
import { Elements, CardElement, useStripe, useElements, } from "@stripe/react-stripe-js";
import {useState, useEffect} from 'react'
import {loadStripe} from '@stripe/stripe-js';

//Components
import CheckoutForm from './CheckoutForm';
import RecurringCheckoutForm from "./RecurringCheckoutForm";
import useDropdown from "./useDropdown";
import { Input } from './Forms/Input';

// styles
import './GivingModal.scss'
import Cross from "./images/Cross.webp"
import { ErrorMessage } from "./Forms/ErrorMessage";

// Make sure to call `loadStripe` outside of a component’s render to avoid
// recreating the `Stripe` object on every render.
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY);

function GivingModal({ currentUser, givingIsOpen, setGivingIsOpen }){

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
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [paymentOption, PaymentOptionDropdown, setPaymentOption] = useDropdown("Choose a Payment option", "One Time Payment", "", ["One Time Payment", "Regularly"]);

    console.log(`paymentOption: ${paymentOption}`);
    console.log(`clientSecretRecurring: ${clientSecretRecurring}`);
    console.log(`showRecurringForm: ${showRecurringForm}`);

    const resetForm = () => {
        setPaymentOption("One Time Payment")
        setPaymentMethod(null);
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

        // setShowRecurringForm(false);

        // fetch(`/api/client_secret?amount=${amount}`)
        // .then((r) => r.json())
        // .then(res => setClientSecret(res.client_secret))
        // .catch(function(error) {
        //     console.log(error);
        // });

        // const formData = new FormData();
        // formData.append("amount", amount);
        // formData.append("billing_details", billingDetails);

        const reqBody = {
            amount: amount,
            billing_details: billingDetails
        }

        fetch("api/client_secret", {
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

    return(
        <div className='overlay_giving_modal'>
           
            <Modal className='modal giving-modal'
                show={ givingIsOpen }
            >
            <ModalHeader >
                <img src={Cross} className="giving-modal-cross"></img>
                <ModalTitle>Saint Paul Baptist Church</ModalTitle>
                <button type="button" class="btn-close btn-close-white" aria-label="Close" onClick={() => {resetForm()}}></button>
            </ModalHeader>
            <form onSubmit={fetchClientSecret}>
            <ModalBody>
                <div>
                { paymentOption == 'One Time Payment' && showAmountForm &&
                    <h1 className="give-title">One Time Offering</h1>
                }
                { paymentOption == 'Regularly' && showAmountForm &&
                    <h1 className="give-title">Recurring Offering </h1>
                }
                { paymentOption == 'One Time Payment' && showAmountForm && error &&
                   <ErrorMessage message={error}/>
                }
                    
                    { currentUser  && <PaymentOptionDropdown />}
                    { paymentOption == 'One Time Payment' && showAmountForm &&
                    <div>
                        <h3 className="give-subtitle">Give</h3>
                        <div className="currency-display"><h3>$ USD</h3></div>
                        <div className="amount-input-container">
                            <Input
                                label="Amount"
                                type="text"
                                id="amount"
                                name="amount"
                                value={amount}
                                onChange={handleAmountChange}
                            />
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
                    </div>}

                    { paymentOption == 'One Time Payment' && clientSecret &&
                        <Elements stripe={stripePromise} options={options}>
                            <CheckoutForm
                                setGivingIsOpen={setGivingIsOpen}
                                setAmount={setAmount}
                                setClientSecret={setClientSecret}
                                setShowAmountForm={setShowAmountForm}
                                setShowRecurringForm={setShowRecurringForm}
                            />
                        </Elements>
                    }
                    {paymentOption == 'One Time Payment' && showAmountForm === false && amount && parseFloat(amount) > 0 && <div>{billingDetails.name}, you are paying: ${amount}</div>}
                </div>

                { currentUser && <div className="AppWrapper">
                    { paymentOption == 'Regularly' && clientSecretRecurring && showRecurringForm && currentUser &&
                    <div>
                        <h3 className="give-subtitle">Give</h3>
                        <div className="currency-display"><h3>$ USD</h3></div>
                        <Elements stripe={stripePromise} options={optionsRecurring}>
                            <RecurringCheckoutForm currentUser={currentUser} resetForm={resetForm} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
                        </Elements>
                    </div>
                    }
                </div>
                }
                </ModalBody>
                <ModalFooter>
                    { paymentOption == 'One Time Payment' && showAmountForm &&
                        <button id='submitBtn' className="btn btn-primary" type="button" onClick={fetchClientSecret}>Confirm Amount</button>
                    }
                    <button type="button" className="btn btn-secondary" onClick={() => {resetForm()}}>Cancel</button>
                </ModalFooter>
                </form>
            </Modal> 
        </div>
    )
}

export default GivingModal