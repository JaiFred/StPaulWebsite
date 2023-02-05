//Hooks
import { Link } from 'react-router-dom';

//Components

//CSS
import Church from './images/StPaulBaptistChurch.JPG'

function PasswordRecoveryRequestSuccess(){

    return(
        <div className="success-page-wrapper" style={{ backgroundImage: `url(${Church})`}}>
            <div className="success-page-message">
            <h1>We have recieved your request to change your password</h1>
            <p>please check your email and follow the links to change your password</p>
            </div>
            <Link to='/login' className="back-home-button">back to login</Link>
        </div>
    )
}

export default PasswordRecoveryRequestSuccess