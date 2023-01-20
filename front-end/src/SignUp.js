import { Link } from "react-router-dom"
import { useState } from "react";
import { Button, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import VideoContainer from './VideoContainer';

//CSS
import SignUpPage from "./images/Sign-up-page.mp4"

function SignUp({ currentUser, setCurrentUser, authChecked, setLogoutIsOpen }) {

    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState ("")
    const [errors, setErrors ] = useState ([]);
    // const [ username, setUsername ] = useState("");
    const [ password, setPassword ] = useState("");
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("");
// #  id         :integer          not null, primary key
// #  first_name :string
// #  last_name  :string
// #  username   :string
// #  email      :string
// #  password   :string
// #  created_at :datetime         not null
// #  updated_at :datetime         not null

    const navigate = useNavigate();

    setLogoutIsOpen(false);

    function handleSubmit (event) {
      event.preventDefault();

      // if (password !== passwordConfirmation) {
      //   setError('Password does not match!')
      //   return
      // }

      fetch("/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          { user: {
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          password_confirmation: passwordConfirmation
        } }),
      }).then((response) => {
        // if (response.ok) {
        //   console.log(`response.json: ${JSON.stringify(response.json())}`)    

        //   // response.json().then((user) => {
        //   //   // setCurrentUser(user);
        //   //   // localStorage.setItem("currentUserId", JSON.stringify(user));
        //   //   navigate("/signup_success");
        //   //   console.log(JSON.stringify(user));
        //   // });
        // } else {
        //     console.log('Wrong credentials!');
        //     console.log(`response.json: ${JSON.stringify(response.json())}`)
        //     // setError(response.errors)
        // }

        if (response.ok) {
          response.json().then((user) => {
            console.log(`I AM HERE: user: ${JSON.stringify(user)}`);
            if (user.errors) {
              console.log(user.errors || 'Wrong credentials!');
              setErrors(user.errors || ['Wrong credentials!']);
            }
            else {
              navigate("/signup_success");
            }
          });
        } else {            
            console.log('Wrong credentials!');
            setErrors(["Wrong email/password!"]);
        }

      });
    };

    if (!authChecked){
      return(
        <div></div>
      )
    }
    return(
        <VideoContainer video={SignUpPage}>
            <div className="form-container">
            <form className="register-form form-default" onSubmit={handleSubmit}>
              <h3>Sign Up</h3>
              <input
                className="first-name-input"
                type="text"
                placeholder="first name..."
                onChange={(event) => setFirstName(event.target.value)}
              />
              <input
                className="last-name-input"
                type="text"
                placeholder="last name..."
                onChange={(event) => setLastName(event.target.value)}
              />
              <input
                className="email-input"
                type="text"
                placeholder="E-mail..."
                onChange={(event) => setEmail(event.target.value)}
              />
              {/* <input
                className="username-input"
                type="text"
                placeholder="username..."
                onChange={(event) => setUsername(event.target.value)}
              /> */}
              <input
                className="password-input"
                type="password"
                placeholder="password..."
                onChange={(event) => setPassword(event.target.value)}
                // data-toggle="popover" 
                // data-trigger="hover" 
                // data-content="My popover content.My popover content.My popover content.My popover content."
              />
              <input
                className="password-confirmation-input"
                type="password-confirmation"
                placeholder="password confirmation..."
                onChange={(event) => setPasswordConfirmation(event.target.value)}
              />
              <div className="signup-button-container">
                <button className="signup-btn" type="submit">SignUp</button>
              </div>
              <div className="back-to-home-from-signup">
              <Link to='/'>Back Home</Link>
              </div>
          </form>
          {errors.map((error) => <p>{error}</p>)}
          <Link to='/login'>Back to Login</Link>
        </div>
      
    </VideoContainer>
  )
}

export default SignUp;