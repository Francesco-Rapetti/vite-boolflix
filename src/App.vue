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
		}
	},

	methods: {
		getImageDebug() {
			axios.get(this.store.apiSearchMovies + "back%20to%20the%20future").then((response) => {
				store.movies = response.data.results
			})
		}
	},

	mounted() {
		this.getImageDebug()
	}
}
</script>

<template>
	<AppCardInfo :poster="store.apiImg + store.movies[0].poster_path" :title="store.movies[0].title"
		:releaseDate="store.movies[0].release_date" :originalLanguage="store.movies[0].original_language"
		:voteAverage="store.movies[0].vote_average" :overview="store.movies[0].overview" />
	<header>
		<AppHeader />
	</header>

	<main>
		<AppCollection :horizontal="true" :movieArray="store.movies" id="prova1" />
		<AppCollection :horizontal="true" :movieArray="store.movies" id="prova2" />
		<AppCollection :horizontal="false" :movieArray="store.movies" />
	</main>
</template>

<style scoped></style>
 