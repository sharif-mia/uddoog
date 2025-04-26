<template>
  <div class="row equal-column">
    <div class="col-8 col-gap">
      <div class="pending__payment">
        <h2 class="page__title m-0 d-flex gap-3 align-center"><i class="icon-time"></i> Pending payment</h2>
        <table>
          <thead>
            <tr>
              <th>Time Remaining</th>
              <th>Amount</th>
              <th>Product</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <h3><span class="countdown">-0:15</span> <sub>min</sub></h3>
              </td>
              <td><h4>120Tk</h4></td>
              <td>SAMSUNG 670 Liter Twin Cooling with Convertible Top Mount Refrigerator</td>
            </tr>
            <tr>
              <td>
                <h3><span class="countdown">-0:12</span> <sub>min</sub></h3>
              </td>
              <td><h4>140Tk</h4></td>
              <td>Whirlpool Refrigerator FreshMagic Pro Chromium Steel</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="col-4 col-gap">
      <div class="dashboard__track justify-center">
        <div>
          <i class="icon-clock"></i>
          <h2 class="page__title my-2">#Order 123456</h2>
          <h3><span>Estimated arrival</span> 31th March</h3>
          <a href="#" class="btn">Track</a>
        </div>
      </div>
    </div>
  </div>
  <div class="dashboard__cta">
    <router-link :to="{ name: 'addCustomer' }">
      <i class="icon-user-add"></i>
      <span>Add Customer</span>
    </router-link>
    <router-link :to="{ name: 'addProducts' }">
      <i class="icon-product"></i>
      <span>Add Product</span>
    </router-link>
    <router-link :to="{ name: 'orders' }">
      <i class="icon-bag"></i>
      <span>My Order</span>
    </router-link>
    <router-link :to="{ name: 'wishList' }">
      <i class="icon-heart"></i>
      <span>Wish List</span>
    </router-link>
  </div>
  <div class="row">
    <div class="col-5">
      <div class="dashboard__cards">
        <div class="dashboard__card">
          <h3 class="text-success">20</h3>
          <p>Total Sales</p>
        </div>
        <div class="dashboard__card">
          <h3 class="text-primary">30</h3>
          <p>Total Orders</p>
        </div>
        <div class="dashboard__card">
          <h3 class="text-danger">2323</h3>
          <p>Pending earnings</p>
        </div>
        <div class="dashboard__card">
          <h3 class="text-warning">5000</h3>
          <p>Withdrawn</p>
        </div>
      </div>
    </div>
    <div class="col-4">
      <a class="best-selling" href="#">
        <img src="https://www.bdshop.com/pub/media/catalog/product/cache/a762498fd6e92192d841c2d6c87195e8/r/e/remax_rm_-_805_wired_headset_music_over-ear_headphone_-_black.jpg" alt="" />
        <div class="content">
          <h4>Best-Selling Products</h4>
          <p>Maono AU-MH501 Professional Studio Monitor Headphone, and Microphone Recording
          </p>
          <h4 class="m-0">Total 100 sales</h4>
        </div>
      </a>
    </div>
    <div class="col-3">
      <div class="low-stock">
        <h4>Low Stock item</h4>
        <div class="row">
        <div class="col-6">
          <a href="#">
            <img src="https://www.bdshop.com/pub/media/catalog/product/cache/a762498fd6e92192d841c2d6c87195e8/p/a/panasonic-vacuum-cleaner-tank-type-mc-yl631_1_.png" alt="" />
            <h4 class="m-0">2 items only</h4>
          </a>
        </div>
        <div class="col-6">
          <a href="#">
            <img src="https://www.bdshop.com/pub/media/catalog/product/cache/3ce43e8bb160f52e76adb2b0bdd9b58d/b/o/boya_by-dm500_dynamic_microphone.jpg" alt="" />
            <h4 class="m-0">3 items only</h4>
          </a>
        </div>
      </div>
      </div>
    </div>
  </div>
  <h2 class="my-4 page__title d-flex">
    My Products
    <router-link class="ml-auto btn-link" :to="{ name: 'myProducts' }"> <span>See all </span> <i class="icon-right"></i> </router-link>
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
    
    <router-link class="upload" :to="{ name: 'addProducts' }"><i class="icon-plus"></i> 
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
  name: "Dashboard",
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
