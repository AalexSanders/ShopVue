<template>
  <div>
    <div class="product-list">
      <div v-for="product in products" :key="product.id" class="product-card">
        <h2 class="product-title">{{ product.title }}</h2>
        <div class="product-image">
          <img :src="product.image" :alt="product.title" />
        </div>
        <p>Цена: {{ product.price }}$</p>
        <button @click="addToCart(product)">В корзину!</button>
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
  methods: {
    addToCart(product) {
      this.$emit('add-to-cart', product);
    },
  },
};
</script>

<style>
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
