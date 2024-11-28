//Hooks
import { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

//components
import SubscriptionCard from "./SubscriptionCard";
import EditProfileModal from "./EditProfileModal";
import AccountDeleteConfirmationModal from "./AccountDeleteConfirmationModal";
import { BackHomeButton } from "./BackHomeButton/BackHomeButton";

import './ProfilePage.scss'

function ProfilePage({
  currentUser,
  setCurrentUser,
  authChecked,
  editProfileIsOpen,
  setEditProfileIsOpen,
  accountDeleteIsOpen,
  setAccountDeleteIsOpen,
}) {

  const ADMIN_LOGIN_ENDPOINT = process.env.NODE_ENV == "development" ? "http://localhost:3000/admin/login" : "https://www.st-paul-baptist-church.com/admin/login";


  const navigate = useNavigate();

  // console.log(`currentUser: ${JSON.stringify(currentUser)}`);
  // console.log(`currentUser?.user: ${JSON.stringify(currentUser?.user)}`);

  const profileFirstName =
    currentUser?.first_name || currentUser?.user.first_name;
  const profileLastName = currentUser?.last_name || currentUser?.user.last_name;
  const profileEmail = currentUser?.email || currentUser?.user.email;

  const userId = currentUser?.id || currentUser?.user?.id;

  const [email, setEmail] = useState(profileEmail);
  const [firstName, setFirstName] = useState(profileFirstName);
  const [lastName, setLastName] = useState(profileLastName);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [errors, setErrors] = useState([]);

  function handleUserDelete(event) {
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
          navigate("/profile_deleted_success");
          setAccountDeleteIsOpen(false); //new
        });
      } else {
        // console.log("Wrong credentials!");
        setError("Wrong username/password!");
      }
    });
  }

  function handleUserEdit(event) {
    event.preventDefault();
    fetch(`/api/users/${userId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        first_name: firstName,
        last_name: lastName,
      }),
    }).then((response) => {
      if (response.ok) {
        response.json().then((user) => {
          setCurrentUser(user.user);
          setErrors([]);
          setEditProfileIsOpen(false);

          if (profileEmail !== email) {
            setCurrentUser(null);
            navigate("/update_email_success");
          }
        });
      } else {
        // console.log("server response");
        response.json().then((error) => {
          // console.log(`message: ${JSON.stringify(error)}`);
          setErrors(error.message);
        });
      }
    });
  }

  if (!authChecked) {
    return <div></div>;
  }

  return (
    <div className="profile-page-background">
      <div className="profile-info-square">
        <h3 className="profile-info-name">{profileFirstName} {profileLastName}</h3>

        {/* Heading */}
        <h1 className="profile-page-title">Your Profile</h1>

        {/* Buttons */}
        <div className="profile-info-action-buttons mb-5">
          <button
            className="profile-info-edit"
            type="button"
            onClick={() => setEditProfileIsOpen(true)}
          >
            Edit account info
          </button>
          <button
              className="profile-info-delete"
              type="button"
              onClick={() => setAccountDeleteIsOpen(true)}
            >
              Delete account
          </button>
        </div>

        {/* Email */}
        <div className="mt-3 mb-5">
          <strong>Your email:</strong><br />
          {profileEmail}
        </div>

        {(currentUser?.admin || currentUser?.user?.admin) && (
          <div>
            <h3>Admin controls</h3>
            <div className="profile-info-action-buttons mb-5">
              <a href={ADMIN_LOGIN_ENDPOINT} target="_blank">Admin panel for managing data</a>
            </div>
          </div>
        )}

        {/* Subscription */}
        <div className="pb-5">
          <h3>Subscriptions</h3>
          <div className="profile-info-action-buttons mb-5">
            <Link to="/subscriptions_page">See your offering subscriptions</Link>
          </div>
        </div>

        {/* Home button */}
        <BackHomeButton className="mb-0" />

        <div>
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
    </div>
  );
}

export default ProfilePage;
