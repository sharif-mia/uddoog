<template>
  <div>
    <h2 class="page__title d-flex">
      Users
      <div class="d-flex ml-auto gap-3">
        <a class="btn btn-outline">
          <i class="icon-filter"></i>
          <span>Filter</span>
        </a>
        <router-link class="btn" :to="{ name: 'addUser' }">
          <i class="icon-plus"></i>
          <span>New</span>
        </router-link>
      </div>
    </h2>
    <div class="card">
      <div v-if="users.length != 0" class="table-responsive-md">
        <table class="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Permission</th>
              <th class="text-center">Total Order</th>
              <th>Status</th>
              <th>Last Login</th>
              <th class="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="user in users" :key="user.id">
              <td>
                <h4 class="user-info">
                  {{ user.name }} <span class="d-block">{{ user.phone }}</span>
                </h4>
              </td>
              <td>
                <div class="permissions">
                  <el-tag
                  v-for="(tag, index) in permissionTags(user)" 
                  :key="index"
                  type="primary"
                >
                  {{ tag }}
                </el-tag>
                </div>
              </td>
              <td class="text-center">01</td>
              <td>
                <span class="badge" :class="user.status ? 'bg-success' : 'bg-danger'">
                  {{ user.status ? "Active" : "Inactive" }}
                </span>
              </td>
              <td>Jan 6, 2024,<br> 12:23 PM</td>
              <td class="text-right">
                <router-link class="btn btn-outline user-log" :to="{ name: 'logUser', params: { id: user.id } }">
                  <i class="icon-user"></i> Log
                </router-link>
                <router-link class="btn-edit" :to="{ name: 'editUser', params: { id: user.id } }">
                  <i class="icon-edit"></i>
                </router-link>
                <a class="text-danger" @click.prevent="deleteItem(user.id)"><i class="icon-trash"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else><h3>There is no users</h3></div>
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
  name: "userList",
  data() {
    return {
      users: [],
    };
  },
  mounted() {
    this.getUsers();
  },
  methods: {
    permissionTags(user) {
      if (!user?.permissions) return [];

      const { customer, product, support, tracking, notification, others } = user.permissions;
      return [
        customer?.add && "Add Customer",
        customer?.edit && "Edit Customer",
        customer?.delete && "Delete Customer",
        product?.add && "Add Product",
        product?.edit && "Edit Product",
        product?.delete && "Delete Product",
        support?.add && "Add Support",
        support?.edit && "Edit Support",
        support?.delete && "Delete Support",
        tracking?.yes && "Tracking",
        notification?.yes && "Notifications",
        notification?.canDelete && "Delete Notifications",
        others?.warranty && "Warranty",
        others?.transaction && "Transaction",
        others?.wishList && "Wish List"
      ].filter(Boolean);
    },

    async getUsers() {
      try {
        const response = await this.$axios.get("http://localhost:3000/users");
        this.users = response.data;
        console.log(this.users);
      } catch (error) {
        console.log("error", error);
      }
    },

    async deleteItem(userId) {
      try {
        await this.$axios.delete(`http://localhost:3000/users/${userId}`);
        this.users = this.users.filter((user) => user.id !== userId);
        console.log("success");
      } catch (error) {
        console.error("Error deleting user:", error.response ? error.response.data : error.message);
      }
    },
  },
};
</script>
<style scoped>
.user-info{
  font-size: 1rem;
}
.user-info span{
  font-size: .9rem;
  font-weight: normal;
  color:dimgray
}
.user-log{
     padding: 0.25rem .5rem;
     font-size: .9rem!important;
}
</style>