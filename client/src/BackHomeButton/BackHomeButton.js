//Hooks
import classNames from "classnames";
import { Link } from "react-router-dom";

import './BackHomeButton.scss';

export const BackHomeButton = ({ className }) => 
<div className={classNames("back-home", className)}>
    <Link to='/' className="back-home-button">Back Home</Link>
</div>