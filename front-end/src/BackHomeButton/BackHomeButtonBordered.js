//Hooks
import classNames from "classnames";
import { Link } from "react-router-dom";

import './BackHomeButtonBordered.scss';

export const BackHomeButtonBordered = ({ className }) => 
<div className={classNames("back-home", className)}>
    <Link to='/' className="back-home-button-bordered">Back Home</Link>
</div>