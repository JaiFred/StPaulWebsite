// Hooks 
import { Link } from "react-router-dom";

function ProfilePage({ currentUser, authChecked }){

    // console.log(currentUser)

    const { first_name, last_name, email } = currentUser

// t.string :first_name
// t.string :last_name
// t.string :username
// t.string :email
// t.string :password

if (!authChecked){
    return(
      <div></div>
    )
}
    return(
        <div>
            <h1>Staff Profile</h1>
            <h3>Name: {first_name} {last_name}</h3>
            <h3>email: {email}</h3>

            <button>
                <Link to='/'>Back Home</Link>
            </button>
        </div>
    )
}

export default ProfilePage