<script>
export default {
    name: 'AppCardInfo',
    props: {
        poster: String,
        title: String,
        releaseDate: String,
        originalLanguage: String,
        voteAverage: Number,
        overview: String,
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
    <div class="blurback d-flex justify-content-center align-items-center">
        <div id="card-info" class="rounded-4 overflow-hidden d-flex">
            <div>
                <img :src="poster" alt="">
            </div>

            <div class="w-50 d-flex flex-column align-items-center m-5 text-center">
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
                <p>{{ overview }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
#card-info {
    width: 1000px;
    height: 750px;
    background: rgba(0, 0, 0, 0.66);
    border-radius: 16px;
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    transition: all 0.5s ease;
}

#flag {
    width: 50px;
}

.blurback {
    position: absolute;
    width: 100%;
    height: 100vh;
    background: rgba(0, 0, 0, 0.363);
    box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
    z-index: 99;
    transition: opacity 0.5s ease;
    opacity: 1;
}
</style>