<template>
    <div class="wrapper">
        <Catalog />
    </div>
</template>

<script>
    import Catalog from './catalog.vue';

    export default {
        name: 'Wrapper',
        components: {
            Catalog,
        }, 
    }
</script>

<style>
    .wrapper {
        max-width: 900px;
        margin: 0 auto;
    }
</style>