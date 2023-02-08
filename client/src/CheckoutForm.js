//Hooks
import {CardElement} from '@stripe/react-stripe-js';
import {useStripe, useElements, PaymentElement} from '@stripe/react-stripe-js';

const CheckoutForm = ({
  setGivingIsOpen, 
  setAmount, 
  setClientSecret, 
  setShowAmountForm, 
  setShowRecurringForm, 
  children
}) => {
  const stripe = useStripe();
  const elements = useElements();

  const resetForm = () => {
    setAmount(null);
    setClientSecret(null);
    setGivingIsOpen(true);
    setShowAmountForm(true);
    setShowRecurringForm(true);
  }

  const handleSubmit = async (event) => {
    // We don't want to let default form submission happen here,
    // which would refresh the page.
    console.log('I AM HERE 0')

    event.preventDefault();
    
    console.log('I AM HERE 1')

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: "http://localhost:3001/",
      },
    });

    console.log('I AM HERE 2')

    if (result.error) {
      console.log('I AM HERE 3')
      // Show error to your customer (for example, payment details incomplete)
      console.log(result.error.message);
    } else {
      console.log('I AM HERE 4')
      alert("Thank you! We appreciate your offering.");
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
    }
    
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit}>
      <PaymentElement />
      {children}
      <div className="checkout-form-buttons">
        <button disabled={!stripe} className="checkout-confirm">Confirm Payment</button>      
        <button type="button" onClick={() => resetForm()} className="checkout-cancel">Cancel Payment</button>
      </div>
    </form>
  )
};

export default CheckoutForm;