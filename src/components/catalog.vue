<template>
    <div class="catalog">
        <h1>Catalog</h1>
        <div class="catalog_list">
            <CatalogItem />
        </div>
    </div>
</template>

<script>
    import CatalogItem from './CatalogItem.vue';
import CatalogItem from './CatalogItem.vue'

    export default {
        name: 'catalog',
        components: {
    CatalogItem,
    CatalogItem
}, 
        props: {},
        data: {
            return() {}
        },
        computed: {},
    }
</script>

<style>
    .catalog {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: center;
    }
</style>