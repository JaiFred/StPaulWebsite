//Hooks
import React from "react";
import { Link } from "react-router-dom";
import {useEffect} from 'react'
import { Container } from "react-bootstrap";


//components
import GivingModal from "./GivingModal";

import Hamburger from "./images/Hamburger Button.png"
import Cross from "./images/Cross.webp"
import "./Navbar.css"
import { MoreOptionsMenu } from "./MoreOptionsMenu";


function Navbar({givingIsOpen, setGivingIsOpen, staffIsOpen, setStaffIsOpen, currentUser, setCurrentUser, logoutIsOpen, setLogoutIsOpen, authChecked, setAuthChecked }) {

  // <DropdownItem>
  //   <button className='staff-modal-btn' type='button' onClick={() => setLogoutIsOpen(true)}>Logout</button>
  //   <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
  // </DropdownItem>

  // <h2>Hello {currentUser.last_name}</h2> 

  // if (!authChecked){
  //   return(
  //     <div></div>
  //   )
  // }

  console.log(`Inside NavBar, currentUser: ${JSON.stringify(currentUser)}`);
  const lastName = currentUser?.user?.last_name || currentUser?.last_name;
  const firstName = currentUser?.user?.first_name || currentUser?.first_name;
  console.log(`Inside NavBar, currentUser last name: ${lastName}`);
  console.log(`currentUser?.admin: ${currentUser?.admin}`)
  console.log(`currentUser?.user?.admin: ${currentUser?.user?.admin}`)
  console.log(`currentUser?.user: ${currentUser?.user || currentUser}`)

  return (
    <>
    <div className="header">
      { currentUser ? (
                <nav className="navbar navbar-expand-md">
                <Link to='/'>
                <img src={Cross} className="cross"></img>
                <h1 className="title">St Paul Baptist Church</h1>
                </Link>
                <div className="admin-name-container"> 
                <ul className="name-container-list">
                  <li className="admin-greeting">Hello</li>
                  <li className="admin-name">{firstName}</li>
                </ul>
                </div>
                <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#churchNavBar" aria-controls="churchNavBar" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>  
  <div class="navbar-collapse collapse" id="churchNavBar">
            {/* <div className="non-admin-nav-container"> */}
              <ul className=" navbar-nav">
                <li> 
                  <Link to='/about' className="main">About</Link>
                </li>        
                <li> 
                  <a href='/events' className="main">Bulletin</a>
                  {/* <Link to='/events' className="main">Bulletin</Link>  */}
                </li >
                <li>
                  <Link to='/prayer_requests' className="main">Prayer Requests</Link>
                </li>
                <li>
                  <Link to='/next_service' className="main">Next Service</Link>
                </li>
                <li>
                  <button className='navbar-giving-modal-btn' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
                  <GivingModal currentUser={currentUser} givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>
                </li >
              </ul>
              {/* </nav>  */}
              </div>
              <MoreOptionsMenu currentUser={currentUser} staffIsOpen={staffIsOpen} setStaffIsOpen={setStaffIsOpen} logoutIsOpen={logoutIsOpen} 
                setCurrentUser={setCurrentUser} setLogoutIsOpen={setLogoutIsOpen}/>
              </nav>
                    
                   ) : ( 

        <div className="navbar">
          <Link to='/'>
          <img src={Cross} className="cross"></img>
          <h1 className="title">St Paul Baptist Church</h1>
          </Link>  
      <nav className="non-admin-nav-container">
        <ul className="non-admin-nav-links">
          <li> 
            <Link to='/about' className="main">About</Link>
          </li>        
          <li> 
            <a href='/events' className="main">Bulletin</a>
            {/* <Link to='/events' className="main">Bulletin</Link>  */}
          </li >
          <li>
            <Link to='/prayer_requests' className="main">Prayer Requests</Link>
          </li>
          <li>
            <Link to='/next_service' className="main">Next Service</Link>
          </li>
          <li>
            <button className='navbar-giving-modal-btn' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
            <GivingModal currentUser={currentUser} givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>
          </li >
        </ul>
          <MoreOptionsMenu currentUser={currentUser} staffIsOpen={staffIsOpen} setStaffIsOpen={setStaffIsOpen} logoutIsOpen={logoutIsOpen} 
            setCurrentUser={setCurrentUser} setLogoutIsOpen={setLogoutIsOpen}/>
        </nav> 
        </div>
        )}
        
        {/* </Container>
        </Navbar> */}
        
    </div>

        <div className="navbar-banner-container">
        <h3 className="navbar-banner">Impacting lives for God's kingdom</h3>
        </div>
      
</>
  )
}

export default Navbar;


/*
<Dropdown className="hamburger">
                      <Dropdown.Toggle className="hamburger-button" variant="success" id="dropdown-basic"> 
                      <div className="hamburger-button-line"></div>
                      <div className="hamburger-button-line"></div>
                      <div className="hamburger-button-line"></div>
                      </Dropdown.Toggle>
      
                      <DropdownMenu>
                         <DropdownItem>
                          <button className='staff-modal-btn' type='button' onClick={() => setLogoutIsOpen(true)}>Logout 2</button>
                          <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                        </DropdownItem>
                        <Link to='/broadcasts' class="dropdownitem">Broadcasts</Link>
                        <Link to="/youth_corner" class="dropdownitem">Youth Corner</Link>
                        <Link to="/bible_study" class="dropdownitem">Bible Study</Link>
                        <Link to="/honors" class="dropdownitem">Honors</Link>
                        <Link to="/profile" class="dropdownitem">Profile</Link>
                      </DropdownMenu>
                    </Dropdown>
                    */