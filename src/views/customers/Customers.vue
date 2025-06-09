<template>
  <div>
    <h2 class="page__title d-flex">
      Customers
      <div class="d-flex ml-auto gap-3">
        <a class="btn btn-outline">
          <i class="icon-filter"></i>
          <span>Filter</span>
        </a>
        <router-link class="btn" :to="{ name: 'addCustomer' }">
          <i class="icon-plus"></i>
          <span>New</span>
        </router-link>
      </div>
    </h2>
    <div class="card">
      <div v-if="customers.length != 0" class="table-responsive-md">
        <table class="table">
          <thead>
            <tr>
              <th>
                <label class="checkbox">
                  <input type="checkbox" v-model="selectAll" />
                  <span class="checkmark"></span>
                </label>
              </th>
              <th>Phone</th>
              <th>Customer</th>
              <th>District</th>
              <th>Order</th>
              <th>Amount</th>
              <th class="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td>
                <label class="checkbox">
                  <input type="checkbox" v-model="selectRow" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td>{{ customer.phone }}</td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.district }}</td>
              <td>01</td>
              <td>2700tk</td>
              <td class="text-right">
                <router-link class="btn-edit text-info" :to="{ name: 'addProducts', params: { id: customer.id } }">
                  <i class="icon-cart"></i>
                </router-link>
                <a><i class="icon-eye"></i></a>
                <router-link class="btn-edit" :to="{ name: 'editCustomer', params: { id: customer.id } }">
                  <i class="icon-edit"></i>
                </router-link>
                <a class="text-danger" @click.prevent="deleteItem(customer.id)"><i class="icon-trash"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div v-else><h3>There is no customers</h3></div>
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
  name: "CustomerList",
  data() {
    return {
      customers: [],
    };
  },
  mounted() {
    this.getCustomers();
  },
  methods: {
    async getCustomers() {
      try {
        const response = await this.$axios.get("http://localhost:3000/customers");
        this.customers = response.data;
        console.log(this.customers);
      } catch (error) {
        console.log("error", error);
      }
    },
    async deleteItem(customerId) {
      try {
        await this.$axios.delete(`http://localhost:3000/customers/${customerId}`);
        this.customers = this.customers.filter((customer) => customer.id !== customerId);
        console.log("success");
      } catch (error) {
        console.error("Error deleting customer:", error.response ? error.response.data : error.message);

      }
    },
  },
};
</script>
