<template>
  <h2 class="page__title">Order Summary</h2>
  <div class="card">
    <div class="table-responsive-md">
      <table class="table">
        <thead>
          <tr>
            <th>Item</th>
            <th class="text-center">Our Price</th>
            <th class="text-center">Your Price</th>
            <th class="text-center">Quantity</th>
            <th class="text-center">Total Price</th>
            <th class="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="" class="order-summary__product">
                <img src="https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/h/a/havit-71-gaming-headset-headphones-with-microphonergb-light-for-pc-xbox-professional-gamer-h2019u.jpg" alt="" />
                <h2>Havit H2019U Game Note USB 7.1 Surround Sound RGB Gaming Headphone</h2>
              </a>
            </td>
            <td class="text-center"><i class="icon-taka mr-1"></i>120</td>
            <td class="text-center"><i class="icon-taka mr-1"></i>190</td>
            <td class="text-center">1</td>
            <td class="text-center"><i class="icon-taka mr-1"></i>310</td>
            <td class="text-right">
              <a class="text-danger"><i class="icon-trash"></i></a>
            </td>
          </tr>
          <tr>
            <td>
              <a href="" class="order-summary__product">
                <img src="https://www.bdshop.com/pub/media/catalog/product/cache/eaf695a7c2edd83636a0242f7ce59484/x/i/xiaomi_solove_f5_fan_offer_price_in_bd.jpeg" alt="" />
                <h2>Xiaomi Rechargeable Mini Desktop Fan (SOLOVE F5)</h2>
              </a>
            </td>
            <td class="text-center"><i class="icon-taka mr-1"></i>2420</td>
            <td class="text-center"><i class="icon-taka mr-1"></i>2790</td>
            <td class="text-center">1</td>
            <td class="text-center"><i class="icon-taka mr-1"></i>5310</td>
            <td class="text-right">
              <a class="text-danger"><i class="icon-trash"></i></a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>

  <div class="row">
    <div class="col-5">
      <div class="order-summary__address">
        <h4>Shipping Address</h4>
        <ul>
          <li>Mr. Keramoti Ali</li>
          <li>0177986654</li>
          <li>NoakhaliCircuit House</li>
        </ul>
        <div class="order-summary__shipping">
          <p class="order-summary__shipping-text">Shipping by: Pathao</p>
          <p class="order-summary__shipping-price">70 Tk</p>
        </div>
        <router-link class="btn" :to="{ name: 'profile' }">Edit
              </router-link>
      </div>
    </div>
    <div class="col-7">
      <ul class="order-summary__totals">
        <li>Total Price: <strong>380 Tk</strong></li>
        <li>Partial Payment: <strong>70 Tk</strong></li>
        <li>Due Payment: <strong>300 Tk</strong></li>
      </ul>
      <div class="row text-center">
        <div class="col-6">
          <button type="button" class="btn">Buy from wallet (120 Tk available)</button>
        </div>
        <div class="col-6"><button type="button" class="btn">Generate payment at 14:29:15</button></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      orders: [],
      trackOrders: false,
      currentPage: 1,
      totalPages: 10,
    };
  },
  mounted() {
    this.fetchOrders();
  },
  methods: {
    async fetchOrders() {
      try {
        const response = await this.$axios.get("http://localhost:3000/orders");
        this.orders = response.data;
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
    },
    async deleteItem(orderId) {
      try {
        await this.$axios.delete(`http://localhost:3000/orders/${orderId}`);
        this.orders = this.orders.filter((order) => order.id !== orderId);
        console.log("success");
      } catch (error) {
        console.error("Error deleting order:", error.response ? error.response.data : error.message);
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
