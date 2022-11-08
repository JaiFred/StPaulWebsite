import React, { useState, useEffect } from "react";
import { useNavigate, Routes, Route } from "react-router-dom";
import { Link } from "react-router-dom";
// import { useParams } from 'react-router-dom';


import EventInfoPage from "./EventInfoPage";
import EventEditModal from "./EventEditModal";
import EventDeleteConfirmationModal from "./EventDeleteConfirmationModal";


// Goal:
// Have each event display with only the day number, month and year on the EventCard page 
// Have each event display with the day, day number, month, year and time on the EventInfoPage
// Have a months filter bar that appears when an event within that month is made - you can click on months to show events that take place during the month 


function EventCard({event, currentUser, handleDeleteEvent, handleEditEvent}){
    
    const [ deleteIsOpen , setDeleteIsOpen ] = useState(false);
    const [ editEventIsOpen , setEditEventIsOpen ] = useState(false);

    //edit

    const { id, title, starts_short, ends_short, details, location } = event;

    console.log(event);


    const navigate = useNavigate()

    function handleDeleteClick(e) {
        e.preventDefault()
        const reqObj = {
            method: "DELETE"
        }
        fetch(`/api/events/${id}`, reqObj )
        .then((res) => res.json())
        .then(handleDeleteEvent(id))
    }

    // function handleEditReview() {
    //     setEditReviewForm(!showEditReviewForm);
    // }

    // function handleDeleteReview() {
    //     fetch(`http://localhost:4000/api/v1/reviews/${id}`, {
    //         method: "DELETE",
    //         headers: {
    //           'Content-Type': 'application/json'
    //         }            
    //       })
    //         .then(response => response.json())
    //         .then(deletedReview => {
    //             const updatedReviews = reviews.filter((review) => {
    //                     if (review.id !== deletedReview.id) {
    //                         return review;
    //                     }     
    //                 }
    //               )
    //             setReviews(updatedReviews);                
    //         })         
    // }

    //   console.log(`events: ${id} ${title}`);

    return (
        <div>
            {currentUser ? (
                    <div>
                        <button className="event-card">
                            <div>
                                <div>
                                <button className='delete-event-modal_btn' type='button' onClick={() => setDeleteIsOpen(true)}>Delete
                                </button>
                                <EventDeleteConfirmationModal event={event} deleteIsOpen={deleteIsOpen} setDeleteIsOpen={setDeleteIsOpen} handleDeleteClick={handleDeleteClick}/>
                                </div>
                                <div>
                                <button className='edit-event-modal-btn' type='button' onClick={() => setEditEventIsOpen(true)}>Edit
                                </button>
                                </div>
                                <EventEditModal event={event} editEventIsOpen={editEventIsOpen} setEditEventIsOpen={setEditEventIsOpen} handleEditEvent={handleEditEvent} />
                                <h2>{title}</h2>               
                                <h2>starts: {starts_short} - ends: {ends_short}</h2>
                                {/* // <h3><StarRating totalStars={5} currentRating={rating} displayStar={true} /></h3>
                                // <button onClick={handleDeleteReview} type="button">Delete Review</button>
                                // <button onClick={handleEditReview} type="button">Edit Review</button> */}
                                <Routes>
                                    <Route path="/events/:id" element={<EventInfoPage />}/>
                                </Routes>
                                <Link to={`/events/${event.id}`}>More Info</Link>
                            </div>
                        </button>
                    </div>
                ) : (
                    <div> 
                        <button className="event-card">
            
                            <div>
                                {/* <h2>{id}</h2> */}
                                <h2>{title}</h2>               
                                <h2>starts: {starts_short} - ends: {ends_short}</h2>
                                {/* // <h3><StarRating totalStars={5} currentRating={rating} displayStar={true} /></h3>
                                // <button onClick={handleDeleteReview} type="button">Delete Review</button>
                                // <button onClick={handleEditReview} type="button">Edit Review</button> */}
                                <Routes>
                                    <Route path="/events/:id" element={<EventInfoPage />}/>
                                </Routes>
                                <Link to={`/events/${event.id}`}>More Info</Link>
                            </div>
                        </button>
                    </div>
                )}
           
        </div> 
    )
}

export default EventCard;