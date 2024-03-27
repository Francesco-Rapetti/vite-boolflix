<script>
import axios from 'axios';
import { store } from '../store.js';
export default {
    name: 'AppHeader',
    props: {
        buttonFunction: Function
    },
    data() {
        return {
            store,
            inputValue: '',
            languages: []
        }
    },

    methods: {
        // Sets the value of the search property in the store to the input value
        setValue() {
            this.store.search = this.inputValue

            // Calls the buttonFunction
            this.buttonFunction()

            this.store.home = false
            this.store.tvSeries = false
            this.store.film = false
            this.store.myList = false

            // Resets the input value to an empty string
            document.querySelector('input[type="text"]').value = ''
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
        },

        /**
         * Returns the URL of the language flag SVG based on the input language code.
         * If no input is provided, it uses the language code from the store.
         * @param {string} input - The language code (optional)
         * @returns {string} - The URL of the language flag SVG
         */
        getLanguageFlag(input) {
            // Extract the language code from the store
            let flag = this.store.language.substring(3, 5).toLowerCase();

            // Override the language code if input is provided
            if (input) flag = input;

            // Map language codes to flag codes
            switch (flag) {
                case 'ja': flag = 'jp'; break;
                case 'ko': flag = 'kr'; break;
                case 'hi': flag = 'in'; break;
                case 'zh': flag = 'cn'; break;
                default: break;
            }

            // Construct and return the URL of the language flag SVG
            return new URL(`../../node_modules/svg-country-flags/svg/${flag}.svg`, import.meta.url).href;
        },

        /**
         * Fetches the list of all languages from the API and adds them to the 'languages' array.
         *
         * @return {void} This function does not return a value.
         */
        getAllLanguages() {
            // Add 'zh-CN' because it's not in the API
            this.languages.push('zh-CN')

            // List of languages to be excluded
            const blacklist = ['eo-EO', 'ar-AE', 'af-ZA', 'be-BY', 'bn-BD', 'ch-GU', 'cn-CN', 'cy-GB', 'de-AT', 'de-CH', 'et-EE', 'ga-IE', 'gd-GB', 'gl-ES', 'kk-KZ', 'kn-IN', 'pa-IN', 'si-LK', 'ky-KG', 'ta-IN', 'ms-MY', 'te-IN', 'tl-PH', 'mr-IN', 'zu-ZA', 'nl-BE', 'sq-AL', 'id-ID', 'ms-SG']

            // Fetch the list of languages from the API
            axios.get(this.store.apiLanguagesSetup).then((response) => {
                // Iterate through each language in the response
                response.data.forEach((language) => {
                    // Add the language to the 'languages' array if it's not in the blacklist
                    if (!blacklist.includes(language)) {
                        this.languages.push(language)
                    }
                })
            })
        }
    },

    mounted() {
        this.getAllLanguages();
        this.setPage('home');
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
                <div class="d-flex align-items-center">
                    <div class="dropdown">
                        <a class="dropdown-toggle d-flex align-items-center text-white me-3" href="#" role="button"
                            data-bs-toggle="dropdown" aria-expanded="false">
                            <div id="flag-button" class="d-flex align-items-center justify-content-center">
                                <img class="w-100" :src="getLanguageFlag()" alt="">
                            </div>
                        </a>

                        <ul class="dropdown-menu overflow-auto">
                            <li v-for="language in languages"><a v-if="language !== store.language" class="dropdown-item"
                                    href="#" @click="store.language = language, $emit('changeLanguage')">
                                    <div class="d-flex align-items-center">
                                        <div id="flag-button" class="d-flex align-items-center justify-content-center">
                                            <img class="w-100"
                                                :src="getLanguageFlag(language.substring(3, 5).toLowerCase())" alt="">
                                        </div>
                                        <span class="ms-2">{{ language }}</span>
                                    </div>
                                </a>
                            </li>
                        </ul>
                    </div>
                    <input id="inputSearch" type="text" name="search" @input="inputValue = $event.target.value"
                        @keyup.enter="setValue">
                    <button class="btn btn-outline-danger" @click="setValue">Search</button>
                </div>
            </div>
        </div>
    </nav>
</template>

<style scoped>
#flag-button {
    width: 30px !important;
}

.dropdown-menu {
    max-height: 300px;
    overflow-y: auto;
}

input {
    background-color: #222222;
    border: none;
    border-radius: 16px;
    margin-right: 0.5rem;
    padding: 8px 12px;
    color: white;
}

input:focus {
    outline: none;
}

button {
    border-radius: 16px;
}

a.nav-link {
    color: white;
    font-size: larger;
    margin-right: 2rem;
}

a.nav-link:hover {
    color: red !important;
}

a.nav-link:focus {
    color: red !important;
}
</style>