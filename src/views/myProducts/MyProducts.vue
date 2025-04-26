<template>

  <h2 class="page__title col-gap d-flex">
    My Products
    <div class="d-flex gap-3 ml-auto">
      <router-link class="btn" :to="{ name: 'addProducts' }">
        <i class="icon-plus"></i>
        <span>Add New Products</span>
      </router-link>
      <div class="sort-filter">
        <label class="sort-filter__option">Sort by</label>
        <button class="sort-filter__option sort-filter__option--active">Orders</button>
        <button class="sort-filter__option">Price</button>
      </div>
    </div>
  </h2>
  
  <div v-if="products.length > 0" class="product-grid">
    <Product v-for="product in products" :key="product.id" :product="product" />
    <router-link class="upload" :to="{ name: 'addProducts' }">
    <div>
      <i class="icon-plus"></i> 
    <h4>Add Products</h4>
    </div>
    </router-link>
  </div>
  <div v-else class="no-products">
    
    <router-link class="upload" :to="{ name: 'allProducts' }"><i class="icon-plus"></i> 
      <div>
      <i class="icon-plus"></i> 
    <h4>Add Products</h4>
    </div>
    </router-link>
  </div>
</template>

<script>
import Product from "@/components/product.vue";

export default {
  name: "Wishlist",
  components: {
    Product,
  },
  data() {
    return {
      products: [],
      loadingProducts: true,
      errorProducts: null,
    };
  },
  computed: {},
  methods: {
    async fetchProducts() {
      try {
        this.loadingProducts = true;
        const response = await this.$axios.get("http://localhost:3000/products");
        this.products = response.data;
      } catch (error) {
        this.errorProducts = "Failed to load products: " + error.message;
      } finally {
        this.loadingProducts = false;
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
