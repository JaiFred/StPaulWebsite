import React from "react";
import { Link } from "react-router-dom";

function NavBar() {

  // const AuthNav = () => {
  //   const { isAuthenticated } = useAuth0()

  //   return (
  //     <Nav>
  //       {isAuthenticated ? <LogoutButton /> : <LoginButton />}
  //     </Nav>
  //   )
  // }
  return (
    <nav>
        <h1>Your Title Goes Here</h1>        
      <ul>
        <li> 
          <Link to='/events'> Events </Link> 
        </li>
        <li> 
          <Link to='/about_us'> About Us </Link>
        </li>        
      </ul>
    </nav>
  )
}

export default NavBar;