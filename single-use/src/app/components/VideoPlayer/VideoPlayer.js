import React from "react";
import ReactPlayer from 'react-player';

const VideoPlayer = (props) => {
  const { url, isPlaying } = props;

  return (
    <div className="video-player-container">
      <ReactPlayer 
        controls 
        url={url}
        playing={isPlaying} 
        volume={0.1}
        onReady={() => console.log("on ready callback")}
        onStart={() => console.log("on start callback")}
        onPause={() => console.log("on pause callback")}
        onEnded={() => console.log("on end callback")}
        onError={() => console.log("on error callback")}
      />
    </div>
  )
}

export default VideoPlayer;