//Hooks
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

//Components
import FutureSubscriptionCancelModal from "./FutureSubscriptionCancelModal";


function FutureSubscriptionCard({currentUser, cancelFutureSubscriptionIsOpen, setCancelFutureSubscriptionIsOpen}) {
    const userId = currentUser?.id || currentUser?.user?.id;

    const [ subscriptions, setSubscriptions] = useState([]);
    const [ selectedFutureSubscription, setSelectedFutureSubscription ] = useState(null)

    useEffect(() => {
        if (userId) {
            fetch(`/api/future_subscriptions?user_id=${userId}`)
            .then((r) => r.json())
            .then(subscriptions => setSubscriptions(subscriptions))
        }
    },[])

    function cancelSubscription(subscriptionId) {
        console.log(`cancelling...! ${subscriptionId}`);

        fetch(`api/future_subscriptions/${subscriptionId}?user_id=${userId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then((res) => res.json())
        .then(() => {
            const updatedSubs = subscriptions.filter((sub) => sub.id !== subscriptionId)         
            setSubscriptions(updatedSubs);
            setCancelFutureSubscriptionIsOpen(false)
        });
    }

    function selectCancelFutureSubscriptionModal(subscription) {
        console.log('inside selectCancelFutureSubscriptionModal')
        console.log(`selected future subscription: ${subscription.id}`)
        setSelectedFutureSubscription(subscription);        
        setCancelFutureSubscriptionIsOpen(true)
    }

    console.log(`subscriptions: ${JSON.stringify(subscriptions)}`);

    if (!subscriptions.length) return <div>You have no subscriptions yet! Add one!</div>

    return (
        <>
            {subscriptions.map((subscription) =>( 
                <div className="subscription-card future-subscription">                
                    <p>Name: {subscription.title}</p>
                    <p>Payment begins on {subscription.next_payment_date}</p>
                    <button className='Subscription-cancel-modal-btn' type='button' onClick={() => selectCancelFutureSubscriptionModal(subscription)}>Cancel Future Subscription</button>
                    <FutureSubscriptionCancelModal 
                        subscription={subscription} 
                        selectedFutureSubscription={selectedFutureSubscription} 
                        setSubscriptions={setSubscriptions} 
                        cancelSubscription={cancelSubscription} 
                        cancelFutureSubscriptionIsOpen={cancelFutureSubscriptionIsOpen} 
                        setCancelFutureSubscriptionIsOpen={setCancelFutureSubscriptionIsOpen}
                    />
                </div>    
            ))}
        </>
    )
}

export default FutureSubscriptionCard;