//Hooks
import react, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap'

function RecurringPaymentConfirmationModal({processing, error, children, disabled}){

    return(
        <div>
            <Modal>
                <button
                className={`SubmitButton ${error ? 'SubmitButton--error' : ''}`}
                type="submit"
                disabled={processing || disabled}
                >
                {processing ? 'Processing...' : children}
                </button>
            </Modal>
        </div>
    )
}

export default RecurringPaymentConfirmationModal