<script>
import AppCard from './AppCard.vue'
import { store } from '../store.js'

export default {
    components: {
        AppCard
    },
    props: {
        movieArray: Array,
        horizontal: Boolean,
        id: String
    },
    name: 'AppCollection',
    data() {
        return {
            store
        }
    },

    methods: {
        scrollRight(id) {
            const collection = document.getElementById(id)
            collection.scrollBy({
                left: 400,
                behavior: 'smooth'
            })
        },

        scrollLeft(id) {
            const collection = document.getElementById(id)
            collection.scrollBy({
                left: -400,
                behavior: 'smooth'
            })
        }
    },

    mounted() {
    }
}
</script>

<template>
    <div class="wrapper position-relative">
        <div :id="id" class="d-flex collection" :class="{
            'flex-row': horizontal,
            'flex-wrap': !horizontal,
            'justify-content-center': !horizontal,
            'overflow-scroll': horizontal
        }">
            <div v-for="movie in movieArray">
                <AppCard v-if="movie.backdrop_path" :class="{ 'm-1': movie.backdrop_path }"
                    :imgPath="`${store.apiImg}${movie.backdrop_path}`" :title="movie.title" :overview="movie.overview"
                    :originalLanguage="movie.original_language" :voteAverage="movie.vote_average"
                    :posterPath="`${store.apiImg}${movie.poster_path}`" />

            </div>
        </div>
        <div v-if="horizontal" class="button right"><i class="fa-solid fa-circle-chevron-right fs-3"
                @click="scrollRight(id)"></i></div>
        <div v-if="horizontal" class="button left"><i class="fa-solid fa-circle-chevron-left fs-3"
                @click="scrollLeft(id)"></i>
        </div>

    </div>
</template>

<style scoped>
.collection {
    -ms-overflow-style: none;
    scrollbar-width: none;
    position: relative;
    transition: all 0.3s ease;
}

.wrapper:hover .button {
    opacity: .5;
}

.collection::-webkit-scrollbar {
    display: none;
}

.button {
    position: absolute;
    top: calc((224px / 2) - 14px);
    transition: all 0.3s ease;
    opacity: 0;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;
}

.button.left {
    left: 20px;
}

.button.right {
    right: 20px;
}
</style>