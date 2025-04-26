<template>
  <div>
    <h2 class="page__title d-flex">
      Categories
      <router-link class="ml-auto btn btn-outline" :to="{ name: 'addCategory' }">
        <i class="icon-plus"></i>
        <span>New</span>
      </router-link>
    </h2>
    <div class="card">
      <div v-if="categories.length != 0" class="table-responsive-md">
        <table class="table">
          <thead>
            <tr>
              <th>
                <label class="checkbox">
                  <input type="checkbox" v-model="selectAll" />
                  <span class="checkmark"></span>
                </label>
              </th>
              <th>Category</th>
              <th>Sub Category</th>
              <th>Sub Sub Category</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="{ id, name, subcategories } in categories" :key="id">
              <td>
                <label class="checkbox">
                  <input type="checkbox" v-model="selectRow" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td>{{ name }}</td>
              <td>
                <span class="badge" v-for="{ id, name } in subcategories" :key="id">
                  {{ name }}
                </span>
              </td>
              <td>
                <div v-for="{ subSubcategories, id } in subcategories" :key="id">
                  <div  class="badge"  v-for="{ id, name } in subSubcategories" :key="id">
                    {{ name }}
                  </div>
                </div>
              </td>
              <td>
                <router-link class="btn-edit" :to="{ name: 'editCategory', params: { id } }">
                  <i class="icon-edit"></i>
                </router-link>
                <a class="text-danger" @click.prevent="deleteItem(id)"><i class="icon-trash"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else><h3>There is no categories</h3></div>
    </div>
    <div class="d-flex align-center justify-between mt-3">
      <button class="btn btn-outline">Previous</button>
      <el-pagination layout="prev, pager, next" :total="1000" />
      <button class="btn btn-outline">Next</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      categories: [],
      selectRow: "",
    };
  },
  mounted() {
    this.fetchCategory();
  },
  methods: {
    async fetchCategory() {
      try {
        const response = await this.$axios.get(`http://localhost:3000/categories`);
        this.categories = response.data;
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    },
    async deleteItem(categoryId) {
      try {
        await this.$axios.delete(`http://localhost:3000/categories/${categoryId}`);
        this.categories = this.categories.filter((category) => category.id !== categoryId);
        console.log("success");
      } catch (error) {
        console.log("Error deleting category:", error);
      }
    },
  },
};
</script>
<style scoped>
.badge:not(:last-child){
  margin-right: .5rem;
  margin-bottom: .5rem;
}
</style>

