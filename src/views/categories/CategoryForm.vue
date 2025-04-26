<template>
  <div>
    <h2 class="page__title gap-3 d-flex">
      <router-link class="btn-back" :to="{ name: 'categories' }">
        <i class="icon-arrow-left"></i>
      </router-link>
      {{ isEdit ? "Edit" : "Add" }} Category
    </h2>
    <form @submit.prevent="submitForm">
      <div class="row">
      <div class="col-8">
        
          <div class="form-group">
            <label class="form-label">Category Name</label>
            <input type="text" id="name" v-model="formData.name" class="form-control" required />
          </div>

          <div class="form-group">
            <div v-for="(subcategory, index) in formData.subcategories" :key="index" class="subcategory-group">
              <label class="form-label sub-subcategory-group-heading">Subcategory {{ (index + 1)}} <button type="button" class="btn btn-danger ml-auto" @click="removeSubcategory(index)"><i class="icon-trash"></i> Remove</button></label>
              <input type="text" v-model="subcategory.name" class="form-control" :placeholder="`Subcategory ${index + 1}`" required />
              <!-- Sub-Subcategories -->
              <div class="sub-subcategory-group mt-3">
                <label class="form-label sub-subcategory-group-heading">Sub-Subcategories</label>
                <div class="form-group d-flex gap-3" v-for="(subSubcategory, subIndex) in subcategory.subSubcategories" :key="subIndex">
                  <input type="text" v-model="subSubcategory.name" class="form-control" :placeholder="`Sub-Subcategory ${subIndex + 1}`" required />
                  <button type="button" class="btn px-3 btn-danger" @click="removeSubSubcategory(index, subIndex)"><i class="icon-trash"></i></button>
                </div>
                <button type="button" class="btn btn-outline" @click="addSubSubcategory(index)">Add Sub-Subcategory</button>
              </div>
              
            </div>
            <button type="button" class="btn btn-outline" @click="addSubcategory">Add Subcategory</button>
          </div>

          <!-- Submit Button -->
          <button type="submit" class="btn">
            {{ isEdit ? "Update" : "Create" }}
          </button>
      </div>
      <div class="col-4 sticky">
        <label class="form-label">Category icon</label>
        <label class="upload">
          <input class="upload-input" title="" type="file" value="" />
          <div class="text-center">
            <img alt="" class="mx-auto" src="@/assets/images/upload.png" />
            <h4 class="my-1">Browse your image here</h4>
            <p class="text-muted m-0">Support: jpeg, png</p>
          </div>
        </label>
      </div>
    </div>
    </form>
    
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        subcategories: [],
      },
      isEdit: false,
    };
  },
  created() {
    this.isEdit = !!this.$route.params.id;
    if (this.isEdit) {
      this.fetchCategory();
    }
  },
  methods: {
    // Fetch category data for editing
    async fetchCategory() {
      const categoryId = this.$route.params.id;
      try {
        const response = await this.$axios.get(`http://localhost:3000/categories/${categoryId}`);
        this.formData = response.data;
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    },

    // Add a new subcategory
    addSubcategory() {
      this.formData.subcategories.push({
        id: crypto.randomUUID(),
        name: "",
        subSubcategories: [],
      });
    },

    removeSubcategory(index) {
      this.formData.subcategories.splice(index, 1);
    },

    addSubSubcategory(subcategoryIndex) {
      this.formData.subcategories[subcategoryIndex].subSubcategories.push({
        id: crypto.randomUUID(),
        name: "",
      });
    },

    removeSubSubcategory(subcategoryIndex, subSubcategoryIndex) {
      this.formData.subcategories[subcategoryIndex].subSubcategories.splice(subSubcategoryIndex, 1);
    },

    async submitForm() {
      const categoryId = this.$route.params.id;
      try {
        if (this.isEdit) {
          await this.$axios.put(`http://localhost:3000/categories/${categoryId}`, this.formData);
          console.log("Category updated successfully!");
        } else {
          await this.$axios.post("http://localhost:3000/categories", this.formData);
          console.log("Category created successfully!");
        }
        this.$router.push({ name: "categories" });
      } catch (error) {
        console.error("An error occurred. Please try again.:", error);
      }
    },
  },
};
</script>

<style scoped>

</style>
