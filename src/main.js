const form = document.getElementById("search-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = new FormData(form);
  const queryInput = form.querySelector('input[name="query"]');
  const query = formData.get("query")?.trim();
  const category = formData.get("category");
  if (!query) {
    iziToast.error({
      title: "Error",
      message: "Please enter a search query.",
      position: "topCenter",
      timeout: 3000,
    });
    return;
  }
  switch (category) {
    case "movies":
      console.log("Search movies for:", query);
      fetchMovies(query, (page = 1));
      break;
    case "images":
      console.log("Search images for:", query);
      // fetchImages(query);
      break;
    case "articles":
      console.log("Search articles for:", query);
      // fetchArticles(query);
      break;
  }
  queryInput.value = "";
});
