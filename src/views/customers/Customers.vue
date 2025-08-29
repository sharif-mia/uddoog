<template>
  <div>
    <div class="page__title gap-xs d-flex">
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
    </div>
    <div class="card customers">
      <div v-if="customers.length != 0" class="table-responsive-md">
        <div class="xs-only">
          <DataCard v-for="customer in customers" :key="customer.id" :expanded="expandedCard === customer.id" @toggle="expandedCard = expandedCard === customer.id ? null : customer.id">
            <template #title>
              <h4>{{ customer.name }}</h4>
              <span class="d-flex align-items-center"> <i class="icon-phone ml-2"></i> {{ customer.phone }}</span>
            </template>
            <template #content>
              <div class="data-card__item">
                District <strong>{{ customer.district }}</strong>
              </div>
              <div class="data-card__item">Total Order <strong>01</strong></div>
              <div class="data-card__item">Total Amount <strong>2700TK</strong></div>
              <div class="data-card__item">Total Profit <strong>500TK</strong></div>
            </template>
            <template #actions>
              <router-link :to="{ name: 'addProducts', params: { id: customer.id } }"> <i class="icon-cart text-info"></i> Order </router-link>
              <a><i class="icon-eye"></i> View</a>
              <router-link :to="{ name: 'editCustomer', params: { id: customer.id } }"> <i class="icon-edit"></i> Edit </router-link>
              <a class="text-danger" @click.prevent="deleteItem(customer.id)"> <i class="icon-trash"></i> Remove </a>
            </template>
          </DataCard>
        </div>
        <table class="table hide-xs">
          <thead>
            <tr>
              <th>
                <label class="checkbox">
                  <input type="checkbox" v-model="selectAll" @change="toggleSelectAll(customers)" />
                  <span class="checkmark"></span>
                </label>
              </th>
              <th>Phone</th>
              <th>Customer</th>
              <th>District</th>
              <th>Total Order</th>
              <th>Total Amount</th>
              <th>Total Profit</th>
              <th class="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="customer in customers" :key="customer.id">
              <td>
                <label class="checkbox">
                  <input type="checkbox" v-model="selectedRows" :value="customer.id" @change="handleRowSelect(customers)" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td>{{ customer.phone }}</td>
              <td>{{ customer.name }}</td>
              <td>{{ customer.district }}</td>
              <td>01</td>
              <td>2700tk</td>
              <td>500tk</td>
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
    <div class="pagination d-flex align-center justify-between mt-3">
      <button class="btn btn-outline hide-xs">Previous</button>
      <el-pagination layout="prev, pager, next" :total="1000" />
      <button class="btn btn-outline hide-xs">Next</button>
    </div>
  </div>
</template>

<script>
import DataCard from "@/components/DataCard.vue";
import selectionMixin from "@/mixins/selectionMixin";

export default {
  name: "CustomerList",
  mixins: [selectionMixin],
  components: { DataCard },
  data() {
    return {
      customers: [],
      expandedCard: null,
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
        this.resetSelection();
      } catch (error) {
        console.error("Error deleting customer:", error.response ? error.response.data : error.message);
      }
    },
  },
};
</script>
