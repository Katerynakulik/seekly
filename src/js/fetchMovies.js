// https://developer.themoviedb.org/reference/search-movie
// https://developer.themoviedb.org/docs/image-basics

import axios from "axios";
import toast from "react-hot-toast";

// This function handles getting data from the movie database.

const fetchMovies(query, page) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          query: query,
          include_adult: false,
          language: "en-US",
          page: page,
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    console.log("Fetched movies:", response.data.results);

    return response.data.results;
  } catch (error) {
    console.error("Error during query:", error);
    toast.error("Failed to fetch movies. Please try again.");
    return [];
  }
}

// Create a movie Card

const createMovieCard = (movie, onSelect) => 
    {const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("card");
    div.addEventListener("click", () => onSelect(movie));
    const createMovieCard = (movie, onSelect) => {
    const li = document.createElement("li");
    const div = document.createElement("div");
    div.classList.add("card");
    div.addEventListener("click", () => onSelect(movie));

    const img = document.createElement("img");
    img.classList.add("image");
    img.src = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : placeholderImage;
    img.alt = movie.title;
    img.loading = "lazy";

    const h2 = document.createElement("h2");
    h2.classList.add("title");
    h2.textContent = movie.title;

    div.append(img, h2);
    li.appendChild(div);

    return li;
}};

