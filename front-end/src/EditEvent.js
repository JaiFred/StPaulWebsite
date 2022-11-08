// Hooks
import react, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

function EditEvent({ formData, setFormData, event, handleEditEvent, setEditIsOpen, setEditEventIsOpen }){

    const { id, title, starts, ends, details, location } = formData;

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        console.log("handleSubmit updating event");

        const configObj = {
            method: "PATCH",
            headers: {
                "Content-Type" : "application/json",
                Accept: "application/json",
            },
            body: JSON.stringify(formData)
        }
        fetch(`/api/events/${id}`, configObj)
        .then((r) => r.json())
        .then((editedEvent) => handleEditEvent(editedEvent))
        .then(setEditEventIsOpen(false))
        .then(navigate(`/events`))
        
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({...formData, [name]: value })
    };

    return(
        <form onSubmit={handleSubmit}>
            <ul>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="title..."
                onChange={handleChange}
                />
                <input
                type="datetime-local"
                id="starts"
                name="starts"
                value={starts}
                onChange={handleChange}
                />
            </ul>
            <button id='submitBtn' type="button" onClick={handleSubmit} method="post">Edit</button>
        </form>
    )

}

export default EditEvent