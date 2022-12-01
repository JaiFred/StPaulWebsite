import { Link } from 'react-router-dom'

function PasswordRecoveryPage(){

    return(
        <div className="password-recovery-overlay">

            <input
              className="password-input"
              type="password"
              placeholder="new password..."
            //onChange={(event) => setPassword(event.target.value)}
            />
            <div>
            <Link to='/login' className="main">back to login</Link>
            </div>

            <div>
            <Link to='/' className="main">back to home</Link>
            </div>
        </div>
       
    )

}

export default PasswordRecoveryPage