//Hooks
import { useState } from "react";
import { Button } from "react-bootstrap";
import { Input } from './Forms/Input';

//Components
import { OpaqueErrorMessage } from "./Forms/OpaqueErrorMessage";

//CSS
import './EditProfile.scss'

function EditProfile({ errors, currentUser, editProfileIsOpen, setEditProfileIsOpen, handleUserEdit, firstName, setFirstName, lastName, setLastName, email, setEmail }){  
  const handleChange = handler => (event) => handler(event.target.value);
  
  return (
    <form className="form-default modal-form edit-profile-form" onSubmit={handleUserEdit}>
      <div className="grid-2-columns">
        <label>
          First name
          <input
            className="first-name-input"
            type="text"
            placeholder="First Name..."
            value={firstName}
            onChange={handleChange(setFirstName)}
          />
        </label>
        
        <label>
          Last name
          <input
            className="last-name-input"
            type="text"
            placeholder="Last Name..."
            value={lastName}
            onChange={handleChange(setLastName)}
          />
        </label>
      </div>

      <label>
        Email
        <input
          className="email-input mb-0"
          type="text"
          value={email}
          placeholder="E-mail..."
          onChange={handleChange(setEmail)}
        />
      </label>
    
            <div className="error mt-4 mb-5">
              {errors.map((error) => <OpaqueErrorMessage message={error.message || error}/>)}
            </div>
      
    </form>
  )
}

export default EditProfile