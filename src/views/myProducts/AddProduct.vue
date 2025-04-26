<template>

  <!-- <h2 class="page__title ">
    Add Product for  Zafar Mia
  </h2> -->
  <el-alert class="col-gap" title="Add Product for Zafar Mia
" type="info" :closable="false" />
  <div v-if="products.length > 0" class="product-grid">
    <Product v-for="product in products" :key="product.id" :product="product" />

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
