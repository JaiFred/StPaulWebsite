import { Link } from "react-router-dom";

export const HomepageBigButton = ({identifier, icon, to, label, onClick, useDefaultAnchor = false}) =>  <div className={`homepage-big-button ${identifier}`}>
    <div className='homepage-big-button-outer'>
    <div className="homepage-big-button-dim"></div>
        {useDefaultAnchor ? <a className="homepage-big-button-inner" href={to}>
        <div className="homepage-big-button-animation">
            <img  className="homepage-big-button-icon" src={icon}/>
            {label}</div></a>
        :
        <Link className="homepage-big-button-inner" to={to} onClick={onClick}>
            <div className="homepage-big-button-animation">
            <img  className="homepage-big-button-icon" src={icon}/>
            {label}</div>
        </Link>
    }
    </div>
</div>