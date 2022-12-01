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

const { first_name, last_name, email } = currentUser;

const userId = currentUser?.id || currentUser?.user?.id;

const [ username, setUsername ] = useState("");
const [ password, setPassword ] = useState("");
const [ error, setError ] = useState ("");


function handleUserDelete (event) {
    event.preventDefault();
    fetch(`/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        password: password,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then(() => {
          setCurrentUser(null);
          localStorage.setItem("currentUserId", null);
          navigate("/login");
        });
        } else {
            console.log('Wrong credentials!');
            setError("Wrong username/password!");
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
                <h3>Name: {first_name} {last_name}</h3>
                
                <h3>email: {email}</h3>
            
                
                <button className='change-account-info-modal-btn' type='button' onClick={() => setEditProfileIsOpen(true)}>Edit account info</button>
                    <EditProfileModal currentUser={currentUser} editProfileIsOpen={editProfileIsOpen} setEditProfileIsOpen={setEditProfileIsOpen}/>

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
                        username={username}
                        setUsername={setUsername}
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