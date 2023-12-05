<script>
import { store } from '../store.js';
export default {
    name: 'AppHeader',
    props: {
        buttonFunction: Function
    },
    data() {
        return {
            store,
            inputValue: ''
        }
    },

    methods: {
        setValue() {
            this.store.search = this.inputValue
            this.buttonFunction()
            document.querySelector('input').value = ''
        }
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light position-fixed w-100 z-3">
        <div class="container-fluid">
            <a class="navbar-brand" href="#" @click="
                store.home = true,
                store.tvSeries = false,
                store.film = false,
                store.myList = false,
                store.search = ''">BOOLFLIX</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a class="nav-link" aria-current="page" href="#" @click="
                            store.home = true,
                            store.tvSeries = false,
                            store.film = false,
                            store.myList = false,
                            store.search = ''">Home</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="
                            store.home = false,
                            store.tvSeries = true,
                            store.film = false,
                            store.myList = false,
                            store.search = ''">Serie Tv</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="
                            store.home = false,
                            store.tvSeries = false,
                            store.film = true,
                            store.myList = false,
                            store.search = ''">Film</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#" @click="
                            store.home = false,
                            store.tvSeries = false,
                            store.film = false,
                            store.myList = true,
                            store.search = ''">La mia lista</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <input id="inputSearch" type="text" name="search" @input="inputValue = $event.target.value"
                        @keyup.enter="setValue">
                    <button class="btn btn-outline-success" @click="setValue">Search</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>