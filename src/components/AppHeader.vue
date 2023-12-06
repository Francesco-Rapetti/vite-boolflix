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
        // Sets the value of the search property in the store to the input value
        setValue() {
            this.store.search = this.inputValue

            // Calls the buttonFunction
            this.buttonFunction()

            // Resets the input value to an empty string
            document.querySelector('input').value = ''
        },

        /**
         * Sets the current page based on the given page parameter.
         * @param {string} page - The name of the page to set.
         */
        setPage(page) {
            // Get all the navigation links
            const links = document.querySelectorAll('.nav-link');

            // Switch statement to handle different page cases
            switch (page) {
                // If the page is 'home'
                case 'home':
                    // Set the store properties
                    this.store.home = true;
                    this.store.tvSeries = false;
                    this.store.film = false;
                    this.store.myList = false;
                    this.store.search = '';

                    // Set the color of all links to white
                    links.forEach(element => {
                        element.style.color = 'white';
                    });

                    // Set the color of the 'home' link to red
                    const home = document.querySelector('#home');
                    home.style.color = 'red';
                    break;

                // If the page is 'tv'
                case 'tv':
                    // Set the store properties
                    this.store.home = false;
                    this.store.tvSeries = true;
                    this.store.film = false;
                    this.store.myList = false;
                    this.store.search = '';

                    // Set the color of all links to white
                    links.forEach(element => {
                        element.style.color = 'white';
                    });

                    // Set the color of the 'tv' link to red
                    const tv = document.querySelector('#tv');
                    tv.style.color = 'red';
                    break;

                // If the page is 'movies'
                case 'movies':
                    // Set the store properties
                    this.store.home = false;
                    this.store.tvSeries = false;
                    this.store.film = true;
                    this.store.myList = false;
                    this.store.search = '';

                    // Set the color of all links to white
                    links.forEach(element => {
                        element.style.color = 'white';
                    });

                    // Set the color of the 'movies' link to red
                    const movies = document.querySelector('#movies');
                    movies.style.color = 'red';
                    break;

                // If the page is 'myList'
                case 'myList':
                    // Set the store properties
                    this.store.home = false;
                    this.store.tvSeries = false;
                    this.store.film = false;
                    this.store.myList = true;
                    this.store.search = '';

                    // Set the color of all links to white
                    links.forEach(element => {
                        element.style.color = 'white';
                    });

                    // Set the color of the 'myList' link to red
                    const myList = document.querySelector('#myList');
                    myList.style.color = 'red';
                    break;
            }
        }
    },

    mounted() {
        this.setPage('home')
    }
}
</script>

<template>
    <nav class="navbar navbar-expand-lg bg-light position-fixed w-100 z-3 bg-black text-white">
        <div class="container-fluid">
            <a class="navbar-brand" href="#" @click="setPage('home')"><img
                    src="https://fontmeme.com/permalink/231206/504e88f1a30f968e13f4cdd854aab685.png" alt="netflix-font"
                    border="0"></a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <a id="home" class="nav-link" aria-current="page" href="#" @click="setPage('home')">Home</a>
                    </li>
                    <li class="nav-item">
                        <a id="tv" class="nav-link" href="#" @click="setPage('tv')">Tv</a>
                    </li>
                    <li class="nav-item">
                        <a id="movies" class="nav-link" href="#" @click="setPage('movies')">Movies</a>
                    </li>
                    <li class="nav-item">
                        <a id="myList" class="nav-link" href="#" @click="setPage('myList')">My List</a>
                    </li>
                </ul>
                <div class="d-flex">
                    <input id="inputSearch" type="text" name="search" @input="inputValue = $event.target.value"
                        @keyup.enter="setValue">
                    <button class="btn btn-outline-danger" @click="setValue">Search</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
input {
    background-color: #222222;
    border: none;
    border-radius: 16px;
    margin-right: 0.5rem;
    padding: 12px;
    color: white;
}

input:focus {
    outline: none;
}

button {
    border-radius: 16px;
}

a {
    color: white;
    font-size: larger;
    margin-right: 2rem;
}

a:hover {
    color: red !important;
}

a:focus {
    color: red !important;
}
</style>