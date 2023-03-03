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

    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const result = await stripe.confirmPayment({
      //`Elements` instance that was used to create the Payment Element
      elements,
      confirmParams: {
        return_url: process.env.NODE_ENV == "development" ? "http://localhost:3001/checkout_form_success" : "https://www.st-paul-baptist-church.com/checkout_form_success"
      },
    });

    if (result.error) {
      // Show error to your customer (for example, payment details incomplete)
      alert(result.error.message);
    } else {
      // Your customer will be redirected to your `return_url`. For some payment
      // methods like iDEAL, your customer will be redirected to an intermediate
      // site first to authorize the payment, then redirected to the `return_url`.
      resetForm();
    }
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