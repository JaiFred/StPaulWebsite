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
    setLogoutIsOpen,
  updateFacebookLink,
facebook,
configId}) => {

   


      console.log(`facebook: ${facebook}`);

    return(
        <div className="footer-account-options-wrapper">
            
        {
            !currentUser &&
            <div>
              <button className='footer-menu-item' type='button' onClick={() => setLoginIsOpen(true)}>Login</button>
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
              <button className='footer-menu-item' type='button' onClick={() => setLogoutIsOpen(true)}>Logout 1</button>
              <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
            </div>                    
            }
            <Link to='/contact_us' className='footer-menu-item'>Contact Us</Link>

            {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
                <div classname="admin-facbook-controller">

                {facebook === true &&
                    <div>
                        <button className='btn btn-primary' variant="primary" type="submit" onClick={() => {updateFacebookLink(false)}}>
                            Turn link off
                        </button>
                    </div> }

                {facebook === false &&
                    <div>
                        <button className='btn btn-primary' variant="primary" type="submit" onClick={() => {updateFacebookLink(true)}}>
                            Turn link on
                        </button>
                    </div>}
                </div>  
            ): ''}
        </div>
    )
}
