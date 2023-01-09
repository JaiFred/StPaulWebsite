//Hooks
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'


//Components
import GivingModal from './GivingModal';
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import LogoutProcedureModal from "./LogoutProcedureModal";

export const FooterAccountOptions = ({
    currentUser, 
    setCurrentUser, 
    givingIsOpen, 
    setGivingIsOpen, 
    signUpIsOpen, 
    setSignUpIsOpen, 
    loginIsOpen, 
    setLoginIsOpen, 
    logoutIsOpen, 
    setLogoutIsOpen}) => {

    const [facebook, setFacebook] = useState(null);
    const [configId,  setConfigId] = useState(null);

    function fetchConfig() {
        fetch(`/api/button_visible_configs`)
          .then((r) => r.json())
          .then(config => {
            setFacebook(config.facebook)
            setConfigId(config.id)
          })
    }

    useEffect(() => {
        fetchConfig();
    },[])

      function updateFacebookLink(facebookVal) {        
        fetch(`/api/button_visible_configs/${configId}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            facebook: facebookVal
          }),
        }).then((response) => {
          if (response.ok) {
            console.log('config updated successfully!');
            fetchConfig();
          }

        });

      }


      console.log(`facebook: ${facebook}`);

    return(
        <div className="footer-account-options-wrapper">
            
        {
            !currentUser &&
            <div>
              <button className='staff-modal-btn' type='button' onClick={() => setLoginIsOpen(true)}>Login</button>
              <LoginModal loginIsOpen={loginIsOpen} setLoginIsOpen={setLoginIsOpen}/>
            </div>
            }     
            { 
                !currentUser &&
                <div> 
                <button className='footer-menu-item' type='button' onClick={() => setSignUpIsOpen(true)}>Sign Up</button>
                <SignUpModal signUpIsOpen={signUpIsOpen} setSignUpIsOpen={setSignUpIsOpen}/>
                </div>
            }
            {
            currentUser &&
            <div>
              <button className='staff-modal-btn' type='button' onClick={() => setLogoutIsOpen(true)}>Logout 1</button>
              <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </div>                    
            }
            <button>
                <div className="contact-us-button">
                    <Link to='/contact_us'>Contact Us</Link>
                </div>
            </button>

            {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
                <div classname="admin-facbook-controller">
                {facebook === true && <div><link
                    rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    </link>
                    <a href="https://www.facebook.com/" target="_blank" class="fa fa-facebook"></a></div>}

                {facebook === true &&
                    <div>
                        <button variant="primary" type="submit" onClick={() => {updateFacebookLink(false)}}>
                            Turn link off
                        </button>
                    </div> }

                {facebook === false &&
                    <div>
                        <button variant="primary" type="submit" onClick={() => {updateFacebookLink(true)}}>
                            Turn link on
                        </button>
                    </div>}
                </div>  
            ):(
              <div className='footer-bottom'>
                <p className='website-watermark'>@ 2022 St Paul Baptist Church</p>

                {facebook === true && <div><link
                rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                </link>
                <a href="https://www.facebook.com/" target="_blank" class="fa fa-facebook"></a></div>}
            </div>  
            )}
        </div>
    )
}
