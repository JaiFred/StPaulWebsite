import { Link } from "react-router-dom"
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Login({ currentUser, setCurrentUser, authChecked, setLogoutIsOpen }) {

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    let navigate = useNavigate();

    setLogoutIsOpen(false);

    function handleSubmit (event) {
      event.preventDefault();
      fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      }).then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            setCurrentUser(user);
            localStorage.setItem("currentUserId", JSON.stringify(user));
            navigate("/");
            console.log(JSON.stringify(user));
          });
        } else {
            console.log('Wrong credentials!');
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
            <h1>Staff Login</h1>
                {/* <input 
                    type="text"
                    placeholder="Username..."
                />

                <input 
                    type="text"
                    placeholder="Password..."
                />

                <button type="button">Submit</button>
                <button> 
                    <Link to='/'>back</Link>
                </button>*/}

  <div className="form-container">
          <h3>Login</h3>
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              className="username-input"
              type="text"
              placeholder="Username..."
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              className="password-input"
              type="password"
              placeholder="Password..."
              onChange={(event) => setPassword(event.target.value)}
            />
          <Button variant="primary" type="submit">Login</Button>
        </form>
      </div>
    </div>
  )
}

export default Login