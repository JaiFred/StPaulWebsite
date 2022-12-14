//Hooks
import React, { useState, useEffect } from "react";




function SubmitEvent({ handleAddNewEvent }){

    // t.string :title
    // t.datetime :starts
    // t.datetime :ends
    // t.string :details
    // t.string :location

    // t.string :address_line_1
    // t.string :address_line_2
    // t.string :city
    // t.string :state_province_region
    // t.string :zip_postalcode
    // t.string :country

    const [ title, setTitle ] = useState("")
    const [ starts, setStarts ] = useState("")
    const [ ends, setEnds ] = useState("")
    const [ details, setDetails ] = useState("")
    const [ addressLine1, setaddressLine1 ] = useState("")
    const [ addressLine2, setaddressLine2 ] = useState("")
    const [ city, setCity ] = useState("")
    const [ image, setImage ] = useState("")
    const [errors, setErrors] = useState([]);

    function handleSubmit(e){
        console.log("submitted")
        console.log(`submitting form with image: ${image}`);
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", image);
        formData.append("title", title);
        formData.append("starts", starts);
        formData.append("ends", ends);
        formData.append("details", details);
        formData.append("address_line_1", addressLine1);
        formData.append("address_line_2", addressLine2);
        formData.append("city", city);


        fetch("api/events", {
            method: "POST",
            body: formData
        })        
        .then((response) => { 
            if (response.ok) {
                response.json().then((newEvent) => handleAddNewEvent(newEvent));
              } else {
                    response.json().then((response) => setErrors(response.errors))                  ;
              }
        })        
    }


    function handleImageChange (e) {
        console.log(`e.target.files[0]: ${e.target.files[0]}`)
        if (e.target.files[0]) setImage(e.target.files[0]);
    };

    console.log(`image: ${image}`);



    return(
        <div>
            <h1>Submit New Event</h1>
            <ul>
             {errors.map((error) => <p>{error}</p>)}
            <input 
                type="file" 
                name="image"
                accept="image/png, image/jpeg"
                onChange={handleImageChange} 
            />

                <input 
                type='text'
                className='title-input'
                id='title'
                placeholder='title' 
                onChange={(e) => setTitle(e.target.value)}
                />
                <input
                type='datetime-local'
                className='starts-input'
                id='starts'
                onChange={(e) => setStarts(e.target.value)}
                />
                <input
                type='datetime-local'
                className='ends-input'
                id='ends'
                onChange={(e) => setEnds(e.target.value)}
                />
                <input
                type='text'
                className='details-input'
                id='details'
                placeholder='details'
                onChange={(e) => setDetails(e.target.value)}
                />
                <input
                type='text'
                className='address_line_1_input'
                id='address_line_1_input'
                placeholder='address line 1'
                onChange={(e) => setaddressLine1(e.target.value)}
                />
                {/* I want a new location input for the apt/suite etc.(optional) */}
                
                <input
                    type='text'
                    className='address_line_2_input'
                    id='address_line_2_input'
                    placeholder='address line 2'
                    onChange={(e) => setaddressLine2(e.target.value)}
                /><label htmlFor="address_line_2_input">Apartment, suite, unit, building, floor</label>
                
                <input
                    type='text'
                    className='city_input'
                    id='city_input'
                    placeholder='city'
                    onChange={(e) => setCity(e.target.value)}
                />
                {/* I want a city dropdown*/}
                {/* I want a country dropdown - other dropdowns such as "state" must be reactive */}
                {/* I want a state dropdown - this disappears if the country is not the United States*/}
                {/* ZIP/Postal code*/}

                
            </ul>
            <button id='submitBtn' type="button" onClick={handleSubmit} method="post">Submit</button>
        </div>
    )
}

export default SubmitEvent