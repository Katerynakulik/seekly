import { fetchMovies, renderMovieGrid } from "./js/fetchMovies.js";
import { getImagesByQuery, createGallery } from "./js/fetchImages.js";
import { showLoader, hideLoader, clearGallery } from "./js/service.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const queryInput = searchForm.querySelector('input[name="query"]');
  const baseImage = document.querySelector(".base-image");

  let currentQuery = "";
  let currentCategory = "";

  // Handle movie card click
  const handleMovieSelect = (movie) => {
    iziToast.info({
      title: "Film selected",
      message: `You have selected the film: ${movie.title}`,
      position: "topCenter",
      timeout: 3000,
    });
  };

  searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const formData = new FormData(searchForm);
    const query = formData.get("query")?.trim();
    const category = formData.get("category");

    if (!query) {
      iziToast.error({
        title: "Error",
        message: "Please enter your search query.",
        position: "topCenter",
        timeout: 3000,
      });
      return;
    }
    clearGallery();
    showLoader();
    currentQuery = query;
    currentCategory = category;

    try {
      if (category === "movies") {
        const movies = await fetchMovies(query, 1);
        if (!movies || movies.length === 0) {
          document.querySelector(".results").classList.add("hidden");
          baseImage.classList.remove("hidden");

          iziToast.warning({
            title: "No results",
            message: "No results found. Please try another query.",
            position: "topCenter",
            timeout: 3000,
          });
          return;
        }
        renderMovieGrid(movies, handleMovieSelect);
      } else if (category === "images") {
        const images = await getImagesByQuery(query, 1);
        if (!images || !images.hits || images.hits.length === 0) {
          document.querySelector(".results").classList.add("hidden");
          baseImage.classList.remove("hidden");

          iziToast.warning({
            title: "No results",
            message: "No results found. Please try another query.",
            position: "topCenter",
            timeout: 3000,
          });
          return;
        }

        createGallery(images.hits);
      }
    } finally {
      hideLoader();
    }

    queryInput.value = "";
  });
});
