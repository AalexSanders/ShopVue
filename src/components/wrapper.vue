<template>
    <div class="wrapper">

    </div>
</template>

<script>
    import catalog from './catalog.vue'
    import catalogItem from './catalog-item.vue'
    import cart from './cart.vue'

    export default {
        name: 'wrapper',
        components: {
            catalog,
            catalogItem,
            cart
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
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 900px;
        margin: 0 auto;
    }
</style>