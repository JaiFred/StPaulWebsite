//Hooks
import { Button } from 'react-bootstrap'
import { navigate} from 'react-router-dom'

//Components
import { OpaqueErrorMessage } from './Forms/OpaqueErrorMessage'

//CSS

function DeleteProfile({handleUserDelete, email, setEmail, password, setPassword, error, setAccountDeleteIsOpen }){
// onSubmit={handleUserDelete} ------- this was in the first <div> 
    return(
      <form className="register-form form-default form-simple" onSubmit={handleUserDelete}>
        <h3 className="text-white text-center font-weight-bold">Delete your account</h3>
        <label>
          Email
          <input
            className="email-input mb-2"
            type="text"
            placeholder="E-mail..."
            onChange={(event) => setEmail(event.target.value)}
          />
        </label>
        <label>
          Password
          <input
            className="password-input"
            type="password"
            placeholder="Password..."
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        
        {error && (
            <div className="error mt-4 mb-5">
              <OpaqueErrorMessage message={error}/>
            </div>
        )}
        
        <div className="modal-footer-buttons">
          <Button variant="primary" className="submit" type="submit" onClick={handleUserDelete}>Delete My Profile</Button>
          <button type="button" className="cancel" onClick={() => setAccountDeleteIsOpen(false)}>Cancel</button> 
        </div>
      </form>
    )
}

export default DeleteProfile