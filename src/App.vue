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
		}
	},

	methods: {
		getImageDebug() {
			axios.get(this.store.apiSearchMovies + "back%20to%20the%20future").then((response) => {
				this.store.movies = response.data.results
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

		async closeMovieInfo() {
			const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
			const blurback = document.getElementById('blurback');
			const cardInfo = document.getElementById('card-info');
			const text = document.getElementById('text');

			text.style.opacity = '0';

			await delay(500);

			cardInfo.style.width = '500px';

			await delay(300);

			cardInfo.style.opacity = '0';
			cardInfo.style.transform = 'scale(0.5)';

			await delay(300);

			blurback.style.opacity = '0';

			await delay(300);

			blurback.style.display = 'none';
			document.body.style.overflow = 'auto';
			this.currentMovie = null;
		}
	},

	mounted() {
		this.getImageDebug()
	}
}
</script>

<template>
	<header>
		<AppHeader />
		<div id="header-spacer"></div>
	</header>

	<main>
		<AppCardInfo v-if="currentMovie" :id="currentMovie.id" :poster="store.apiImg + currentMovie.poster_path"
			:title="currentMovie.title" :releaseDate="currentMovie.release_date"
			:originalLanguage="currentMovie.original_language" :voteAverage="currentMovie.vote_average"
			:overview="currentMovie.overview" :close="closeMovieInfo" />
		<AppCollection :horizontal="true" :movieArray="store.movies" id="prova1" @showMovieInfo="getMovieInfo" />
		<AppCollection :horizontal="true" :movieArray="store.movies" id="prova2" @showMovieInfo="getMovieInfo" />
		<AppCollection :horizontal="false" :movieArray="store.movies" @showMovieInfo="getMovieInfo" />
	</main>
</template>

<style scoped>
#header-spacer {
	height: 56px;
}
</style>
 