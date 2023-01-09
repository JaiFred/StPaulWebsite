//Hooks
import { Link, Navigate, Routes, Route } from 'react-router-dom'
import React, {useState, useEffect} from "react";
import ReactPlayer, { controls } from "react-player";

    //remember to remove these when pushing to github
    const API = process.env.REACT_APP_MY_GOOGLE_API_KEY
    const channelID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID
    const result = 3
   

// `https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyCl98VyEBDclwgY1dJ32kQezLTZb7BrN80`

// `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCl98VyEBDclwgY1dJ32kQezLTZb7BrN80&channelId=UCjdo3_tsoJ0x0EV18T52u2g`

// `https://www.youtube.com/watch?v=El_U51WIgAo`
   
    function BroadcastsContainer () {
        var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`
        console.log(`finalURL: ${finalURL}`);

        const [videos, setVideos] = useState([]);

        useEffect(() => {
            fetch(finalURL)
              .then((r) => r.json())
              .then((response) => {
                setVideos(response.items.map((item) => `https://www.youtube.com/watch?v=${item.id.videoId}`));
              })
          },[])
                    
        console.log(`videos: ${JSON.stringify(videos)}`);

            return(
                <div>
                    {videos.map(url => <div><ReactPlayer url={url} controls/></div>)}
                    <div>
                        <Link to='/' className="main">back to home</Link>
                    </div>
                </div>
                
            )
    
    }
// }

export default BroadcastsContainer