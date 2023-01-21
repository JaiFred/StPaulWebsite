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
            
        {
        !currentUser &&
        <>
            <button className='footer-menu-item' type='button' onClick={() => setLoginIsOpen(true)}>Login</button>
            <LoginModal loginIsOpen={loginIsOpen} setLoginIsOpen={setLoginIsOpen}/>
        </>
        }     
        { 
            !currentUser &&
            <>
                <button className='footer-menu-item' type='button' onClick={() => setSignUpIsOpen(true)}>Sign Up</button>
                <SignUpModal signUpIsOpen={signUpIsOpen} setSignUpIsOpen={setSignUpIsOpen}/>
            </>
        }
        {
        currentUser && 
            <>
                <button className='footer-menu-item' type='button' onClick={() => setLogoutIsOpen(true)}>Logout 1</button>
                <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/> 
            </>
        }
        </div>
    )
}
