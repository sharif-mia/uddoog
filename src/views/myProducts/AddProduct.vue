<template>

  <!-- <h2 class="page__title ">
    Add Product for  Zafar Mia
  </h2> -->
  <h3 class="customer-alert col-gap sticky">Add Product for Zafar Mia</h3>
  <div v-if="products.length > 0" class="product-grid">
    <Product v-for="product in products" :key="product.id"  :showWishlist="false"  :showDelete="false" :showCart="true" :showStore="false" :product="product" />

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
  name: "AddProducts",
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
<style scoped>
.customer-alert {
    top: 0;
    background: #0d5691;
    display: block;
    width: 100%;
    padding: 1.25rem;
    border-radius: .437rem;
    color: #fff;
    margin: 0;
}
</style>