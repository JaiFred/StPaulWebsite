//Hooks
import { useState } from "react";
import { Button } from "react-bootstrap";

function EditProfile({ errors, currentUser, editProfileIsOpen, setEditProfileIsOpen, handleUserEdit, firstName, setFirstName, lastName, setLastName, email, setEmail }){  

    return(
      <div>
        <form className="register-form" onSubmit={handleUserEdit}>
            <input
              className="first-name-input"
              type="text"
              placeholder="First Name..."
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              className="last-name-input"
              type="text"
              placeholder="Last Name..."
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
            />
            <input
              className="email-input"
              type="text"
              value={email}
              placeholder="E-mail..."
              onChange={(event) => setEmail(event.target.value)}
            />
          <Button variant="primary" type="submit">Update Profile</Button>
        </form>            
        {errors.map((error) => <p>{error}</p>)}
      </div>
    )

}

export default EditProfile