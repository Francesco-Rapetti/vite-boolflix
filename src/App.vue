<script>
import AppHeader from './components/AppHeader.vue';
import AppCollection from './components/AppCollection.vue';
import AppCardInfo from './components/AppCardInfo.vue';
import axios from 'axios';
import { store } from './store';
export default {
	components: {
		AppHeader,
		AppCollection,
		AppCardInfo
	},

	data() {
		return {
			store,
			currentMovie: null,
			upcomingMovies: [],
			upcomingMoviesPage: 1,
			nowPlayingMovies: [],
			nowPlayingMoviesPage: 1,
			topRatedMovies: [],
			topRatedMoviesPage: 1,
			popularMovies: [],
			popularMoviesPage: 1,

			airingTodaySeries: [],
			airingTodaySeriesPage: 1,
			onTheAirSeries: [],
			onTheAirSeriesPage: 1,
			topRatedSeries: [],
			topRatedSeriesPage: 1,
			popularSeries: [],
			popularSeriesPage: 1,
		}
	},

	methods: {
		getSearchCollection() {
			axios.get(`${this.store.apiURI}/search/movie?api_key=${this.store.apiKey}&language=${this.store.language}&query=${encodeURI(this.store.search)}`).then((response) => {
				this.store.movies = response.data.results
			})

			axios.get(`${this.store.apiURI}/search/tv?api_key=${this.store.apiKey}&language=${this.store.language}&query=${encodeURI(this.store.search)}`).then((response) => {
				this.store.series = response.data.results
			})


		},

		resetValues() {
			this.upcomingMovies = [];
			this.nowPlayingMovies = [];
			this.topRatedMovies = [];
			this.popularMovies = [];
			this.onTheAirSeries = [];
			this.airingTodaySeries = [];
			this.topRatedSeries = [];
			this.popularSeries = [];

			this.upcomingMoviesPage = 1;
			this.nowPlayingMoviesPage = 1;
			this.topRatedMoviesPage = 1;
			this.popularMoviesPage = 1;
			this.onTheAirSeriesPage = 1;
			this.airingTodaySeriesPage = 1;
			this.topRatedSeriesPage = 1;
			this.popularSeriesPage = 1;
		},

		resetSections() {
			this.store.home = false;
			this.store.film = false;
			this.store.tvSeries = false;
			this.store.myList = false;
		},

		getCollectionArray(collection, apiURI, apiPage) {
			axios.get(apiURI + apiPage++).then((response) => {
				collection.push(...response.data.results)
				// console.log(collection)
			})
		},

		/**
		 * Retrieves movie information and displays it with animation.
		 * @param {string} movie - The movie to retrieve information for.
		 */
		async getMovieInfo(movie) {
			// Define a delay function that returns a promise that resolves after a specified time.
			const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

			// Set the current movie to the specified movie.
			this.currentMovie = movie;

			// Await for components to load movie information.
			await delay(10);

			// Get the blurback, cardInfo, and text elements by their IDs.
			const blurback = document.getElementById('blurback');
			const cardInfo = document.getElementById('card-info');
			const text = document.getElementById('text');

			// Disable scrolling on the body element.
			document.body.style.overflow = 'hidden';

			// Display the blurback element.
			blurback.style.display = 'flex';

			// Await for blurback to load.
			await delay(10);

			// Set the opacity of the blurback element to 1.
			blurback.style.opacity = '1';

			// Await for blurback to fade in.
			await delay(300);

			// Set the opacity and scale of the cardInfo element to 1.
			cardInfo.style.opacity = '1';
			cardInfo.style.transform = 'scale(1)';

			// Await for cardInfo to fade in and scale.
			await delay(300);

			// Set the width of the cardInfo element to 1000px.
			cardInfo.style.width = '1000px';

			// Await for cardInfo to expand.
			await delay(500);

			// Set the opacity of the text element to 1.
			text.style.opacity = '1';
		},


		/**
		 * Closes the movie information panel.
		 *
		 * @return {Promise<void>} Resolves after closing the movie information.
		 */
		async closeMovieInfo() {
			// Delay function that resolves after a given number of milliseconds
			const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

			// Get the blur background, card info, and text elements
			const blurback = document.getElementById('blurback');
			const cardInfo = document.getElementById('card-info');
			const text = document.getElementById('text');

			// Set the text opacity to 0
			text.style.opacity = '0';

			// Wait for 500 milliseconds
			await delay(500);

			// Set the card info width to 500px
			cardInfo.style.width = '500px';

			// Wait for 300 milliseconds
			await delay(300);

			// Set the card info opacity to 0 and scale it to 0.5
			cardInfo.style.opacity = '0';
			cardInfo.style.transform = 'scale(0.5)';

			// Wait for 300 milliseconds
			await delay(300);

			// Set the blur background opacity to 0
			blurback.style.opacity = '0';

			// Wait for 300 milliseconds
			await delay(300);

			// Hide the blur background and enable scrolling
			blurback.style.display = 'none';
			document.body.style.overflow = 'auto';

			// Set the current movie to null
			this.currentMovie = null;
		},

		collectionRefactor() {
			// console.log(this.store.language)
			this.resetValues()
			this.getSearchCollection()
			this.getCollectionArray(this.upcomingMovies, `${this.store.apiURI}/movie/upcoming?api_key=${this.store.apiKey}&language=${this.store.language}&page=`, this.upcomingMoviesPage);
			this.getCollectionArray(this.nowPlayingMovies, `${this.store.apiURI}/movie/now_playing?api_key=${this.store.apiKey}&language=${this.store.language}&page=`, this.nowPlayingMoviesPage);
			this.getCollectionArray(this.topRatedMovies, `${this.store.apiURI}/movie/top_rated?api_key=${this.store.apiKey}&language=${this.store.language}&page=`, this.topRatedMoviesPage);
			this.getCollectionArray(this.popularMovies, `${this.store.apiURI}/movie/popular?api_key=${this.store.apiKey}&language=${this.store.language}&page=`, this.popularMoviesPage);

			this.getCollectionArray(this.airingTodaySeries, `${this.store.apiURI}/tv/airing_today?api_key=${this.store.apiKey}&language=${this.store.language}&page=`, this.airingTodaySeriesPage);
			this.getCollectionArray(this.onTheAirSeries, `${this.store.apiURI}/tv/on_the_air?api_key=${this.store.apiKey}&language=${this.store.language}&page=`, this.onTheAirSeriesPage);
			this.getCollectionArray(this.topRatedSeries, `${this.store.apiURI}/tv/top_rated?api_key=${this.store.apiKey}&language=${this.store.language}&page=`, this.topRatedSeriesPage);
			this.getCollectionArray(this.popularSeries, `${this.store.apiURI}/tv/popular?api_key=${this.store.apiKey}&language=${this.store.language}&page=`, this.popularSeriesPage);
		}
	},

	mounted() {
		this.collectionRefactor()
		this.store.home = true
	}
}
</script>

<template>
	<AppCardInfo v-if="currentMovie" :id="currentMovie.id" :poster="store.apiImg + currentMovie.poster_path"
		:title="currentMovie.title ? currentMovie.title : currentMovie.name"
		:releaseDate="currentMovie.release_date ? currentMovie.release_date : currentMovie.first_air_date"
		:originalLanguage="currentMovie.original_language" :voteAverage="currentMovie.vote_average"
		:overview="currentMovie.overview" :close="closeMovieInfo" />
	<header>
		<AppHeader :button-function="getSearchCollection" @changeLanguage="collectionRefactor" />
	</header>

	<main>

		<h2 v-if="store.search != ''" class="p-4">{{ `Risultati per: ${store.search} ` }}</h2>
		<!-- Home -->
		<div v-if="store.home" id="home">
			<h2 class="p-4">Popular</h2>
			<AppCollection :horizontal="true" :movieArray="popularMovies" section-name="Movies" id="popular"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(popularMovies, `${store.apiURI}/movie/popular?api_key=${store.apiKey}&language=${store.language}&page=`, popularMoviesPage)" />

			<div class="spacer"></div>

			<AppCollection :horizontal="true" :movieArray="popularSeries" section-name="Tv Series" id="popularSeries"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(popularSeries, `${store.apiURI}/tv/popular?api_key=${store.apiKey}&language=${store.language}&page=`, popularSeriesPage)" />

			<div class="spacer"></div>

			<h2 class="p-4">Top rated</h2>
			<AppCollection :horizontal="true" :movieArray="topRatedMovies" section-name="Movies" id="topRated"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(topRatedMovies, `${store.apiURI}/movie/top_rated?api_key=${store.apiKey}&language=${store.language}&page=`, topRatedMoviesPage)" />

			<div class="spacer"></div>

			<AppCollection :horizontal="true" :movieArray="topRatedSeries" section-name="Tv Series" id="topRatedSeries"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(topRatedSeries, `${store.apiURI}/tv/top_rated?api_key=${store.apiKey}&language=${store.language}&page=`, topRatedSeriesPage)" />

			<div class="spacer"></div>

		</div>
		<!-- TV -->
		<div v-if="store.tvSeries" id="tvSeries">
			<AppCollection :horizontal="true" :movieArray="airingTodaySeries" section-name="Airing today" id="airingToday"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(airingTodaySeries, `${store.apiURI}/tv/airing_today?api_key=${store.apiKey}&language=${store.language}&page=`, airingTodaySeriesPage)" />

			<div class="spacer"></div>


			<AppCollection :horizontal="true" :movieArray="onTheAirSeries" section-name="On air this week" id="onTheAir"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(onTheAirSeries, `${store.apiURI}/tv/on_the_air?api_key=${store.apiKey}&language=${store.language}&page=`, onTheAirSeriesPage)" />

			<div class="spacer"></div>

			<AppCollection :horizontal="true" :movieArray="topRatedSeries" section-name="Top rated" id="topRatedSeries"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(topRatedSeries, `${store.apiURI}/tv/top_rated?api_key=${store.apiKey}&language=${store.language}&page=`, topRatedSeriesPage)" />

			<div class="spacer"></div>

			<AppCollection :horizontal="true" :movieArray="popularSeries" section-name="Popular" id="popularSeries"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(popularSeries, `${store.apiURI}/tv/popular?api_key=${store.apiKey}&language=${store.language}&page=`, popularSeriesPage)" />

			<div class="spacer"></div>
		</div>
		<!-- Film -->
		<div v-if="store.film" id="film">
			<AppCollection :horizontal="true" :movieArray="upcomingMovies" section-name="Upcoming" id="upcoming"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(upcomingMovies, `${store.apiURI}/movie/upcoming?api_key=${store.apiKey}&language=${store.language}&page=`, upcomingMoviesPage)" />

			<div class="spacer"></div>


			<AppCollection :horizontal="true" :movieArray="nowPlayingMovies" section-name="Now playing in theaters"
				id="nowPlaying" @showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(nowPlayingMovies, `${store.apiURI}/movie/now_playing?api_key=${store.apiKey}&language=${store.language}&page=`, nowPlayingMoviesPage)" />

			<div class="spacer"></div>

			<AppCollection :horizontal="true" :movieArray="topRatedMovies" section-name="Top rated" id="topRated"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(topRatedMovies, `${store.apiURI}/movie/top_rated?api_key=${store.apiKey}&language=${store.language}&page=`, topRatedMoviesPage)" />

			<div class="spacer"></div>

			<AppCollection :horizontal="true" :movieArray="popularMovies" section-name="Popular" id="popular"
				@showMovieInfo="getMovieInfo"
				@loadMore="getCollectionArray(popularMovies, `${store.apiURI}/movie/popular?api_key=${store.apiKey}&language=${store.language}&page=`, popularMoviesPage)" />

			<div class="spacer"></div>
		</div>

		<div v-if="store.myList" id="myList">
			la mia lista
		</div>
		<AppCollection v-if="store.search != ''" :horizontal="false" :movieArray="store.movies" section-name="Film"
			@showMovieInfo="getMovieInfo" />
		<AppCollection v-if="store.search != ''" :horizontal="false" :movieArray="store.series" section-name="Serie Tv"
			@showMovieInfo="getMovieInfo" />
	</main>
</template>

<style scoped>
.spacer {
	height: 1rem;
}
</style>
 