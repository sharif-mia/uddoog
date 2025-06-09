<template>
    <div>
      <h2 class="page__title d-flex">
        products List
        <router-link class="ml-auto btn btn-outline" :to="{ name: 'addProduct' }">
          <i class="icon-plus"></i>
          <span>New</span>
        </router-link>
      </h2>
      <div class="card">
        <div v-if="products.length != 0" class="table-responsive-md">
          <table class="table">
            <thead>
              <tr>
                <th>
                  <label class="checkbox">
                    <input type="checkbox" v-model="selectAll" />
                    <span class="checkmark"></span>
                  </label>
                </th>
                <th>Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id">
                <td>
                  <label class="checkbox">
                    <input type="checkbox" v-model="selectRow" />
                    <span class="checkmark"></span>
                  </label>
                </td>
                <td>{{ product.name }}</td>
                <td>
                  <router-link :to="{ name: 'editProduct', params: { id: product.id } }">
                    <i class="icon-edit"></i>
                  </router-link>
                  <!-- <a @click.prevent="deleteItem(product.id)"><i class="icon-trash"></i></a> -->
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else><h3>There is no product</h3></div>
      </div>
    </div>
  </template>

<script>
export default {
  data() {
    return {
        products: [],
    };
  },
  async created() {
    this.fetchProduct();
  },
  watch: {
    // Changes in categoryId to fetch subcategories
    "formData.categoryId": function (newCategoryId) {
      this.fetchSubcategories(newCategoryId);
    },
    // Changes in subcategoryId to fetch sub-subcategories
    "formData.subcategoryId": function (newSubcategoryId) {
      this.fetchSubSubcategories(newSubcategoryId);
    },
  },
  methods: {
    async fetchProduct() {
      try {
        const response = await this.$axios.get("http://localhost:3000/products");
        this.products = response.data;
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    }
  },
};
</script>

<style scoped>
.image-preview {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.preview-item {
  position: relative;
}

.preview-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.color-group {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
}

.color-input {
  width: 40px;
  height: 40px;
  padding: 0;
  border: none;
  cursor: pointer;
}

.btn-sm {
  margin-left: 0.5rem;
}
</style>
