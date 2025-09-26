import { fetchMovies, renderMovieGrid } from "./js/fetchMovies.js";
import { getImagesByQuery, createGallery } from "./js/fetchImages.js";
import { showLoader, hideLoader, clearGallery } from "./js/service.js";

document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const queryInput = searchForm.querySelector('input[name="query"]');
  const baseImage = document.querySelector(".base-image");
  const feedbackForm = document.querySelector(".feedback-form");

  let currentQuery = "";
  let currentCategory = "";

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
        renderMovieGrid(movies);
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
  feedbackForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const categorySelect = feedbackForm.querySelector(
      'select[name="category"]'
    );
    const keywordInput = feedbackForm.querySelector('input[name="keyword"]');

    if (categorySelect.value && keywordInput.value.trim() !== "") {
      const feedbackData = {
        category: categorySelect.value,
        keyword: keywordInput.value.trim(),
      };

      console.log("Feedback form data:", feedbackData);
      iziToast.info({
        title: "Info",
        message: "Thank you for your feedback!",
        position: "topCenter",
        timeout: 3000,
      });
      feedbackForm.reset();
    } else {
      iziToast.error({
        title: "Error",
        message: "Please fill out all form fields.",
      });
    }
  });
});
