
//Components
import EventDeleteConfirmationModal from "./EventDeleteConfirmationModal"
import EventAddEditModal from "./EventAddEditModal"
import deleteIcon from './images/event-delete-icon.svg';
import editIcon from './images/event-edit-icon.svg';

export const EventCardControls = ({
    currentUser,
    event,
    deleteIsOpen,
    setDeleteIsOpen,
    handleDeleteClick,
    editEventIsOpen, 
    setEditEventIsOpen,
    handleEditEvent, }) => {

    return(<div>
        <div className="event-card-controls" >
            {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
            <>
                <button className='event-card-control' type='button' onClick={() => setDeleteIsOpen(true)}>
                    <img src={deleteIcon} />
                </button>
                
                <button className='event-card-control' type='button' onClick={() => setEditEventIsOpen(true)}>
                <img src={editIcon} />
                </button>
                
            </>
            ): ''}

        </div>
            <EventDeleteConfirmationModal 
                event={event} 
                deleteIsOpen={deleteIsOpen} 
                setDeleteIsOpen={setDeleteIsOpen} 
                handleDeleteClick={handleDeleteClick}
            />
            <EventAddEditModal 
                id={event.id} 
                addEditEventIsOpen={editEventIsOpen} 
                setAddEditEventIsOpen={setEditEventIsOpen} 
                handleAddEditEvent={handleEditEvent}
            />
        </div>

    )
}