
function EditProfile({ currentUser, editProfileIsOpen, setEditProfileIsOpen }){

    return(
        <div>

<form className="register-form">
{/* <form className="register-form" onSubmit={handleSubmit}> */}
            <input
              className="first-name-input"
              type="text"
              placeholder="First Name..."
            //   onChange={(event) => setFirstName(event.target.value)}
            />
            <input
              className="last-name-input"
              type="text"
              placeholder="Last Name..."
            //   onChange={(event) => setLastName(event.target.value)}
            />
            <input
              className="email-input"
              type="text"
              placeholder="janedoe@..."
            //   onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="username-input"
              type="text"
              placeholder="Username..."
            //   onChange={(event) => setUsername(event.target.value)}
            />
            <input
              className="password-input"
              type="password"
              placeholder="Password..."
            //   onChange={(event) => setPassword(event.target.value)}
            />
          {/* <Button variant="primary" type="submit">SignUp</Button> */}
        </form>
            
        </div>
    )

}

export default EditProfile