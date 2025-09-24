import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
const BASE_URL = "https://pixabay.com/api/";
export async function getImagesByQuery(query, page) {
  const searchParams = {
    key: import.meta.env.PIXABAY_API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: 15,
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
    return `<li class="gallery-item">
        <a class="gallery-link" href="${largeImageURL}">
          <img class="gallery-image" src="${webformatURL}" alt="${tags}" />
        </a>
        <div class="image-describe">
        <div class="img-info">
          <b>Likes</b>
          <p>${likes}</p>
        </div>
        <div class="img-info">
          <b>Views</b>
          <p>${views}</p>
        </div>
        <div class="img-info">
          <b>Comments</b>
          <p>${comments}</p>
        </div>
        <div class="img-info">
          <b>Downloads</b>
          <p>${downloads}</p>
        </div>
        </div>
      </li>
    `;
  }
  const newGallery = images.map(itemInsert).join("");
  container.insertAdjacentHTML("beforeend", newGallery);

  lightbox.refresh();
}

console.log("mygallery", container);
