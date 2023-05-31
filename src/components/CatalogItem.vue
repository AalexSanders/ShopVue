<template>
  <div>
    <div class="product-filters-container">
      <!--поиск товаров-->
      <div class="product-filters">
        <label for="search">Поиск: </label>
        <input type="text" id="search" v-model="searchQuery" placeholder="Введите название" />
      </div>

      <!--сортировка-->
      <div class="product-filters">
        <label for="sort">Сортировка: </label>
        <select id="sort" v-model="selectedSort">
          <option value="default">По умолчанию</option>
          <option value="alphabetical">По алфавиту</option>
          <option value="price">По цене</option>
        </select>
      </div>

      <!--фильтрация по категориям-->
      <div class="product-filters">
        <label for="category">Категория: </label>
        <select id="category" v-model="selectedCategory">
          <option value="all">Все</option>
          <option v-for="category in categories" :value="category" :key="category">{{ categoryTranslations[category] }}</option>
        </select>
      </div>

      <!--фильтрация по избранным-->
      <div class="product-filters">
        <label for="sort-favorite">Сортировать по избранному: </label>
        <input type="checkbox" id="sort-favorite" v-model="sortByFavorite" />
      </div>
    </div>

    <!--карточки товаров-->
    <div class="product-list">
      <div v-for="product in filteredProducts" :key="product.id" class="product-card">
        <h2 class="product-title">{{ product.title }}</h2>

        <div class="product-image">
          <img :src="product.image" :alt="product.title" />
        </div>

        <p>Цена: {{ product.price }}$</p>
        <button @click="addToCart(product)">В корзину!</button>
        <button @click="toggleFavorite(product)">
          {{ isFavorite(product) ? 'Удалить из избранного :(' : 'В избранное!' }}
        </button>
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
        categories: [],
        selectedSort: 'default',
        selectedCategory: 'all',
        searchQuery: '',
        favorites: [],
        sortByFavorite: false,
      };
    },

    mounted() {
      axios
        .get('https://fakestoreapi.com/products')
        .then(response => {
          this.products = response.data;
          this.categories = this.getCategories();
        })
        .catch(error => {
          console.error(error);
        });

        this.loadFavorites(); //сохранение избранных товаров
    },

    computed: {
      filteredProducts() {
        let filtered = this.products;

        if (this.selectedCategory !== 'all') {
          filtered = filtered.filter(product => product.category === this.selectedCategory);
        }

        if (this.searchQuery) {
          const searchRegex = new RegExp(this.searchQuery, 'i');
          filtered = filtered.filter(product => searchRegex.test(product.title));
        }

        if (this.sortByFavorite) {
          filtered = filtered.filter(product => this.isFavorite(product));
        }

        switch (this.selectedSort) {
          case 'alphabetical':
            filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
            break;
          case 'price':
            filtered = filtered.sort((a, b) => a.price - b.price);
            break;
          default:
            break;
        }
        return filtered;
      },
      
      categoryTranslations() {
        return {
          all: 'Все',
          electronics: 'Электроника',
          jewelery: 'Украшения',
          "men's clothing": 'Мужская одежда',
          "women's clothing": 'Женская одежда',
        };
      },
    },


    methods: {
      //добавление в корзину
      addToCart(product) {
        this.$emit('add-to-cart', product);
      },

      //операции с избранными товарами
      toggleFavorite(product) {
        if (this.isFavorite(product)) {
          this.removeFromFavorites(product);
        } else {
          this.addToFavorites(product);
        }
        this.saveFavorites();
      },
      
      addToFavorites(product) {
        this.favorites.push(product);
      },
      
      removeFromFavorites(product) {
        this.favorites = this.favorites.filter(item => item.id !== product.id);
      },
      
      isFavorite(product) {
        return this.favorites.some(item => item.id === product.id);
      },
      
      saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
      },
      
      loadFavorites() {
        const favorites = localStorage.getItem('favorites');
        if (favorites) {
          this.favorites = JSON.parse(favorites);
        }
      },

      //категории
      getCategories() {
        const categories = new Set();
        this.products.forEach(product => {
          categories.add(product.category);
        });
        return Array.from(categories);
      },
    },
  };
</script>

<style>
  .product-filters-container {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  .product-filters {
    width: 200px;
    margin-bottom: 10px;
  }

  .product-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .product-card {
    width: 200px;
    height: 350px;
    border: 1px solid #ccc;
    padding: 10px;
    margin: 10px;
    display: flex;
    flex-direction: column;
    box-shadow: 0 2px 4px rgba(0, 140, 255, 0.427);
  }

  .product-card button {
    background-color: rgb(50, 132, 255);
    color: white;
    font-size: 14px;
    border: none;
    margin-top: 3px;
    transition: transform 0.2s;
  }

  .product-card button:active {
    transform: scale(0.95);
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
