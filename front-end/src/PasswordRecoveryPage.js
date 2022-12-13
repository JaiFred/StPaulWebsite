import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PasswordRecoveryPage(){
  
  const navigate = useNavigate();

    const [email, setEmail] = useState("");    

    function handleSubmit (event) {
        event.preventDefault();
        fetch("/password", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            user: {
              email: email
            }
          }),
        }).then((response) => {
          console.log(`Please check your email inbox and follow instructions!`);
          navigate("/password_recovery_success");
        });
      };

    return(
        <div className="password-recovery-overlay">
            <form className="register-form" onSubmit={handleSubmit}>
            <input
              className="email-input"
              type="email"
              placeholder="email..."
              onChange={(event) => setEmail(event.target.value)}
            />

            <Button variant="primary" type="submit">Send Reset Password Info</Button>
            </form>

            <div>
            <Link to='/login' className="main">back to login</Link>
            </div>

            <div>
            <Link to='/' className="main">back to home</Link>
            </div>            
        </div>
       
    )

}

export default PasswordRecoveryPage