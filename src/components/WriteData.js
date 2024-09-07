  // Database write is disabled
  // if you want write APImovies/tv (on your own database) add a TMBD API key to FetchData.js
import React from "react";
import { useEffect, useState } from "react";
import FetchData from "./FetchData";
import firebase from "firebase/compat/app";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
  addDoc,
  setDoc,
} from "firebase/firestore";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { db } from "../index";
import { Cone } from "react-bootstrap-icons";

const WriteData = () => {

  //// Write Movies
  const writeMovies = async () => {
    try {
    const apiMovies = FetchData("movie");
    const movieRef = collection(db, "newMovies");
    
    for (const apiMovie of apiMovies) {
      const movieDocRef = doc(movieRef, apiMovie.id.toString()); // Create a document reference with the movie ID
      await setDoc(movieDocRef, apiMovie, { merge: true });
      console.log(`Processed movie with ID: ${apiMovie.id}`);
    }
  } catch (error) {"Error fetching data while trying to write movies 'WriteMovies", error}
  }

  //Write Tv Shows
  const writeShows  = async () => {
    try { 
    const apiTvShows = FetchData("tv");
    const tvShowsRef = collection(db, "newShows");

    for (const apiTvShow of apiTvShows) {
      const tvShowDocRef = doc(tvShowsRef, apiTvShow.id.toString()); // Create a document reference with the TV show ID
      await setDoc(tvShowDocRef, apiTvShow, { merge: true });
      console.log(`Processed TV show with ID: ${apiTvShow.id}`);
    }
  } catch (error) {"Error fetching data while trying to write shows 'WriteShows'", error}
  }

  // Database write is disabled
  // if you want write APImovies/tv add a TMBD API key to FetchData.js

  // writeToDatabase(apiMovies, apiTvShows, movieRef, tvShowsRef);
  // writeMovies();
  // writeShows();


};
export default WriteData;
