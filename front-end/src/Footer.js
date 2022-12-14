//Hooks
import { Link } from "react-router-dom";

import ContactUsPage from "./ContactUsPage"

function Footer(){

    return(
        <div className="footer">
            {/* <button className='contact-us-btn' type='button'><a href='mailto:stpaul23009@gmail.com
            '>Contact Us</a></button> */}
            <button>
                <div className="contact-us-button">
                    <Link to='/contact_us'>Contact Us</Link>
                </div>
            </button>

            <link 
            rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">

            </link>
            <a href="#" class="fa fa-facebook"></a>
                
        </div>
    )

}

export default Footer