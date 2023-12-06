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
        id: String,
        sectionName: String
    },
    name: 'AppCollection',
    data() {
        return {
            store
        }
    },

    methods: {
        scrollMouse(id) {
            const collection = document.getElementById(id)
            if (this.horizontal) {
                if (collection.scrollWidth - collection.clientWidth - collection.scrollLeft < 1) {
                    console.log('FUNZIONA!!')
                    this.$emit('loadMore')
                }
            }
        },

        scrollRight(id) {
            const collection = document.getElementById(id)
            collection.scrollBy({
                left: 408,
                behavior: 'smooth'
            })
            // console.log(collection.clientWidth)
            // console.log(collection.scrollLeft)
            // console.log(collection.scrollWidth)
        },

        scrollLeft(id) {
            const collection = document.getElementById(id)
            collection.scrollBy({
                left: -408,
                behavior: 'smooth'
            })
            // console.log(collection.clientWidth)
            // console.log(collection.scrollLeft)
            // console.log(collection.scrollWidth)
        }
    },

    mounted() {

    }
}
</script>

<template>
    <div>
        <h2 class="m-3">{{ sectionName }}</h2>
        <div class="wrapper position-relative">
            <div :id="id" class="d-flex collection" :class="{
                'flex-row': horizontal,
                'flex-wrap': !horizontal,
                'justify-content-center': !horizontal,
                'overflow-scroll': horizontal
            }" @scroll="scrollMouse(id)">
                <div v-for="movie in movieArray">
                    <AppCard v-if="movie.backdrop_path" :class="{ 'm-1': movie.backdrop_path }" :movie="movie"
                        @showInfo="movie => $emit('showMovieInfo', movie)" />

                </div>
            </div>
            <div v-if="horizontal" class="button right"><i class="fa-solid fa-circle-chevron-right fs-3"
                    @click="scrollRight(id)"></i></div>
            <div v-if="horizontal" class="button left"><i class="fa-solid fa-circle-chevron-left fs-3"
                    @click="scrollLeft(id)"></i>
            </div>
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