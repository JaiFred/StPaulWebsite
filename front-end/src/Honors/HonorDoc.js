import { Link } from "react-router-dom";
import DeleteHonorsItemModal from "../DeleteHonorsItemModal";
import EditHonorsItemModal from "../EditHonorsItemModal";
import deleteIcon from '../images/event-delete-icon.svg';
import editIcon from '../images/event-edit-icon.svg';
import './HonorDoc.scss'

export const HonorDoc=  ({currentUser, doc, fetchDocuments, selectedDocument, editHonorIsOpen, 
setEditHonorIsOpen, selectEditModal, selectDeleteModal, documents, setDocuments, 
deleteHonorIsOpen, setDeleteHonorIsOpen}) => <div className={'honor-doc'}>                            
         <div className="honor-doc-outer">
            <div className="honor-doc-inner">
                {doc.file.endsWith(".pdf") ? (
                    <embed className="honor-doc-media" src={doc.file} target={"_parent"} width="500" height="600" />
                ) : (
                    <img className="honor-doc-media" src={doc.file}  width="500" height="600" />
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
                        <p>Description: {doc.description}</p>
                        
                        <a href={doc.file} target="_blank">Click to Open</a>


                    </div>
                </div>
            </div>
        </div>
    </div>

