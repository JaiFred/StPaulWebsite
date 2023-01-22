//Hooks
import { Link, Navigate, Routes, Route } from 'react-router-dom'
import { useState } from "react";
import { Button } from "react-bootstrap";

import { useNavigate } from "react-router-dom";
import './Login.scss';

//Components
import PasswordRecoveryPage from './PasswordRecoveryPage';
import { OpaqueErrorMessage } from './Forms/OpaqueErrorMessage'

//CSS
import LoginBackground from './images/tree-background-red.jpeg'


function Login({ currentUser, setCurrentUser, authChecked, setLogoutIsOpen }) {


    // const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError ] = useState ("");

    let navigate = useNavigate();

    setLogoutIsOpen(false);

    function handleSubmit (event) {
      event.preventDefault();
      fetch("/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user:{
            email: email,
            password: password
          }
        }),
      }).then((response) => {
        console.log(`response: ${JSON.stringify(response)}`);
        if (response.ok) {
          response.json().then((user) => {
            console.log(`I AM HERE: user: ${JSON.stringify(user)}`);
            if (user.errors) {
              console.log(user.errors || 'Wrong credentials!');
              setError(user.errors || 'Wrong credentials!');
            }
            else {
              setCurrentUser(user);
              localStorage.setItem("currentUserId", JSON.stringify(user.user.id));
              navigate("/");
              console.log(JSON.stringify(user));
            }
          });
        } else {            
            console.log('Wrong credentials!');
            setError("Wrong email/password!");
        }
      });
    };

    if (!authChecked){
      return(
        <div></div>
      )
    }
    return(
    <div style={{ backgroundImage: `url(${LoginBackground})`, backgroundSize: 'cover' }}>
      <div className="form-container login-form-container text-white text-center">
          <h1>Login</h1>         

          <form onSubmit={handleSubmit} className="login-form">
            {/* <input
              className="username-input"
              type="text"
              placeholder="Username..."
              onChange={(event) => setUsername(event.target.value)}
            /> */}
             <input
              className="email-input button-custom"
              type="email"
              name="email"
              placeholder="email..."
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="password-input button-custom"
              type="password"
              placeholder="Password..."
              onChange={(event) => setPassword(event.target.value)}
            />

          <div className='login-back-buttons d-flex justify-content-between my-3'>
            <button className="login-btn button-custom" type="submit">Login</button>
            <Link to='/' className='back-home-btn button-custom'>Back</Link>
          </div>
          
          {error && (
            <div className="error mt-4 mb-5">
              <OpaqueErrorMessage message={error}/>
            </div>
          )}
  
          <Routes>
            <Route path='/password_recovery' element={<PasswordRecoveryPage/>}/>
          </Routes>
        </form>

        <footer>
          <div>
            Don't have an account? <Link to='/signup' className="main">Signup</Link>
          </div>
          <Link to='/password_recovery' className="forgot-password">
            Forgot your password
          </Link>
        </footer>
      </div>
    </div>
  )
}

export default Login