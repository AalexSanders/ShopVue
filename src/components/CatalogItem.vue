<template>
    <div>
      <h1>Список продуктов</h1>
      <div class="product-list">
        <div v-for="product in products" :key="product.id" class="product-card">
          <h2 class="product-title">{{ product.title }}</h2>
          <div class="product-image">
            <img :src="product.image" :alt="product.title" />
          </div>
          <p>Цена: {{ product.price }}$</p>
          <button>Добавить в корзину</button>
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
  
  .product-title {
    font-size: 16px;
  }
  
  .product-image {
    width: 100%;
    height: 200px;
    overflow: hidden;
  }
  
  .product-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  </style>
  