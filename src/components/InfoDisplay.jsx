import "../styles/InfoDisplay.css";
import TopRankCard from "./TopRankCard";
import ButtonPrimary from "./ButtonPrimary";
import ButtonSecondary from "./buttonSecondary";
import Rating from "./Rating";
import Genre from "./Genre";
import React, { useState, useEffect, useRef } from "react";
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>;
// import { useRef } from "react"
import gsap from "gsap";

import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(MotionPathPlugin);

function info({
  playTrailer,
  stopTrailer,
  isPlaying,
  setIsPlaying,
  selectedID,
  newData,
  ...props
}) {
  const { placeHolder } = props;

  //useState to set some variables, newData (either tv or movie data) fed by the parent page
  const [overview, setOverview] = useState(null);
  const [genre, setGenre] = useState(null);
  const [rating, setRating] = useState(null);
  const [logo, setLogo] = useState(``);

  useEffect(() => {
    if (newData && newData.logos) {
      const theRating = newData.vote_average.toFixed(1);
      const theGenre = newData.allGenres? newData.allGenres.slice(0, 3).join(", "):newData.genres.slice(0, 3).join(", ");
      const newLogo = newData.logos.file_path ? newData.logos.file_path : null;
      const newLogoPath = newLogo ? `https://image.tmdb.org/t/p/w780${newLogo}` :null;
      // const theLogo = newData.logo;
      
//https://image.tmdb.org/t/p/w780/qZPLK5ktRKa3CL4sKRZtj8UlPYc.jpg
      setRating(theRating);
      setGenre(theGenre);
      setLogo(newLogoPath);

    }
  }, [newData]);

  const [reviews36, setReviews36] = useState(null);
  useEffect(() => {
    const reviewsTimes36 = rating * 36;
    setReviews36(reviewsTimes36);
  });

  //  console.log(`theeeeeeeeeeeeeeeeeeeeeeeeee aaaaaaaaaaa`, logo);

  return (
    <>
      <div className="InfoDisplay">
        {newData ? (
          <div
            className="titleImageCont"
            style={{
              transition: "transform 0.5s ease-in-out",
              opacity: isPlaying ? 0 : 1,
              transform: isPlaying ? "translate(-100%, 0)" : "translate(0, 0)",
            }}
          >
            {newData && !logo ? (
              <h1>
                {" "}
                {newData.title} {newData.name}{" "}
              </h1>
            ) : (
              <img
                src={logo}
                className="titleImage"
                alt={newData.title ? newData.title : newData.name}
                title={
                  newData &&
                  (newData.title
                    ? newData.title
                    : newData.name
                    ? newData.name
                    : "title image")
                }
              />
            )}
          </div>
        ) : (
          <p>loading...</p>
        )}

        <div
          className=" d-flex align-items-center gap-3"
          style={{
            transition: "transform 0.5s ease-in-out",
            opacity: isPlaying ? 0 : 1,
            transform: isPlaying ? "translate(-100%, 0)" : "translate(0, 0)",
          }}
        >
          <div className="RatingCardHolder">
            <Rating
              rating={rating}
              reviews36={reviews36}
              titleimagePath={logo}
            />
          </div>
          <Genre
            className="m-0"
            genre={genre}
            selectedID={selectedID}
          
          />
        </div>
        <div className="infoCont d-none d-lg-block">
          {newData && (
            <p
              style={{
                transition: "transform 0.5s ease-in-out",
                opacity: isPlaying ? 0 : 1,
                transform: isPlaying
                  ? "translate(-100%, 0)"
                  : "translate(0, 0)",
              }}
              className="infoP "
            >
              {newData.overview}{" "}
            </p>
          )}
        </div>

        <div className="buttonPair">
          <ButtonPrimary
            onClick={playTrailer}
            isPlaying={isPlaying}
            setIsPlaying={stopTrailer}
          />
        </div>
      </div>
    </>
  );
}

export default info;
