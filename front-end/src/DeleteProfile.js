//Hooks
import { Button } from 'react-bootstrap'
import { navigate} from 'react-router-dom'

function DeleteProfile({handleUserDelete,  username, setUsername, password, setPassword, error, setAccountDeleteIsOpen }){

    return(
        <div className="form-container">
          <h3>Delete User Form</h3>
          { error }
          <form className="register-form" onSubmit={handleUserDelete}>
            <input
              className="username-input"
              type="text"
              placeholder="username..."
              onChange={(event) => setUsername(event.target.value)}
            />
            <input
              className="password-input"
              type="password"
              placeholder="password..."
              onChange={(event) => setPassword(event.target.value)}
            />
          <Button variant="primary" type="submit" onClick={() => {setAccountDeleteIsOpen(false)}}>Delete My Profile</Button>
        </form>
        </div>

    )
}

export default DeleteProfile