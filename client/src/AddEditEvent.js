// Hooks
import react, { useState } from 'react';
import { useNavigate } from "react-router-dom";

//Components
import InputFile from './Inputs/File';
import { OpaqueErrorMessage } from './Forms/OpaqueErrorMessage';

//CSS
import './AddEditEvent.scss'

function AddEditEvent({
    formData,
    setFormData,
    handleAddEditEvent,
    setAddEditEventIsOpen
}){
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
        zip_postalcode,
        country
    } = formData;

    const isEdit = Boolean(id);
    const [image, setImage] = useState(formData.image);
    const [errors, setErrors] = useState([]);

    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault();
        console.log("handleSubmit updating event");
        const formData = new FormData();

        if (typeof image === 'object') {
            formData.append("image", image);
        }
        formData.append("title", title);
        formData.append("starts", starts);
        formData.append("ends", ends);
        formData.append("details", details);
        formData.append("address_line_1", address_line_1);
        formData.append("address_line_2", address_line_2);
        formData.append("city", city);
        formData.append("state_province_region", state_province_region);
        formData.append("zip_postalcode", zip_postalcode)
        formData.append("country", country)

        const configObj = {
            method: isEdit ? "PATCH" : "POST",
            body: formData
        }
        const url = isEdit ? `/api/events/${id}` : `/api/events`

        fetch(url, configObj)
            .then((response) => {
                console.log('event created successfully!')
                console.log(response)
                if (response.ok) {
                    response.json().then((editedEvent) => {
                        handleAddEditEvent(editedEvent);
                        setAddEditEventIsOpen(false);
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
        if (e.target.files[0]) {
            const [file] = e.target.files;
            setFormData({ ...formData, image: file });
            setImage(file);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-default form-simple">
            <div className="text-center">
                <h1 className="text-center">
                    {isEdit ? 'Update' : 'Create'} event
                </h1>

                <h3>Title: {title || 'Choose your title!'}</h3>
                <InputFile
                    name="image"
                    accept="image/png, image/jpeg"
                    onChange={handleImageChange}
                    className="mb-3"
                    file={image}
                />
            </div>

           <label>Title</label>
            <input
                type="text"
                id="title"
                name="title"
                value={title || ''}
                placeholder="Title"
                onChange={handleChange}
            />

            <div className="two-column-grid md-one-column-grid">
                <label>
                    Starts
                    <input
                        type="datetime-local"
                        id="starts"
                        name="starts"
                        value={starts || ''}
                        onChange={handleChange} />
                </label>

                <label>
                    Ends
                    <input
                        type="datetime-local"
                        id="ends"
                        name="ends"
                        value={ends || ''}
                        onChange={handleChange} />
                </label>
            </div>

            <label>
                Details
             <textarea
                className="details_input"
                id="details_input"
                rows="8"
                name="details"
                placeholder="Describe your event"
                value={details || ''}
                onChange={handleChange}
            />
            </label>

            <h2 className="address-area font-weight-bold">Where</h2>
            <label>
                Street Address
             <input
                className="address_line_1_input"
                type="text"
                id="address_line_1_input"
                name="address_line_1"
                placeholder='address line 1'
                value={address_line_1 || ''}
                onChange={handleChange}
            />
            </label>

            <label>
                Apt, Suite etc.
            <input
                type="text"
                id="address_line_2_input"
                name="address_line_2"
                placeholder="Apt, Suite etc."
                value={address_line_2 || ''}
                onChange={handleChange}
            />
            </label>
            <label>
                Country
            <input
                type="text"
                id="country_input"
                name="country"
                value={country || ''}
                onChange={handleChange}
            />
            </label>
            <label>
                City
            <input
                type="text"
                id="city_input"
                name="city"
                value={city || ''}
                onChange={handleChange}
            />
            </label>
            <label>
                State/Province/Region
            <input
                type="text"
                id="state-province-region-input"
                name="state_province_region"
                value={state_province_region || ''}
                onChange={handleChange}
            />
            </label>
            <label>
                ZIP/Postal code
            <input
                type="text"
                id="zip-postalcode-input"
                name="zip_postalcode"
                value={zip_postalcode || ''}
                onChange={handleChange}
            />
            </label>

            {errors.map((error) => <OpaqueErrorMessage message={error.message || error} />)}

            <div className="two-column-grid">
                <button
                    id="submitBtn"
                    className="button-custom submit"
                    type="button"
                    onClick={handleSubmit}
                    method="post">
                        {isEdit ? 'Edit' : 'Add'}
                    </button>
                <button
                    id="cancelBtn"
                    className="button-custom cancel"
                    type="button"
                    onClick={() => setAddEditEventIsOpen(false)}>
                        Cancel
                    </button>
            </div>
        </form>
    )
}

export default AddEditEvent