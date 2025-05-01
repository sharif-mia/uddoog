<template>
  <router-link  class="product-card" :to="{ name: 'productDetails' }">
    <div class="product-card__image">
      <img :src="getProductImage" :alt="product.name" />
      <div class="product-card__actions">
        <div v-if="showWishlist" class="product-card__actions-action"><i class="icon-heart"></i></div>
        <div v-if="showCart" class="product-card__actions-action"><i class="icon-cart"></i></div>
        <div v-if="showStore" class="product-card__actions-action"><i class="icon-shop"></i></div>
        <div v-if="showDelete" class="product-card__actions-action text-danger"><i class="icon-trash"></i></div>
      </div>
      <div class="product-card__discount">-26%</div>
    </div>
    <div class="product-card__content">
      <h3 class="product-card__title">{{ product.name }}</h3>
      <div class="product-card__sales">
        <p class="product-card__seller-count">You Sold <strong>12</strong></p>
        <p class="product-card__uddoog-count">Uddoog Sold <strong>201</strong></p>
      </div>
      <div class="product-card__prices">
        <p class="product-card__uddoog-price">Our Price <strong><i class="icon-taka"></i> {{ formatPrice(product.ownerPrice) }}</strong></p>
        <p class="product-card__seller-price">Your Price <strong><i class="icon-taka"></i> {{ formatPrice(product.sellerPrice) }}</strong></p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "Product",
  props: {
    product: {
      type: Object,
      required: true
    },
    showStore: {
      type: Boolean,
      default: true
    },
    showWishlist: {
      type: Boolean,
      default: true
    },
    showCart: {
      type: Boolean,
      default: false
    },
    showDelete: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    getProductImage() {
      return this.product.images && this.product.images.length > 0 
        ? this.product.images[0] 
        : 'https://via.placeholder.com/300';
    }
  },
  methods: {
    formatPrice(price) {
      return new Intl.NumberFormat().format(price);
    }
  }
};
</script>

<style scoped>

</style>