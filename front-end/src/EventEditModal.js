// Hooks
import react, { useEffect, useState } from 'react';
import { Modal, ModalHeader, ModalFooter, ModalTitle, ModalBody } from 'react-bootstrap'

import EditEvent from './EditEvent';

function EventEditModal({ event, editEventIsOpen, setEditEventIsOpen, handleEditEvent }){

    // t.string :title
    // t.datetime :starts
    // t.datetime :ends
    // t.string :details
    // t.string :location

    function handleUpdateEvent(e) {
        e.preventDefault();
    
        // const data = {
        //   review: {
        //     text: editedText,
        //     rating: editedRating,
        //     user_id: 7,
        //     restaurant_id: 20,
        //   },
        // };
    
        // fetch(`http://localhost:4000/api/v1/reviews/${id}`, {
        //   method: "PUT",
        //   headers: {
        //     "Content-Type": "application/json",
        //   },
        //   body: JSON.stringify(data),
        // })
        //   .then((response) => response.json())
        //   .then((updatedReview) => {
        //     const updatedReviews = reviews.map((review) => {
        //       if (review.id === updatedReview.id) {
        //         return updatedReview;
        //       } else {
        //         return review;
        //       }
        //     });
        //     setReviews(updatedReviews);
        //     setEditReviewForm(!showEditReviewForm);
        //   });
      }    

    const[formData, setFormData] = useState({
        title: "",
        starts: "",
        ends: "",  
        details: "",
        address_line_1: "", 
        address_line_2: "",
        city: "",
        image: "",       
    });

    useEffect(() => {
        fetch(`/api/events/${id}`)
        .then((res) => res.json())
        .then((event) => setFormData(event));
    }, []);

    const { id, title, starts_short, ends_short, details, address_line_1, address_line_2, city, image = "" } = event;


    return(
        <div className='overlay_edit_modal'>
            <Modal className='edit_modal'
            show={ editEventIsOpen }
            >
                <ModalHeader>
                
                    <ModalTitle>
                        Edit: <h1>{title}</h1>
                        <button type="button" onClick={() => {setEditEventIsOpen(false)}}>X</button>
                    </ModalTitle>
                    <ModalBody>
                    </ModalBody>
                </ModalHeader>
                <ModalFooter>
                    <EditEvent formData={formData} setFormData={setFormData} handleEditEvent={handleEditEvent} setEditEventIsOpen={setEditEventIsOpen}/>
                    <button type="button" onClick={() => {setEditEventIsOpen(false)}}>Cancel</button>
                </ModalFooter>
            </Modal>
        </div>
    )
}

export default EventEditModal