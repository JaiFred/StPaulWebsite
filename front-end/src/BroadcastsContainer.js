import React, {Component} from "react"
import ReactPlayer from "react-player";



    //remember to remove these when pushing to github
    
    const result = 1


    var finalURL = `https://www.googgleapis.com/youtube/v3/search?key=${API}&channelId=${channelID}&part=snippet,id&order=date&maxResults=${result}`

        class BroadcastsContainer extends React.Component{
            // constructor(props) {
            //     super(props);

            //     this.state = {
            //         result_yt: []
            //     }
                
            // }
        
            render(){
            console.log(finalURL)
            return(
                <div>
                    <button>Get youtube videos</button>

                    <div>
                    <ReactPlayer finalURL url= {'https://www.youtube.com/shorts/El_U51WIgAo'} 
                    />
                        {/* <iframe width="560" height="315" src="https://www.youtube.com/shorts/El_U51WIgAo"
                            frameBorder="0"
                            allowFullScreen>

                        </iframe> */}
                    </div>
                </div>
            )
        }
    }
// }

export default BroadcastsContainer