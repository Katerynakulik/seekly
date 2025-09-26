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

// Clear gallery
export function clearGallery() {
  document.querySelector(".gallery").innerHTML = "";
}
