//Hooks
import { Link } from 'react-router-dom';

function UpdateEmailSuccessPage(){

    return(
        <div>
            <h1>You have successfully changed your email address</h1>
            <h2>Please check your email to confirm this change. Your password is the same.</h2>
            <h2>You have been automatically logged out to complete this change</h2>
        </div>
    )
}

export default UpdateEmailSuccessPage