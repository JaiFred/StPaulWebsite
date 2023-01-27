//Hooks
import { Link } from 'react-router-dom';

//Components

//CSS
import Church from './images/StPaulBaptistChurch.JPG'

function PasswordRecoveryRequestSuccess(){

    return(
        <div>
            <h1>We have recieved your request to change your password</h1>
            <p>please check your email and follow the links to change your password</p>
            <div>
            <Link to='/login' className="main">back to login</Link>
            </div>
        </div>
    )
}

export default PasswordRecoveryRequestSuccess