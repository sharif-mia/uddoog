<template>

  <h2 class="page__title col-gap">
    My Products
    
  </h2>
  <div class="d-flex mb-4 align-items-center">
      <div class="d">
        <router-link class="btn" :to="{ name: 'addProducts' }">
        <i class="icon-plus"></i>
        <span>Add New Products</span>
      </router-link>
      </div>
      <div class="ml-auto d-flex align-items-center gap-3">
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
    <Product v-for="product in products" :key="product.id" :showWishlist="false" :showCart="true" :showStore="false" :product="product" />
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
      category:"",
      options : [
  {
    value: 'Category 1',
    label: 'Category1',
  },
  {
    value: 'Category 2',
    label: 'Category2',
  },
  {
    value: 'Category 3',
    label: 'Category3',
  },
  {
    value: 'Category 4',
    label: 'Category4',
  },
  {
    value: 'Category 5',
    label: 'Category5',
  },
]
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
