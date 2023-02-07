//Hooks
import { Link } from "react-router-dom";

//Components

//CSS
import Church from './images/StPaulBaptistChurch.JPG'
import './SuccessPage.scss';

function PrayerRequestSuccessPage() {
    return(
        <div className="success-page-wrapper" style={{ backgroundImage: `url(${Church})` }}>
            <div className="success-page-message">
                <h1>We have recieved your prayer and will honor your request.</h1>
                <p>
                    Rest assured you are our priority. Stay safe and healthy. <br/> God bless!
                </p>
            </div>
            <div className="back-home mt-5">
                <Link to='/prayer_requests' className="back-home-success"><h3 className="button-text">Back</h3></Link>
            </div>
        </div>
    )
}

export default PrayerRequestSuccessPage