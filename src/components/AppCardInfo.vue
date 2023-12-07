<script>
export default {
    name: 'AppCardInfo',
    props: {
        id: Number,
        poster: String,
        title: String,
        releaseDate: String,
        originalLanguage: String,
        voteAverage: Number,
        overview: String,
        close: Function
    },

    data() {
        return {
        }
    },

    methods: {
        getFlag(originalLanguage) {
            let flag = originalLanguage;
            switch (originalLanguage) {
                case 'en': flag = 'gb'; break;
                case 'ja': flag = 'jp'; break;
                case 'ko': flag = 'kr'; break;
                case 'hi': flag = 'in'; break;
                case 'zh': flag = 'cn'; break;
                default: break;
            }
            return new URL(`../../node_modules/svg-country-flags/svg/${flag}.svg`, import.meta.url).href;
        },



        /**
         * Calculates the rating stars based on the vote average.
         * @param {number} vote_average - The vote average.
         * @returns {Array} - An array of arrays representing the rating stars.
         */
        getRating(vote_average) {
            // Arrays representing the different star states
            const fullStar = [true, false, true, false];
            const halfStar = [true, false, false, true];
            const emptyStar = [false, true, true, false];

            let voteCounter = Math.round(vote_average);
            let output = [];

            // Loop to calculate each star state based on the vote counter
            for (let i = 0; i < 5; i++) {
                if (voteCounter >= 2) {
                    output.push(fullStar);
                    voteCounter -= 2;
                } else if (voteCounter === 1) {
                    output.push(halfStar);
                    voteCounter = 0;
                } else {
                    output.push(emptyStar);
                }
            }

            return output;
        }
    },

    mounted() {
        console.log(this.voteAverage)
    }
}
</script>

<template>
    <div id="blurback" class="justify-content-center align-items-center"
        @click="(event) => { if (event.target.id === 'blurback') close() }">
        <div id="card-info" class="rounded-4 overflow-hidden d-flex">
            <div>
                <img :src="poster" alt="">
            </div>

            <div id="text" class="w-50 d-flex flex-column align-items-center m-5 text-center position-relative">
                <div class="position-absolute button" @click="close"><i class="fa-solid fa-circle-xmark fs-5"></i></div>
                <h3>{{ title }}</h3>
                <p class="mb-3">{{ `${releaseDate.substring(8, 10)}/${releaseDate.substring(5,
                    7)}/${releaseDate.substring(0, 4)}` }}
                </p>
                <div id="flag" class="mb-5">
                    <img class="w-100" :src="getFlag(originalLanguage)" :alt="originalLanguage">
                </div>
                <div id="stars" class="d-flex mb-5">
                    <div v-for="star in getRating(voteAverage)"><i :class="{
                        'fa-solid': star[0],
                        'fa-regular': star[1],
                        'fa-star': star[2],
                        'fa-star-half-stroke': star[3]
                    }"></i>
                    </div>
                </div>
                <p>{{ overview ? overview : 'N/A' }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.button {
    top: -30px;
    right: -30px;
    opacity: 0;
    transition: all 0.3s ease;
    cursor: pointer;
}

.button:hover {
    opacity: 1 !important;
}

#card-info:hover .button {
    opacity: .5;
}

#card-info {
    width: 500px;
    height: 750px;
    background: rgba(0, 0, 0, 0.66);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: all 0.5s ease;
    opacity: 0;
    transform: scale(0.5);
}

#flag {
    width: 50px;
}

#text {
    opacity: 0;
    transition: opacity 0.5s ease;
}

#blurback {
    display: none;
    position: fixed;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.363);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 99;
    transition: opacity 0.5s ease;
    opacity: 0;
}
</style>