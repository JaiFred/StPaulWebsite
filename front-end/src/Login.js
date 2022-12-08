//Hooks
import { Link, Navigate, Routes, Route } from 'react-router-dom'
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


//Components
import PasswordRecoveryPage from './PasswordRecoveryPage';

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
          // username: username,
          email: email,
          password: password,
        }),
      }).then((response) => {
        console.log(`response: ${JSON.stringify(response)}`);
        if (response.ok) {
          response.json().then((user) => {
            console.log(`I AM HERE: user: ${JSON.stringify(user)}`);
            setCurrentUser(user);
            localStorage.setItem("currentUserId", JSON.stringify(user.user.id));
            navigate("/");
            console.log(JSON.stringify(user));
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
    <div>
      <h1>Login</h1>
      <div className="form-container">
          {error}
          <form className="register-form" onSubmit={handleSubmit}>
            {/* <input
              className="username-input"
              type="text"
              placeholder="Username..."
              onChange={(event) => setUsername(event.target.value)}
            /> */}
             <input
              className="email-input"
              type="email"
              placeholder="email..."
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="password-input"
              type="password"
              placeholder="Password..."
              onChange={(event) => setPassword(event.target.value)}
            />
          <Button variant="primary" type="submit">Login</Button>
          
          <div>
          <label>Don't have an account?</label>
          <Link to='/signup' className="main">Signup</Link>
          </div>

          <div>
          <label>Forgot your password?</label>
          <Link to='/password_recovery' className="main">forgot your password</Link>
          </div>
          
          <Routes>
            <Route path='/password_recovery' element={<PasswordRecoveryPage/>}/>
          </Routes>
        </form>
      </div>
    </div>
  )
}

export default Login