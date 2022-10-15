import React, { useState } from "react";

function EventCard({title, starts}) {    

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

    return (
        <div>

                <div>
                    <h2>Title: {title}</h2>               
                    <h2>Starts: {starts}</h2>
                    {/* // <h3><StarRating totalStars={5} currentRating={rating} displayStar={true} /></h3>
                    // <button onClick={handleDeleteReview} type="button">Delete Review</button>
                    // <button onClick={handleEditReview} type="button">Edit Review</button> */}
                    <hr />
                </div>              
        </div> 
    )
}

export default EventCard;