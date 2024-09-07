
import "../styles/trailer.css";
import ButtonPrimary from "./ButtonPrimary"
import YouTube from "react-youtube";
import React, {useState, useEffect} from "react";


function Trailer({ isPlaying, setIsPlaying, currentTrailer}) {
  
 const onTrailerEnd = (event) => {
  if (event.data === YT.PlayerState.ENDED) {
    setIsPlaying(false);
// console.log(`video eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeended`)
  }}

  const opts = {
    height: "390",
    width: "640",
    playerVars: {
      autoplay: 1,
    },
  };
    
    return (
      <>
        <div className="Trailer">
        {isPlaying && <YouTube className="video" videoId={currentTrailer} opts={opts} onStateChange={onTrailerEnd}  />}
        </div>
      </>
    );
  }
  
  export default Trailer;