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
  const resultsContainer = document.querySelector(".results");
  const initialImage = document.querySelector("main .base-image");
  const loader = document.querySelector(".loader");
  const loadMoreBtn = document.querySelector(".load-more");

  let currentQuery = "";
  let currentCategory = "";
  let currentPage = 1;

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
        const movies = await fetchMovies(query, 1);
        renderMovieGrid(movies, handleMovieSelect);
      } else if (currentCategory === "images") {
        const images = await getImagesByQuery(currentQuery, currentPage);
        createGallery(images.hits);

        if (images.hits.length > 0 && images.totalHits > currentPage * 30) {
          showLoadMoreButton();
        }
      } else {
        iziToast.warning({
          title: "Attention",
          message: `Search for category "${currentCategory}" not yet implemented.`,
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
