// Hooks
import react, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";

function EditEvent({ formData, setFormData, event, handleEditEvent, setEditIsOpen, setEditEventIsOpen }){

    const { 
        id,
        title, 
        starts, 
        ends, 
        details, 
        address_line_1, 
        address_line_2, 
        city, 
        state_province_region, 
        // zip_postalcode, 
        country 
    } = formData;

    console.log(`formData in EditEvent: ${JSON.stringify(formData)}`);
    console.log(`starts: ${starts}`);


    const [image, setImage] = useState("");
    const [errors, setErrors] = useState([]);

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
        formData.append("address_line_1", address_line_1);
        formData.append("address_line_2", address_line_2);
        formData.append("city", city);
        formData.append("state_province_region", state_province_region);
        // formData.append("zip_postalcode", zip_postalcode)
        formData.append("country", country)

        const configObj = {
            method: "PATCH",
            body: formData
        }

        fetch(`/api/events/${id}`, configObj)
        .then((response) => { 
            if (response.ok) {
                response.json().then((editedEvent) => {
                    handleEditEvent(editedEvent);
                    setEditEventIsOpen(false);
                    navigate(`/events`)
                });
              } else {
                    response.json().then((response) => setErrors(response.errors));
              }
        })         
        
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
            {errors.map((error) => <p>{error}</p>)}
            <ul>
            <input 
                type="file" 
                name="image"
                accept="image/png, image/jpeg"
                onChange={handleImageChange} 
            />
            <h3>title</h3>
            <input
                type="text"
                id="title"
                name="title"
                value={title}
                placeholder="title..."
                onChange={handleChange}
            />

            <h3>starts on</h3>
            <input
                type="datetime-local"
                id="starts"
                name="starts"
                value={starts}
                onChange={handleChange}
            />

            <h3>ends on</h3>
            <input
                type="datetime-local"
                id="ends"
                name="ends"
                value={ends}
                onChange={handleChange}
            />

            <h3>details</h3>
             <textarea
                className="details_input"
                id="details_input"
                name="details"
                value={details}
                onChange={handleChange}
            />
            <h3>Street address</h3>
             <input
                className="address_line_1_input"
                id="address_line_1_input"
                name="address_line_1"
                value={address_line_1}
                onChange={handleChange}
            />
            <h3>Apt, Suite etc. (Optional)</h3>
            <input
                type="text"
                id="address_line_2_input"
                name="address_line_2"
                value={address_line_2}
                onChange={handleChange}
            />
            <h3>Country</h3>
            <input
                type="text"
                id="country_input"
                name="country"
                value={country}
                onChange={handleChange}
            />
            <h3>city</h3>
            <input
                type="text"
                id="city_input"
                name="city"
                value={city}
                onChange={handleChange}
            />
            <h3>State/Province/Region</h3>
            <input
                type="text"
                id="state-province-region-input"
                name="state-province-region"
                value={state_province_region}
                onChange={handleChange}
            />
            {/* <h3>ZIP/Postal code</h3>
            <input
                type="text"
                id="zip-postalcode-input"
                name="zip-postalcode"
                value={zip_postalcode}
                onChange={handleChange}
            /> */}

            </ul>
            <button id='submitBtn' type="button" onClick={handleSubmit} method="post">Edit</button>
            <button type="button" onClick={() => {setEditEventIsOpen(false)}}>Cancel</button>
        </form>
    )

}

export default EditEvent