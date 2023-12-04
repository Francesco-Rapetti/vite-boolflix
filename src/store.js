import { reactive } from 'vue'
const apiKey = "9ad879c0e6ec6b07bb69a6481e5d6b00";
export const store = reactive({
    apiSearchMovies: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`,
    apiSearchTv: `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=`,
    apiImg: "https://image.tmdb.org/t/p/w500",
    movies: []
});