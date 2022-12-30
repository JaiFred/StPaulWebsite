//Hooks
import { Modal, ModalHeader, ModalFooter, ModalTitle, Button } from 'react-bootstrap'

function FutureSubscriptionCancelModal({ subscription, selectedFutureSubscription, setSubscription, cancelSubscription, cancelFutureSubscriptionIsOpen, setCancelFutureSubscriptionIsOpen }){

    return(
        <div>
            <Modal className='modal'                
                show={ cancelFutureSubscriptionIsOpen && selectedFutureSubscription === subscription }
                // hide={() => {setIsOpen(false)}}
            >
            <ModalHeader >
                <ModalTitle>Are you sure you want to cancel {subscription.title}?</ModalTitle>
            </ModalHeader>
                <ModalFooter> 
                    <button onClick={() => cancelSubscription(subscription.id)}>Yes</button>
                    
                    <button type="button" onClick={() => {setCancelFutureSubscriptionIsOpen(false)}}>No</button> 
                </ModalFooter> 
            </Modal>
        </div>
    )

}

export default FutureSubscriptionCancelModal