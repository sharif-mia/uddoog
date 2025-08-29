<template>

  <h3 class="customer-alert cols-gap sticky">Add Product for <strong>Zafar Mia</strong> <span class="ml-auto"><i class="icon-cart"></i>(3)</span></h3>
  <div class="d-flex mb-4 align-items-center my-product-filter ">
      <div class="d">
        <button class="btn" type="button">
        <i class="icon-plus"></i>
        Add All Products
      </button>
      </div>
      <div class="ml-auto d-flex align-items-center gap-3 flex-wrap">
        <div class="nav__search"><button class="nav__search__btn"><i class="icon icon-search"></i></button><input class="form-control" type="text" placeholder="What are you looking for"></div>
      <el-select
      v-model="category"
      placeholder="Select Category"
      size="large"
      style="width: 240px"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
        <div class="sort-filter">
        <label class="sort-filter__option">Sort by</label>
        <button class="sort-filter__option sort-filter__option--active">Orders</button>
        <button class="sort-filter__option">Price</button>
      </div>
      </div>
    </div>
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
