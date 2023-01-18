//Hooks
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import "./stripeElementStyles.scss";
import useDropdown from "./useDropdown";
import moment from "moment";
import { Input } from "./Forms/Input";
import { ErrorMessage } from "./Forms/ErrorMessage";
import "./RecurringCheckoutForm.scss";

const FREQUENCY_OPTIONS = ["Monthly", "Weekly", "BiWeekly"];

const AMOUNT_OPTIONS = [
  "$5",
  "$10",
  "$15",
  "$20",
  // '$25',
  // '$30',
  // '$35',
  "$100",
];

const CARD_OPTIONS = {
  iconStyle: "solid",
  style: {
    base: {
      iconColor: "#c4f0ff",
      color: "#000",
      fontWeight: 500,
      fontFamily: "Roboto, Open Sans, Segoe UI, sans-serif",
      fontSize: "16px",
      fontSmoothing: "antialiased",
      ":-webkit-autofill": {
        color: "#fce883",
      },
      "::placeholder": {
        color: "#87bbfd",
      },
    },
    invalid: {
      iconColor: "#ffc7ee",
      color: "#ffc7ee",
    },
  },
};

const CardField = ({ onChange }) => (
  <div className="card-field">
    <CardElement options={CARD_OPTIONS} onChange={onChange} />
  </div>
);

const Field = ({
  label,
  id,
  type,
  placeholder,
  required,
  autoComplete,
  value,
  onChange,
}) => (
  <div className="FormRow">
    <label htmlFor={id} className="FormRowLabel">
      {label}
    </label>
    <input
      className="FormRowInput"
      id={id}
      type={type}
      placeholder={placeholder}
      required={required}
      autoComplete={autoComplete}
      value={value}
      onChange={onChange}
    />
  </div>
);

const SubmitButton = ({ processing, error, children, disabled }) => (
  <button
    className={`btn recurring-submit ${error ? "btn-danger" : "btn-pink"}`}
    type="submit"
    disabled={processing || disabled}
  >
    {processing ? "Processing..." : children}
  </button>
);

const ResetButton = ({ onClick }) => (
  <button type="button" className="ResetButton" onClick={onClick}>
    <svg width="32px" height="32px" viewBox="0 0 32 32">
      <path
        fill="#FFF"
        d="M15,7.05492878 C10.5000495,7.55237307 7,11.3674463 7,16 C7,20.9705627 11.0294373,25 16,25 C20.9705627,25 25,20.9705627 25,16 C25,15.3627484 24.4834055,14.8461538 23.8461538,14.8461538 C23.2089022,14.8461538 22.6923077,15.3627484 22.6923077,16 C22.6923077,19.6960595 19.6960595,22.6923077 16,22.6923077 C12.3039405,22.6923077 9.30769231,19.6960595 9.30769231,16 C9.30769231,12.3039405 12.3039405,9.30769231 16,9.30769231 L16,12.0841673 C16,12.1800431 16.0275652,12.2738974 16.0794108,12.354546 C16.2287368,12.5868311 16.5380938,12.6540826 16.7703788,12.5047565 L22.3457501,8.92058924 L22.3457501,8.92058924 C22.4060014,8.88185624 22.4572275,8.83063012 22.4959605,8.7703788 C22.6452866,8.53809377 22.5780351,8.22873685 22.3457501,8.07941076 L22.3457501,8.07941076 L16.7703788,4.49524351 C16.6897301,4.44339794 16.5958758,4.41583275 16.5,4.41583275 C16.2238576,4.41583275 16,4.63969037 16,4.91583275 L16,7 L15,7 L15,7.05492878 Z M16,32 C7.163444,32 0,24.836556 0,16 C0,7.163444 7.163444,0 16,0 C24.836556,0 32,7.163444 32,16 C32,24.836556 24.836556,32 16,32 Z"
      />
    </svg>
  </button>
);

const ELEMENTS_OPTIONS = {
  fonts: [
    {
      cssSrc: "https://fonts.googleapis.com/css?family=Roboto",
    },
  ],
};

const RecurringCheckoutForm = ({
  currentUser  
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [cardComplete, setCardComplete] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [paymentStartDate, setPaymentStartDate] = useState(new Date());
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
    name: "",
  });
  const [paymentMethod, setPaymentMethod] = useState(null);

  const [frequency, FrequencyDropDown] = useDropdown(
    "Choose a Frequency",
    "Monthly",
    "",
    FREQUENCY_OPTIONS,
    true
  );
  const [amount, AmountDropDown] = useDropdown(
    "Choose an Amount",
    "$5",
    "",
    AMOUNT_OPTIONS,
    true
  );
  const [paymentDate, PaymentDaysDropDown] = useDropdown(
    "On the ",
    "1st",
    " of the month",
    [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th",
      "10th",
      "11th",
      "12th",
      "13th",
      "14th",
      "15th",
      "16th",
      "17th",
      "18th",
      "19th",
      "20th",
      "21st",
      "22nd",
      "23rd",
      "24th",
      "25th",
      "26th",
      "27th",
      "28th",
    ],
    true
  );
  const [biWeeklyPaymentDate, BiWeeklyPaymentDropDown] = useDropdown(
    "Starting on the",
    "1st",
    "of the month",
    [
      "1st",
      "2nd",
      "3rd",
      "4th",
      "5th",
      "6th",
      "7th",
      "8th",
      "9th",
      "10th",
      "11th",
      "12th",
      "13th",
      "14th",
      "15th",
      "16th",
      "17th",
      "18th",
      "19th",
      "20th",
      "21st",
      "22nd",
      "23rd",
      "24th",
      "25th",
      "26th",
      "27th",
      "28th",
    ],
    true
  );
  const [weekday, WeekdayDropDown] = useDropdown(
    "Every ",
    "monday",
    " of the week",
    [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ],
    true
  );

  const handleSubmit = async (event) => {
    event.preventDefault();

    console.log("submitting to stripe API");

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    if (error) {
      card.focus();
      return;
    }

    console.log("checking paymentStartdate");
    console.log(new Date(paymentStartDate) < new Date());

    console.log("paymant method from recurring form (inside handleSubmit)", paymentMethod);

    if (new Date(paymentStartDate) < new Date()) {
      console.log(`setting error to: Please choose a future date!`)
      setError("Please choose a future date!");
      return;
    }

    if (cardComplete) {
      setProcessing(true);
    }

    const payload = await stripe.createPaymentMethod({
      type: "card",
      card,
      billing_details: billingDetails,
    });

    console.log(`payload: ${JSON.stringify(payload)}`);

    console.log('setProcessing 1')
    setProcessing(false);
    console.log('setProcessing 2')
    console.log(`payload.error: ${payload.error}`)

    if (payload.error) {
      setError(payload.error);
    } else {
      console.log(`setting paymentMethod....${payload.paymentMethod}`)
      setPaymentMethod(payload.paymentMethod);
    }
  };

  const reset = () => {
    setError(null);
    setProcessing(false);
    setPaymentMethod(null);
    setBillingDetails({
      email: "",
      phone: "",
      name: "",
    });
  };

  // Must make another fetch request for the days
  // Must make a method in the backend for the payday options
  // dropdown for the pay day options

  console.log(`paymentStartDate 2: ${paymentStartDate}`);

  const submitPaymentSubscription = () => {
    console.log("checking paymentStartdate inside submitPaymentSubscription");
    console.log(new Date(paymentStartDate) < new Date());

    // if (new Date(paymentStartDate) < new Date()) {
    //   console.log("setting error:  Please choose a future date!");
    //   setError("Please choose a future date!");
    //   return;
    // }

    console.log(`frequency: ${frequency} | amount: ${amount} | biWeeklyPaymentDate: ${biWeeklyPaymentDate}`)

    fetch("/api/payment_subscription", {
      method: "POST",
      headers: {
        "content-Type": "application/json",
      },
      body: JSON.stringify({
        billing_details: billingDetails,
        amount: amount,
        frequency: frequency,
        payment_date: paymentDate,
        weekday: weekday,
        biweekly_payment_date: biWeeklyPaymentDate,
        payment_method_id: paymentMethod.id,
        payment_start_date: paymentStartDate,
        user_id: currentUser?.id || currentUser?.user?.id,
      }),
    }).then((res) => console.log(JSON.stringify(res)));
  };

  function handlePaymentStartDateChange(e) {
    setPaymentStartDate(e.target.value);

    if (new Date(e.target.value) < new Date()) {
      setError("Please choose a future date!");
      return;
    } else {
      setError(null);
    }
  }

  return (
    <div className="stripe-containersssss recurring-checkout-form">      
      {paymentMethod ? (
        <div className="Result">
          <div className="ResultTitle" role="alert">
            Payment successful
            {submitPaymentSubscription()}
          </div>
          <div className="ResultMessage">
            Thanks for trying Stripe Elements. No money was charged, but we
            generated a PaymentMethod: {paymentMethod.id}
          </div>
          <ResetButton onClick={reset} />
        </div>
      ) : (
        <form className="Form" onSubmit={handleSubmit}>
          <fieldset className="FormGroup">
            <Input
              label="Name"
              id="name"
              type="text"
              placeholder="Jane Doe"
              required
              autoComplete="name"
              value={billingDetails.name}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, name: e.target.value });
              }}
            />
            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="janedoe@gmail.com"
              required
              autoComplete="email"
              value={billingDetails.email}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, email: e.target.value });
              }}
            />
            <Input
              label="Phone"
              id="phone"
              type="tel"
              placeholder="(941) 555-0123"
              required
              autoComplete="tel"
              value={billingDetails.phone}
              onChange={(e) => {
                setBillingDetails({ ...billingDetails, phone: e.target.value });
              }}
            />
          </fieldset>
          <fieldset className="FormGroup">
            {/* amount: amount,
          frequency: frequency,
          payment_date: paymentDate,
          weekday: weekday,
          biweekly_payment_date: biWeeklyPaymentDate,
          payment_method_id: paymentMethod.id, */}
          </fieldset>

          <div className="row">
            <div className="col-12 col-md-4">
              <FrequencyDropDown />
            </div>
            <div className="col-12 col-md-4">
              <AmountDropDown />
            </div>
            <div className="col-12 col-md-4">
              {frequency && frequency == "Monthly" && <PaymentDaysDropDown />}
              {frequency && frequency == "Weekly" && <WeekdayDropDown />}
              {frequency && frequency == "BiWeekly" && (
                <BiWeeklyPaymentDropDown />
              )}
            </div>
          </div>

          <h3 className="text-center">Schedule Subscription Date</h3>
          <div className="box-with-shadow">
            <input
              type="datetime-local"
              class="form-control"
              id="payment-start-date"
              value={paymentStartDate}
              onChange={(e) => handlePaymentStartDateChange(e)}
            />
          </div>

          <h3 className="text-center">Enter Card</h3>
          <div className="box-with-shadow">
            <CardField
              onChange={(e) => {
                setError(e.error);
                setCardComplete(e.complete);
              }}
            />
          </div>

          {error && <ErrorMessage message={error.message || error} />}
          <h3>Click to submit recurring payment</h3>
          <SubmitButton
            processing={processing}
            error={error}
            disabled={!stripe}
          >
            {amount && frequency && frequency == "Monthly" && (
              <p>
                Pay {amount} every {paymentDate} of the month. Subscription
                scheduled for {moment(paymentStartDate).format("lll")}{" "}
              </p>
            )}
            {amount && frequency && frequency == "Weekly" && (
              <p>
                Pay {amount} every {weekday} of the week. Subscription scheduled
                for {moment(paymentStartDate).format("lll")}
              </p>
            )}
            {amount && frequency && frequency == "BiWeekly" && (
              <p>
                Pay {amount} every two weeks, starting the {biWeeklyPaymentDate}
                . Subscription scheduled for{" "}
                {moment(paymentStartDate).format("lll")}
              </p>
            )}
          </SubmitButton>
          <h3>
            *You can cancel your subscription at any time in your profile page
          </h3>
        </form>
      )}
    </div>
  );
};

export default RecurringCheckoutForm;
