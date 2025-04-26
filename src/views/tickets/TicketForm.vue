<template>
  <h2 class="page__title gap-3 d-flex">
    <router-link class="btn-back" :to="{ name: 'tickets' }">
      <i class="icon-arrow-left"></i>
    </router-link>
    Open Ticket
  </h2>
  <form @submit.prevent="submitTicket">
    <div class="row">
      <div class="col-8">
        <div class="form-group">
          <select v-model="formData.orderIssue" required class="form-control">
            <option value="">Order Issues</option>
            <option v-for="issue in orderIssues" :key="issue.id" :value="issue.issue">{{ issue.issue }}</option>
          </select>
        </div>
        <div class="form-group">
          <select v-model="formData.orderId" required class="form-control">
            <option value="">Select an Order</option>
            <option v-for="order in orders" :key="order.id" :value="order.id">Order #{{ order.id }} - {{ order.date }}</option>
          </select>
        </div>
        <div class="form-group">
          <textarea name="" v-model="formData.description" placeholder="Description (optional)" class="form-control"></textarea>
        </div>
        <div class="form-group">
          <input  type="file" @change="handleFileUpload" multiple />
          <small>Allowed File Extensions: .jpg, .gif, .jpeg, .png (Max size: 10MB)</small>
        </div>
        <button type="submit" class="btn">Submit</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "TicketForm",
  data() {
    return {
      orderIssues: [
        {
          id: 1,
          issue: "Payment failure",
        },
        {
          id: 2,
          issue: "Wrong item received",
        },
        {
          id: 3,
          issue: "Delayed delivery",
        },
      ],
      orders: [
        { id: "ORD-1001", date: "Jan 5, 2024" },
        { id: "ORD-1002", date: "Jan 6, 2024" },
        { id: "ORD-1003", date: "Jan 7, 2024" },
      ],
      formData: {
        orderIssue: "",
        orderId: "",
        description: "",
        files: [],
      },
    };
  },
  methods: {
    handleFileUpload(event) {
      this.formData.files = Array.from(event.target.files);
    },
    async submitTicket() {
      try {
        const ticketData = {
          type: "Support",
          orderIssue: `${ this.formData.orderIssue}`,
          subject: `Issue with Order ${this.formData.orderId}`,
          status: "OPEN",
          lastUpdated: new Date().toISOString(),
          description: this.formData.description,
        };

        await this.$axios.post("http://localhost:3000/tickets", ticketData);
        this.formData = { ...this.$options.data().formData };
        this.$router.push({ name: "tickets" });
      } catch (error) {
        console.error("Error submitting ticket:", error);
      }
    },
  },
};
</script>

<style scoped>
small {
  font-size: 80%;
}
</style>
