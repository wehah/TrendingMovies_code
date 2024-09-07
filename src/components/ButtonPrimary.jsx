import "../styles/Buttons.css";
import { PlayFill} from 'react-bootstrap-icons';
import { StopBtnFill } from 'react-bootstrap-icons';
import React, { useRef, useEffect } from 'react';








function ButtonPrimary({ onClick, ...props }) {
  const {isPlaying, setIsPlaying} = props;

  const playTrailer = "Play";
  const stopTrailer = "Stop";

  const handleStopClick = () => {
    if (isPlaying) {
      // console.log("video Playiiiiiiiiiiiiiiiiiiing", isPlaying);
      document.querySelector('.someDiv')
      setIsPlaying(false);
      // console.log("video stopppppppppppppped", isPlaying);
    } else {
      onClick();
    }
  }

    return (
      <>
      <button className="buttons ButtonPrimary" onClick={onClick, handleStopClick}  >
        <h3>
          {isPlaying? (
            <span>
            <StopBtnFill className="Pause" />
           Stop
           </span>
          ) : (
            
            <span>
            <PlayFill />
            
            Play</span>
          )
          }


         
           </h3>
        </button>
      </>
    );
  }
  
  export default ButtonPrimary;