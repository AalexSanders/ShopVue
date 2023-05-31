<template>
  <div class="cart">
    <div class="cart-icon" @click="showCart = !showCart">
      <i class="fas fa-shopping-cart"></i>
      <span class="cart-item-count">{{ cartItems.length }}</span>
    </div>
    <transition name="slide">
      <div class="cart-overlay" v-if="showCart">
        <div class="cart-popup">
          <div class="cart-header">
            <h2>Корзина</h2>
            <button class="close-btn" @click="closeCart"><i class="fas fa-times"></i></button>
          </div>
          <ul>
            <li v-for="item in cartItems" :key="item.id">
              <div class="cart-item">
                <div class="cart-item-details">
                  <div class="cart-item-title">{{ item.title }}</div>
                  <div class="cart-item-price">{{ item.price }}$</div>
                </div>
                <div class="cart-item-controls">
                  <input type="number" v-model="item.quantity" min="1" @change="updateCartItem(item)" />
                  <button @click="removeFromCart(item.id)"><i class="fas fa-trash-alt"></i></button>
                </div>
              </div>
            </li>
          </ul>
          <div v-if="cartItems.length === 0">Корзина пуста</div>
          <div class="cart-total" v-else>
            <span>Итого:</span>
            <span class="cart-total-price">{{ getTotalPrice() }}$</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  props: ['cartItems'],

  data() {
    return {
      showCart: false,
    };
  },

  methods: {
    removeFromCart(itemId) {
      this.$emit('remove-from-cart', itemId);
    },

    updateCartItem(item) {
      this.$emit('update-cart-item', item);
    },

    closeCart() {
      this.showCart = false;
    },

    getTotalPrice() {
      return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    },
  },
};
</script>

<style>
.cart {
  position: fixed;
  top: 20px;
  right: 20px;
}

.cart-icon {
  position: relative;
  cursor: pointer;
}

.cart-item-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background-color: red;
  color: white;
  border-radius: 50%;
  width: 16px;
  height: 16px;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.cart-popup {
  background-color: white;
  padding: 20px;
  max-width: 400px;
  max-height: 80vh;
  overflow-y: auto;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.close-btn {
  background: none;
  border: none;
  cursor: pointer;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.cart-item-title {
  font-weight: bold;
}

.cart-item-controls {
  display: flex;
  align-items: center;
}

.cart-item-controls input {
  width: 40px;
}

.cart-total {
  margin-top: 20px;
  font-weight: bold;
  text-align: right;
}

.cart-total span:first-child {
  margin-right: 10px;
}
</style>
