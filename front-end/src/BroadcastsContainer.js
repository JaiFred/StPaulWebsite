//Hooks
import { Link, Navigate, Routes, Route } from 'react-router-dom'
import React, {useState, useEffect} from "react";

//Components
import { ReactPlayerWrapper } from './ReactPlayerWrapper/ReactPlayerWrapper';

//CSS
import background from './images/trees-wallpaper-green.jpeg'
import { Parallax } from 'react-parallax'; 
import './BroadcastsContainer.scss'

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
                console.log('response', response)
                setVideos(response.items.map((item) => ({url: `https://www.youtube.com/watch?v=${item.id.videoId}`, title: item.snippet.title, date: item.snippet.publishedAt})));
              })
          },[])
                    
        console.log(`videos: ${JSON.stringify(videos)}`);

            return(
                <div>
                     <Parallax bgImage={background} bgImageAlt="homepage background" strength={-200} className={'homepage-background'}>
                        <div class="container">
                        <ReactPlayerWrapper url={videos[0].url}/>
                        </div>
                     </Parallax>
                    <div class="container">
                        <div className={'row'}>
                            <div className="col-12 col-md-6">
                                <div className="broadcast-video-item">
                                    <ReactPlayerWrapper url={videos[1].url}/>
                                    <h3 className='broadcast-video-item-title'>{videos[1].title}</h3>
                                    <p>{videos[1].date}</p>
                                </div>
                            </div>
                            <div className="col-12 col-md-6">
                                <div className="broadcast-video-item">
                                    <ReactPlayerWrapper url={videos[2].url}/>
                                    <h3 className='broadcast-video-item-title'>{videos[2].title}</h3>
                                    <p>{videos[2].date}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <Link to='/' className="main">back to home</Link>
                    </div>
                </div>
                
            )
    
    }
// }

export default BroadcastsContainer