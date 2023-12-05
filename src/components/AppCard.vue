<script>
import { store } from '../store.js'
export default {
    name: 'AppCard',
    props: {
        movie: Object
    },
    data() {
        return {
            store,
        }
    }
}
</script>

<template>
    <div @click="$emit('showInfo', movie)">
        <div class="backdrop-container rounded-3 overflow-hidden">
            <img class="w-100" :src="store.apiImg + movie.backdrop_path" :alt="movie.title ? movie.title : movie.name">
        </div>
        <div class="title fs-5">{{ movie.title ? movie.title : movie.name }}</div>
    </div>
</template>

<style scoped>
.backdrop-container {
    width: 400px;
    cursor: pointer;
}

.title {
    bottom: 0;
    right: 0;
    font-size: 24px;
    font-weight: 400;
    width: 400px;
}
</style>