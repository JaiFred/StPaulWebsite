//Hooks
import { Link } from 'react-router-dom';

//Components

//CSS
import Church from './images/StPaulBaptistChurch.JPG'
import './FailurePage.scss';

function PasswordRecoveryRequestFailiure(){

    return(
        <div className="failure-page-wrapper" style={{ backgroundImage: `url(${Church})`}}>
            <div className="failure-page-message">
                <h1>We could not find this email on our website.</h1>
            </div>
            <div className="back-home mt-5">
                <Link to='/signup' className="back-home-success"><h3 className="button-text">Please sign up</h3></Link>
            </div>
        </div>
    )
}

export default PasswordRecoveryRequestFailiure
