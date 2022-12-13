//Hooks
import { Link } from 'react-router-dom';

function PasswordRecoveryRequestSuccess(){

    return(
        <div>
            <h1>We have recieved you request to change your password</h1>
            <h2>please check your email and follow the links to change your password</h2>
            <div>
            <Link to='/login' className="main">back to login</Link>
            </div>
        </div>
    )
}

export default PasswordRecoveryRequestSuccess