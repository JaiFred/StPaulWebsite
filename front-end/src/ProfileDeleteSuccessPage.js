
//Hooks

//Components
import { BackHomeButton } from "./BackHomeButton/BackHomeButton";

//CSS
import Church from './images/StPaulBaptistChurch.JPG'
import './SuccessPage.scss';

function ProfileDeleteSuccessPage() {
    return(
        <div className="success-page-wrapper" style={{ backgroundImage: `url(${Church})` }}>
            <div className="success-page-message">
                <h1>Your account has been successfully deleted!</h1>
                <p>We're sorry to see you go.</p>
            </div>

            <BackHomeButton className="mt-5" />
        </div>
    )
}

export default ProfileDeleteSuccessPage