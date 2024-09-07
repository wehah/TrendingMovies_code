import Cards from "./components/Cards";
import Footer from "./components/Footer";
import InfoDisplay from "./components/InfoDisplay";
import CardRow from "./components/CardRow";
import Trailer from "./components/Trailer";
import "./styles/Root.css";
import React, { useState, useEffect } from "react";

function Tv(props) {
  const { TvShows, movies } = props;

  //changes movie ID to the clicked movie id
  const [selectedID, setSelectedID] = useState(null);
  const titleIdChange = (id) => {
    setSelectedID(id);
    console.log("the ID is:", id);
  };

  console.log(`the movie id is ${selectedID}`);

  const trailerId = selectedID;

  //Video Play handle function
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrailer = () => {
    setIsPlaying(true);
  };

  const stopTrailer = () => {
    setIsPlaying(false);
  };

  const cardRowTitle = "Trending TV shows on NETFLIX today";

  //NEW CODE STARTS HERE
  // THE NEW DATA CHECK UP BEFORE DELETE ANY CODE
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const [newData, setNewData] = useState(null);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    let theShow;
    if (TvShows) {
      theShow = TvShows.find((show) => show.id === selectedID);
    }

    if (theShow) {
      const showTtrailer = theShow.trailer ? theShow.trailer.key :theShow.videos[0] ? theShow.videos[0].key : null;
      const theBackdrop = theShow.backdrop;
      const thePoster = theShow.poster;

      setCurrentTrailer(showTtrailer);
      setBackdrop(theBackdrop);
      setNewData(theShow);
      setPoster(thePoster);
    }
  }, [TvShows, selectedID]);

  useEffect(() => {
    // console.log(`the title HAS BEEN LOCATED AND ITS HERE`, backdrop )
  }, [TvShows, backdrop]);

  // detect mobile browser
  function isMobile() {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0;
  }

  //control how many movies are displayed for diffrent screen widths
  let commentsStyle;
  const windowCheck = () => {
    if (window.innerWidth <= 990) {
      commentsStyle = { backgroundImage: `url(${poster})` };
    } else {
      commentsStyle = { backgroundImage: `url(${backdrop})` };
    }
  };
  windowCheck();

    const sliceStart = 0;
  const sliceEnd = 60;

  

  return (
    <>
      <div className="main">
        <div className="contents" style={commentsStyle}>
          {selectedID && (
            <Trailer
              currentTrailer={currentTrailer}
              TvShows={TvShows}
              selectedID={selectedID}
              videoId="64R2MYUt394"
              isPlaying={isPlaying}
              setIsPlaying={setIsPlaying}
            />
          )}
          <div className="infoContainer">
            {selectedID && (
              <InfoDisplay
                newData={newData}
                selectedID={selectedID}
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                playTrailer={playTrailer}
                stopTrailer={stopTrailer}
              />
            )}
          </div>
        </div>
        <div className="cardsContainer">
          <div className="cardsFixed">
            {
              <CardRow
                data={TvShows}
                newData={newData}
                theType={"Tvshows"}
                TvShows={TvShows}
                onCardClick={titleIdChange}
                isPlaying={isPlaying}
                cardRowTitle={cardRowTitle}
                selectedID={selectedID}
                sliceStart={sliceStart}
                sliceEnd={sliceEnd}
              />
            }
          </div>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
}

export default Tv;
