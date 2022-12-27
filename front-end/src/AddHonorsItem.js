//Hooks
import React, { useState, useEffect } from "react";


function AddHonorsItem({setDocuments}){

    const [ description, setDescription ] = useState('')
    const [ document, setDocument ] = useState(null)
    const [error, setError] = useState(null);

    function handleSubmit(e) {
        console.log("submitted!")
        e.preventDefault();

        if (!document) {
            setError('Image must be uploaded!')
            return;
        }

        if (!document && !description) {
            setError('Both document and description cant be blank!')
            return
        }

        const formData = new FormData();
        
        if (document) {
            formData.append("file", document);
        } 
        formData.append("description", description);

        fetch("api/honor_pages", {
            method: "POST",
            body: formData
        })
        .then((res) => res.json())
        .then((honorPage) => setDocuments(honorPage.documents));
    }

    function handleDocumentsChange (e) {
        console.log(`e.target.files[0]: ${e.target.files[0]}`)
        if (e.target.files[0]) setDocument(e.target.files[0]);
    };    
    
    return(
        <div>
            {error && <p>{error}</p>}
            <form>
            <label for="files">Select Documents:</label>            
            <input 
                type="file" 
                name="documents"
                accept="image/png, image/jpeg, application/pdf,application/vnd.ms-excel"
                onChange={handleDocumentsChange}
                multiple
            />
             <textarea
                className='description'
                type='text'
                id='description'
                name='description'  
                rows='5'
                cols='30'
                // value=
                placeholder='type here --'
                onChange={(e) => setDescription(e.target.value)}
            />
            <button id='submitBtn' type="button" onClick={handleSubmit} method="post">Submit</button>
            
            </form>
        </div>
    )
}

export default AddHonorsItem