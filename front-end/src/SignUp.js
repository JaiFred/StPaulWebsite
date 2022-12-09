import { Link } from "react-router-dom"
import { useState } from "react";
import { Button, Popover } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SignUp({ currentUser, setCurrentUser, authChecked, setLogoutIsOpen }) {

    const [ firstName, setFirstName ] = useState("")
    const [ lastName, setLastName ] = useState("")
    const [ email, setEmail ] = useState ("")
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

    let navigate = useNavigate();

    setLogoutIsOpen(false);

    function handleSubmit (event) {
      event.preventDefault();
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
          passwordConfirmation: passwordConfirmation
        } }),
      }).then((response) => {
        if (response.ok) {
          response.json().then((user) => {
            // setCurrentUser(user);
            // localStorage.setItem("currentUserId", JSON.stringify(user));
            navigate("/signup_success");
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
  <div className="form-container">
          <h3>Sign Up</h3>
          <form className="register-form" onSubmit={handleSubmit}>
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
          <Button variant="primary" type="submit">SignUp</Button>
        </form>
        <Link to='/login'>Back to Login</Link>
      </div>
      <Link to='/'>Back Home</Link>
    </div>
  )
}

export default SignUp;