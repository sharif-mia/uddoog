<template>
  <div>
    <h2 class="page__title gap-3 d-flex">
      <router-link class="btn-back" :to="{ name: 'moderators' }">
        <i class="icon-arrow-left"></i>
      </router-link>
      Logs of {{ moderator.name }}
      <div class="d-flex ml-auto gap-3">
        <a class="btn btn-outline">
          <i class="icon-filter"></i>
          <span>Filter</span>
        </a>
      </div>
    </h2>
    <div class="card">
      <div v-if="moderatorLogs.length != 0" class="table-responsive-md">
        <div class="xs-only">
          <DataCard v-for="moderator in moderatorLogs" :key="moderator.id" :expanded="expandedCard === moderator.id" @toggle="expandedCard = expandedCard === moderator.id ? null : moderator.id">
            <template #title>
              <h4>{{ moderator.area }}</h4>
              <span class="d-flex align-items-center"> <i class="icon-calendar mr-2"></i> {{ moderator.date }}</span>
            </template>
            <template #content>
              <div class="data-card__item">Log In <strong> {{ moderator.logIn }}</strong></div>
              <div class="data-card__item">
                Log Out
                <strong>{{ moderator.logOut }}</strong>
              </div>
              <div class="data-card__item data-card__item-full">
                IP Address <strong> {{ moderator.ipAddress }}</strong>
              </div>

              <div class="data-card__item data-card__item-full">
                Browser
                <strong> {{ moderator.browser }}</strong>
              </div>
            </template>
            <template #actions>
              <a class="text-danger" @click.prevent="deleteItem(moderator.id)"><i class="icon-trash"></i>Delete</a>
            </template>
          </DataCard>
        </div>

        <table class="table hide-xs">
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
            <tr v-for="(moderator, index) in moderatorLogs" :key="index">
              <td>
                <label class="checkbox">
                  <input type="checkbox" v-model="selectRow" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td>
                {{ moderator.date }}
              </td>
              <td>
                {{ moderator.logIn }}
              </td>
              <td>{{ moderator.logOut }}</td>
              <td>
                {{ moderator.ipAddress }}
              </td>
              <td>
                <span v-if="moderator.area">{{ moderator.area }}</span>
                <span v-else>Loading...</span>
              </td>
              <td>{{ moderator.browser }}</td>
              <td class="text-right">
                <a class="text-danger" @click.prevent="deleteItem(moderator.id)"><i class="icon-trash"></i> </a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else><h3>There is no moderators</h3></div>
    </div>
    <div class="pagination d-flex align-center justify-between mt-3">
      <button class="btn btn-outline hide-xs">Previous</button>
      <el-pagination layout="prev, pager, next" :total="1000" />
      <button class="btn btn-outline hide-xs">Next</button>
    </div>
  </div>
</template>

<script>
import DataCard from "@/components/DataCard.vue";
export default {
  name: "moderatorList",
  components: { DataCard },
  data() {
    return {
      moderator: {},
      expandedCard: null,
      moderatorLogs: [],
    };
  },
  mounted() {
    this.getModerators();
    this.getModeratorLogs();
  },
  methods: {
    async getModerators() {
      const moderatorId = this.$route.params.id;
      try {
        const response = await this.$axios.get(`http://localhost:3000/moderators/${moderatorId}`);
        this.moderator = response.data;
      } catch (error) {
        console.log("error", error);
      }
    },
    async getModeratorLogs() {
      try {
        const response = await this.$axios.get("http://localhost:3000/moderatorLogs");
        const logs = response.data;

        for (const log of logs) {
          const area = await this.getLocationName(log.location.latitude, log.location.longitude);
          log.area = area;
        }

        this.moderatorLogs = logs;
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
.moderator-log {
  padding: 0.25rem 0.5rem;
  font-size: 0.9rem !important;
}
</style>
