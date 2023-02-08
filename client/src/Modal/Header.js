import { ModalHeader, ModalTitle } from 'react-bootstrap'

import Cross from "../images/Cross.png"
import { CrossIcon } from '../CrossIcon'

export const DarkHeader = ({ onCancel }) => (
    <ModalHeader className="modal-header__dark modal-header__centered">
        <ModalTitle className="modal-title__with-logo">
            <CrossIcon />
            Saint Paul Baptist Church
        </ModalTitle>
        <button type="button" className="modal-header--close btn-close btn-close-white" onClick={onCancel}></button>
    </ModalHeader>
)
