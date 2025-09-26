// https://developer.themoviedb.org/reference/search-movie
// https://developer.themoviedb.org/docs/image-basics

import axios from "axios";
import defaultImage from "../images/default_movie_image.jpg";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// This function handles getting data from the movie database.

export async function fetchMovies(query, page) {
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
    return response.data.results;
  } catch (error) {
    console.error("Error during query:", error);
    toast.error("Failed to fetch movies. Please try again.");
    return [];
  }
}

// Create a movie Card

export const createMovieCard = (movie, onSelect) => {
  const placeholderImage = defaultImage;
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
};

// These functions build and display the movie cards on the page

export const renderMovieGrid = (movies, onSelect) => {
  const movieGrid = document.querySelector(".results .gallery");
  if (!movieGrid) {
    console.error("Element '.gallery' not found.");
    return;
  }
  movieGrid.innerHTML = "";
  movies.forEach((movie) => {
    const movieCard = createMovieCard(movie, onSelect);
    movieGrid.appendChild(movieCard);
  });
};
