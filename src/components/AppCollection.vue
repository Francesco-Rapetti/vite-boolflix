<script>
import AppCard from './AppCard.vue'
import { store } from '../store.js'

export default {
    components: {
        AppCard
    },
    props: {
        movieArray: Array,
        horizontal: Boolean
    },
    name: 'AppCollection',
    data() {
        return {
            store
        }
    }
}
</script>

<template>
    <div class="d-flex collection" :class="{
        'flex-row': horizontal,
        'flex-wrap': !horizontal,
        'justify-content-center': !horizontal,
        'overflow-auto': horizontal
    }">
        <div v-for="movie in movieArray">
            <AppCard v-if="movie.backdrop_path" :class="{ 'm-1': movie.backdrop_path }"
                :imgPath="`${store.apiImg}${movie.backdrop_path}`" :title="movie.title" :overview="movie.overview"
                :originalLanguage="movie.original_language" :voteAverage="movie.vote_average"
                :posterPath="`${store.apiImg}${movie.poster_path}`" />

        </div>
    </div>
</template>

<style scoped>
.collection {
    -ms-overflow-style: none;
    scrollbar-width: none;
}

.collection::-webkit-scrollbar {
    display: none;
}
</style>