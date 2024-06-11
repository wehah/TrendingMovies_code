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
  const [dataWrite, setDataWrite] = useState(false);

  const movieRef = collection(db, "movies");
  const tvShowsRef = collection(db, "TvShows");

  const apiMovies = FetchData("movie");
  const apiTvShows = FetchData("tv");

  async function writeToDatabase(apiMovies, apiTvShows, movieRef, tvShowsRef) {
    // Write Movies
    for (const apiMovie of apiMovies) {
      const movieDocRef = doc(movieRef, apiMovie.id.toString()); // Create a document reference with the movie ID
      await setDoc(movieDocRef, apiMovie, { merge: true });
      console.log(`Processed movie with ID: ${apiMovie.id}`);
    }

    // Write TV Shows
    for (const apiTvShow of apiTvShows) {
      const tvShowDocRef = doc(tvShowsRef, apiTvShow.id.toString()); // Create a document reference with the TV show ID
      await setDoc(tvShowDocRef, apiTvShow, { merge: true });
      console.log(`Processed TV show with ID: ${apiTvShow.id}`);
    }
  }

  // Database write is disabled
  // if you want write APImovies/tv add a TMBD API key to FetchData.js

  // writeToDatabase(apiMovies, apiTvShows, movieRef, tvShowsRef);
};
export default WriteData;
