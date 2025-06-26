<template>
  <div class="container">
    <div class="product-list-page">
      <div class="category-sidebar">
        <h2 class="product-filter-category">Categories</h2>
        <ul class="category-list">
  <li v-for="category in categories" :key="category.id">
    <a href="#" @click.prevent="selectCategory(category)">
      {{ category.name }}
    </a>
  </li>
</ul>
        <div v-if="loadingCategories" class="loading">Loading categories...</div>
        <div v-else-if="errorCategories" class="error">{{ errorCategories }}</div>
        <ul v-else class="category-list d-none">
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
        <el-collapse class="d-none" v-model="activeCategory">
          <el-collapse-item v-for="category in categories" :key="category.id" :name="category.id.toString()">
            <template #title>
              {{ category.name }}
            </template>

            <!-- Subcategories -->
            <el-collapse v-model="activeSubcategory">
              <el-collapse-item v-for="subcategory in category.subcategories" :key="subcategory.id" :name="subcategory.id.toString()">
                <template #title>
                  {{ subcategory.name }}
                </template>

                <!-- Sub-subcategories -->
                <div v-for="subSubcategory in subcategory.subSubcategories" :key="subSubcategory.id" class="menu-item" @click="selectSubSubcategory(subSubcategory.id)">
                  {{ subSubcategory.name }}
                </div>
              </el-collapse-item>
            </el-collapse>
          </el-collapse-item>
        </el-collapse>

        <div class="product-filter mt-4">
          <h4>Special Price</h4>
          <ul>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectPrice" />
                <span class="checkmark"></span><i class="icon-taka"></i>6,400.00 - <i class="icon-taka"></i>6,499.991
              </label>
            </li>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectPrice" />
                <span class="checkmark"></span><i class="icon-taka"></i>6,700.00 - <i class="icon-taka"></i>6,799.991
              </label>
            </li>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectPrice" />
                <span class="checkmark"></span><i class="icon-taka"></i>6,900.00 - <i class="icon-taka"></i>6,999.991
              </label>
            </li>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectPrice" />
                <span class="checkmark"></span><i class="icon-taka"></i>7,700.00 - <i class="icon-taka"></i>7,799.991
              </label>
            </li>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectPrice" />
                <span class="checkmark"></span><i class="icon-taka"></i>7,900.00 - <i class="icon-taka"></i>7,999.991
              </label>
            </li>
          </ul>
        </div>
        <div class="product-filter mt-4">
          <h4>Featured Brands</h4>
          <ul>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectBrands" />
                <span class="checkmark"></span>A4 Tech
              </label>
            </li>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectBrands" />
                <span class="checkmark"></span>Rejor
              </label>
            </li>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectBrands" />
                <span class="checkmark"></span>Logitech
              </label>
            </li>
          </ul>
        </div>
        <div class="product-filter mt-4">
          <h4>Color Family</h4>
          <ul>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectColor" />
                <span class="checkmark"></span>Red
              </label>
            </li>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectColor" />
                <span class="checkmark"></span>Blue
              </label>
            </li>
            <li>
              <label class="checkbox">
                <input type="checkbox" v-model="selectColor" />
                <span class="checkmark"></span>Purple
              </label>
            </li>
          </ul>
        </div>
      </div>
      <div class="product-content">
        <div class="breadcrumbs d-none">
          <span v-if="currentCategory" @click="selectCategory(currentCategory.id)" class="breadcrumb-item">
            {{ currentCategory.name }}
          </span>
          <span v-if="currentSubcategory" @click="selectSubcategory(currentSubcategory.id)" class="breadcrumb-item"> > {{ currentSubcategory.name }} </span>
          <span v-if="currentSubSubcategory" class="breadcrumb-item"> > {{ currentSubSubcategory.name }} </span>
        </div>

        <h2 class="page__title col-gap">Category name</h2>

        <div class="product-content-filter mb-4">
          <button class="btn" type="button">
            <i class="icon-plus"></i>
            <span>Add All Products</span>
          </button>
          <div class="ml-auto d-flex align-items-center gap-3">
            <el-select v-model="category" placeholder="Show" size="large" style="width: 240px">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
            <div class="sort-filter">
              <label class="sort-filter__option">Sort by</label>
              <button class="sort-filter__option sort-filter__option--active">Orders</button>
              <button class="sort-filter__option">Price</button>
            </div>
          </div>
        </div>

        <div v-if="loadingProducts" class="loading">Loading products...</div>
        <div v-else-if="errorProducts" class="error">{{ errorProducts }}</div>
        <div v-else-if="filteredProducts.length > 0" class="product-grid">
          <Product v-for="product in filteredProducts" :key="product.id" :product="product" />
        </div>
        <div v-else class="no-products">
          <p>No products found in this category.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Product from "@/components/product.vue";

export default {
  name: "ProductList",
  components: {
    Product,
  },
  data() {
    return {
      activeCategory: "",
      activeSubcategory: "",
      selectedCategory: null,
      selectedSubcategory: null,
      selectedSubSubcategory: null,
      categories: [],
      products: [],
      loadingCategories: true,
      loadingProducts: true,
      errorCategories: null,
      errorProducts: null,
    };
  },
  computed: {
    currentCategory() {
      return this.categories.find((c) => c.id === this.selectedCategory);
    },
    currentSubcategory() {
      if (!this.currentCategory) return null;
      return this.currentCategory.subcategories.find((s) => s.id === this.selectedSubcategory);
    },
    currentSubSubcategory() {
      if (!this.currentSubcategory) return null;
      return this.currentSubcategory.subSubcategories.find((ss) => ss.id === this.selectedSubSubcategory);
    },
    filteredProducts() {
      if (this.selectedSubSubcategory) {
        return this.products.filter((p) => p.subSubcategoryId === this.selectedSubSubcategory);
      } else if (this.selectedSubcategory) {
        return this.products.filter((p) => p.subcategoryId === this.selectedSubcategory);
      } else if (this.selectedCategory) {
        return this.products.filter((p) => p.categoryId === this.selectedCategory);
      }
      return [];
    },
  },
  methods: {
    // single category
    selectCategory(category) {
    this.selectedCategory = category;
    
    // Load subcategories internally if needed
    const subcategories = category.subcategories;
    const subSubcategories = subcategories.flatMap(sub => sub.subSubcategories);

    console.log('Subcategories:', subcategories);
    console.log('Sub-Subcategories:', subSubcategories);

    // You can perform operations like filtering, searching, or emitting events here.
  },
    //end single
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
        const response = await this.$axios.get("http://localhost:3000/categories");
        this.categories = response.data;
        // Auto-select first category
        if (this.categories.length > 0 && !this.selectedCategory) {
          this.selectCategory(this.categories[0].id);
        }
      } catch (error) {
        this.errorCategories = "Failed to load categories: " + error.message;
      } finally {
        this.loadingCategories = false;
      }
    },
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
    this.fetchCategories();
    this.fetchProducts();
  },
};
</script>
