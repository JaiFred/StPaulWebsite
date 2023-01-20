

//Hooks

//Components
import HonorsItemModal from './HonorsItemModal';
import EditDashboardDocument from './EditDashboardDocument';


const EditDashboardDocumentModal = ({
    document,
    setDocument,
    fetchDashboardDocuments,
    editDashboardDocumentModalIsOpen,
    setEditDashboardDocumentModalIsOpen
}) => (
    <HonorsItemModal
        className="overlay-edit-dashboard-document-modal"
        show={editDashboardDocumentModalIsOpen}
        onCancel={() => setEditDashboardDocumentModalIsOpen(false)}
        heading="Edit"
    >
        <EditDashboardDocument
            document={document}
            fetchDashboardDocuments={fetchDashboardDocuments}                  
            setEditDashboardDocumentModalIsOpen={setEditDashboardDocumentModalIsOpen}
            onCancel={() => setEditDashboardDocumentModalIsOpen(false)}
        />

    </HonorsItemModal>
)

export default EditDashboardDocumentModal;
