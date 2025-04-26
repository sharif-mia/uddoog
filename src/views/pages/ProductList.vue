<template>
  <div class="product-list-page">
    <div class="category-sidebar">
      <h2>Categories</h2>
      <div v-if="loadingCategories" class="loading">Loading categories...</div>
      <div v-else-if="errorCategories" class="error">{{ errorCategories }}</div>
      <ul v-else class="category-list">
        <li v-for="category in categories" :key="category.id">
          <a href="#" @click.prevent="selectCategory(category.id)">{{ category.name }}</a>
          <ul v-if="selectedCategory === category.id" class="subcategory-list">
            <li v-for="subcategory in category.subcategories" :key="subcategory.id">
              <a href="#" @click.prevent="selectSubcategory(subcategory.id)">{{ subcategory.name }}</a>
              <ul v-if="selectedSubcategory === subcategory.id" class="sub-subcategory-list">
                <li v-for="subSubcategory in subcategory.subSubcategories" :key="subSubcategory.id">
                  <a href="#" @click.prevent="selectSubSubcategory(subSubcategory.id)">{{ subSubcategory.name }}</a>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>

    <div class="product-content">
      <div class="breadcrumbs">
        <span v-if="currentCategory" @click="selectCategory(currentCategory.id)" class="breadcrumb-item">
          {{ currentCategory.name }}
        </span>
        <span v-if="currentSubcategory" @click="selectSubcategory(currentSubcategory.id)" class="breadcrumb-item">
          > {{ currentSubcategory.name }}
        </span>
        <span v-if="currentSubSubcategory" class="breadcrumb-item">
          > {{ currentSubSubcategory.name }}
        </span>
      </div>

      <h1 v-if="currentSubSubcategory">{{ currentSubSubcategory.name }}</h1>
      <h1 v-else-if="currentSubcategory">{{ currentSubcategory.name }}</h1>
      <h1 v-else-if="currentCategory">{{ currentCategory.name }}</h1>

      <div v-if="loadingProducts" class="loading">Loading products...</div>
      <div v-else-if="errorProducts" class="error">{{ errorProducts }}</div>
      <div v-else-if="filteredProducts.length > 0" class="product-grid">
        <Product 
          v-for="product in filteredProducts" 
          :key="product.id" 
          :product="product" 
        />
      </div>
      <div v-else class="no-products">
        <p>No products found in this category.</p>
      </div>
    </div>
  </div>
</template>

<script>
import Product from '@/components/product.vue';

export default {
  name: "ProductList",
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
