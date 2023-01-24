//Hooks
import { useState, useEffect } from "react";
import { Link, Navigate } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


//components
import SubscriptionCard from "./SubscriptionCard";
import EditProfileModal from "./EditProfileModal";
import AccountDeleteConfirmationModal from "./AccountDeleteConfirmationModal";

function ProfilePage({ currentUser, setCurrentUser, authChecked, editProfileIsOpen, setEditProfileIsOpen, accountDeleteIsOpen, setAccountDeleteIsOpen }) {

// const lastName = currentUser?.user?.last_name || currentUser?.last_name;

let navigate = useNavigate();

console.log(`currentUser: ${JSON.stringify(currentUser)}`);
console.log(`currentUser?.user: ${JSON.stringify(currentUser?.user)}`);

const profileFirstName = currentUser?.first_name || currentUser?.user.first_name;
const profileLastName = currentUser?.last_name || currentUser?.user.last_name;
const profileEmail = currentUser?.email || currentUser?.user.email;

const userId = currentUser?.id || currentUser?.user?.id;


const [ email, setEmail ] = useState(profileEmail);
const [ firstName, setFirstName ] = useState(profileFirstName);
const [ lastName, setLastName ] = useState(profileLastName);
const [ password, setPassword ] = useState("");
const [ error, setError ] = useState ("");
const [errors, setErrors] = useState([]);

function handleUserDelete (event) {
    event.preventDefault();
    fetch(`/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then(() => {
          setCurrentUser(null);
          localStorage.setItem("currentUserId", null);
          navigate("/login");
          setAccountDeleteIsOpen(false) //new
        });
        } else {
            console.log('Wrong credentials!');
            setError("Wrong username/password!");
        }  
    });
  };

  function handleUserEdit (event) {
    event.preventDefault();
    fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,        
        first_name: firstName,
        last_name: lastName
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setCurrentUser(user.user);
          setErrors([]);
          setEditProfileIsOpen(false);

          if (profileEmail !== email) {
            setCurrentUser(null);
            navigate('/update_email_success');
          }

        });
      }
      else {
        console.log('server response');
        response.json().then((error) => {
          console.log(`message: ${JSON.stringify(error)}`);
          setErrors(error.message)
        });
      }  
    });
  };

  if (!authChecked){
      return(
        <div></div>
      )
  }
    
  return(
    <div className='profile-page-background'>
        <div className='profile-info-square'>
            <h1 className='profile-page-title'>Your Profile</h1>
            <h3>Name: {profileFirstName} {profileLastName}</h3>
            <h3>email: {profileEmail}</h3>
                    
            <button className='change-account-info-modal-btn' type='button' onClick={() => setEditProfileIsOpen(true)}>Edit account info</button>
                <EditProfileModal 
                  currentUser={currentUser} 
                  editProfileIsOpen={editProfileIsOpen} 
                  setEditProfileIsOpen={setEditProfileIsOpen}
                  handleUserEdit={handleUserEdit}
                  firstName={firstName}
                  setFirstName={setFirstName}
                  lastName={lastName}
                  setLastName={setLastName}
                  email={email}
                  setEmail={setEmail}
                  errors={errors}
                />

            <h3>Subscriptions</h3>
            <div>
                <Link to='/subscriptions_page'>See your offering subscriptions</Link>
            </div>
            <div>
                <Link to='/'>Back Home</Link>
            </div>

            <div>
            <button className='account-delete-modal-btn' type='button' onClick={() => setAccountDeleteIsOpen(true)}>Delete account</button>
                <AccountDeleteConfirmationModal 
                    currentUser={currentUser} 
                    accountDeleteIsOpen={accountDeleteIsOpen} 
                    setAccountDeleteIsOpen={setAccountDeleteIsOpen} 
                    handleUserDelete={handleUserDelete}
                    email={email}
                    setEmail={setEmail}
                    password={password}
                    setPassword={setPassword}
                    error={error}
                />
            </div>
        </div>
    </div>
  )
}

export default ProfilePage