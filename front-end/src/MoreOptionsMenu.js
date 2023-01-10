//Hooks
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Link } from "react-router-dom";

// Components
import LoginModal from "./LoginModal";
import SignUpModal from "./SignUpModal";
import LogoutProcedureModal from "./LogoutProcedureModal";

// CSS
import accountIcon from './images/user-icon.png'
import moreOptionsIcon from './images/more-options-icon.png'
import './MoreOptionsMenu.scss'

export const MoreOptionsMenu = ({currentUser, signUpIsOpen, setSignUpIsOpen, loginIsOpen, setLoginIsOpen, logoutIsOpen, setCurrentUser, setLogoutIsOpen}) => {

   return  <div className="more-options-menu-wrapper">
    <Dropdown className="more-options-menu">
      <Dropdown.Toggle className="more-options-menu-button" variant="success" id="dropdown-basic"> 
      { !currentUser &&
      <img className="more-options-menu-icon" src={moreOptionsIcon} title="more options" alt="more options" />
      }
      { currentUser &&
        <img className="more-options-menu-icon" src={accountIcon} title="account options" alt="account options" />
      }
      </Dropdown.Toggle>

      <DropdownMenu>
      {
        !currentUser &&
        <div>
          <button className=' dropdown-item' type='button' onClick={() => setLoginIsOpen(true)}>Login</button>
          <LoginModal loginIsOpen={loginIsOpen} setLoginIsOpen={setLoginIsOpen}/>
        </div>
        
      }     
      {/*  */}
      { 
        !currentUser &&
        <div> 
          <button className='dropdown-item' type='button' onClick={() => setSignUpIsOpen(true)}>Sign Up</button>
          <SignUpModal signUpIsOpen={signUpIsOpen} setSignUpIsOpen={setSignUpIsOpen}/>
        </div>
      }
      { 
        currentUser &&
        <div>
          <button className='dropdown-item' type='button' onClick={() => setLogoutIsOpen(true)}>Logout 1</button>
          <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
        </div>                    
      }              
      <Link to="/broadcasts" class="dropdown-item">Broadcasts</Link>
      <Link to="/youth_corner" class="dropdown-item">Youth Corner</Link>
      <Link to="/bible_study" class="dropdown-item">Bible Study</Link>
      <Link to="/honors" class="dropdown-item">Honors</Link>
      { 
        currentUser &&
        <div>
          <Link to="/profile" class="dropdown-item">Profile</Link>
        </div>                    
      } 
</DropdownMenu>
</Dropdown>
</div>
}