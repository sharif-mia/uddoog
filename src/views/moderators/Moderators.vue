<template>
  <div>
    <h2 class="page__title d-flex">
      Moderators
      <div class="d-flex ml-auto gap-3">
        <a class="btn btn-outline">
          <i class="icon-filter"></i>
          <span>Filter</span>
        </a>
        <router-link class="btn" :to="{ name: 'addModerator' }">
          <i class="icon-plus"></i>
          <span>New</span>
        </router-link>
      </div>
    </h2>
    <div class="card">
      <div v-if="moderators.length != 0" class="table-responsive-md">
        <table class="table">
          <thead>
            <tr>
              <th>Moderator</th>
              <th>Permission</th>
              <th class="text-center">Total Order</th>
              <th>Status</th>
              <th>Last Login</th>
              <th class="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="moderator in moderators" :key="moderator.id">
              <td>
                <h4 class="user-info">
                  {{ moderator.name }} <span class="d-block">{{ moderator.phone }}</span>
                </h4>
              </td>
              <td>
                <div class="permissions">
                  <el-tag
                  v-for="(tag, index) in permissionTags(moderator)" 
                  :key="index"
                  type="info"
                >
                  {{ tag }}
                </el-tag>
                </div>
              </td>
              <td class="text-center">01</td>
              <td>
                <span class="badge" :class="moderator.status ? 'bg-success' : 'bg-danger'">
                  {{ moderator.status ? "Active" : "Inactive" }}
                </span>
              </td>
              <td>Jan 6, 2024,<br> 12:23 PM</td>
              <td class="text-right">
                <router-link class="btn btn-outline user-log" :to="{ name: 'logModerator', params: { id: moderator.id } }">
                  <i class="icon-user"></i> Log
                </router-link>
                <router-link class="btn-edit" :to="{ name: 'editModerator', params: { id: moderator.id } }">
                  <i class="icon-edit"></i>
                </router-link>
                <a class="text-danger" @click.prevent="deleteItem(moderator.id)"><i class="icon-trash"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else><h3>There is no moderators</h3></div>
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
  name: "moderatorList",
  data() {
    return {
      moderators: [],
    };
  },
  mounted() {
    this.getmoderators();
  },
  methods: {
    permissionTags(moderator) {
      if (!moderator?.permissions) return [];

      const { customer, product, support, tracking, notification, others } = moderator.permissions;
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

    async getmoderators() {
      try {
        const response = await this.$axios.get("http://localhost:3000/moderators");
        this.moderators = response.data;
        console.log(this.moderators);
      } catch (error) {
        console.log("error", error);
      }
    },

    async deleteItem(moderatorId) {
      try {
        await this.$axios.delete(`http://localhost:3000/moderators/${moderatorId}`);
        this.moderators = this.moderators.filter((moderator) => moderator.id !== moderatorId);
        console.log("success");
      } catch (error) {
        console.error("Error deleting moderator:", error.response ? error.response.data : error.message);
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
.el-tag.el-tag--info {
    color: #4b5563;
}
</style>