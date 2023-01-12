//Hooks
import { Link } from "react-router-dom";

import './BackHomeButton.scss';

export const BackHomeButton = ({}) => 
<div className="back-home">
    <Link to='/' className="back-home-button">Back Home</Link>
</div>