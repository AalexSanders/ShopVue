<template>
  <div class="catalog">
    <h1>Каталог</h1>
    <Cart
      :cartItems="cartItems"
      @remove-from-cart="removeFromCart"
      @update-cart-item="updateCartItem"
    />
    <CatalogItem @add-to-cart="addToCart" />
  </div>
</template>

<script>
import CatalogItem from './CatalogItem.vue';
import Cart from './Cart.vue';

export default {
  components: {
    CatalogItem,
    Cart,
  },
  data() {
    return {
      cartItems: [],
    };
  },
  methods: {
    addToCart(product) {
      const existingItem = this.cartItems.find(item => item.id === product.id);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cartItems.push({ ...product, quantity: 1 });
      }
    },
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter(item => item.id !== itemId);
    },
    updateCartItem(item) {
      item.quantity = parseInt(item.quantity, 10);
      if (item.quantity <= 0) {
        this.removeFromCart(item.id);
      }
    },
  },
};
</script>

<style>
.catalog {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
