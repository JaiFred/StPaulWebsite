
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import ModalFooter from './Modal/Footer';
import InputFile from './Inputs/File';

//Components
import Editor from './Editor/Editor';

//CSS
import './EditHonorsItem.scss'


// send props into here to make this work again...

function EditHonorsItem({ fetchDocuments, setDocuments, doc, setEditHonorIsOpen, onCancel }){

    const navigate = useNavigate();

    //  const { id } = document;
    // let { id } = useParams();

    // console.log(`EditHonorsItem..document.id: ${doc.id}`);

    const [editedDescription, setEditedDescription] = useState(doc.description);
    const [ document, setDocument ] = useState(null)
    const [isDocumentPdf, setIsDocumentPdf] = useState(doc.file.endsWith(".pdf"));
    const [showExistingDocument, setShowExistingDocument] = useState(true);


    // console.log(`editedDescription: ${editedDescription}`);

    function handleSubmit(e) {
        e.preventDefault();
        // console.log(`handleSubmit updating document: ${doc.id}`);

        const formData = new FormData();
        if (document) {
            formData.append("file", document);
        }        
        formData.append("description", editedDescription);

        const configObj = {
            method: "PATCH",
            body: formData
        }

        fetch(`api/documents/${doc.id}`, configObj)
        .then((response) => {
            // console.log('document updated successfully');
            // console.log('fetching latest documents 1')
            setEditHonorIsOpen(false);
            // console.log('fetching latest documents 2')
            fetchDocuments(setDocuments);
          })      
    };

    function handleDocumentsChange (e) {
        // console.log(`e.target.files[0]: ${e.target.files[0]}`)
        if (e.target.files[0]) { 
            setDocument(e.target.files[0]); 
            setShowExistingDocument(false);
        }
    };

    return(
        <form className='honors-item-edit-form' onSubmit={handleSubmit}>
            <div className='text-center'>
                <InputFile 
                    name="documents"
                    accept="image/png, image/jpeg, application/pdf, application/vnd.ms-excel"
                    onChange={handleDocumentsChange}
                    className='my-3'
                    file={doc.file}
                />
                <h6 className="document-content-title-box">Edit information about this document</h6>
                <Editor
                    id="description"
                    value={editedDescription}
                    onChange={newValue => {
                        setEditedDescription(newValue)
                        // console.log({newValue})
                    }}
                    placeholder="description..." 
                />

            </div>
            <ModalFooter onSubmit={handleSubmit} onCancel={onCancel} submitLabel="Edit" />
        </form>
    )

}
export default EditHonorsItem