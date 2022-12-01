//Hooks
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button } from 'react-bootstrap'


function SubscriptionCancelModal({ subscription, setSubscription, cancelSubscription, cancelSubscriptionIsOpen, setCancelSubscriptionIsOpen }){

    return(
        <div>
            <Modal className='modal'
                show={ cancelSubscriptionIsOpen }
                // hide={() => {setIsOpen(false)}}
            >
            <ModalHeader >
                <ModalTitle>Are you sure you want to cancel {subscription.title}?</ModalTitle>
            </ModalHeader>
                <ModalFooter> 
                    <button onClick={() => cancelSubscription(subscription.id)}>Yes</button>
                    
                    <button type="button" onClick={() => {setCancelSubscriptionIsOpen(false)}}>No</button> 
                </ModalFooter> 
            </Modal>
        </div>
    )

}

export default SubscriptionCancelModal