//Hooks
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button, ModalBody } from 'react-bootstrap'
import { Elements, CardElement, useStripe, useElements, } from "@stripe/react-stripe-js";
import {useState, useEffect} from 'react'
import {loadStripe} from '@stripe/stripe-js';

//Components
import CheckoutForm from './CheckoutForm';
import RecurringCheckoutForm from "./RecurringCheckoutForm";
import useDropdown from "./useDropdown";

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


    const resetForm = () => {
        setAmount(null);
        setClientSecret(null);
        setGivingIsOpen(false);
        setShowAmountForm(true);
        setShowRecurringForm(true);
        setBillingDetails('');
        setPaymentMethod(null);
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


    useEffect(() => {
        fetch(`/api/client_secret_recurring?amount=1`)
        .then((r) => r.json())
        .then(res => setClientSecretRecurring(res.client_secret))
      }, [])  

    const fetchClientSecret = (e) => {
        e.preventDefault();
        
        console.log(`amount: ${amount}`)

        if (!(amount && parseFloat(amount) > 0)) {
            setError('Amount must be entered and must be more than zero dollars')
            return
        }

        // if (!billingDetails.email || !billingDetails.name) {
        //     setError('please fill out your email and name before proceeding')
        //     return
        // }

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
        
        
        
        setError(null);

        setShowAmountForm(false);

        setShowRecurringForm(false);

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

    //     fetch("/api/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       username: username,
    //       password: password,
    //     }),
    //   })


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

    // if (response.ok) {
    //     response.json().then((user) => {
    //       console.log(`I AM HERE: user: ${JSON.stringify(user)}`);
    //       if (user.errors) {
    //         console.log(user.errors || 'Wrong credentials!');
    //         setErrors(user.errors || ['Wrong credentials!']);
    //       }
    //       else {
    //         navigate("/signup_success");
    //       }
    //     });
    
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
            <Modal className='modal'
                show={ givingIsOpen }
            >
            <ModalHeader >
                <ModalTitle>Saint Paul Baptist Church</ModalTitle>
                <ModalTitle> <button type="button" onClick={() => {resetForm()}}>X</button></ModalTitle> 
            </ModalHeader>
            <ModalBody>
                <div>
                    {error && <p>{error}</p>}
                    {showAmountForm && 
                    <div> 
                        <h3>One Time Offering</h3>
                        <form onSubmit={fetchClientSecret}>
                            <input
                                label="Email"
                                id="email"
                                type="text"
                                placeholder="email..."
                                required
                                autoComplete="email"
                                value={billingDetails.email}
                                onChange={handleEmailChange}
                            />  
                            <input
                                label="Name"
                                id="name"
                                type="text"
                                placeholder="full name on card"
                                required
                                autoComplete="name"
                                value={billingDetails.name}
                                onChange={handleNameChange}
                            />    
                            <input
                                type="text"
                                id="amount"
                                name="amount"
                                value={amount} 
                                onChange={handleAmountChange}               
                            />                
                            <button id='submitBtn' type="button" onClick={fetchClientSecret}>Confirm Amount</button>
                        </form>
                    </div>}
                    
                    { clientSecret &&
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
                    {showAmountForm === false && amount && parseFloat(amount) > 0 && <div>{billingDetails.name}, you are paying: ${amount}</div>}
                </div>
                
                    
                    <div className="AppWrapper">
                        { clientSecretRecurring && showRecurringForm && currentUser &&
                        <div> 
                            <h3>Recurring Offering </h3>
                            <Elements stripe={stripePromise} options={optionsRecurring}>
                                <RecurringCheckoutForm currentUser={currentUser} resetForm={resetForm} paymentMethod={paymentMethod} setPaymentMethod={setPaymentMethod}/>
                            </Elements>
                        </div>
                        }
                    </div>
                </ModalBody>
                <ModalFooter>
                    <button type="button" onClick={() => {resetForm()}}>cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default GivingModal