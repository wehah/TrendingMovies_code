import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/app.css";
import Navbar from "./components/Navbar";
import Home from "./Home";
import Movies from "./Movies";
import Tv from "./Tv";
import Cards from "./components/Cards";
import Footer from "./components/Footer";
import InfoDisplay from "./components/InfoDisplay";
import CardRow from "./components/CardRow";
import Trailer from "./components/Trailer";
import LoginModal from "./components/LoginModal";
import "./styles/Root.css";
import React, { useState, useEffect } from "react";
import AddCard from "./components/AddCard";
import firebase from "firebase/compat/app";
import { useCollectionData } from "react-firebase-hooks/firestore";
import WriteData from "./components/WriteData";

import { Routes, Route } from "react-router-dom";

function App() {
  const [displayAddCard, setDisplayAddCard] = useState(false);

  //NEW DATA STARTS HERE
  //movie data collected from firestore
  const movieRef = firebase.firestore().collection("newMovies");
  const [movies] = useCollectionData(movieRef, { idField: "id" });

  //TV show data collected from firestore
  const TvShowRef = firebase.firestore().collection("newShows");
  const [TvShows] = useCollectionData(TvShowRef, { idField: "id" });

  const [openModal, setOpenModal] = useState(true);

  const closeModal = () => {
    if (openModal) {
      setOpenModal(false);
    }
  };

  const openTheModal = () => {
    if (!openModal) {
      setOpenModal(true);
    }
  };

  return (
    <>
      <div className="app">
        <Navbar
          openDisplay={() => setDisplayAddCard(true)}
          openTheModal={openTheModal}
        />
        {openModal && <LoginModal closeModal={closeModal} />}

        <Routes>
          <Route
            path="/"
            element={<Home movies={movies} TvShows={TvShows} />}
          />
          <Route
            path="Movies"
            element={<Movies movies={movies} TvShows={TvShows} />}
          />
          <Route path="Tv" element={<Tv movies={movies} TvShows={TvShows} />} />
          <Route
            path="*"
            element={<Home movies={movies} TvShows={TvShows} />}
          />
        </Routes>
        <Footer />
        <WriteData />
      </div>
    </>
  );
}

export default App;
