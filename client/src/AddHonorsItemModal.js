//components
import AddHonorsItem from './AddHonorsItem'

import HonorsItemModal from './HonorsItemModal'

const AddHonorsItemModal = ({ setDocuments, addHonorIsOpen, setAddHonorIsOpen }) => (
    <HonorsItemModal
        className="overlay-add-honors-modal"
        show={addHonorIsOpen}
        onCancel={() => setAddHonorIsOpen(false)}
        heading="New Document">
        <AddHonorsItem setDocuments={setDocuments} onCancel={() => setAddHonorIsOpen(false)} />
    </HonorsItemModal>
)

export default AddHonorsItemModal