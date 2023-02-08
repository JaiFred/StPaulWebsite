//Hooks
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

//Components
import { FooterAccountOptions } from './FooterAccountOptions';

//CSS
import './Footer.scss';

const useFetchConfig = () => {
    
}

function Footer({ currentUser, setCurrentUser, givingIsOpen, setGivingIsOpen, signUpIsOpen, setSignUpIsOpen, loginIsOpen, setLoginIsOpen, logoutIsOpen, setLogoutIsOpen}){
    const [facebook, setFacebook] = useState(null);
    const [configId, setConfigId] = useState(null);

    function fetchConfig() {
        fetch(`/api/button_visible_configs`)
          .then((r) => r.json())
          .then(config => {
            if (!config) return;
            console.log( {config})
            setFacebook(config.facebook)
            setConfigId(config.id)
          })
    }
  
    function updateFacebookLink(facebookVal) { 
      if (!configId) return alert('No config ID for Facebook link')
      fetch(`/api/button_visible_configs/${configId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          facebook: facebookVal
        }),
      }).then((response) => {
        if (response.ok) {
          console.log('config updated successfully!');
          fetchConfig();
        }
      });
    }

    useEffect(fetchConfig, [])

    return(
        <div className="footer">
            <div class="container">
                <div className="footer-top">

                  <h4 className="footer-title">St Paul Baptist Church</h4>
                  <div class="footer-contact-info">
                      <p className='fw-bold'>1995 Globe Road Aylett, VA 23009</p>
                      <p>Sunday School services:<br/>
                          <strong>9:45 AM.</strong>
                      </p>
                      <p>Sunday Morning services:<br/>
                      <strong>11:00 AM.</strong></p>
                      <p>Bible Study is every <strong>second</strong> and <strong>third Wednesday</strong>  of each month at <strong>7:00 PM.</strong></p>

                  </div>

                  <div className="footer-menu">
                    <Link to='/about' className='footer-menu-item'>About</Link>
                    <Link to='/broadcasts' className='footer-menu-item'>Broadcasts</Link>
                    <div>
                      <button className='footer-menu-item' type="button" onClick={() => setGivingIsOpen(true)}>Giving</button>
                    </div>
                    <a href='/events' className='footer-menu-item'>Bulletin</a>
                    <Link to='/prayer_requests' className='footer-menu-item'>Prayer Request</Link>
                    <Link to='/bible_study' className='footer-menu-item'>Bible Study</Link>
                    <Link to='/youth_corner' className='footer-menu-item'>Youth Corner</Link>
                    <Link to='/honors' className='footer-menu-item'>Honors</Link>
                    <FooterAccountOptions 
                        currentUser={currentUser} 
                        setCurrentUser={setCurrentUser} 
                        givingIsOpen={givingIsOpen} 
                        setGivingIsOpen={setGivingIsOpen}
                        signUpIsOpen={signUpIsOpen}
                        setSignUpIsOpen={setSignUpIsOpen}
                        loginIsOpen={loginIsOpen}
                        setLoginIsOpen={setLoginIsOpen}
                        logoutIsOpen={logoutIsOpen}
                        setLogoutIsOpen={setLogoutIsOpen}
                        updateFacebookLink={updateFacebookLink}
                        facebook={facebook}
                        configId={configId}
                      />
                      <Link to='/contact_us' className='footer-menu-item' type='button'>Contact Us</Link>
                    </div>
                
                {(currentUser?.admin || currentUser?.user?.admin) && (
                  <div className="admin-facebook-controller">
                      <button
                        className='btn btn-primary'
                        variant="primary"
                        type="submit" onClick={() => updateFacebookLink(!facebook)}>
                          Turn link {facebook ? 'off' : 'on'}
                      </button>

                      {facebook && (
                        <a href="https://www.facebook.com/" target="_blank" class="fa fa-facebook"></a>
                      )}
                  </div> 
                )}
                </div>

                <div className='footer-bottom'>
                  <p className='website-watermark'>@ 2022 St Paul Baptist Church</p>
                </div>  
              </div>
            </div>
            )}
          

export default Footer

// <div className="footer">
//             {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
//                 <div className="footer-top">
//                     <img src={Cross} className="cross"></img>
//                     <h1 className="title">St Paul Baptist Church</h1>
//                      <img src={Cross} className="footer-cross"></img>
//                     <h1 className="title">St Paul Baptist Church</h1>
//                     <Link to='/about' className='footer-menu-item'>About</Link>
//                     <button>
//                         <div className="footer-button">
//                             <Link to='/broadcasts'>Broadcasts</Link>
//                         </div>
//                     </button>
//                     <button className="big-giving-modal-btn" type="button" onClick={() => setGivingIsOpen(true)}>Giving</button>
//                          <GivingModal 
//                             currentUser={currentUser} 
//                             givingIsOpen={givingIsOpen} 
//                             setGivingIsOpen={setGivingIsOpen}
//                          />
//                     <button>
//                         <div className="footer-button">
//                             <a href='/events' className="footer-link">Bulletin</a>
//                         </div>
//                     </button>
//                     <button>
//                         <div className="footer-button">
//                         <Link to='/prayer_requests'>Prayer Request</Link>
//                         </div>
//                     </button>
//                     <button>
//                         <div className="footer-button">
//                             <Link to='/bible_study'>Bible Study</Link>
//                         </div>
//                     </button>
//                     <button>
//                         <div className="footer-button">
//                             <Link to='/youth_corner'>Youth Corner</Link>
//                         </div>
//                     </button>
//                     <button>
//                         <div className="footer-button">
//                             <Link to='/next_service'>Next Service</Link>
//                         </div>
//                     </button>
//                     <button>
//                         <div className="footer-button">
//                             <Link to='/honors'>Honors</Link>
//                         </div>
//                     </button>
//                     {
//                     !currentUser &&
//                     <div>
//                       <button className='staff-modal-btn' type='button' onClick={() => setLoginIsOpen(true)}>Login</button>
//                       <LoginModal loginIsOpen={loginIsOpen} setLoginIsOpen={setLoginIsOpen}/>
//                     </div>
//                     }     
//                     { 
//                         !currentUser &&
//                         <div> 
//                         <button className='staff-modal-btn' type='button' onClick={() => setSignUpIsOpen(true)}>Sign Up</button>
//                         <SignUpModal signUpIsOpen={signUpIsOpen} setSignUpIsOpen={setSignUpIsOpen}/>
//                         </div>
//                     }
//                     {
//                     currentUser &&
//                     <div>
//                       <button className='staff-modal-btn' type='button' onClick={() => setLogoutIsOpen(true)}>Logout 1</button>
//                       <LogoutProcedureModal logoutIsOpen={logoutIsOpen} setLogoutIsOpen={setLogoutIsOpen} currentUser={currentUser} setCurrentUser={setCurrentUser}/>
//                     </div>                    
//                     }
//                     <button>
                        
//                         <div className="contact-us-button">
//                             <Link to='/contact_us'>Contact Us</Link>
//                         </div>
//                     </button>

//             {facebook === true && <div><link
//                     rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
//                     </link>
//                     <a href="https://www.facebook.com/" target="_blank" class="fa fa-facebook"></a></div>}

//                 {facebook === true &&
//                     <div>
//                         <button variant="primary" type="submit" onClick={() => {updateFacebookLink(false)}}>
//                             Turn link off
//                         </button>
//                     </div> }

//                 {facebook === false &&
//                     <div>
//                         <button variant="primary" type="submit" onClick={() => {updateFacebookLink(true)}}>
//                             Turn link on
//                         </button>
//                     </div> }                    
//                 </div>
//             ) : (

  {/* <button className='contact-us-btn' type='button'><a href='mailto:stpaul23009@gmail.com
            '>Contact Us</a></button> */}