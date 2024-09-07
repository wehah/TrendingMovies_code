import "../styles/Rating.css";
import React, { useState } from "react";
<script src="https://cdn.jsdelivr.net/npm/gsap@3.12/dist/gsap.min.js"></script>;
import { useEffect, useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";


function Rating({ styles, ...props }) {
  const { rating, reviews36, titleimagePath, backgropImage } = props;

  



  const theRating = useRef(null);
  const container = useRef(null);

  useEffect(() => {
  if (reviews36){ 
      const tl1 = gsap.timeline();
       tl1.fromTo(
        theRating.current,
        {
          delay:4,
          background: `#FFF`,
          lazy:false,
        },
        {
          duration: 1,
          ease: "none",
          background: `conic-gradient(from 0deg at 50% 50%, #E50915 0deg, #E50915 ${reviews36}deg, #FFF ${reviews36}deg, #FFF 360deg)`,
          lazy:false,
         
        }
      );
    }
  }, [reviews36]);




  return (
    <>
      <div ref={container}>
        <div className="Rating"  ref={theRating}>
          <h3> {rating} </h3>
        </div>
      </div>
    </>
  );
}

export default Rating;
