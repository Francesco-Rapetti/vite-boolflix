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
    <div id="card-wrapper" class="position-relative"
        @click="console.log($event.target.id), $event.target.id == 'backdrop' ? $emit('showInfo', movie) : ''">
        <button class="position-absolute end-0"><i class="fa-regular fa-heart"></i></button>
        <div class="backdrop-container rounded-3 overflow-hidden">
            <img id="backdrop" class="w-100" :src="store.apiImg + movie.backdrop_path"
                :alt="movie.title ? movie.title : movie.name">
        </div>
        <div class="title fs-5">{{ movie.title ? movie.title : movie.name }}</div>
    </div>
</template>

<style scoped>
#card-wrapper:hover button {
    opacity: 1;
}

button {
    background-color: transparent;
    border: none;
    color: white;
    font-size: 24px;
    padding: 10px;
    cursor: pointer;
    transition: all .3s ease-in-out;
    opacity: 0;
    bottom: 30px;
    filter: brightness(1.5) !important;
    z-index: 99999;
}

button:hover~.backdrop-container {
    filter: brightness(.6);
}

.backdrop-container {
    width: 400px;
    cursor: pointer;
    transition: all .3s ease-in-out;
}

.backdrop-container:hover {
    filter: brightness(.6);
}

.title {
    bottom: 0;
    right: 0;
    font-size: 24px;
    font-weight: 400;
    width: 400px;
}
</style>