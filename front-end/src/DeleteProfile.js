//Hooks
import { Button } from 'react-bootstrap'
import { navigate} from 'react-router-dom'

function DeleteProfile({handleUserDelete, email, setEmail, password, setPassword, error, setAccountDeleteIsOpen }){
// onSubmit={handleUserDelete} ------- this was in the first <div> 
    return(
        <div className="form-container" onSubmit={handleUserDelete}>
          <h3>Delete User Form</h3>
          { error }
          <form className="register-form" >
            <input
              className="email-input"
              type="text"
              placeholder="E-mail..."
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="password-input"
              type="password"
              placeholder="password..."
              onChange={(event) => setPassword(event.target.value)}
            />
          <Button variant="primary" type="submit" onClick={() => {handleUserDelete()}}>Delete My Profile</Button>
        </form>
        </div>

    )
}

export default DeleteProfile