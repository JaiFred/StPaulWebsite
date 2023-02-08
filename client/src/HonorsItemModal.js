//Hooks
import { Modal, ModalHeader, ModalBody, ModalFooter, ModalTitle, Button } from 'react-bootstrap'

//components
import EditHonorsItem from "./EditHonorsItem"
import EditDashboardDocument from './EditDashboardDocumentModal'
import { DarkHeader } from './Modal/Header'

const HonorsItemModal = ({ show, onCancel, heading, className, children }) => (
    <div className={className}>
        <Modal
            className='modal'
            show={show}
            autoFocus={false}
        >
            <DarkHeader onCancel={onCancel} />
            <ModalTitle className="text-center mt-3 text-white bold h2">{heading}</ModalTitle>
            <ModalBody>
                {children}
            </ModalBody>
        </Modal>
    </div>
)

export default HonorsItemModal;
