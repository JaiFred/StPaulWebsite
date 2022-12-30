//Hooks
import {useState, useEffect} from 'react'
import { Link } from "react-router-dom";

import ContactUsPage from "./ContactUsPage"

function Footer({ currentUser }){

    const [facebook, setFacebook] = useState(null);
    const [configId,  setConfigId] = useState(null);

    function fetchConfig() {
        fetch(`/api/button_visible_configs`)
          .then((r) => r.json())
          .then(config => {
            setFacebook(config.facebook)
            setConfigId(config.id)
          })
    }

    useEffect(() => {
        fetchConfig();
    },[])

      function updateFacebookLink(facebookVal) {        
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


      console.log(`facebook: ${facebook}`);

    return(
        <div className="footer">
            {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
                <div>
                    <button>
                <div className="contact-us-button">
                    <Link to='/contact_us'>Contact Us</Link>
                </div>
            </button>

            {facebook === true && <div><link
                    rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    </link>
                    <a href="https://www.facebook.com/" target="_blank" class="fa fa-facebook"></a></div>}

                {facebook === true &&
                    <div>
                        <button variant="primary" type="submit" onClick={() => {updateFacebookLink(false)}}>
                            Turn link off
                        </button>
                    </div> }

                {facebook === false &&
                    <div>
                        <button variant="primary" type="submit" onClick={() => {updateFacebookLink(true)}}>
                            Turn link on
                        </button>
                    </div> }                    
                </div>
            ) : (
                <div>
                    <button>
                        <div className="contact-us-button">
                            <Link to='/contact_us'>Contact Us</Link>
                        </div>
                    </button>

                    {facebook === true && <div><link
                    rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    </link>
                    <a href="https://www.facebook.com/" target="_blank" class="fa fa-facebook"></a></div>}
                </div>
            )}
            {/* <button className='contact-us-btn' type='button'><a href='mailto:stpaul23009@gmail.com
            '>Contact Us</a></button> */}
        </div>
    )

}

export default Footer