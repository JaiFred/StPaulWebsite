//Hooks
import { Link } from 'react-router-dom';

//Components

//CSS
import Church from './images/StPaulBaptistChurch.JPG'

function PasswordRecoveryRequestFailiure(){

    return(
        <div>
            <h1>We could not find this email on our website</h1>
            <p>Please <Link to='/signup' className="main">sign up</Link></p>
        </div>
    )
}

export default PasswordRecoveryRequestFailiure