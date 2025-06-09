<template>
  <div>
    <h2 class="page__title gap-3 d-flex">
        <router-link class="btn-back" :to="{ name: 'users' }">
        <i class="icon-arrow-left"></i>
      </router-link>
      Log Details for {{ user.name }}
      <div class="d-flex ml-auto gap-3">
        <a class="btn btn-outline">
          <i class="icon-filter"></i>
          <span>Filter</span>
        </a>
      </div>
    </h2>
    <div class="card">
      <div v-if="userLogs.length != 0" class="table-responsive-md">
        <table class="table">
          <thead>
            <tr>
                <th>
                  <label class="checkbox">
                    <input type="checkbox" v-model="selectAll" />
                    <span class="checkmark"></span>
                  </label>
                </th>
              <th>Date</th>
              <th>Log In</th>
              <th>Log Out</th>
              <th>IP Address</th>
              <th>Location</th>
              <th>Browser</th>
              <th class="text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            <tr v-for="(user, index) in userLogs" :key="index">
                <td>
                  <label class="checkbox">
                    <input type="checkbox" v-model="selectRow" />
                    <span class="checkmark"></span>
                  </label>
                </td>
              <td>
                {{ user.date }}
              </td>
              <td>
                {{ user.logIn }}
              </td>
              <td>{{ user.logOut }}</td>
              <td>
                {{ user.ipAddress }}
              </td>
              <td>
                <span v-if="user.area">{{ user.area }}</span>
                <span v-else>Loading...</span>
              </td>
              <td>{{ user.browser }}</td>
              <td class="text-right">
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
      user: {},
      userLogs: [],
    };
  },
  mounted() {
    this.getUsers();
    this.getUserLogs();
  },
  methods: {
    async getUsers() {
      const userId = this.$route.params.id;
      try {
        const response = await this.$axios.get(`http://localhost:3000/users/${userId}`);
        this.user = response.data;
      } catch (error) {
        console.log("error", error);
      }
    },
    async getUserLogs() {
      try {
        const response = await this.$axios.get("http://localhost:3000/userLogs");
        const logs = response.data;

        for (const log of logs) {
          const area = await this.getLocationName(log.location.latitude, log.location.longitude);
          log.area = area;
        }

        this.userLogs = logs;
      } catch (error) {
        console.log("error", error);
      }
    },
    async getLocationName(lat, lon) {
      try {
        const response = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
        const data = await response.json();
        const address = data.address;
        return address.suburb || address.city || address.town || address.village || address.state || address.country || "Unknown";
      } catch (error) {
        console.error("Geocoding failed:", error);
        return "Unavailable";
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
.user-log {
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem !important;
}
</style>
