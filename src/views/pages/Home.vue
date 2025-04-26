<template>
  <section class="hero">
    <div class="hero__content">
      <img src="@/assets/images/hero-img.webp" alt="" />

      <div class="hero__content-inner">
        <h1 class="hero__title">Your Success, Our Priority</h1>
        <p class="hero__subtitle">Uddoog is a premier dropshipping and wholesale marketplace in Bangladesh, connecting businesses to seamlessly source and sell products nationwide.</p>
      </div>
    </div>
    <aside class="hero__sidebar">
      <h2 class="hero__sidebar-title">Uddoog is Simplified</h2>
      <ul class="hero__sidebar-list">
        <li>Ship Bangladesh-Wide, Earn Taka Worldwide.</li>
        <li>Build Your Store Anywhere. Profit Everywhere.</li>
        <li>Local Products, Nationwide Shipping.</li>
        <li>Create, Sell, Ship, Earn – All From Your Corner.</li>
        <li>Taka Flows In, No Matter Where You Are.</li>
        <li>Your Global Store, Rooted in Bangladesh.</li>
      </ul>
    </aside>
  </section>

  <section class="how-it-works py-5">
    <div class="container">
      <h2 class="how-it-works__title">How Can I Use Uddoog To Earn Taka Through Collective Dropshipping?</h2>
      <p class="how-it-works__subtitle">Streamline your business and boost profits with Uddoog’s powerful, automated solutions</p>
      <div class="how-it-works__steps">
        <div class="how-it-works__step">
          <div class="how-it-works__icon"><i class="icon-product"></i></div>
          <h3>Discover Products</h3>
          <p>Fulfill demand with exclusive items from trusted BD suppliers.</p>
        </div>
        <div class="how-it-works__step">
          <div class="how-it-works__icon"><i class="icon-shop"></i></div>
          <h3>Add to Your Store</h3>
          <p>Select products to add with one click.</p>
        </div>
        <div class="how-it-works__step">
          <div class="how-it-works__icon"><i class="icon-percentage"></i></div>
          <h3>Make a Sale</h3>
          <p>Buyer places the order through your store.</p>
        </div>
        <div class="how-it-works__step">
          <div class="how-it-works__icon"><i class="icon-bag"></i></div>
          <h3>Place the Order</h3>
          <p>You send it to Uddoog. Supplier ships it directly.</p>
        </div>
        <div class="how-it-works__step">
          <div class="how-it-works__icon"><i class="icon-taka"></i></div>
          <h3>Enjoy Your Profit</h3>
          <p>Uddoog transfers your margin. Zero risk.</p>
        </div>
      </div>
    </div>
  </section>
  <section>
    <div class="container">
      <div class="product-tabs">
        <div class="tab-buttons">
          <button :class="{ active: activeTab === 'topSeller' }" @click="activeTab = 'topSeller'">Top Seller</button>
          <button :class="{ active: activeTab === 'mostPopular' }" @click="activeTab = 'mostPopular'">Most Popular</button>
          <button :class="{ active: activeTab === 'hotPicks' }" @click="activeTab = 'hotPicks'">Hot Picks</button>
        </div>

        <div class="tab-content">
          <div class="products">
            <a href="" v-for="product in filteredProducts" :key="product.id" class="product-card">
              <div class="product-card__img">
                <img :src="product.images[0]" alt="Product Image" />
              </div>
              <div class="product-card__info">
                <p class="name">{{ product.name }}</p>
                <h3 class="price">৳{{ formatPrice(product.sellerPrice) }}</h3>
              </div>
            </a>
          </div>

          <div class="profit-box">
            <h4>Earn Taka, No Risk</h4>
            <p>Uddoog Gets Paid Only When You Make Money – It’s That Simple</p>
            <ul class="price-table my-4">
              <li>
                You Sell A Product <span><i class="icon-taka mr-1"></i>{{ formatPrice(sampleProduct.sellerPrice) }}</span>
              </li>
              <li>
                Uddoog Price <span><i class="icon-taka mr-1"></i>{{ formatPrice(sampleProduct.ownerPrice) }}</span>
              </li>
              <li class="profit">
                Your Profit
                <span><i class="icon-taka mr-1"></i>{{ formatPrice(sampleProduct.sellerPrice - sampleProduct.ownerPrice) }}</span>
              </li>
            </ul>
            <a href="" class="btn">Start selling and earn money</a>
          </div>
        </div>
      </div>
    </div>
  </section>
  <!-- Selected For You -->
  <section class="recommended py-5">
    <div class="container">
      <h2 class="recommended__heading">Selected For You</h2>

      <div v-if="allProducts.length > 0" class="product-grid">
        <Product v-for="product in selectedProducts" :key="product.id" :product="product" />
      </div>
    </div>
  </section>

  <section class="categories">
    <div class="container">
      <h2 class="categories__heading">Explore By Category</h2>
      <div class="categories__list">
        <ul>
          <li>
            <a>
              <figure><img src="https://images.othoba.com/images/thumbs/0738263_food-grocery_200.jpeg" class="lozad" alt="Categroy" width="190" height="190" data-loaded="true" /></figure>
              <h4 class="categories__label">Food & Grocery</h4>
            </a>
          </li>
          <li>
            <a>
              <figure><img src="https://images.othoba.com/images/thumbs/0738264_electronics_200.jpeg" class="lozad" alt="Categroy" width="190" height="190" data-loaded="true" /></figure>
              <h4 class="categories__label">Electronics</h4>
            </a>
          </li>
          <li>
            <a>
              <figure><img src="https://images.othoba.com/images/thumbs/0738271_pharmacy_200.jpeg" class="lozad" alt="Categroy" width="190" height="190" data-loaded="true" /></figure>
              <h4 class="categories__label">Pharmacy</h4>
            </a>
          </li>
          <li>
            <a>
              <figure><img src="https://images.othoba.com/images/thumbs/0738346_household-festival_200.jpeg" class="lozad" alt="Categroy" width="190" height="190" data-loaded="true" /></figure>
              <h4 class="categories__label">Household Festival</h4>
            </a>
          </li>
          <li>
            <a>
              <figure><img src="https://images.othoba.com/images/thumbs/0738345_special-weekly-offer_200.jpeg" class="lozad" alt="Categroy" width="190" height="190" data-loaded="true" /></figure>
              <h4 class="categories__label">Special Weekly Offer</h4>
            </a>
          </li>
          <li>
            <a>
              <figure><img src="https://images.othoba.com/images/thumbs/0738273_bags-wallets-belts_200.jpeg" class="lozad" alt="Categroy" width="190" height="190" data-loaded="true" /></figure>
              <h4 class="categories__label">Bags, Wallets & Belts</h4>
            </a>
          </li>
          <li>
            <a>
              <figure><img src="https://images.othoba.com/images/thumbs/0738274_fashion_200.jpeg" class="lozad" alt="Categroy" width="190" height="190" data-loaded="true" /></figure>
              <h4 class="categories__label">Fashion</h4>
            </a>
          </li>
          <li>
            <a>
              <figure><img src="https://images.othoba.com/images/thumbs/0738275_building-materials_200.jpeg" class="lozad" alt="Categroy" width="190" height="190" data-loaded="true" /></figure>
              <h4 class="categories__label">Building Materials</h4>
            </a>
          </li>
          <li>
            <a>
              <figure><img src="https://images.othoba.com/images/thumbs/0738276_toys-baby-products_200.jpeg" class="lozad" alt="Categroy" width="190" height="190" data-loaded="true" /></figure>
              <h4 class="categories__label">Toys & Baby Products</h4>
            </a>
          </li>
          <li>
            <a>
              <figure><img src="https://images.othoba.com/images/thumbs/0738277_home-living_200.jpeg" class="lozad" alt="Categroy" width="190" height="190" data-loaded="true" /></figure>
              <h4 class="categories__label">Home & Living</h4>
            </a>
          </li>
        </ul>
        <!-- Repeat .categories__item for each category -->
      </div>
    </div>
  </section>

  <!-- Testimonial -->
  <section class="testimonial py-5">
    <div class="container">
      <div class="row justify-center">
        <div class="col-8">
          <div class="testimonial__wrapper">
            <blockquote class="testimonial__quote">
              “Finally, I found the perfect dropshipping partner in Uddoog! I’m beyond excited to have surpassed my goal...”
              <h4 class="testimonial__author">– Kamal Ahmed</h4>
            </blockquote>
            <img src="https://cdn.shopify.com/b/shopify-brochure2-assets/1a08aa330b1d7e97300b092c97b77a50.jpg?width=808&height=808" alt="Customer" class="testimonial__image" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="faq py-5">
    <div class="container">
      <div class="row justify-center">
        <div class="col-8">
          <h4 class="faq__subtitle">New to Dropshipping?</h4>
          <h2 class="faq__heading">Everything You Need to Know About Dropshipping</h2>
          <div class="faq__accordion">
            <el-collapse v-model="activeName" accordion>
              <el-collapse-item title="Who should use the app?" name="1">
                <p class="p-3">Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to</p>
              </el-collapse-item>
              <el-collapse-item title="What is included with my subscription?" name="2">
                <p class="p-3">Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to</p>
              </el-collapse-item>
              <el-collapse-item title="How do I get paid?" name="3">
                <p class="p-3">Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to</p>
              </el-collapse-item>
              <el-collapse-item title="Is my personal information safe?" name="4">
                <p class="p-3">Consistent with real life: in line with the process and logic of real life, and comply with languages and habits that the users are used to</p>
              </el-collapse-item>
            </el-collapse>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="cta">
    <div class="container cta__content">
      <h2 class="cta__title">Start your 14-day free trial today</h2>
      <h4 class="cta__subtitle">Uddoog: Your Path to Earning Taka Online</h4>
      <p class="cta__desc">No inventory, no hassle – just start selling and watch the Taka roll in!</p>
      <button class="btn">Start selling and earn money</button>
    </div>
  </section>
</template>

<script>
import Product from "@/components/product.vue";
export default {
  name: "Home",
  components: {
    Product,
  },
  data() {
    return {
      activeTab: "topSeller",
      allProducts: [],
      sampleProduct: {
        sellerPrice: 240002,
        ownerPrice: 200000,
      },
    };
  },
  computed: {
    filteredProducts() {
      if (this.activeTab === "topSeller") {
        return this.allProducts.slice(0, 5);
      } else if (this.activeTab === "mostPopular") {
        return this.allProducts.slice(1, 6);
      } else if (this.activeTab === "hotPicks") {
        return this.allProducts.slice(2, 7);
      }
      return [];
    },
    selectedProducts() {
      return this.allProducts.slice(0, 5);
    },
  },
  methods: {
    formatPrice(value) {
      return (value / 100).toFixed(2);
    },
    async fetchProducts() {
      try {
        const res = await this.$axios.get("http://localhost:3000/products");
        this.allProducts = res.data;
        if (res.data.length > 0) {
          this.sampleProduct = res.data[0];
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    },
  },
  mounted() {
    this.fetchProducts();
  },
};
</script>
