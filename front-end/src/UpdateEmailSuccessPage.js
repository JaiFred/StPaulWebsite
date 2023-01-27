//Hooks
import { Link } from 'react-router-dom';

//Components

//CSS
import Church from './images/StPaulBaptistChurch.JPG'

function UpdateEmailSuccessPage(){

    return(
        <div>
            <h1>You have successfully changed your email address</h1>
            <p>Please check your email to confirm this change. Your password is the same.</p>
            <p>You have been automatically logged out to complete this change</p>
        </div>
    )
}

export default UpdateEmailSuccessPage