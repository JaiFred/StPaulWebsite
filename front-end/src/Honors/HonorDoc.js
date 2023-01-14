import { Link } from "react-router-dom";
import DeleteHonorsItemModal from "../DeleteHonorsItemModal";
import EditHonorsItemModal from "../EditHonorsItemModal";
import deleteIcon from '../images/event-delete-icon.svg';
import editIcon from '../images/event-edit-icon.svg';
import './HonorDoc.scss'

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent a scelerisque leo. Nulla massa tortor, tempus vel augue quis, tristique sagittis tortor. Suspendisse blandit, magna eget maximus bibendum, lectus libero luctus libero, eget scelerisque arcu nisl in urna. Morbi id nibh mauris. Duis turpis erat, euismod at nibh commodo, congue pellentesque ipsum. Proin mattis, leo quis congue fermentum, orci purus consequat erat, quis bibendum libero purus non dui. Maecenas luctus placerat augue et iaculis. Sed sodales in arcu non lobortis. Etiam mattis sem quis dapibus congue.
Sed justo ligula, rhoncus eu mattis ut, cursus quis orci. Sed imperdiet gravida justo, nec tincidunt urna elementum at. Nullam eros nunc, volutpat vel orci quis, vestibulum sollicitudin mauris. Maecenas fermentum eu nisi ac sollicitudin. Nunc non lacus sem. Donec commodo risus congue magna lacinia, eu consequat leo accumsan. Pellentesque ornare tristique quam, sed semper enim pharetra non.
`

const blankLinks = html => html.replaceAll('<a ', '<a target="_blank" ');
const parseDescription = html => {
    return blankLinks(html);
}

export const HonorDoc=  ({currentUser, doc, fetchDocuments, selectedDocument, editHonorIsOpen, 
setEditHonorIsOpen, selectEditModal, selectDeleteModal, documents, setDocuments, 
deleteHonorIsOpen, setDeleteHonorIsOpen}) => <div className={'honor-doc'}>                            
         <div className="honor-doc-outer">
            <div className="honor-doc-inner">
                {doc.file.endsWith(".pdf") ? (
                    <div className="honor-doc-media-container">
                        <embed className="honor-doc-media" src={doc.file} target={"_parent"} width="500" height="600" />
                    </div>
                ) : (
                    <div className="honor-doc-media-container">
                        <img className="honor-doc-media" src={doc.file} target={"_parent"} width="500" height="600" />
                    </div>
                )}

                {(currentUser?.admin === true || currentUser?.user?.admin === true) && <div className="honor-doc-controls">
                                                

                        {/* This will delete a document in the Honors Page */}
                        <button className='honor-doc-control' type='button' onClick={() => selectDeleteModal(doc)}>
                            <img src={deleteIcon} />
                        </button>
                        {/* This will edit a document in the Honors Page */}
                        
                        <button className='honor-doc-control' type='button' onClick={() => selectEditModal(doc)}>
                            <img src={editIcon} />
                        </button>
                        
                </div>}
                {(currentUser?.admin === true || currentUser?.user?.admin === true) && <>
                        <EditHonorsItemModal
                            fetchDocuments={fetchDocuments}
                            selectedDocument={selectedDocument}
                            doc={doc}
                            editHonorIsOpen={editHonorIsOpen}
                            setEditHonorIsOpen={setEditHonorIsOpen}
                        />   
                        <DeleteHonorsItemModal 
                            selectedDocument={selectedDocument} 
                            doc={doc}                                                               
                            documents={documents} 
                            setDocuments={setDocuments} 
                            deleteHonorIsOpen={deleteHonorIsOpen} 
                            setDeleteHonorIsOpen={setDeleteHonorIsOpen}                                
                        />
                </>
                }
                <div class="honor-doc-infos">
                    <div class="honor-doc-infos-inner">
                        <p dangerouslySetInnerHTML={{ __html: parseDescription(doc.description)}}></p>
                    </div>
                    <a href={doc.file} target="_blank" className="honor-doc-infos-click-to-open">Click to Open</a>
                </div>
            </div>
        </div>
    </div>

