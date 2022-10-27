import React, { useState } from "react";
import { Link } from "react-router-dom";

import EventInfoPage from "./EventInfoPage";


function EventCard({event, showEvents}) {    

    const { id, title, starts, ends} = event

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
      console.log(`events: ${id} ${title}`);

    return (
        <div>
            <button className="event-card">
                <div>
                    <h2>{title}</h2>               
                    <h2>{starts}</h2>
                    {/* // <h3><StarRating totalStars={5} currentRating={rating} displayStar={true} /></h3>
                    // <button onClick={handleDeleteReview} type="button">Delete Review</button>
                    // <button onClick={handleEditReview} type="button">Edit Review</button> */}
                    <hr />
                    <Link to='/events/:id/more_information'>More Info</Link>
                </div>
            </button>
        </div> 
    )
}

export default EventCard;