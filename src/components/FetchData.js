
import { useEffect, useState } from "react";
import axios from "axios";

const FetchData = (titleType) => {
  
const [currentResults, setCurrentResults] = useState();

const API = "ab476096e2f481208770cd7aeae26e27";

const pipe2 =
  (...fns) =>
  (val) =>
    fns.reduce((acc, fn) => Promise.resolve(acc).then(fn), val);

const firstfn = async (titleType) => {
  const urlA = `https://api.themoviedb.org/3/trending/${titleType}/day?api_key=${API}&with_original_language=en-US&page=1`;
  const urlB = `https://api.themoviedb.org/3/trending/${titleType}/day?api_key=${API}&with_original_language=en-US&page=2`;
  const urlC = `https://api.themoviedb.org/3/trending/${titleType}/day?api_key=${API}&with_original_language=en-US&page=3`;

  try {
    const responseA = await fetch(urlA);
    const responseB = await fetch(urlB);
    const responseC = await fetch(urlC);

    if (!responseA.ok || !responseB.ok || !responseC.ok) {
      throw new Error(
        "Network response was not okay",
        !responseA.ok
          ? responseA.statusText
          : !responseC.ok
          ? responseC.statusText
          : responseB.statusText
      );
    }
    const dataA = await responseA.json();
    const dataB = await responseB.json();
    const dataC = await responseC.json();

    const data = [...dataA.results, ...dataB.results, ...dataC.results];
    const ids = data.map((item) => item.id); // Simplified the mapping of IDs

    return { ids, titleType };
  } catch (error) {
    console.error("Fetching error (firstFn):", error);
    throw error;
  }
};

const secondFN = async (args) => {
  const moviesObj = await Promise.all(
    args.ids.map(async (id) => {
      const url2 = `https://api.themoviedb.org/3/${args.titleType}/${id}?api_key=${API}`;
      try {
        const response = await fetch(url2);
        if (!response.ok) {
          throw new Error(
            "Network response for a movie not okay at secondFN",
            response.statusText
          );
        }
        const data = await response.json();
        return { ...data, titleType: args.titleType };
      } catch (error) {
        console.error("Fetching error (secondFN):", error);
        throw error;
      }
    })
  );

  return moviesObj;
};

const thirdFn = async (args) => {
  const ids = args.map((movie) => movie.id);
  const titleType = args[0].titleType;

  const videos = await Promise.all(
    ids.map(async (id) => {
      const url3 = `https://api.themoviedb.org/3/${titleType}/${id}/videos?api_key=${API}`;
      try {
        const response = await fetch(url3);
        if (!response.ok) {
          throw new Error(
            "Network response for a movie not okay at thirdFn",
            response.statusText
          );
        }
        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Fetching error (thirdFn):", error);
        throw error;
      }
    })
  );

  const updatedMovies = args.map((movie) => {
    const video = videos.find((v) => v.id === movie.id);
    const trailer = video
      ? video.results.find((vid) => vid.type === "Trailer")
      : null;

    return {
      ...movie,
      videos: video ? video.results : [], //video results
      trailer,
    };
  });

  return { updatedMovies, args, videos };
};

//To get the title images //to be finshed later
const fourthFn = async (args) => {
  const titleType = args.updatedMovies[0].titleType;
  const ids = args.updatedMovies.map((movie) => movie.id);

  const titleImgs = await Promise.all(
    ids.map(async (id) => {
      const url4 = `https://api.themoviedb.org/3/${titleType}/${id}/images?api_key=${API}&original_language=en`;
      try {
        const response = await fetch(url4);

        if (!response.ok) {
          throw new error(
            "Network response for titleImgs was not okay fourthFn",
            response.statusText
          );
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.error("Fetching error (FourthFn", error);
        throw new error();
      }
    })
  );

  const updatedMovies = args.updatedMovies.map((movie) => {
    const images = titleImgs.find((img) => img.id === movie.id);
    const logos = images
      ? images.logos.find((logo) => logo.iso_639_1 === "en")
      : null;

    return {
      ...movie,
      logos,
    };
  });

  return {
    secondFnMovies: args.args,
    thirdFnMivies: args.updatedMovies,
    fourthFnMovies: updatedMovies,
  };
};

const fifthFn = async (args) => {
  const titleType = args.fourthFnMovies[0].titleType;
  const movies = await Promise.all(
    args.fourthFnMovies.map(async (movie) => {
      try {
        const title = movie.title ? movie.title : movie.name;
        const runtime = movie.runtime ? movie.runtime : movie.episode_run_time;
        const releaseDate = movie.release_date
          ? movie.release_date
          : movie.first_air_date;
        const lastAirDate = movie.last_air_date ? movie.last_air_date : "";
        const numberOfSeasons = movie.number_of_seasons
          ? movie.number_of_seasons
          : "";
        const totalEpisodes = movie.number_of_episodes
          ? movie.number_of_episodes
          : "";
        const backdrop = `https://image.tmdb.org/t/p/w1280${movie.backdrop_path}`;
        const poster = `https://image.tmdb.org/t/p/w780${movie.poster_path}`;
        const genres = movie.genres.map((object) => object.name);

        const { id, overview, vote_average, videos, trailer, logos } = movie;
        let content = {
          id,
          title,
          runtime,
          vote_average,
          overview,
          releaseDate,
          lastAirDate,
          numberOfSeasons,
          totalEpisodes,
          videos,
          trailer,
          logos,
          backdrop,
          poster,
          genres,
        };

        for( let key in content){
          if(content[key] === undefined) {
            content[key] = "redefined"
          }
        }

        // console.log("content is: ", content)

        return content;
      } catch (error) {
        console.error("Fetching error (FourthFn", error);
        throw new error();
      }
    })
  );
  //   console.log("content is: ", movies);
  return movies;
};


(async () => {
  const result = await pipe2(
    firstfn,
    secondFN,
    thirdFn,
    fourthFn,
    fifthFn
  )(titleType);
  //   console.log("The final result:", result);
  setCurrentResults(result)
})();



  return currentResults;
};

export default FetchData;
