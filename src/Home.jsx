
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import InfoDisplay from "./components/InfoDisplay";
import CardRow from "./components/CardRow";
import Trailer from "./components/Trailer";
import "./styles/Root.css";
import React, { useState, useEffect } from "react";

function Home(props) {
  const { movies, TvShows } = props;



  // changes movie ID to the clicked movie id
  const [selectedID, setSelectedID] = useState(null);
  const titleIdChange = (id) => {
    setSelectedID(id);
    console.log("the ID is:", id);
  };
  const trailerId = selectedID;
  ///////////////////////////////////////////

  //Video Play handle function
  const [isPlaying, setIsPlaying] = useState(false);

  const playTrailer = () => {
    setIsPlaying(true);
  };

  const stopTrailer = () => {
    setIsPlaying(false);
  };

  const cardRowTitle = "Movies trending today on NETFLIX";
  const cardRowTitle2 = "TV shows trending today on NETFLIX";
  const titleType = "movie";

  // THE NEW DATA CHECK UP BEFORE DELETE ANY CODE
  const [currentTrailer, setCurrentTrailer] = useState(null);
  const [backdrop, setBackdrop] = useState(null);
  const [newData, setNewData] = useState(null);
  const [poster, setPoster] = useState(null);

  useEffect(() => {
    let theMovie;
    if (movies) {
      theMovie = movies.find((movie) => movie.id === selectedID);
    }

    if (theMovie) {
      const movieTtrailer = theMovie.trailer ? theMovie.trailer.key :theMovie.videos[0] ? theMovie.videos[0].key : null;
      const theBackdrop = theMovie.backdrop;
      const thePoster = theMovie.poster;

      setNewData(theMovie);
      setCurrentTrailer(movieTtrailer);
      setBackdrop(theBackdrop);
      setPoster(thePoster);
    }
  }, [movies, selectedID]);

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
                data={movies}
                newData={newData}
                theType={"movies"}
                movies={movies}
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

export default Home;
