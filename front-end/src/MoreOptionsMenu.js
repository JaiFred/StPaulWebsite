import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from "react-bootstrap/esm/DropdownMenu";
import DropdownItem from "react-bootstrap/esm/DropdownItem";
import { Link } from "react-router-dom";
import LoginModal from "./LoginModal";
import LogoutProcedureModal from "./LogoutProcedureModal";
import accountIcon from './images/user-icon.png'
import moreOptionsIcon from './images/more-options-icon.png'
import './MoreOptionsMenu.scss'

export const MoreOptionsMenu = ({currentUser, setStaffIsOpen, staffIsOpen, logoutIsOpen, setCurrentUser, setLogoutIsOpen}) => {

   return  <Dropdown className="more-options-menu">
                      <Dropdown.Toggle className="more-options-menu-button" variant="success" id="dropdown-basic"> 
                      { !currentUser &&
                      <img className="more-options-menu-icon" src={moreOptionsIcon} />
                      }
                      { currentUser &&
                        <img className="more-options-menu-icon" src={accountIcon} />
                      }
                      </Dropdown.Toggle>
      
                      <DropdownMenu>

                  {
                    !currentUser &&
                    <div>
                      <button className='staff-modal-btn' type='button' onClick={() => setStaffIsOpen(true)}>Login / Sign Up</button>
                      <LoginModal staffIsOpen={staffIsOpen} setStaffIsOpen={setStaffIsOpen}/>
                    </div>
                  }     
                  { 
                    currentUser &&
                    <div>
                      <button className='staff-modal-btn' type='button' onClick={() => setLogoutIsOpen(true)}>Logout 1</button>
                      <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
                    </div>                    
                  }              
                  <Link to='/broadcasts' class="dropdownitem">Broadcasts</Link>
                  <Link to="/youth_corner" class="dropdownitem">Youth Corner</Link>
                  <Link to="/bible_study" class="dropdownitem">Bible Study</Link>
                  <Link to="/honors" class="dropdownitem">Honors</Link>
                  { 
                    currentUser &&
                    <div>
                      <Link to="/profile" class="dropdownitem">Profile</Link>
                    </div>                    
                  } 
                </DropdownMenu>
              </Dropdown>

}