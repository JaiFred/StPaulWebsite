import { Link } from "react-router-dom"
import { useState } from "react";
import { Button, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import VideoContainer from './VideoContainer';
import { BackHomeButtonBordered } from "./BackHomeButton/BackHomeButtonBordered";
import useAvoidBounce from "./hooks/useAvoidBounce";

//CSS
import "./SignUp.scss"
import "./Forms/ErrorMessage"
import { ErrorMessage } from "./Forms/ErrorMessage";

function SignUp({ currentUser, setCurrentUser, authChecked, setLogoutIsOpen }) {
    useAvoidBounce();

    const SignUpPage = "https://st-paul-baptist-website-uploads.s3.amazonaws.com/Sign-up-page.mp4" 
    
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
            // console.log(`I AM HERE: user: ${JSON.stringify(user)}`);
            if (user.errors) {
              // console.log(user.errors || 'Wrong credentials!');
              setErrors(user.errors || ['Wrong credentials!']);
            }
            else {
              navigate("/signup_success");
            }
          });
        } else {            
            // console.log('Wrong credentials!');
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
              <div className="row">
                <div className="col-6">
                  <label>
                    First name
                    <input
                      required
                      className="first-name-input"
                      type="text"
                      name="first-name-input"
                      placeholder="First Name"
                      onChange={(event) => setFirstName(event.target.value)}
                      />
                  </label>
                </div>
                <div className="col-6">
                  <label>
                    Last name
                    <input
                      required
                      className="last-name-input"
                      type="text"
                      name="last-name-input"
                      placeholder="Last Name"
                      onChange={(event) => setLastName(event.target.value)}
                      />
                  </label>
                </div>
              </div>
              <label>
                Email
                <input
                  required
                  className="email-input"
                  name="email"
                  type="text"
                  placeholder="Email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </label>
              {/* <input
                className="username-input"
                type="text"
                placeholder="username..."
                onChange={(event) => setUsername(event.target.value)}
              /> */}
              <label>
                Password
                <input
                  required
                  className="password-input"
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                  // data-toggle="popover" 
                  // data-trigger="hover" 
                  // data-content="My popover content.My popover content.My popover content.My popover content."
                />
              </label>
              <label>
                Repeat password
                <input
                  required
                  className="password-confirmation-input"
                  type="password"
                  placeholder="Password Confirmation"
                  onChange={(event) => setPasswordConfirmation(event.target.value)}
                  />
              </label>

              {/* Errors */}
              {!!errors.length && (
                <div className="mt-4">
                  {errors.map((error) => <ErrorMessage message={error} />)}
                </div>
              )}

              {/* Buttons */}
              <div className="sign-up-buttons d-flex justify-content-between mt-5">
                <button className="signup-btn button-custom" type="submit">SignUp</button>
                <Link to='/login' className="button-custom">Back to Login</Link>
              </div>
          </form>
          <footer className="text-center">
            <div >
              Have an account, but
            </div>
            <Link to='/password_recovery' className="forgot-password">
              Forgot your password
            </Link>
          </footer>
          <BackHomeButtonBordered/>
        </div>
      
    </VideoContainer>
  )
}

export default SignUp;