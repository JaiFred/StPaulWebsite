import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import {useEffect} from 'react'
import { Container } from "react-bootstrap";



import GivingModal from "./GivingModal";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import StaffConfirmationModal from "./StaffConfirmationModal";
import LogoutProcedureModal from "./LogoutProcedureModal";
import Hamburger from "./images/Hamburger Button.png"
import Cross from "./images/Cross.webp"


function NavBar({givingIsOpen, setGivingIsOpen, staffIsOpen, setStaffIsOpen, currentUser, setCurrentUser, logoutIsOpen, setLogoutIsOpen, authChecked, setAuthChecked }) {

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
  return (
    <div className="header">
      {currentUser ? (
                <div className="--navbar">
                <Link to='/'>
                <img src={Cross} className="cross"></img>
                <h1 className="title">St Paul Baptist Church</h1>
                </Link>
                <div className="admin-name-container"> 
                <ul className="name-container-list">
                  <li className="admin-greeting">Hello</li>
                  <li className="admin-name">{currentUser.last_name}</li>
                </ul>
                </div>  
            <nav className="non-admin-nav-container">
              <ul className="non-admin-nav-links">
                <li> 
                  <Link to='/about' className="main">About</Link>
                </li>        
                <li> 
                  <Link to='/events' className="main">Bulletin</Link> 
                </li >
                <li>
                  <Link to='/prayer_requests' className="main">Prayer Requests</Link>
                </li>
                <li>
                  <Link to='/next_service' className="main">Next Service</Link>
                </li>
                <li>
                  <button className='navbar-giving-modal-btn' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
                  <GivingModal givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>
                </li >
                <li>
                    <Dropdown>
                      <Dropdown.Toggle className="hamburger-button" variant="success" id="dropdown-basic"> 
                      <img src={Hamburger} className="hamburger" alt="dropdown-toggle-button"></img>
                      </Dropdown.Toggle>
      
                      <DropdownMenu>
                         <DropdownItem>
                          <button className='staff-modal-btn' type='button' onClick={() => setLogoutIsOpen(true)}>Logout</button>
                          <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                        </DropdownItem>
                        <Link to='/broadcasts' class="dropdownitem">Broadcasts</Link>
                        <Link to="/youth_corner" class="dropdownitem">Youth Corner</Link>
                        <Link to="/bible_study" class="dropdownitem">Bible Study</Link>
                        <Link to="/honors" class="dropdownitem">Honors</Link>
                        <Link to="/profile" class="dropdownitem">Profile</Link>
                      </DropdownMenu>
                    </Dropdown>
                </li>
              </ul>
              </nav> 
              </div>
                    
                   ) : ( 

        <div className="--navbar">
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
            <Link to='/events' className="main">Bulletin</Link> 
          </li >
          <li>
            <Link to='/prayer_requests' className="main">Prayer Requests</Link>
          </li>
          <li>
            <Link to='/next_service' className="main">Next Service</Link>
          </li>
          <li>
            <button className='navbar-giving-modal-btn' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
            <GivingModal givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>
          </li >
          <li>
              <Dropdown>
                <Dropdown.Toggle className="hamburger-button" variant="success" id="dropdown-basic"> 
                <img src={Hamburger} className="hamburger" alt="dropdown-toggle-button"></img>
                </Dropdown.Toggle>

                <DropdownMenu>
                  <button className='staff-modal-btn' type='button' onClick={() => setStaffIsOpen(true)}>Staff</button>
                  <StaffConfirmationModal staffIsOpen={staffIsOpen} setStaffIsOpen={setStaffIsOpen}/>
                  <Link to='/broadcasts' class="dropdownitem">Broadcasts</Link>
                  <Link to="/pastors_corner" class="dropdownitem">Pastor's Corner</Link>
                  <Link to="/youth_corner" class="dropdownitem">Youth Corner</Link>
                  <Link to="/bible_study" class="dropdownitem">Bible Study</Link>
                  <Link to="/honors" class="dropdownitem">Honors</Link>
                </DropdownMenu>
              </Dropdown>
          </li>
        </ul>
        </nav> 
        </div>
        )}
        
        {/* </Container>
        </Navbar> */}
        
        <div className="navbar-banner-container">
        <h3 className="navbar-banner">Impacting lives for God's kingdom</h3>
        </div>
      
    </div>

  )
}

export default NavBar;