<template>
  <div>
    <div class="product-filters">
      <input type="text" v-model="searchQuery" placeholder="Поиск" />
      <h>       </h>
      <label for="sort">Сортировать: </label>

      <select id="sort" v-model="selectedSort">
        <option value="default">По умолчанию</option>
        <option value="alphabetical">По алфавиту</option>
        <option value="price">По цене</option>
      </select>
    </div>

    <div class="product-list">
      <div v-for="product in filteredAndSortedProducts" :key="product.id" class="product-card">
        <h2 class="product-title">{{ product.title }}</h2>

        <div class="product-image">
          <img :src="product.image" :alt="product.title" />
        </div>

        <p>Цена: {{ product.price }}$</p>
        <button @click="addToCart(product)">В корзину!</button>
        <button>В избранное!</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      products: [],
      selectedSort: 'default',
      searchQuery: '',
    };
  },

  mounted() {
    axios
      .get('https://fakestoreapi.com/products')
      .then(response => {
        this.products = response.data;
      })
      .catch(error => {
        console.error(error);
      });
  },

  computed: {
    filteredAndSortedProducts() {
      let filteredProducts = this.products;
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        filteredProducts = filteredProducts.filter(product => {
          return (
            product.title.toLowerCase().includes(query) ||
            product.description.toLowerCase().includes(query)
          );
        });
      }

      switch (this.selectedSort) {
        case 'alphabetical':
          return filteredProducts.slice().sort((a, b) => a.title.localeCompare(b.title));
        case 'price':
          return filteredProducts.slice().sort((a, b) => a.price - b.price);
        default:
          return filteredProducts;
      }
    },
  },

  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product);
    },
  },
};
</script>

<style>
.product-filters {
  margin-bottom: 10px;
}

.product-list {
  display: flex;
  flex-wrap: wrap;
}

.product-card {
  width: 200px;
  height: 350px;
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  display: flex;
  flex-direction: column;
}

.product-title {
  font-size: 16px;
  margin-bottom: 10px;
}

.product-image {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.product-image img {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}
</style>
