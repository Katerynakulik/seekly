import axios from "axios";
import defaultImage from "../images/default_movie_image.jpg";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

/**
 * Fetches movies from the TMDB (The Movie Database) API.
 *
 * @async
 * @function fetchMovies
 * @param {string} query - The search keyword for movie titles.
 * @param {number} page - Page number for pagination.
 * @returns {Promise<Object[]>} A promise that resolves to an array of movie objects.
 * If the request fails, an empty array is returned.
 */
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

/**
 * Creates a movie card element for display in the gallery.
 *
 * @function createMovieCard
 * @param {Object} movie - The movie object returned from TMDB API.
 * @param {string} movie.title - The title of the movie.
 * @param {string} [movie.poster_path] - Relative path to the movie poster.
 * @param {Function} onSelect - Callback function to handle card selection.
 * @returns {HTMLLIElement} The constructed list item containing the movie card.
 */

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

/**
 * Renders a grid of movie cards inside the gallery container.
 * Clears existing results and appends new movie cards.
 *
 * @function renderMovieGrid
 * @param {Object[]} movies - Array of movie objects to render.
 * @param {Function} onSelect - Callback function to handle card selection.
 */

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
