<template>
    <div class="wrapper">
        <Catalog />
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
        data() {
            return {
                cartItems: [],
            }
        },
        computed: {},
        methods: {
            addToCart(product) {
                this.cartItems.push(product);
            },
        },
        watch:{},
        mounted() {}
    }
</script>

<style>
    .wrapper {
        max-width: 900px;
        margin: 0 auto;
    }
</style>