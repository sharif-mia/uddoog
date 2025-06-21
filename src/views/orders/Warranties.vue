<template>
  <h2 class="page__title">Warranty Products</h2>
  <div class="card">
    <div v-if="warranties.length != 0" class="table-responsive-md">
      <table class="table">
        <thead>
          <tr>
            <th>
              <label class="checkbox">
                <input type="checkbox" v-model="selectAll" />
                <span class="checkmark"></span> Invoice
              </label>
            </th>
            <th>Date</th>
            <th>Amount</th>
            <th>Customer</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Status</th>
            <th class="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="warranty in warranties" :key="warranty.invoice">
            <td>
              <label class="checkbox">
                <input type="checkbox" v-model="selectRow" />
                <span class="checkmark"></span> {{ warranty.invoice }}
              </label>
            </td>
            <td>
              <strong class="d-block fw-600">{{ warranty.date }}</strong
              ><small>{{ warranty.time }}</small>
            </td>
            <td>
              <strong class="fw-500">Price: <i class="icon-taka mr-1"></i>{{ warranty.price }}</strong
              ><br />O.Price: <i class="icon-taka mr-1"></i>{{ warranty.originalPrice }}
            </td>
            <td>
              <strong class="d-block fw-600">{{ warranty.phone }}</strong
              >{{ warranty.customer }}
            </td>
            <td>{{ warranty.startDate }}</td>
            <td>{{ warranty.startDate }}</td>
            <td>
              <span class="badge bg-warning" v-if="warranty.status === 'Soon'">{{ warranty.status }}</span>
              <span class="badge bg-success" v-else-if="warranty.status === 'Valid'">{{ warranty.status }}</span>
              <span class="badge bg-danger" v-else-if="warranty.status === 'Expired'">{{ warranty.status }}</span>
            </td>
            <td class="text-right">
              <router-link v-if="warranty.status === 'Expired' || warranty.status === 'Soon' || warranty.status === 'Valid'" class="btn-edit" :to="{ name: 'orders' }">
                <i class="icon-eye"></i>
              </router-link>
              <a class="text-danger" @click.prevent="deleteItem(warranty.invoice)"><i class="icon-trash"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else><h3>There is no warranty Products</h3></div>
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
      warranties: [],
      currentPage: 1,
      totalPages: 10,
    };
  },
  mounted() {
    this.fetchWarranties();
  },
  methods: {
    async fetchWarranties() {
      try {
        const response = await this.$axios.get("http://localhost:3000/warranties");
        this.warranties = response.data;
      } catch (error) {
        console.error("Error fetching warranties:", error);
        throw error;
      }
    },
    async deleteItem(invoiceId) {
      try {
        await this.$axios.delete(`http://localhost:3000/warranties/${invoiceId}`);
        this.warranties = this.warranties.filter((warranty) => warranty.invoice !== invoiceId);
        console.log("success");
      } catch (error) {
        console.error("Error deleting invoice:", error.response ? error.response.data : error.message);
      }
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
.icon-taka {
  font-size: 12px;
}
h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
