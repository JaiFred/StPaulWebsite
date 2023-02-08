//Hooks
import { Link } from "react-router-dom";

//Components

//CSS
import Church from './images/StPaulBaptistChurch.JPG'
import './SuccessPage.scss';
import { BackHomeButton } from "./BackHomeButton/BackHomeButton";

function ContactUsSuccess() {
    return(
        <div className="success-page-wrapper" style={{ backgroundImage: `url(${Church})` }}>
            <div className="success-page-message">
                <h1 className="contact-us-text">We have recieved your inquiry and will respond at our earliest convenience. Thank You!</h1>
            </div>

            <div className="back-home mt-5">
                <Link to='/contact_us' className="back-home-success"><h3 className="button-text">Back</h3></Link>
            </div>
        </div>
    )
}

export default ContactUsSuccess