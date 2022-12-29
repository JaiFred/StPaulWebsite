//Hooks
import { Link } from "react-router-dom";

import ContactUsPage from "./ContactUsPage"

function Footer({ currentUser }){

    return(
        <div className="footer">
            {(currentUser?.admin === true || currentUser?.user?.admin === true) ? (
                <div>
                    <button>
                <div className="contact-us-button">
                    <Link to='/contact_us'>Contact Us</Link>
                </div>
            </button>


            <link
            rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
            </link>
            <a href="#" class="fa fa-facebook"></a>
            <button>
                <div className="facebook-link-off">
                    Turn link off
                </div>
            </button>
                </div>
            ) : (
                <div>
                    <button>
                        <div className="contact-us-button">
                            <Link to='/contact_us'>Contact Us</Link>
                        </div>
                    </button>

                    <link
                    rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
                    </link>
                    <a href="#" class="fa fa-facebook"></a>
                </div>
            )}
            {/* <button className='contact-us-btn' type='button'><a href='mailto:stpaul23009@gmail.com
            '>Contact Us</a></button> */}
        </div>
    )

}

export default Footer