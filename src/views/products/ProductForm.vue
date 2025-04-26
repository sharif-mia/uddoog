<template>
  <div>
    <h2>{{ isEdit ? "Edit" : "Add" }} Product</h2>
    <div class="row">
      <div class="col-8">
        <form @submit.prevent="submitForm">
      <div class="form-group">
        <label class="form-label">Product Name</label>
        <input type="text" v-model="formData.name" class="form-control" required />
      </div>

      <div class="row">
        <div class="col-4 form-group">
          <label class="form-label">Category</label>
          <select v-model="formData.categoryId" class="form-control" required>
            <option value="" disabled>Select a category</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
        </div>
        <div class="col-4 form-group">
          <label class="form-label">Subcategory</label>
          <select id="subcategory" v-model="formData.subcategoryId" class="form-control" required>
            <option value="" disabled>Select a subcategory</option>
            <option v-for="subcategory in subcategories" :key="subcategory.id" :value="subcategory.id">
              {{ subcategory.name }}
            </option>
          </select>
        </div>
        <div class="col-4 form-group">
          <label class="form-label">Sub-Subcategory</label>
          <select id="subSubcategory" v-model="formData.subSubcategoryId" class="form-control" required>
            <option value="" disabled>Select a sub-subcategory</option>
            <option v-for="subSubcategory in subSubcategories" :key="subSubcategory.id" :value="subSubcategory.id">
              {{ subSubcategory.name }}
            </option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <label class="form-label">Product Images</label>
        <input type="file" multiple @change="handleImageUpload" class="form-control" />
      </div>
      <div class="image-preview">
        <div v-for="(image, index) in imagePreviews" :key="index" class="preview-item">
          <img :src="image" alt="Product Image" class="preview-image" />
          <button type="button" class="btn btn-danger btn-sm" @click="removeImage(index)"><i class="icon-trash"></i></button>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">Description</label>
        <textarea v-model="formData.description" class="form-control" required />
      </div>

      <div class="form-group">
        <label class="form-label">Colors</label>
        <div v-for="(color, index) in formData.colors" :key="index" class="color-group">
          <input type="color" v-model="color.value" class="color-input" />
          <input type="text" v-model="color.name" placeholder="Color Name" class="form-control" required />
          <button type="button" class="btn btn-danger btn-sm" @click="removeColor(index)">Remove</button>
        </div>
        <button type="button" class="btn btn-secondary" @click="addColor">Add Color</button>
      </div>

      <div class="row">
        <div class="col-6">
          <div class="form-group">
            <label class="form-label">Quantity</label>
            <input type="text" v-model="formData.quantity" class="form-control" required />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="form-label">Sizes (comma-separated)</label>
            <input type="text" v-model="formData.sizesInput" class="form-control" />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="form-label">Owner Price</label>
            <input type="number" v-model="formData.ownerPrice" class="form-control" required />
          </div>
        </div>
        <div class="col-6">
          <div class="form-group">
            <label class="form-label">Seller Price</label>
            <input type="number" v-model="formData.sellerPrice" class="form-control" required />
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary">
        {{ isEdit ? "Update" : "Create" }}
      </button>
    </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        categoryId: "",
        subcategoryId: "",
        subSubcategoryId: "",
        images: [],
        description: "",
        colors: [],
        sizesInput: "",
        quantity: "",
        ownerPrice: 0,
        sellerPrice: 0,
      },
      imagePreviews: [],
      categories: [],
      subcategories: [],
      subSubcategories: [],
      isEdit: false,
    };
  },
  async created() {
    this.isEdit = !!this.$route.params.id; // Check if in edit mode
    await this.fetchCategories(); // Fetch categories
    if (this.isEdit) {
      this.fetchProduct(); // Fetch product data for editing
    }
  },
  watch: {
    // Watch for changes in categoryId to fetch subcategories
    "formData.categoryId": function (newCategoryId) {
      this.fetchSubcategories(newCategoryId);
    },
    // Watch for changes in subcategoryId to fetch sub-subcategories
    "formData.subcategoryId": function (newSubcategoryId) {
      this.fetchSubSubcategories(newSubcategoryId);
    },
  },
  methods: {
    async fetchCategories() {
      try {
        const response = await this.$axios.get("http://localhost:3000/categories");
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching categories:", error);
        alert("Failed to fetch categories. Please try again.");
      }
    },

    // Fetch subcategories based on the selected category
    async fetchSubcategories(categoryId) {
      try {
        const category = this.categories.find((cat) => cat.id === categoryId);
        this.subcategories = category ? category.subcategories : [];
      } catch (error) {
        console.error("Error fetching subcategories:", error);
        this.subcategories = [];
      }
    },

    // Fetch sub-subcategories based on the selected subcategory
    async fetchSubSubcategories(subcategoryId) {
      try {
        const subcategory = this.subcategories.find((sub) => sub.id === subcategoryId);
        this.subSubcategories = subcategory ? subcategory.subSubcategories : [];
      } catch (error) {
        console.error("Error fetching sub-subcategories:", error);
        this.subSubcategories = [];
      }
    },

    // Fetch product data for editing
    async fetchProduct() {
      const productId = this.$route.params.id;
      try {
        const response = await this.$axios.get(`http://localhost:3000/products/${productId}`);
        this.formData = response.data;
        this.imagePreviews = response.data.images; // Set image previews
      } catch (error) {
        console.error("Error fetching product data:", error);
        alert("Failed to fetch product data. Please try again.");
      }
    },

    // Handle image upload
    handleImageUpload(event) {
      const files = event.target.files;
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.imagePreviews.push(e.target.result); // Add image preview
          this.formData.images.push(file); // Add file to formData
        };
        reader.readAsDataURL(file);
      }
    },

    // Remove an image
    removeImage(index) {
      this.imagePreviews.splice(index, 1);
      this.formData.images.splice(index, 1);
    },

    // Add a new color
    addColor() {
      this.formData.colors.push({ name: "", value: "#000000" });
    },

    // Remove a color
    removeColor(index) {
      this.formData.colors.splice(index, 1);
    },

    // Handle form submission
    async submitForm() {
      try {
        // Format sizes as an array
        const sizes = this.formData.sizesInput.split(",").map((size) => size.trim());

        // Prepare payload
        const payload = {
          ...this.formData,
          sizes,
          images: this.formData.images.map((image) => URL.createObjectURL(image)), // Convert files to URLs
        };

        if (this.isEdit) {
          // Update existing product
          await this.$axios.put(`http://localhost:3000/products/${this.$route.params.id}`, payload);
          alert("Product updated successfully!");
        } else {
          // Create new product
          await this.$axios.post("http://localhost:3000/products", payload);
          alert("Product created successfully!");
        }
        this.$router.push({ name: "products" }); // Redirect to product list
      } catch (error) {
        console.error("Error submitting form:", error);
        alert("An error occurred. Please try again.");
      }
    },
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

.btn-danger {
  position: absolute;
  top: 5px;
  right: 5px;
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
}
</style>
