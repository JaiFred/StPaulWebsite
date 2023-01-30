//Hooks
import { Link } from "react-router-dom";

//Components

//CSS
import Church from './images/StPaulBaptistChurch.JPG'
import './SuccessPage.scss';

function ContactUsSuccess() {
    return(
        <div className="success-page-wrapper" style={{ backgroundImage: `url(${Church})` }}>
            <div className="success-page-message">
                <p>We have recieved your inquiry and will respond at our earliest convenience. Thank You!</p>
            </div>

            <Link to='/contact_us' className="back-home-button">Back</Link>
        </div>
    )
}

export default ContactUsSuccess