<script>
export default {
    name: 'AppCard',
    props: {
        title: String,
        overview: String,
        originalLanguage: String,
        imgPath: String,
        posterPath: String,
        voteAverage: Number,
    }
}
</script>

<template>
    <div class="backdrop-container rounded-3 overflow-hidden">
        <img class="w-100" :src="imgPath" :alt="title">
        <div class="title">{{ title }}</div>
    </div>
</template>

<style scoped>
.backdrop-container {
    width: 400px;
}

.title {
    bottom: 0;
    right: 0;
    font-size: 24px;
    font-weight: 700;
}
</style>