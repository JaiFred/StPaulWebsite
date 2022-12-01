
function AddHonorsItem({ handleSubmit, setDescription, handleDocumentsChange }){
    
    return(
        <div>
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