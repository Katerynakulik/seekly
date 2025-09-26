export function showLoadMoreButton() {
  document.querySelector(".load-more").classList.remove("hidden");
}
export function hideLoadMoreButton() {
  document.querySelector(".load-more").classList.add("hidden");
}
// Show loader
export const showLoader = () => {
  document.querySelector("main .base-image").classList.add("hidden");
  document.querySelector(".results").classList.add("hidden");
  document.querySelector(".loader").classList.remove("hidden");
};
// Hide loader
export const hideLoader = () => {
  document.querySelector(".loader").classList.add("hidden");
  document.querySelector(".results").classList.remove("hidden");
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
