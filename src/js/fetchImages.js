import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = "https://pixabay.com/api/";

/**
 * Fetches images from the Pixabay API based on the provided query and page number.
 *
 * @async
 * @function getImagesByQuery
 * @param {string} query - The search term to look for images.
 * @param {number} page - The page number of results to fetch.
 * @returns {Promise<Object|undefined>} The response data from Pixabay API, or undefined if an error occurs.
 */

export async function getImagesByQuery(query, page) {
  const searchParams = {
    key: import.meta.env.VITE_PIXABAY_API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: 30,
  };
  try {
    const answer = await axios.get(BASE_URL, { params: searchParams });
    return answer.data;
  } catch (error) {
    console.error("Error fetching images:", error);
  }
}
const container = document.querySelector(".gallery");
const lightbox = new SimpleLightbox(".gallery a", {
  captionsData: "alt",
  captionDelay: 250,
  captionPosition: "bottom",
});

/**
 * Builds and appends image cards to the gallery container.
 * Each card includes an image and metadata (likes, views, downloads).
 * The gallery is enhanced with SimpleLightbox for fullscreen preview.
 *
 * @function createGallery
 * @param {Array<Object>} images - An array of image objects from Pixabay API.
 * @param {string} images[].webformatURL - The URL of the preview image.
 * @param {string} images[].largeImageURL - The URL of the large image for lightbox.
 * @param {string} images[].tags - A string describing the image tags.
 * @param {number} images[].likes - The number of likes for the image.
 * @param {number} images[].views - The number of views for the image.
 * @param {number} images[].comments - The number of comments for the image (unused in rendering).
 * @param {number} images[].downloads - The number of downloads for the image.
 */
export function createGallery(images) {
  function itemInsert({
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  }) {
    return `<li class="card">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="image" src="${webformatURL}" alt="${tags}" />
        </a>
        <h2 class="title">
        ${tags}  
    <br />
    ❤️ ${likes} | 👁️ ${views} | ⬇️ ${downloads}
        </div>
        </h2>
      </li>
    `;
  }
  const newGallery = images.map(itemInsert).join("");
  container.insertAdjacentHTML("beforeend", newGallery);

  lightbox.refresh();
}
