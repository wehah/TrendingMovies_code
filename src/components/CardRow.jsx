import "../styles/CardRow.css";
import Cards from "./Cards";
import React, { useState, useEffect } from "react";
// import InfoDisplay from "./InfoDisplay";

function CardRow({
  onCardClick,
  isPlaying,
  selectedID,
  movies,
  TvShows,
  data,
  ...props
}) {
  const { cardRowTitle, theType, newData, sliceStart, sliceEnd } = props;

  const [cardClicked, setCardClicked] = useState(false);

  ///GET THE FIRST TITLE IN THE DATA(MOVIE OR TVSHOW)
  const firstTitle = data && Object.keys(data)[0];
  const [firtID, setFirstID] = useState(null);

  useEffect(() => {
    if (firstTitle) {
      const firstTitleId = data[firstTitle].id;
      setFirstID(firstTitleId);
    }
  }, [data]);

  ///LET THE FIRST TITLE IN THE DATA(MOVIE OR TVSHOW) LOAD BEFORE A MOVIE IS CLICKED
  useEffect(() => {
    const setFirstMovie = () => {
      if (firtID && !cardClicked) {
        // console.log(`we have found the first movie`, firtID);
        var theFirstId = firtID;
        onCardClick(theFirstId);
      }
    };
    setFirstMovie();
  }, [data, firtID]);

  //clicked movie will pass it's id to App then InfoDisplay
  const handleClick = (id) => {
    // console.log(id);
    onCardClick(id);
  };
  let moviesCheck;
  if (movies && movies.length > 20) {
    moviesCheck = movies.map((Movie) => Movie);
  }

  //  console.log(`movies check`, movies)

  return (
    <>
    <div className="wrapper p-3 pt-0 pb-0" style={{
          transition: "transform 0.5s ease-in-out",
          opacity: isPlaying ? 0.5 : 1,
          transform: isPlaying ? "translate(0, 30%)" : "translate(0, 0)",
        }}
>
<h2 className="mb-1">{cardRowTitle} </h2>
<div className="viewBar">
  <div className="notRow">
  {movies &&
                  movies.slice(sliceStart, sliceEnd).map((movie) => (
                    <Cards
                      key={movie.id}
                      id={movie.id}
                      title={movie.title}
                      image={movie.poster}
                      onClick={() => {
                        handleClick(movie.id);
                        setCardClicked(true);
                      }}
                    />
                  ))}
                  {theType === "Tvshows" && TvShows &&
                  TvShows.slice(sliceStart, sliceEnd).map((show) => (
                    <Cards
                      key={5+show.id}
                      id={show.id}
                      title={show.title}
                      image={show.poster}
                      onClick={() => {
                        handleClick(show.id);
                        setCardClicked(true);
                      }}
                    />
                  ))}

  </div>
</div>
</div>
   
    </>
  );
}

export default CardRow;
