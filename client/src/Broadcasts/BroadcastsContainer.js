//Hooks
import { Link, Navigate, Routes, Route } from 'react-router-dom'
import React, {useState, useEffect} from "react";

//Components
import { ReactPlayerWrapper } from '../ReactPlayerWrapper/ReactPlayerWrapper';
import {VideoItem} from './VideoItem';
import { BackHomeButton } from '../BackHomeButton/BackHomeButton';

//CSS
import background from '../images/trees-wallpaper-green.jpeg'
import { Parallax } from 'react-scroll-parallax'; 
import './BroadcastsContainer.scss'
import moment from 'moment';

    //remember to remove these when pushing to github
    const API = process.env.REACT_APP_MY_GOOGLE_API_KEY
    const channelID = process.env.REACT_APP_YOUTUBE_CHANNEL_ID
    const playListId = 'PLpzt143tqUaGyovVMaA7foeOsn7VdSoDm';
    const result = 3
   

// `https://www.googleapis.com/youtube/v3/videos?chart=mostPopular&key=AIzaSyCl98VyEBDclwgY1dJ32kQezLTZb7BrN80`

// `https://www.googleapis.com/youtube/v3/search?key=AIzaSyCl98VyEBDclwgY1dJ32kQezLTZb7BrN80&channelId=UCjdo3_tsoJ0x0EV18T52u2g`

// `https://www.youtube.com/watch?v=El_U51WIgAo`
   
    function BroadcastsContainer () {
        const BroadcastPageVideo = 'https://st-paul-baptist-website-uploads.s3.amazonaws.com/Broadcast-page.mp4'
        // var finalURL = `https://www.googleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`
        // console.log(`finalURL: ${finalURL}`);
        // var newUrl = `https://www.googleapis.com/youtube/v3/playlists?channelId=${channelID}&key=${API}`
        // console.log(`newURL: ${newUrl}`);
        
        var playlistItemsUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${playListId}&maxResults=${result}&key=${API}`
        // console.log(`playlistItemsUrl: ${playlistItemsUrl}`);

        const [videos, setVideos] = useState([]);

        useEffect(() => {
            fetch(playlistItemsUrl)
              .then((r) => r.json())
              .then((response) => {
                // console.log('response', JSON.stringify(response.items[0]))
                setVideos(response.items.map((item) => ({url: `https://www.youtube.com/watch?v=${item?.snippet?.resourceId?.videoId}`, title: item.snippet.title, date: item.snippet.publishedAt})));
              })
          },[])
                    
        // console.log(`videos: ${JSON.stringify(videos)}`, videos);

            return(
                <div className="broadcasts-page">
                    <div className="broadcasts-page-header">
                        <Parallax className={'broadcasts-background'} speed={-50}>
                            <video muted loop autoPlay playsInline src={BroadcastPageVideo}></video>
                        </Parallax>
                        <div className="container">
                            <h1 className="title">Broadcasts</h1>
                            <h2 className="subtitle">Most Recent Broadcast</h2>
                            <ReactPlayerWrapper url={videos[0]?.url}/>
                            <h3 className='last-video-title'>{videos[0]?.title}</h3>
                            <p className='last-video-date'>{moment(videos[0]?.date).format('MMM Do, YYYY')}</p>
                        </div>
                    </div>
                    <div className="subheader-banner">Previous messages</div>
                    <div className='broadcasts-videos'>
                        <div class="broadcasts-videos-previous container">
                            <div className={'row'}>
                                <div className="col-12 col-md-6">
                                    <VideoItem video={videos[1]} />
                                </div>
                                <div className="col-12 col-md-6">
                                    <VideoItem video={videos[2]} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <BackHomeButton/>
                </div>
                
            )
    
    }
// }

export default BroadcastsContainer