
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubscriptionCancelModal from "./SubscriptionCancelModal";
import FutureSubscriptionCard from "./FutureSubscriptionCard";

import { BackHomeButton } from "./BackHomeButton/BackHomeButton";

import './SubscriptionCard.scss';

const SubscriptionsList = ({
    subscriptions,
    selectCancelSubscriptionModal,
    selectedSubscription,
    setSubscriptions,
    cancelSubscription,
    cancelSubscriptionIsOpen,
    setCancelSubscriptionIsOpen
}) => {
    if (!subscriptions.length) return <div>You have no subscriptions yet! Add one!</div>

    return subscriptions.map((subscription) => (
        <div className="subscription-card">
            <p>Name: {subscription.title}</p>
            <p>Payment on {subscription.next_payment_date}</p>
            <button
                className='Subscription-cancel-modal-btn'
                type='button'
                onClick={() => selectCancelSubscriptionModal(subscription)}>Cancel Subscription</button>
            <SubscriptionCancelModal
                subscription={subscription}
                selectedSubscription={selectedSubscription}
                setSubscriptions={setSubscriptions}
                cancelSubscription={cancelSubscription}
                cancelSubscriptionIsOpen={cancelSubscriptionIsOpen}
                setCancelSubscriptionIsOpen={setCancelSubscriptionIsOpen}
            />
            {/* <button onClick={() => cancelSubscription(subscription.id)}>Cancel Subscription</button> */}
        </div>
    ))
}

function SubscriptionCard({currentUser, cancelSubscriptionIsOpen, setCancelSubscriptionIsOpen, cancelFutureSubscriptionIsOpen, setCancelFutureSubscriptionIsOpen}) {
    const userId = currentUser?.id || currentUser?.user?.id;

    const [ subscriptions, setSubscriptions] = useState([]);
    const [ selectedSubscription, setSelectedSubscription ] = useState(null)


    useEffect(() => {
        if (userId) {
            fetch(`/api/subscriptions?user_id=${userId}`)
            .then((r) => r.json())
            .then(subscriptions => setSubscriptions(subscriptions))
        }
    }, [])

    function cancelSubscription(subscriptionId) {
        // console.log(`cancelling...! ${subscriptionId}`);

        fetch("api/cancel_subscription", {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                subscription_id: subscriptionId
            })
        })
        .then((res) => res.json())
        .then(() => {
            const updatedSubs = subscriptions.filter((sub) => sub.id !== subscriptionId)
            setSubscriptions(updatedSubs);
            setCancelSubscriptionIsOpen(false)
        });
    }

    function selectCancelSubscriptionModal(subscription) {
        // console.log('inside selectCancelSubscriptionModal')
        // console.log(`selected subscription: ${subscription.id}`)
        setSelectedSubscription(subscription);
        setCancelSubscriptionIsOpen(true)
    }

    // console.log(`subscriptions: ${JSON.stringify(subscriptions)}`);

    return (
        <div className="subscriptions-page-overlay text-center">
            <h1>Current Subscriptions</h1>
            <SubscriptionsList
                subscriptions={subscriptions}
                selectCancelSubscriptionModal={selectCancelSubscriptionModal}
                selectedSubscription={selectedSubscription}
                setSubscriptions={setSubscriptions}
                cancelSubscription={cancelSubscription}
                cancelSubscriptionIsOpen={cancelSubscriptionIsOpen}
                setCancelSubscriptionIsOpen={setCancelSubscriptionIsOpen}
            />
            {
                // subscriptions.map((subscription) =>(
                //     <div>

                //         <p>Name: {subscription.title}</p>
                //         <p></p>
                //         <button className='Subscription-cancel-modal-btn' type='button' onClick={() => setCancelSubscriptionIsOpen(true)}>Cancel Subscription</button>
                //           <SubscriptionCancelModal subscription={subscription} setSubscriptions={setSubscriptions} cancelSubscription={cancelSubscription} cancelSubscriptionIsOpen={cancelSubscriptionIsOpen} setCancelSubscriptionIsOpen={setCancelSubscriptionIsOpen}/>
                //         {/* <button onClick={() => cancelSubscription(subscription.id)}>Cancel Subscription</button> */}
                //     </div>
                // ))
            }

            <h2>Future Subscriptions</h2>
            <FutureSubscriptionCard
                currentUser={currentUser}
                cancelFutureSubscriptionIsOpen={cancelFutureSubscriptionIsOpen}
                setCancelFutureSubscriptionIsOpen={setCancelFutureSubscriptionIsOpen} />

             <Link to='/profile' className="back-home-button">Back</Link>
        </div>
    )
}

export default SubscriptionCard;