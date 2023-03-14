//Hooks
import { Link } from 'react-router-dom';

//Components

//CSS
import Church from './images/StPaulBaptistChurch.JPG'
import './SuccessPage.scss';

function UpdateEmailSuccessPage(){

    return(
        <div className="success-page-wrapper" style={{ backgroundImage: `url(${Church})`}}>
            <div className="success-page-message">
                <h1>You have successfully changed your email address</h1>
                <p>Please check your email to confirm this change. Your password is the same.</p>
                <p>You have been automatically logged out to complete this change</p>
            </div>
            <div className="back-home mt-5">
                <Link to='/' className="back-home-success"><h3 className="button-text">Back Home</h3></Link>
            </div>
        </div>
    )
}

export default UpdateEmailSuccessPage