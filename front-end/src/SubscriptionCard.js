
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SubscriptionCancelModal from "./SubscriptionCancelModal";


function SubscriptionCard({currentUser, cancelSubscriptionIsOpen, setCancelSubscriptionIsOpen}) {
    const userId = currentUser?.id || currentUser?.user?.id;

    const [ subscriptions, setSubscriptions] = useState([]);
    

    useEffect(() => {
        if (userId) {
            fetch(`/api/subscriptions?user_id=${userId}`)
            .then((r) => r.json())
            .then(subscriptions => setSubscriptions(subscriptions))
        }
    },[])

    function cancelSubscription(subscriptionId) {
        console.log(`cancelling...! ${subscriptionId}`);

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

    console.log(`subscriptions: ${JSON.stringify(subscriptions)}`);

    return (
        <div className="subscriptions-page-overlay">
            <h1>Use this page to cancel your subscription payments</h1>   
            {
                subscriptions.map((subscription) =>( 
                    <div> 
                                       
                        <p>Name: {subscription.title}</p>
                        <button className='Subscription-cancel-modal-btn' type='button' onClick={() => setCancelSubscriptionIsOpen(true)}>Cancel Subscription</button>
                          <SubscriptionCancelModal subscription={subscription} setSubscriptions={setSubscriptions} cancelSubscription={cancelSubscription} cancelSubscriptionIsOpen={cancelSubscriptionIsOpen} setCancelSubscriptionIsOpen={setCancelSubscriptionIsOpen}/>
                        {/* <button onClick={() => cancelSubscription(subscription.id)}>Cancel Subscription</button> */}
                    </div>                
                ))
            }
            <div>
            <Link to='/profile'>Back to profile</Link>
            </div>
        </div>
    )
}

export default SubscriptionCard;