import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

const BASE_URL = "https://pixabay.com/api/";
// fetch images from Pixabay
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

// Build gallery from Pixabay response
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
