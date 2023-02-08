import ReactPlayer, { controls } from "react-player";

import './ReactPlayerWrapper.scss'

export const ReactPlayerWrapper =({url}) => 
    <div className="react-player-wrapper">
        <ReactPlayer className='react-player' url={url} controls width="100%" height="100%"/>
    </div>