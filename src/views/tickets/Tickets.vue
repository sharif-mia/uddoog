<template>
  <h2 class="page__title d-flex">
    Tickets
    <div class="d-flex gap-3 ml-auto">
      <a class="btn btn-outline">
        <i class="icon-filter"></i>
        <span>Filter</span>
      </a>
      <router-link class="btn" :to="{ name: 'addTicket' }">
        <i class="icon-plus"></i>
        <span>New</span>
      </router-link>
    </div>
  </h2>
  <div class="card">
    <div v-if="tickets.length != 0" class="table-responsive-md">
      <table class="table">
        <thead>
          <tr>
            <th>Type</th>
            <th>Subject</th>
            <th>Status</th>
            <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ticket in tickets" :key="ticket.id">
            <td>{{ ticket.type }}</td>
            <td>
              <router-link class="text-black fw-500" :to="{ name: 'ticketDetails', params: { id: ticket.id } }">
                <h3>{{ ticket.orderIssue }}</h3>{{ ticket.subject }}
                </router-link> </td>
            <td>
               <span class="badge text-warning" v-if="ticket.status === 'OPEN'">{{ ticket.status }}</span>
               <span class="badge text-success" v-else-if="ticket.status === 'Closed'">{{ ticket.status }}</span>
               <span class="badge text-danger" v-else-if="ticket.status === 'Pending'">{{ ticket.status }}</span>
               <span class="badge text-primary" v-else-if="ticket.status === 'Cancel'">{{ ticket.status }}</span>
              </td>
            <td>{{ formatDate(ticket.lastUpdated) }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else><h3>There is no tickets</h3></div>
  </div>
  <div class="d-flex align-center justify-between mt-3">
    <button class="btn btn-outline" @click="previousPage">Previous</button>
    <!-- <span>{{ currentPage }} of {{ totalPages }}</span> -->
    <el-pagination layout="prev, pager, next" :total="1000" />
    <button class="btn btn-outline" @click="nextPage">Next</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tickets: [],
      currentPage: 1,
      totalPages: 10,
    };
  },
  mounted() {
    this.fetchTickets();
  },
  methods: {
    async fetchTickets() {
      try {
        const response = await this.$axios.get("http://localhost:3000/tickets");
        this.tickets = response.data;
      } catch (error) {
        console.error("Error fetching tickets:", error);
        throw error;
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    previousPage() {
      if (this.currentPage > 1) this.currentPage--;
    },
    nextPage() {
      if (this.currentPage < this.totalPages) this.currentPage++;
    },
  },
};
</script>
<style scoped>
h3 {
    margin: 0;
    font-size: .875rem;
    font-weight: 600;
}
</style>
