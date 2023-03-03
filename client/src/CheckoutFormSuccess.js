//Hooks
import { Link } from "react-router-dom";

//Components

//CSS
import Church from './images/StPaulBaptistChurch.JPG'
import './SuccessPage.scss';
import { BackHomeButton } from "./BackHomeButton/BackHomeButton";

function CheckoutFormSuccess() {
    return(
        <div className="success-page-wrapper" style={{ backgroundImage: `url(${Church})` }}>
            <div className="success-page-message">
                <h1 className="contact-us-text">Thank you! We appreciate your offering.</h1>
            </div>

            <div className="back-home mt-5">
                <Link to='/' className="back-home-success"><h3 className="button-text">Back</h3></Link>
            </div>
        </div>
    )
}

export default CheckoutFormSuccess