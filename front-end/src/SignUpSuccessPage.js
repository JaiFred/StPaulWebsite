//Hooks

//Components


//CSS
import Church from './images/StPaulBaptistChurch.JPG'

import { BackHomeButton } from "./BackHomeButton/BackHomeButton";

import './SuccessPage.scss';

function SignUpSuccessPage() {
    return(
        <div className="success-page-wrapper" style={{ backgroundImage: `url(${Church})` }}>
            <div className="success-page-message">
                <h1>Thanks for signing up</h1>
                <p>please check your email to confirm your account</p>
            </div>

            <BackHomeButton className="mt-5" />
        </div>
    )
}

export default SignUpSuccessPage