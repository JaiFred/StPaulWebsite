//Hooks
import React from "react";
import { Link } from "react-router-dom";

//components

//CSS
import { CrossIcon } from "./CrossIcon";
import "./Navbar.scss"
import { MoreOptionsMenu } from "./MoreOptionsMenu";


function Navbar({givingIsOpen, signUpIsOpen, setSignUpIsOpen, loginIsOpen, setLoginIsOpen, setGivingIsOpen, staffIsOpen, setStaffIsOpen, currentUser, setCurrentUser, logoutIsOpen, setLogoutIsOpen, authChecked, setAuthChecked }) {

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

  // console.log(`Inside NavBar, currentUser: ${JSON.stringify(currentUser)}`);
  const lastName = currentUser?.user?.last_name || currentUser?.last_name;
  const firstName = currentUser?.user?.first_name || currentUser?.first_name;
  // console.log(`Inside NavBar, currentUser last name: ${lastName}`);
  // console.log(`currentUser?.admin: ${currentUser?.admin}`)
  // console.log(`currentUser?.user?.admin: ${currentUser?.user?.admin}`)
  // console.log(`currentUser?.user: ${currentUser?.user || currentUser}`)

  return (
    <>
    <div className="header">

      <nav className="navbar navbar-expand-md navbar-dark">
        <Link to='/' className="navbar-brand" title="home" alt="home" >
        <CrossIcon/>
        <h1 className="title">St Paul Baptist Church</h1>
        </Link>
        <div class="navbar-outer">
          {currentUser ? 
            <div className="admin-name">Hello <span>{firstName}</span></div>
          : '' }
          <div className="navbar-toggler-wrapper">
        <button class="navbar-toggler collapsed hamburger-button" type="button" data-bs-toggle="collapse" data-bs-target="#churchNavBar" aria-controls="churchNavBar" aria-expanded="false" aria-label="Toggle navigation">
          <div className="hamburger-button-line"></div>
          <div className="hamburger-button-line"></div> 
          <div className="hamburger-button-line"></div>
         </button>  
         </div>
        <div class="navbar-collapse collapse" id="churchNavBar">
           
          <ul className=" navbar-nav">
            <li className="nav-item"> 
              <Link to='/about' className="nav-link">About</Link>
            </li>        
            <li className="nav-item"> 
              <a href='/events' className="nav-link">Bulletin</a>
              {/* <Link to='/events' className="main">Bulletin</Link>  */}
            </li >
            <li className="nav-item">
              <Link to='/prayer_requests' className="nav-link">Prayer Requests</Link>
            </li>
            <li className="nav-item">
              <Link to='/bible_study' className="nav-link">Bible Study</Link>
            </li>
            <li className="nav-item">
              <button className='navbar-giving-modal-btn nav-link' type='button' onClick={() => setGivingIsOpen(true)}>Giving</button>
              
            </li >
          </ul>
        </div>
          <MoreOptionsMenu  
            currentUser={currentUser} 
            setCurrentUser={setCurrentUser} 
            loginIsOpen={loginIsOpen} 
            setLoginIsOpen={setLoginIsOpen} 
            signUpIsOpen={signUpIsOpen} 
            setSignUpIsOpen={setSignUpIsOpen}
            logoutIsOpen={logoutIsOpen}  
            setLogoutIsOpen={setLogoutIsOpen}
          />
        </div>
      </nav>
      <div className="navbar-banner-container">
      <h3 className="navbar-banner">Impacting Lives For God's Kingdom</h3>
      </div>
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