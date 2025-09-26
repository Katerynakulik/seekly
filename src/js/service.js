/**
 * Displays a loading indicator.
 * It hides the main image and search results, then shows the loader element.
 */
export const showLoader = () => {
  document.querySelector("main .base-image").classList.add("hidden");
  document.querySelector(".results").classList.add("hidden");
  document.querySelector(".loader").classList.remove("hidden");
};
/**
 * Hides the loading indicator.
 * It hides the loader element and shows the search results.
 */
export const hideLoader = () => {
  document.querySelector(".loader").classList.add("hidden");
  document.querySelector(".results").classList.remove("hidden");
};

/**
 * Clears all content from the search gallery.
 */
export function clearGallery() {
  document.querySelector(".gallery").innerHTML = "";
}
