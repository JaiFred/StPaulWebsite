//Hooks
import { Link } from "react-router-dom";
import {useState, useEffect} from 'react'


//Components
import GivingModal from './GivingModal';
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import LogoutProcedureModal from "./LogoutProcedureModal";

//CSS 
import "./Footer.scss"

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
            {!currentUser && (
                <>
                    <div className="footer-menu">
                        <button className='footer-menu-item' type='button' onClick={() => setLoginIsOpen(true)}>Login</button>
                        <button className='footer-menu-item' type='button' onClick={() => setSignUpIsOpen(true)}>Sign Up</button>
                    </div>
                    <LoginModal
                        loginIsOpen={loginIsOpen}
                        setLoginIsOpen={setLoginIsOpen}/>
                    <SignUpModal
                        signUpIsOpen={signUpIsOpen}
                        setSignUpIsOpen={setSignUpIsOpen}/>
                </>
            )}

            {currentUser && 
                <div className="footer-menu">
                    <button className='footer-menu-item' type='button' onClick={() => setLogoutIsOpen(true)}>Logout</button>
                    <Link to='/profile' className='footer-menu-item'>Profile</Link>
                    <LogoutProcedureModal
                        logoutIsOpen={logoutIsOpen}
                        setLogoutIsOpen={setLogoutIsOpen}
                        currentUser={currentUser}
                        setCurrentUser={setCurrentUser}/> 
                </div>
            }
        </div>
    )
}
