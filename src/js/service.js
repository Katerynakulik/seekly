export function showLoadMoreButton() {
  document.querySelector(".load-more").classList.remove("is-hidden");
}
export function hideLoadMoreButton() {
  document.querySelector(".load-more").classList.add("is-hidden");
}
// Show loader
export const showLoader = () => {
  initialImage.classList.add("hidden");
  resultsContainer.classList.add("hidden");
  loader.classList.remove("hidden");
};
// Hide loader
export const hideLoader = () => {
  loader.classList.add("hidden");
  resultsContainer.classList.remove("hidden");
};
// Reset gallery before new search
export const resetGallery = () => {
  document.querySelector(".gallery").innerHTML = "";
  hideLoadMoreButton();
};
// Clear gallery
export function clearGallery() {
  document.querySelector(".gallery").innerHTML = "";
}
// Scroll after loading
export function scrollPage() {
  const card = document.querySelector(".gallery-item");
  if (!card) return;

  const cardHeight = card.getBoundingClientRect().height;
  window.scrollBy({
    top: cardHeight * 2,
    behavior: "smooth",
  });
}
