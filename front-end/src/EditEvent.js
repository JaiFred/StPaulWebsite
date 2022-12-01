// Hooks
import react, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

function EditEvent({ formData, setFormData, event, handleEditEvent, setEditIsOpen, setEditEventIsOpen }){

    const { id, title, starts, ends, details, address_line_1, address_line_2, city } = formData;

    const [image, setImage] = useState("");

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        console.log("handleSubmit updating event");

        const formData = new FormData();


        formData.append("image", image);
        formData.append("title", title);
        formData.append("starts", starts);
        formData.append("ends", ends);
        formData.append("details", details);
        // formData.append("location", location);
        formData.append("address_line_1", address_line_1);
        formData.append("address_line_2", address_line_2);
        formData.append("city", city);

        const configObj = {
            method: "PATCH",
            // headers: {
            //     "Content-Type" : "application/json",
            //     Accept: "application/json",
            // },
            body: formData
        }
        fetch(`/api/events/${id}`, configObj)
        .then((r) => r.json())
        .then((editedEvent) => handleEditEvent(editedEvent))
        .then(setEditEventIsOpen(false))
        .then(navigate(`/events`))
        
    };

    const handleChange = (e) => {
        console.log(`e.target.name: ${e.target.name}`);
        console.log(`e.target.value: ${e.target.value}`);
        const { name, value } = e.target;
        setFormData({...formData, [name]: value })
    };

    function handleImageChange (e) {
        console.log(`handleImageChange....`)
        console.log(`e.target.files[0]: ${e.target.files[0]}`)
        const { name, value } = e.target;
        // if (e.target.files[0]) setFormData({...formData, [name]: e.target.files[0] });
        if (e.target.files[0]) setImage(e.target.files[0]);
        
    };

    return(
        <form onSubmit={handleSubmit}>
            <ul>
            <input 
                type="file" 
                name="image"
                accept="image/png, image/jpeg"
                onChange={handleImageChange} 
            />
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="title..."
                onChange={handleChange}
            />
            <label htmlFor="starts">starts on</label>
            <input
                type="datetime-local"
                id="starts"
                name="starts"
                value={starts}
                onChange={handleChange}
            />
            <label htmlFor="ends">ends on</label>
            <input
                type="datetime-local"
                id="ends"
                name="ends"
                value={ends}
                onChange={handleChange}
            />
            <label htmlFor="address_line_1_input">address line 1</label>
             <textarea
                className="address_line_1_input"
                id="address_line_1_input"
                name="address_line_1"
                value={address_line_1}
                onChange={handleChange}
            />
            <label htmlFor="address_line_2_input">address line 2</label>
            <input
                type="text"
                id="address_line_2_input"
                name="address_line_2"
                value={address_line_2}
                onChange={handleChange}
            />
            <label htmlFor="city_input">city</label>
            <input
                type="text"
                id="city_input"
                name="city"
                value={city}
                onChange={handleChange}
            />
            </ul>
            <button id='submitBtn' type="button" onClick={handleSubmit} method="post">Edit</button>
        </form>
    )

}

export default EditEvent