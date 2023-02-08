//Hooks
import { Modal, ModalHeader, ModalTitle, Button } from 'react-bootstrap'

//Components
import ModalFooter from './Modal/Footer';

//CSS

function SubscriptionCancelModal({ subscription, selectedSubscription, setSubscription, cancelSubscription, cancelSubscriptionIsOpen, setCancelSubscriptionIsOpen }){

    return(
        <Modal className='modal modal-delete text-center'              
                show={ cancelSubscriptionIsOpen && selectedSubscription === subscription }
                // hide={() => {setIsOpen(false)}}
            >
            <ModalHeader className="justify-content-center">
                <ModalTitle className='bold'>Are you sure you want to cancel {subscription.title}?</ModalTitle>
            </ModalHeader>
                <ModalFooter 
                    onSubmit={() => cancelSubscription(subscription.id)}
                    onCancel={() => {setCancelSubscriptionIsOpen(false)}}
                    submitLabel='Yes'
                    cancelLabel='No'
                    className="mb-4 mt-2"
                    theme='dark' 
                />
                {/* <ModalFooter> 
                    <button onClick={() => cancelSubscription(subscription.id)}>Yes</button>
                    
                    <button type="button" onClick={() => {setCancelSubscriptionIsOpen(false)}}>No</button> 
                </ModalFooter>  */}
        </Modal>
    )

}

export default SubscriptionCancelModal