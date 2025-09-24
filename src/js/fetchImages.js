import axios from "axios";
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
