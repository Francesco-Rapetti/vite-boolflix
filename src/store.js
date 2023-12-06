import { reactive } from 'vue'
const apiKey = "9ad879c0e6ec6b07bb69a6481e5d6b00";
export const store = reactive({
    apiSearchMovies: `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=`,
    apiSearchTv: `https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&query=`,
    apiImg: "https://image.tmdb.org/t/p/w500",
    apiUpcomingMovies: `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&page=`,
    apiNowPlayingMovies: `https://api.themoviedb.org/3/movie/now_playing?api_key=${apiKey}&page=`,
    apiTopRatedMovies: `https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&page=`,
    apiPopularMovies: `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&page=`,
    movies: [],
    series: [],
    search: '',
    home: true,
    tvSeries: false,
    film: false,
    myList: false
});