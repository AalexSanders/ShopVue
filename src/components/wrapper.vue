<template>
    <div class="Wrapper">

    </div>
</template>

<script>
    import Catalog from './Catalog.vue';
    import CatalogItem from './CatalogItem.vue';
    import Cart from './Cart.vue';

    export default {
        name: 'Wrapper',
        components: {
            Catalog,
            CatalogItem,
            Cart
        }, 
        props: {},
        data: {
            return() {
                title: 'Wrapper'
            }
        },
        computed: {},
        methods: {},
        watch:{},
        mounted: {}
    }
</script>

<style>
    .wrapper {
        max-width: 900px;
        margin: 0 auto;
    }
</style>