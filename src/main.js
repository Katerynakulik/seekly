import { fetchMovies, renderMovieGrid } from "./js/fetchMovies.js";
import { getImagesByQuery, createGallery } from "./js/fetchImages.js";
import {
  showLoadMoreButton,
  hideLoadMoreButton,
  showLoader,
  hideLoader,
  resetGallery,
  clearGallery,
  scrollPage,
} from "./js/service.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const queryInput = searchForm.querySelector('input[name="query"]');

  let currentQuery = "";
  let currentCategory = "";
  let currentPage = 1;
  let totalHits = 0;

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
    resetGallery();
    showLoader();
    try {
      if (category === "movies") {
        const movies = await fetchMovies(query, currentPage);
        renderMovieGrid(movies, handleMovieSelect);
        if (movies.length > 0) showLoadMoreButton();
      } else if (category === "images") {
        const images = await getImagesByQuery(query, currentPage);
        totalHits = images.totalHits;
        createGallery(images.hits);
        if (images.hits.length > 0 && totalHits > 15) {
          showLoadMoreButton();
        }
      } else {
        iziToast.warning({
          title: "Attention",
          message: `Search for category "${category}" not yet implemented.`,
          position: "topCenter",
          timeout: 3000,
        });
      }
    } finally {
      hideLoader();
    }

    queryInput.value = "";
  });
});
