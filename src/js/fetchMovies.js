// https://developer.themoviedb.org/reference/search-movie
// https://developer.themoviedb.org/docs/image-basics

import axios from "axios";
import toast from "react-hot-toast";

export async function fetchMovies(query, page = 1) {
  try {
    const response = await axios.get(
      `https://api.themoviedb.org/3/search/movie`,
      {
        params: {
          query: query,
          include_adult: false,
          language: "en-US",
          page: page,
        },
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
        },
      }
    );

    console.log("Fetched movies:", response.data.results);

    return response.data.results;
  } catch (error) {
    console.error("Error during query:", error);
    toast.error("Failed to fetch movies. Please try again.");
    return [];
  }
}
