import { reactive } from 'vue'
const apiKey = "9ad879c0e6ec6b07bb69a6481e5d6b00";
export const store = reactive({
    language: "en-US",
    apiURI: `https://api.themoviedb.org/3/`,
    apiKey: '9ad879c0e6ec6b07bb69a6481e5d6b00',
    apiImg: "https://image.tmdb.org/t/p/w500",
    apiLanguagesSetup: `https://api.themoviedb.org/3/configuration/primary_translations?api_key=${apiKey}`,
    movies: [],
    series: [],
    search: '',
    home: true,
    tvSeries: false,
    film: false,
    myList: false
});