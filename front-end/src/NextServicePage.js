//Hooks
import React, {useState, useEffect} from "react";
import ReactPlayer, { controls } from "react-player";

function NextServicePage(){

    const API = process.env.REACT_APP_MY_GOOGLE_API_KEY
    const channelID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID
    const result = 1

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
            </div>
        )
    
}


export default NextServicePage