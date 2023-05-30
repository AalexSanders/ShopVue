<template>
    <div>
      <h1>Список продуктов</h1>
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-card">
          <h2>{{ product.title }}</h2>
          <img :src="product.image" :alt="product.title" />
          <p>Цена: {{ product.price }}$</p>
          <button @click="addToCart(product)">Добавить в корзину</button>
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
        // Реализуйте логику добавления продукта в корзину
        console.log('Добавлен в корзину:', product);
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
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
  }
  </style>
  