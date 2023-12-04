<script>
import AppHeader from './components/AppHeader.vue';
import AppCollection from './components/AppCollection.vue';
import axios from 'axios';
import { store } from './store';
export default {
	components: {
		AppHeader,
		AppCollection
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
	<header>
		<AppHeader />
	</header>

	<main>
		<AppCollection :horizontal="true" :movieArray="store.movies" />
		<AppCollection :horizontal="false" :movieArray="store.movies" />
	</main>
</template>

<style scoped></style>
 