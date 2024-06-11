
import { useEffect, useState } from "react";
import axios from "axios";

const FetchData = (titleType) => {
  const [movies, setMovies] = useState([]);
  const [videos, setVideos] = useState();
  const [trailers, setTrailers] = useState();
  const [multiMovies, setMultiMovies] = useState([]);
  const [processDetails, setProcessedDetails] = useState([]);
  const [video, setVideo] = useState([]);
  const [title, setTitle] = useState([]);
  const [combined, setCombined] = useState([]);

  // I have removed my TMBD API key from this project, you can add your own if you want try fetch data from the api
  const apikey =`YOUR_API_KEY_HERE`;
  

  const URL1 = `https://api.themoviedb.org/3/trending/${titleType}/day?api_key=${apikey}&with_original_language=en&page=1`;
  const URL2 = `https://api.themoviedb.org/3/trending/${titleType}/day?api_key=${apikey}&with_original_language=en&page=2`;

  /////////////////////////////////////////////////////
  //1.1 FIRST WE GET THE IDS OF MOVIES TRENDING ON TMBD
  /////////////////////////////////////////////////////
  useEffect(() => {
    Promise.all([axios.get(URL1), axios.get(URL1)])
      .then((responses) => {
        const combinedMovies = [
          ...responses[0].data.results,
          ...responses[1].data.results,
        ];
        setMultiMovies(combinedMovies);
      })

      .catch((error) => console.error(`there was error fetching data`, error));
  }, []);

  const movieIds = (() => {
    if (multiMovies && multiMovies.length > 30) {
      return multiMovies.map((movie) => movie.id);
    }
    return [];
  })();

  /////////////////////////////////////////////////////
  //1.2  WE GET THE DETAILS OF THE MOVIES/TV USING THE IDS WE GOT IN 1.1
  /////////////////////////////////////////////////////
  const [movieDetails, setMovieDetails] = useState([]);
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const details = await Promise.all(
          movieIds.map((movieId) =>
            axios.get(
              `https://api.themoviedb.org/3/${titleType}/${movieId}?api_key=${apikey}`
            )
          )
        );
        setMovieDetails(details.map((response) => response.data));
      } catch (error) {
        console.error("Error fetching movie details", error);
      }
    };
    fetchMovies();
  }, [multiMovies]);

  /////////////////////////////////////////////////////
  //1.3  WE PROCESS AND STRUCTURE THE MOVIE/TV DETAILS WE GOT IN 1.2
  /////////////////////////////////////////////////////

  useEffect(() => {
    const details = async () => {
      try {
        const alldetails = await Promise.all(
          movieDetails.map((detail) => {
            const {
              id,
              title,
              overview,
              runtime,
              vote_average,
              release_date,
              first_air_date,
              last_air_date,
              name,
              number_of_episodes,
              number_of_seasons,
              episode_run_time,
            } = detail;

            const genres = detail.genres.map((object) => object.name);
            const backdrop = `https://image.tmdb.org/t/p/w1280${detail.backdrop_path}`;
            const poster = `https://image.tmdb.org/t/p/w780${detail.poster_path}`;

            var movie;
            if (titleType == "movie") {
              movie = {
                id,
                title,
                overview,
                genres,
                backdrop,
                poster,
                runtime,
                vote_average,
                release_date,
              };
            } else if (titleType == "tv") {
              movie = {
                id,
                name,
                overview,
                genres,
                backdrop,
                poster,
                episode_run_time,
                vote_average,
                first_air_date,
                last_air_date,
                number_of_episodes,
                number_of_seasons,
              };
            }

            return movie;
          })
        );
        setProcessedDetails(alldetails.map((response) => response));
      } catch (error) {
        console.error("Error processing movie  details", error);
      }
    };
    details();
  }, [movieDetails, trailers]);

  /////////////////////////////////////////////////////
  //1.4-1  WE GET THE MOVIE/TV VIDEOS & TRAILERS CORRESPONDING TO THE IDS WE RECEIVED IN STEP 1.1
  /////////////////////////////////////////////////////
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const details = await Promise.all(
          movieIds.map((movieId) =>
            axios.get(
              `https://api.themoviedb.org/3/${titleType}/${movieId}/videos?api_key=${apikey}`
            )
          )
        );
        const allVideos = details.map((response) => response.data);
        const videoResults = details.map((response) => response.data.results);

        setVideos(allVideos);
      } catch (error) {
        console.error("Error fetching movie videos", error);
      }
    };
    fetchVideos();
  }, [multiMovies]);

  //1.4-2 let's deconstruct the trailers
  useEffect(() => {
    var theTrailers = {};
    if (videos && videos.length >= 30) {
      videos.forEach((obj) => {
        const trailerVideos = obj.results.filter(
          (item) => item.type === "Trailer"
        );

        if (trailerVideos.length > 0) {
          theTrailers[obj.id] = trailerVideos.map(
            (theTrailer) => theTrailer.key
          );
        }
      });
    }
    setTrailers(theTrailers);
  }, [videos, multiMovies]);

  //1.4-3 let's deconstruct the videos

  useEffect(() => {
    let theVideos;
    if (videos && Array.isArray(videos) && videos.length >= 30) {
      theVideos = videos.reduce((acc, video) => {
        acc[video.id] = video.results;
        return acc;
      }, {});
      setVideo(theVideos);
    }
  }, [videos]);

  /////////////////////////////////////////////////////
  //1.5  WE GET THE TITLE IMAGES (LOGOS) CORRESPONDING TO THE IDS WE RECEIVED IN STEP 1.1
  /////////////////////////////////////////////////////
  useEffect(() => {
    const fetchImages = async () => {
      try {
        const details = await Promise.all(
          movieIds.map((movieId) =>
            axios.get(
              `https://api.themoviedb.org/3/${titleType}/${movieId}/images?api_key=${apikey}&original_language=en`
            )
          )
        );
        const allImages = details.map((response) => response.data);
        const allLogos = details.map((response) => response.data.logos);
        if (allImages && allImages.length > 0) {
          const logosWithIds = allImages.reduce((acc, image) => {
            const titleLogos = image.logos.filter((Logo) => {
              return Logo.iso_639_1 === "en";
            });
            acc[image.id] = titleLogos;

            return acc;
          });

          setTitle(logosWithIds);
        }
        // console.log(`all images here:`, allImages);
      } catch (error) {
        console.error("Error fetching movie images", error);
      }
    };
    fetchImages();
  }, [multiMovies]);
  // console.log(`the logos found are`, title);

  //
  /////////////////////////////////////////////////////
  //1.6  NOW WE COMBINE MOVIE/TV SHOW DATA (IN STEP 1.3) WITH CORRESPONDING VIDEOS, TRAILERS & LOGOS
  /////////////////////////////////////////////////////

  useEffect(() => {
    const updateObjects = processDetails.map((item) => {
      return {
        ...item,
        trailer: trailers[item.id] ? trailers[item.id] : "no trailers",
        videos: video[item.id] ? video[item.id] : "no videos",
        titleImages: title[item.id] ? title[item.id] : "no title logo images",
      };
    });
    setCombined(updateObjects);
  }, [processDetails, title, videos, trailers]);

  return combined;
};

export default FetchData;
