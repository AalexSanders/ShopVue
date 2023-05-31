<template>
  <div>
    <div class="product-filters">
      <label for="sort">Сортировка: </label>
      <select id="sort" v-model="selectedSort">
        <option value="default">По умолчанию</option>
        <option value="alphabetical">По алфавиту</option>
        <option value="price">По цене</option>
      </select>
    </div>

    <div class="product-list">
      <div v-for="product in sortedProducts" :key="product.id" class="product-card">
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
    sortedProducts() {
      switch (this.selectedSort) {
        case 'alphabetical':
          return this.products.slice().sort((a, b) => a.title.localeCompare(b.title));
        case 'price':
          return this.products.slice().sort((a, b) => a.price - b.price);
        default:
          return this.products;
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
