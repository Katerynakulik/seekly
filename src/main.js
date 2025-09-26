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
  const loadMoreBtn = document.querySelector(".load-more");

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
    hideLoadMoreButton();

    try {
      if (category === "movies") {
        const movies = await fetchMovies(query, currentPage);
        if (!movies || movies.length === 0) {
          hideLoadMoreButton();
          document.querySelector(".results").classList.add("hidden");
          document.querySelector(".base-image").classList.remove("hidden");

          iziToast.warning({
            title: "No results",
            message: "No results found. Please try another query.",
            position: "topCenter",
            timeout: 3000,
          });
          return;
        }
        renderMovieGrid(movies, handleMovieSelect);

        if (movies.length > 0) showLoadMoreButton();
      } else if (category === "images") {
        const images = await getImagesByQuery(query, currentPage);
        if (!images || !images.hits || images.hits.length === 0) {
          hideLoadMoreButton();
          document.querySelector(".results").classList.add("hidden");
          document.querySelector(".base-image").classList.remove("hidden");

          iziToast.warning({
            title: "No results",
            message: "No results found. Please try another query.",
            position: "topCenter",
            timeout: 3000,
          });
          return;
        }
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

  // Load more
  loadMoreBtn.addEventListener("click", async () => {
    currentPage += 1;
    showLoader();

    try {
      if (currentCategory === "movies") {
        const movies = await fetchMovies(currentQuery, currentPage);
        renderMovieGrid(movies, handleMovieSelect);
        if (movies.length === 0) hideLoadMoreButton();
      } else if (currentCategory === "images") {
        const data = await getImagesByQuery(currentQuery, currentPage);
        createGallery(data.hits);
        scrollPage();

        if (currentPage * 15 >= totalHits) {
          hideLoadMoreButton();
        }
      } else {
        iziToast.info({
          title: "Notice",
          message: "Load more is not implemented for this category.",
          position: "topRight",
        });
        hideLoadMoreButton();
      }
    } catch (error) {
      iziToast.error({
        title: "Error",
        message: "There was an error, please try again later.",
        position: "topRight",
      });
    } finally {
      hideLoader();
    }
  });
});
