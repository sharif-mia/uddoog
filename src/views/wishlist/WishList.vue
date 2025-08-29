<template>

<div class="page__title d-flex cols-gap">
    My Wishlist
    <router-link class="btn ml-auto" :to="{ name: 'addProducts' }">
      <i class="icon-plus"></i>
      <span>Add Products</span>
    </router-link>
  </div>
  <div class="d-flex mb-4 gap-3 my-product-filter">
    <div class="nav__search">
      <button class="nav__search__btn"><i class="icon icon-search"></i></button><input class="form-control" type="text" placeholder="What are you looking for" />
    </div>
    <el-select v-model="category" placeholder="Select Category" size="large" style="width: 240px">
      <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
    </el-select>
    <div class="sort-filter ml-auto">
      <label class="sort-filter__option">Sort by</label>
      <button class="sort-filter__option sort-filter__option--active">Orders</button>
      <button class="sort-filter__option">Price</button>
    </div>
  </div>
  <div v-if="products.length > 0" class="product-grid">
    <Product v-for="product in products" :key="product.id" :showWishlist="true" :product="product" />
  </div>
  <div v-else>
    <router-link class="upload" :to="{ name: 'allProducts' }"
      ><i class="icon-plus"></i>
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
