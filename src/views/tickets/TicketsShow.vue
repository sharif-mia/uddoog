<template>
  <h2 class="page__title gap-3 d-flex">
    <router-link class="btn-back" :to="{ name: 'tickets' }">
      <i class="icon-arrow-left"></i>
    </router-link>
    Ticket #{{ ticket.id }} - {{ ticket.subject }}
  </h2>
  <div class="ticket">
    <div class="ticket__header mb-3">
      <p>This ticket is {{ ticket.status }}. You may reply to this ticket to reopen it.</p>
      <button class="btn">Reply</button>
    </div>

    <div class="row">
      <div class="col-8">
        <div class="message message--agent">
          <div class="message__meta">
            <span class="message__author">Agent Name: Sarah Jones</span>
            <span class="message__time">November 9, 2024, 10:35 AM</span>
          </div>
          <div class="message__content">
            <p>Dear Mr. Kazi Zaman,</p>
            <p>Thank you for contacting us about your recent order. We sincerely apologize that you received the wrong item. This is certainly not the experience we want our customers to have.</p>
            <p>We have checked your order details and confirmed that you had indeed ordered the "Blue Widget" (BW123). Rest assured, we will ship out the correct item to you immediately. You can expect to receive it within [standard shipping time frame].</p>
            <p>To return the "Red Widget" (RW456), please repackage it in the original shipping box. If you have any further questions, please don't hesitate to contact us.</p>
            <p>Sincerely,<br />Sarah Jones<br />Customer Support Agent</p>
          </div>
        </div>

        <div class="message message--customer">
          <div class="message__meta">
            <span class="message__author">Mr. Kazi Zaman</span>
            <span class="message__time">November 9, 2024, 10:35 AM</span>
          </div>
          <div class="message__content">
            <p>Hello,</p>
            <p>I received my order (#87654) today, but unfortunately, it seems the wrong item was sent. I ordered the "Blue Widget" (product code: BW123), but I received the "Red Widget" (product code: RW456) instead.</p>
            <p>Could you please help me with getting the correct item?</p>
          </div>
          <ul class="message__attachments">
            <li class="message__attachment"><a href="#">invoice-87654.pdf</a></li>
            <li class="message__attachment"><a href="#">damaged-widget.jpg</a></li>
          </ul>
        </div>
      </div>

      <div class="col-4 sticky">
        <div class="customer-info">
          <h3 class="ticket__info-title mb-3">Ticket Information</h3>
          
          <div class="form-group d-flex gap-3">
            <i class="icon-user mr-2"></i>
            <div>
              <label class="form-label">Requestor</label>
              <p>Md . Imran Kamal Mia</p>
            </div>
          </div>

          
          <div class="form-group d-flex gap-3">
            <i class="icon-apps mr-2"></i>
            <div>
              <label class="form-label">Department</label>
              <p>Support</p>
            </div>
          </div>

          <div class="form-group d-flex gap-3">
            <i class="icon-calendar mr-2"></i>
            <div>
              <label class="form-label">Submitted</label>
              <p>01/08/2024 (08:24)</p>
            </div>
          </div>
          <div class="form-group d-flex gap-3">
            <i class="icon-clock mr-2"></i>
            <div>
              <label class="form-label">Last Updated</label>
              <p>3 minute ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "showTickets",
  data() {
    return {
      ticket: {},
    };
  },

  created() {
    this.fetchTicket();
  },
  methods: {
    async fetchTicket() {
      const ticketId = this.$route.params.id;
      try {
        const response = await this.$axios.get(`http://localhost:3000/tickets/${ticketId}`);
        this.ticket = response.data;
      } catch (error) {
        console.error("Error fetching ticket:", error);
        throw error;
      }
    },
  },
};
</script>
<style scoped>
h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
