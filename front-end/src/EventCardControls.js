
//Components
import EventDeleteConfirmationModal from "./EventDeleteConfirmationModal"
import EventEditModal from "./EventEditModal"

export const EventCardControls = ({
    currentUser,
    event,
    deleteIsOpen,
    setDeleteIsOpen,
    handleDeleteClick,
    editEventIsOpen, 
    setEditEventIsOpen,
    handleEditEvent, }) => {

    return(
        <div className="admin-bulletin-controls">
            {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
            <div className="bulletin-controls">
            <div>
                <button className='delete-event-modal_btn' type='button' onClick={() => setDeleteIsOpen(true)}>Delete
                </button>
                <EventDeleteConfirmationModal event={event} deleteIsOpen={deleteIsOpen} setDeleteIsOpen={setDeleteIsOpen} handleDeleteClick={handleDeleteClick}/>
            </div>
            <div>
                <button className='edit-event-modal-btn' type='button' onClick={() => setEditEventIsOpen(true)}>Edit
                </button>
                <EventEditModal event={event} editEventIsOpen={editEventIsOpen} setEditEventIsOpen={setEditEventIsOpen} handleEditEvent={handleEditEvent} />
            </div>
            </div>
            ): ''}
        </div>

    )
}