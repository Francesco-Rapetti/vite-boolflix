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

		async getMovieInfo(movie) {
			const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
			this.currentMovie = movie

			await delay(10)

			const blurback = document.getElementById('blurback');
			const cardInfo = document.getElementById('card-info');
			const text = document.getElementById('text');
			console.log(blurback)
			document.body.style.overflow = 'hidden'
			blurback.style.display = 'flex'

			await delay(10)

			blurback.style.opacity = '1'

			await delay(300)

			cardInfo.style.opacity = '1'
			cardInfo.style.transform = 'scale(1)'

			await delay(300)

			cardInfo.style.width = '1000px';

			await delay(500)

			text.style.opacity = '1'

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
			:overview="currentMovie.overview" />
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
 