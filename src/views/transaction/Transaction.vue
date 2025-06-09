<template>
  <h1 class="page__title d-flex mt-0">Transaction History</h1>

  <div class="row">
    <div class="col-7">
      <form class="transaction__form">
    <el-radio-group v-model="filterBy" aria-label="filterBy control">
      <el-radio-button value="Weekly">Weekly</el-radio-button>
      <el-radio-button value="Monthly">Monthly</el-radio-button>
    </el-radio-group>
    <el-date-picker v-model="filterDate" type="daterange" range-separator="To" start-placeholder="Start date" end-placeholder="End date" :size="size" />
  </form>
    </div>
  </div>

  <div class="mt-4" v-if="transactions.length != 0">
    <div class="card">
      <div class="transactions table-responsive-md">
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
              <th>Amount</th>
              <th>Transfer To</th>
              <th>Status</th>
              <th class="text-right">Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in transactions" :key="transaction.id">
              <td>
                <label class="checkbox">
                  <input type="checkbox" v-model="selectRow" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td>{{ formatDate(new Date(transaction.date)) }}</td>
              <td>
                <strong class="cashAmount"> <i class="icon-arrow-right" :class="transaction.type === 'CashIn' ? 'cashIn' : 'cashOut'"></i>{{ transaction.amount }} TK</strong>
              </td>
              <td>{{ transaction.transferTo }}</td>
              <td>
                <span class="badge bg-success" v-if="transaction.status === 'Successful'">{{ transaction.status }}</span>
                <span class="badge bg-warning" v-else-if="transaction.status === 'Pending'">{{ transaction.status }}</span>
                <span class="badge bg-danger" v-else>{{ transaction.status }}</span>
              </td>
              <td class="text-right">
                <a class="btn-delete" @click.prevent="deleteItem(transaction.id)"><i class="icon-trash"></i></a>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="d-flex align-center justify-between mt-3">
      <button class="btn btn-outline">Previous</button>
      <el-pagination layout="prev, pager, next" :total="1000" />
      <button class="btn btn-outline">Next</button>
    </div>
  </div>
  <div v-else><h3>There is no transactions</h3></div>
</template>

<script>
export default {
  name: "Transactions",
  data() {
    return {
      filterDate: "",
      filterBy: "Weekly",
      transactions: [
        {
          id: 1,
          date: "2023-10-24T14:25:00",
          amount: 2000,
          transferTo: "bKash",
          status: "Successful",
          type: "CashIn",
        },
        {
          id: 2,
          date: "2023-10-25T09:15:00",
          amount: "1500",
          transferTo: "bKash",
          status: "Successful",
          type: "CashOut",
        },
        {
          id: 3,
          date: "2023-10-26T11:45:00",
          amount: "3000",
          transferTo: "Nagad",
          status: "Pending",
          type: "CashIn",
        },
        {
          id: 4,
          date: "2023-10-27T16:30:00",
          amount: "2500",
          transferTo: "bKash",
          status: "Failed",
          type: "CashOut",
        },
      ],
    };
  },

  methods: {
    setTab(tab) {
      this.currentTab = tab;
    },
    formatDate(date) {
      const options = { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false };
      const formattedDate = date.toLocaleString("en-GB", options).replace(",", ""); // Remove comma for formatting
      return formattedDate;
    },

    async deleteItem(transactionId) {},
  },
};
</script>

<style scoped>
.el-radio-button {
  margin-bottom: 0;
}
</style>
