import React from "react";
import { Link } from "react-router-dom";
import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';


import GivingModal from "./GivingModal";
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import StaffConfirmationModal from "./StaffConfirmationModal";
import LogoutProcedureModal from "./LogoutProcedureModal";
import { Container } from "react-bootstrap";

function NavBar({givingIsOpen, setGivingIsOpen, staffIsOpen, setStaffIsOpen, currentUser, setCurrentUser, logoutIsOpen, setLogoutIsOpen }) {

  // const AuthNav = () => {
  //   const { isAuthenticated } = useAuth0()

  //   return (
  //     <Nav>
  //       {isAuthenticated ? <LogoutButton /> : <LoginButton />}
  //     </Nav>
  //   )
  // }
  return (
    <div className="header">
      {currentUser ? (
                <div className="admin-navbar"> 
                    <Link to='/'>
          <h1>Saint Paul Baptist Church</h1>
          </Link>   
        {/* <Navbar bg="primary" variant="dark">
          <Container> */}
      <nav>
        <ul>
          <li> 
            <Link to='/about'>About</Link>
          </li>        
          <li> 
            <Link to='/events'>Bulletin</Link> 
          </li>
          <li>
            <Link to='/prayer_requests'>Prayer Requests</Link>
          </li>
          <li>
            <Link to='/next_service'>Next Service</Link>
          </li>
          <li>
            <button className='giving-modal-btn' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
            <GivingModal givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>
          </li>
          <li>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic"> 
                More
                </Dropdown.Toggle>

                <DropdownMenu>
                  <Dropdown.Item>
                    <button className='staff-modal-btn' type='button' onClick={() => setLogoutIsOpen(true)}>Logout</button>
                      <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                  </Dropdown.Item>
                  <Dropdown.Item href="/broadcasts">Broadcasts</Dropdown.Item>
                  <Dropdown.Item href="/pastors_corner">Pastor's Corner</Dropdown.Item>
                  <Dropdown.Item href="/youth_corner">Youth Corner</Dropdown.Item>
                  <Dropdown.Item href="/bible_study">Bible Study</Dropdown.Item>
                  <Dropdown.Item href="/honors">Honors</Dropdown.Item>
                </DropdownMenu>
              </Dropdown>
          </li>
        </ul>
        </nav> 
                </div> 
                    
                   ) : ( 

        <div className="non-admin-navbar">
          <Link to='/'>
          <h1>Saint Paul Baptist Church</h1>
          </Link>   
        {/* <Navbar bg="primary" variant="dark">
          <Container> */}
      <nav>
        <ul>
          <li> 
            <Link to='/about'>About</Link>
          </li>        
          <li> 
            <Link to='/events'>Bulletin</Link> 
          </li>
          <li>
            <Link to='/prayer_requests'>Prayer Requests</Link>
          </li>
          <li>
            <Link to='/next_service'>Next Service</Link>
          </li>
          <li>
            <button className='giving-modal-btn' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
            <GivingModal givingIsOpen={givingIsOpen} setGivingIsOpen={setGivingIsOpen}/>
          </li>
          <li>
              <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic"> 
                More
                </Dropdown.Toggle>

                <DropdownMenu>
                  <DropdownItem>
                    <button className='staff-modal-btn' type='button' onClick={() => setStaffIsOpen(true)}>Staff</button>
                      <StaffConfirmationModal staffIsOpen={staffIsOpen} setStaffIsOpen={setStaffIsOpen}/>
                  </DropdownItem>
                  <DropdownItem href="/broadcasts">Broadcasts</DropdownItem>
                  <DropdownItem href="/pastors_corner">Pastor's Corner</DropdownItem>
                  <DropdownItem href="/youth_corner">Youth Corner</DropdownItem>
                  <DropdownItem href="/bible_study">Bible Study</DropdownItem>
                  <DropdownItem href="/honors">Honors</DropdownItem>
                </DropdownMenu>
              </Dropdown>
          </li>
        </ul>
        </nav> 
        </div>
        )}
        
        {/* </Container>
        </Navbar> */}
        
        <h3>Impacting lives for God's kingdom</h3>
       
      
    </div>

  )
}

export default NavBar;