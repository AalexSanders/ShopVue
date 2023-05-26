<template>
    <div class="catalog-item">

    </div>
</template>

<script>
    export default {
        name: 'catalog-item',
        components: {}, 
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
    .catalog-item {
        display: flex;
        justify-content: center;
        align-items: center;
        max-width: 900px;
        margin: 0 auto;
    }
</style>