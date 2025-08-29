<template>
  <div>
    <div class="page__title d-flex">
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
    </div>
    <div class="card">
      <div v-if="moderators.length != 0" class="table-responsive-md">
        <div class="xs-only">
          <DataCard v-for="moderator in moderators" :key="moderator.id" :expanded="expandedCard === moderator.id" @toggle="expandedCard = expandedCard === moderator.id ? null : moderator.id">
            <template #title>
              <h4>{{ moderator.name }}</h4>
              <span class="d-flex align-items-center"> <i class="icon-phone mr-2"></i> {{ moderator.phone }}</span>
            </template>
            <template #content>
              <div class="data-card__item">Total Order <strong> 01</strong></div>
              <div class="data-card__item">
                <div>Status</div>
                <span class="badge" :class="moderator.status ? 'bg-success' : 'bg-danger'">
                  {{ moderator.status ? "Active" : "Inactive" }}
                </span>
              </div>
              <div class="data-card__item data-card__item-full">
                Last Login <strong>Jan 6, 2024, <span>12:23 PM</span></strong>
              </div>

              <div class="data-card__item data-card__item-full">
                Permissions
                <div class="permissions mt-3">
                  <el-tag v-for="(tag, index) in permissionTags(moderator)" :key="index" type="info">
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </template>
            <template #actions>
              <router-link class="btn-edit" :to="{ name: 'logModerator', params: { id: moderator.id } }"> <i class="icon-receipt"></i> Log </router-link>
              <router-link class="btn-edit" :to="{ name: 'editModerator', params: { id: moderator.id } }"> <i class="icon-edit"></i> Edit </router-link>
              <a class="text-danger" @click.prevent="deleteItem(moderator.id)"><i class="icon-trash"></i> Delete</a>
            </template>
          </DataCard>
        </div>
        <table class="table hide-xs">
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
                  <el-tag v-for="(tag, index) in permissionTags(moderator)" :key="index" type="info">
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
              <td>
                <h4 class="user-info m-0">Jan 6, 2024, <span class="d-block">12:23 PM</span></h4>
              </td>
              <td class="text-right">
                <router-link class="btn-edit" :to="{ name: 'logModerator', params: { id: moderator.id } }">
                  <i class="icon-receipt"></i>
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
    <Pagination />
  </div>
</template>

<script>
import DataCard from "@/components/DataCard.vue";
import Pagination from "@/components/Pagination.vue";
export default {
  name: "ModeratorList",
  components: {
    Pagination,
    DataCard,
  },
  data() {
    return {
      moderators: [],
      expandedCard: null,
    };
  },
  mounted() {
    this.getmoderators();
  },
  methods: {
    permissionTags(moderator) {
      if (!moderator?.permissions) return [];

      const { customer, product, support, tracking, notification, others } = moderator.permissions;
      return [customer?.add && "Add Customer", customer?.edit && "Edit Customer", customer?.delete && "Delete Customer", product?.add && "Add Product", product?.edit && "Edit Product", product?.delete && "Delete Product", support?.add && "Add Support", support?.edit && "Edit Support", support?.delete && "Delete Support", tracking?.yes && "Tracking", notification?.yes && "Notifications", notification?.canDelete && "Delete Notifications", others?.warranty && "Warranty", others?.moderator && "moderator", others?.wishList && "Wish List"].filter(Boolean);
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
.user-info {
  font-size: 0.9rem;
}
.user-info span {
  font-size: 0.9rem;
  font-weight: normal;
  color: dimgray;
}

.el-tag.el-tag--info {
  color: #4b5563;
}
</style>
