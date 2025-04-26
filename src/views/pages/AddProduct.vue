<template>
  <header>
        <div class="logo">LOGO</div>
        <div class="search-bar">
            <input type="text" placeholder="Search for anything...">
        </div>
        <nav>
            <ul>
                <li>New Products</li>
                <li>All Products</li>
                <li>Fashion</li>
                <li>Furniture</li>
                <li>Home & Garden</li>
                <li>Toys & Hobbies</li>
                <li>Mobile Phones & Accessories</li>
                <li>Health & Beauty</li>
                <li>Computer & Office</li>
                <li>Pet Supplies</li>
                <li>Mother & Kids</li>
                <li>Gift & Gadgets</li>
                <li>Electronics</li>
            </ul>
        </nav>
        <div class="user-info">
            <span>New here? Start your 14-day FREE trial. Try now</span>
            <span>Mr. Kazi Zaman ▼</span>
        </div>
    </header>
    <div class="product-gallery">
    <h2 class="product-gallery__title">Selected Products</h2>
    <div class="product-gallery__list">
      <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
    </div>
    <h2 class="product-gallery__title">Explore By Category</h2>
    <div class="product-gallery__categories">
      <div class="category-card" 
           v-for="category in categories" 
           :key="category.id" 
           @click="selectCategory(category.id)">
        <h3 class="category-card__title">{{ category.name }}</h3>
        <div class="category-card__subcategories">
          <div v-for="subcategory in category.subcategories" 
               :key="subcategory.id" 
               class="subcategory-card">
            <h4 class="subcategory-card__title">{{ subcategory.name }}</h4>
            <ul class="subcategory-card__items">
              <li
                v-for="subSubcategory in subcategory.subSubcategories"
                :key="subSubcategory.id"
                class="subcategory-card__item"
              >
                {{ subSubcategory.name }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>

        <section class="featured-products">
          <ProductCard
        v-for="product in products"
        :key="product.id"
        :product="product"
      />
        </section>
</template>

<script>
import Product from '@/components/product.vue';

export default {
  name: "AddProduct",
  components: {
    Product
  },
  data() {
    return {
      selectedCategory: null,
      selectedSubcategory: null,
      selectedSubSubcategory: null,
      categories: [],
      products: [],
      loadingCategories: true,
      loadingProducts: true,
      errorCategories: null,
      errorProducts: null
    };
  },
  computed: {
    currentCategory() {
      return this.categories.find(c => c.id === this.selectedCategory);
    },
    currentSubcategory() {
      if (!this.currentCategory) return null;
      return this.currentCategory.subcategories.find(s => s.id === this.selectedSubcategory);
    },
    currentSubSubcategory() {
      if (!this.currentSubcategory) return null;
      return this.currentSubcategory.subSubcategories.find(ss => ss.id === this.selectedSubSubcategory);
    },
    filteredProducts() {
      if (this.selectedSubSubcategory) {
        return this.products.filter(p => p.subSubcategoryId === this.selectedSubSubcategory);
      } else if (this.selectedSubcategory) {
        return this.products.filter(p => p.subcategoryId === this.selectedSubcategory);
      } else if (this.selectedCategory) {
        return this.products.filter(p => p.categoryId === this.selectedCategory);
      }
      return [];
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId;
      this.selectedSubcategory = null;
      this.selectedSubSubcategory = null;
    },
    selectSubcategory(subcategoryId) {
      this.selectedSubcategory = subcategoryId;
      this.selectedSubSubcategory = null;
    },
    selectSubSubcategory(subSubcategoryId) {
      this.selectedSubSubcategory = subSubcategoryId;
    },
    async fetchCategories() {
      try {
        this.loadingCategories = true;
        const response = await this.$axios.get('http://localhost:3000/categories');
        this.categories = response.data;
        // Auto-select first category if none selected
        if (this.categories.length > 0 && !this.selectedCategory) {
          this.selectCategory(this.categories[0].id);
        }
      } catch (error) {
        this.errorCategories = 'Failed to load categories: ' + error.message;
      } finally {
        this.loadingCategories = false;
      }
    },
    async fetchProducts() {
      try {
        this.loadingProducts = true;
        const response = await this.$axios.get('http://localhost:3000/products');
        this.products = response.data;
      } catch (error) {
        this.errorProducts = 'Failed to load products: ' + error.message;
      } finally {
        this.loadingProducts = false;
      }
    }
  },
  mounted() {
    this.fetchCategories();
    this.fetchProducts();
  }
};
</script>
