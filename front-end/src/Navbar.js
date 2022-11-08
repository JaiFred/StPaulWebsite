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

  // const AuthNav = () => {
  //   const { isAuthenticated } = useAuth0()

  //   return (
  //     <Nav>
  //       {isAuthenticated ? <LogoutButton /> : <LoginButton />}
  //     </Nav>
  //   )
  // }

  // useEffect(() => {
  //   fetch('/api/me', {
  //     credentials: 'include'
  //   })
  //     .then(res => {
  //       if (res.ok) {
  //         res.json().then(user => {
  //           setCurrentUser(user)
  //           setAuthChecked(true)
  //         })
  //       } else {
  //         setAuthChecked(true)
  //       }
  //       console.log(authChecked)
  //    })
  // }, [])


  // console.log(currentUser)

  // console.log(`In NavBar: logoutIsOpen: ${logoutIsOpen}`);

  // if (!authChecked){
  //   return(
  //     <div></div>
  //   )
  // }
  return (
    <div className="header">
      {currentUser ? (
                <div className="admin-navbar"> 
                    <Link to='/'>
          <h1>Saint Paul Baptist Church</h1>
          </Link>
          <h2>Hello {currentUser.last_name}</h2>   
        {/* <Navbar bg="primary" variant="dark">
          <Container> */}
      <nav className="admin-nav-container">
        <ul className="admin-nav-links">
          <li> 
            <Link to='/about' className="main">About</Link>
          </li>        
          <li> 
            <Link to='/events' className="main">Bulletin</Link> 
          </li>
          <li>
            <Link to='/prayer_requests' className="main">Prayer Requests</Link>
          </li>
          <li>
            <Link to='/next_service' className="main">Next Service</Link>
          </li>
          <li>
            <button className='navbar-giving-modal-btn' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
            <GivingModal givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>
          </li>
          <li>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic"> 
                More
                </Dropdown.Toggle>

                <DropdownMenu class="navbar-dropdown">
                  <DropdownItem>
                    <button className='staff-modal-btn' type='button' onClick={() => setLogoutIsOpen(true)}>Logout</button>
                      <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                  </DropdownItem>
                  <DropdownItem><Link to="broadcasts">Broadcasts</Link></DropdownItem>
                  <DropdownItem><Link to="/pastors_corner">Pastor's Corner</Link></DropdownItem>
                  <DropdownItem><Link to="/youth_corner">Youth Corner</Link></DropdownItem>
                  <DropdownItem><Link to="/bible_study">Bible Study</Link></DropdownItem>
                  <DropdownItem><Link to="/honors">Honors</Link></DropdownItem>
                  <DropdownItem href="/profile">Profile</DropdownItem>
                </DropdownMenu>
              </Dropdown>
          </li>
        </ul>
        </nav> 
                </div> 
                    
                   ) : ( 

        <div className="non-admin-navbar">
          <Link to='/'>
          <img src={Cross} className="cross"></img>
          <h1 className="title">St Paul Baptist Church</h1>
          </Link>   
        {/* <Navbar bg="primary" variant="dark">
          <Container> */}
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
                <Dropdown.Toggle className="hamburger-button"> 
                {/* <img src={Hamburger} className="hamburger" alt="dropdown-toggle-button"></img> */}
                  <button class="hamburger hamburger--collapse is-active" type="button">
                    <span class="hamburger-box">
                      <span class="hamburger-inner"></span>
                    </span>
                  </button>
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