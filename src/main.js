import { fetchMovies, renderMovieGrid } from "./js/fetchMovies.js";
document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("search-form");
  const queryInput = searchForm.querySelector('input[name="query"]');
  const resultsContainer = document.querySelector(".results");
  const initialImage = document.querySelector("main .base-image");
  const loader = document.querySelector(".loader");
  const showLoader = () => {
    initialImage.classList.add("hidden");
    resultsContainer.classList.add("hidden");
    loader.classList.remove("hidden");
  };

  const hideLoader = () => {
    loader.classList.add("hidden");
    resultsContainer.classList.remove("hidden");
  };

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

    if (category === "movies") {
      showLoader();
      try {
        const movies = await fetchMovies(query, 1);
        renderMovieGrid(movies, handleMovieSelect);
      } finally {
        hideLoader();
      }
    } else {
      iziToast.warning({
        title: "Attention",
        message: `Search for category "${category}" not yet implemented.`,
        position: "topCenter",
        timeout: 3000,
      });
    }

    queryInput.value = "";
  });
});
