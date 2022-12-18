
import react, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// send props into here to make this work again...

function EditHonorsItem({ fetchDocuments, doc, document, setDocument, description, initDescription, setDescription, handleDocumentsChange, setEditHonorIsOpen }){

    //  const { id } = document;

    // let { id } = useParams();

    console.log(`EditHonorsItem..document.id: ${doc.id}`);

    // useEffect(() => {
    //     fetch(`/api/documents/${id}`)
    //     .then((res) => res.json())
    //     .then((document) => setDocument(document));
    // }, []);

    // const [description, setDescription] = useState('');
    // const [file, setFile] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        console.log(`handleSubmit updating document: ${doc.id}`);

        const formData = new FormData();
        formData.append("file", document);
        formData.append("description", description);

        const configObj = {
            method: "PATCH",
            body: formData
        }
        fetch(`/api/documents/${doc.id}`, configObj)
        .then((r) => r.json())
        .then(fetchDocuments())
        .then(setEditHonorIsOpen(false));
        // .then((editedEvent) => handleEditEvent(editedEvent))
        // .then(navigate(`/events`))        
    };

    // function handleDocumentsChange (e) {
    //     console.log(`e.target.files[0]: ${e.target.files[0]}`)
    //     if (e.target.files[0]) setFile(e.target.files[0]);
    // };    

    return(
        <form onSubmit={handleSubmit}>
            <ul>
            <input 
                type="file" 
                name="documents"
                accept="image/png, image/jpeg, application/pdf,application/vnd.ms-excel"
                onChange={handleDocumentsChange}
                multiple
            />
            <textarea
                type="text"
                id="description"
                name="description"
                rows='5'
                cols='30'
                value={description || initDescription}
                placeholder="description..."
                onChange={(e) => { setDescription(e.target.value)}}
            />
            </ul>
            <button id='submitBtn' type="button" onClick={handleSubmit} method="post">Edit</button>
        </form>
    )

}
export default EditHonorsItem