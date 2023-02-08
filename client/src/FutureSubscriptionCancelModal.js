//Hooks
import { Modal, ModalHeader, ModalTitle, Button } from 'react-bootstrap'

//Components
import ModalFooter from './Modal/Footer';

//CSS

function FutureSubscriptionCancelModal({ subscription, selectedFutureSubscription, setSubscription, cancelSubscription, cancelFutureSubscriptionIsOpen, setCancelFutureSubscriptionIsOpen }){

    return(
        <Modal className='modal modal-delete text-center'               
            show={ cancelFutureSubscriptionIsOpen && selectedFutureSubscription === subscription }
            // hide={() => {setIsOpen(false)}}
        >
        <ModalHeader className="justify-content-center">
            <ModalTitle className='bold'>Are you sure you want to cancel {subscription.title}?</ModalTitle>
        </ModalHeader>
            <ModalFooter 
                onSubmit={() => cancelSubscription(subscription.id)}
                onCancel={() => {setCancelFutureSubscriptionIsOpen(false)}}
                submitLabel='Yes'
                cancelLabel='No'
                className="mb-4 mt-2"
                theme='dark' 
            />
            {/* <ModalFooter> 
                <button onClick={() => cancelSubscription(subscription.id)}>Yes</button>
                
                <button type="button" onClick={() => {setCancelFutureSubscriptionIsOpen(false)}}>No</button> 
            </ModalFooter>  */}
        </Modal>
    )

}

export default FutureSubscriptionCancelModal