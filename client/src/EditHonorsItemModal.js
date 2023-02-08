//components
import EditHonorsItem from "./EditHonorsItem"

import HonorsItemModal from './HonorsItemModal'

const EditHonorsItemModal = ({ fetchDocuments, setDocuments, selectedDocument, doc, editHonorIsOpen, setEditHonorIsOpen }) => (
    <HonorsItemModal
        className="overlay-edit-honors-modal"
        show={editHonorIsOpen && selectedDocument === doc}
        onCancel={() => setEditHonorIsOpen(false)}
        heading="Edit"
    >
        <EditHonorsItem 
            fetchDocuments={fetchDocuments}
            setDocuments={setDocuments}
            doc={doc}                        
            setEditHonorIsOpen={setEditHonorIsOpen}
            onCancel={() => setEditHonorIsOpen(false)}
        />
    </HonorsItemModal>
)

export default EditHonorsItemModal
