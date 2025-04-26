<template>
  <h1 class="page__title d-flex">Payments</h1>
  <div class="payment__info" v-if="editPayments === false">
    <div class="row align-items-center">
      <div class="col-8">
        <h2>Payment Transfer to</h2>
        <div class="payment__info-inner align-items-center">
          <div class="payment__info-img">
            <img src="@/assets/images/bkash.svg" alt="" />
          </div>
          <div class="payment__info-ontent">
            <h3>bKash Number : 017798767865 <span> Set since : Dec 19, 2024 </span></h3>
          </div>
        </div>
        <p class="d-flex align-center gap-3 text-primary"><i class="icon-calendar"></i>Auto cash disbursements every sunday enable</p>
        <button type="button" @click="editPayments = true" class="btn"><i class="icon-edit"></i> Edit</button>
      </div>
    </div>
  </div>
  <form class="payment__form" v-if="editPayments">
    <div class="row">
      <div class="col-8">
        <h3>Select Payment Type</h3>
        <div class="notification__tab d-flex">
          <button class="mr-3" @click.prevent="setTab('bKash')" :class="{ active: currentTab === 'bKash' }"><img src="@/assets/images/bkash.svg" alt="" /> Bkash</button>
          <button @click.prevent="setTab('bank')" :class="{ active: currentTab === 'bank' }"><img height="24" src="@/assets/images/bank.svg" alt="" /> Bank Transfer</button>
        </div>
        <div v-if="currentTab === 'bKash'">
          <div class="form-group mt-3">
            <label class="form-label">bKash Number</label>
            <input type="number" class="form-control" />
          </div>
        </div>
        <div v-if="currentTab === 'bank'">
          <div class="form-group">
            <label class="form-label">Cardholder Name</label>
            <input type="number" class="form-control" />
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">Card number</label>
                <input type="number" class="form-control" />
              </div>
            </div>
            <div class="col-3">
              <div class="form-group">
                <label class="form-label">Card Expire</label>
                <input type="number" class="form-control" />
              </div>
            </div>
            <div class="col-3">
              <div class="form-group">
                <label class="form-label">CVC</label>
                <input type="number" class="form-control" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="form-group">
      <label class="checkbox">
        <input type="checkbox" name="payment" />
        <div class="checkmark"></div>
        Auto Cash Disbursement (Sunday) <small class="d-block text-muted">Earnings are automatically transferred to your account every Sunday</small>
      </label>
    </div>
    <button class="btn" @click="editPayments = false" type="button">Submit</button>
  </form>

  <div class="mt-3" v-if="payments.length != 0">
    <div class="card">
      <div class="table-responsive-md">
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
            <tr v-for="payment in payments" :key="payment.id">
              <td>
                <label class="checkbox">
                  <input type="checkbox" v-model="selectRow" />
                  <span class="checkmark"></span>
                </label>
              </td>
              <td>{{ formatDate(new Date(payment.date)) }}</td>
              <td>{{ payment.amount }}</td>
              <td>{{ payment.transferTo }}</td>
              <td>
                <span class="badge text-success" v-if="payment.status === 'Successful'">{{ payment.status }}</span>
                <span class="badge text-warning" v-else-if="payment.status === 'Pending'">{{ payment.status }}</span>
                <span class="badge text-danger" v-else>{{ payment.status }}</span>
              </td>
              <td class="text-right">
                <a class="btn-view"><i class="icon-eye"></i></a>
                <a class="btn-delete" @click.prevent="deleteItem(payment.id)"><i class="icon-trash"></i></a>
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
  <div v-else><h3>There is no Payments</h3></div>
</template>

<script>
export default {
  name: "Payments",
  data() {
    return {
      editPayments: false,
      currentTab: "bKash",
      payments: [
        {
          id: 1,
          date: "2023-10-24T14:25:00",
          amount: "2000 Tk",
          transferTo: "bKash",
          status: "Successful",
        },
        {
          id: 2,
          date: "2023-10-25T09:15:00",
          amount: "1500 Tk",
          transferTo: "bKash",
          status: "Successful",
        },
        {
          id: 3,
          date: "2023-10-26T11:45:00",
          amount: "3000 Tk",
          transferTo: "Nagad",
          status: "Pending",
        },
        {
          id: 4,
          date: "2023-10-27T16:30:00",
          amount: "2500 Tk",
          transferTo: "bKash",
          status: "Failed",
        },
      ],
    };
  },
  mounted() {},
  computed: {},

  methods: {
    setTab(tab) {
      this.currentTab = tab;
    },
    formatDate(date) {
      const options = { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hour12: false };
      const formattedDate = date.toLocaleString("en-GB", options).replace(",", ""); // Remove comma for formatting
      return formattedDate;
    },

    async deleteItem(paymentId) {},
  },
};
</script>

<style scoped>

</style>
