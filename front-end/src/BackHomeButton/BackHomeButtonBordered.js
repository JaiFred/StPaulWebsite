//Hooks
import classNames from "classnames";
import { Link } from "react-router-dom";

import './BackHomeButtonBordered.scss';

export const BackHomeButtonBordered = ({ className, noContainer = false }) => {
    const Button = () => <Link to='/' className="back-home-button-bordered">Back Home</Link>

    if (noContainer) return <Button />;

    return (
        <div className={classNames("back-home", className)}>
            <Button />
        </div>
    )
}