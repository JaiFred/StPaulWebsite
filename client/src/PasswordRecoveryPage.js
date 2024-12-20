import { Link } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import PasswordRecoveryBackground from './images/tree-background-red.jpeg'
import { BackHomeButtonBordered } from './BackHomeButton/BackHomeButtonBordered'

import './PasswordRecoveryPage.scss';

function PasswordRecoveryPage(){

  const navigate = useNavigate();
  const [email, setEmail] = useState("");    

    function handleSubmit (event) {
        event.preventDefault();
        fetch(`/password?request_source=front-end`, {
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
          if(response.ok) {            
            navigate("/password_recovery_success");
          }
          else {
            navigate("/password_recovery_failiure")
          }
        });
      };

    return(
        <div className="password-recovery-overlay" style={{ backgroundImage: `url(${PasswordRecoveryBackground})`, backgroundSize: 'cover' }}>
            <form className="recover-password-form" onSubmit={handleSubmit}>
              <h1>Reset Password</h1>
              <div className="rounded-input__button">
                <input
                  className="email-input"
                  required
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(event) => setEmail(event.target.value)}
                />

                <Button variant="primary" type="submit">
                  Reset Password
                </Button>
                </div>
            </form>

            <div className='go-back-buttons d-flex justify-content-center gap-2'>
              <Link to='/login' className="back-from-password-recovery button-custom d-flex align-items-center justify-content-center">
                Back to login
              </Link>
              <BackHomeButtonBordered noContainer />        
            </div>
        </div>
    )
}

export default PasswordRecoveryPage