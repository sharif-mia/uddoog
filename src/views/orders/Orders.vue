<template>
  <h2 class="page__title">Recent Orders</h2>
  <div class="mb-4">
    <div class="row">
      <div class="col-4">
        <div class="order-card">
          <div class="order-card__header">
            <div>
              <div class="order-card__order-id">#Order 123456</div>
              <div class="order-card__phone">018342378724</div>
              <div class="order-card__name">Kazi Mohammod Kabir</div>
            </div>
            <button @click="trackOrders = true" type="button" class="btn">Track</button>
          </div>

          <div class="order-card__arrival">
            <div class="order-card__arrival-info">
              <span class="order-card__arrival-icon"><i class="icon-clock"></i></span>
              <div>
                <div class="order-card__arrival-text">Estimated arrival</div>
                <div class="order-card__arrival-time">35 min</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-4">
        <div class="order-card">
          <div class="order-card__header">
            <div>
              <div class="order-card__order-id">#Order 123456</div>
              <div class="order-card__phone">018342378724</div>
              <div class="order-card__name">Mohammod Kabir</div>
            </div>
            <button @click="trackOrders = true" type="button" class="btn">Track</button>
          </div>

          <div class="order-card__arrival">
            <div class="order-card__arrival-info">
              <span class="order-card__arrival-icon"><i class="icon-clock"></i></span>
              <div>
                <div class="order-card__arrival-text">Estimated arrival</div>
                <div class="order-card__arrival-time">2 Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <h2 class="page__title d-flex">
      My Order
      <div class="d-flex ml-auto gap-3">
        <a class="btn btn-outline">
          <i class="icon-filter"></i>
          <span>Filter</span>
        </a>
      </div>
    </h2>
  <div class="card">
    <div v-if="orders.length != 0" class="table-responsive-md">
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
            <th>District</th>
            <th>Status</th>
            <th>Profit</th>
            <th class="text-right">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="order in orders" :key="order.invoice">
            <td>
              <label class="checkbox">
                <input type="checkbox" v-model="selectRow" />
                <span class="checkmark"></span> {{ order.invoice }}
              </label>
            </td>
            <td>
              <strong class="d-block fw-600">{{ order.date }}</strong
              ><small>{{ order.time }}</small>
            </td>
            <td>
              <strong class="fw-500">Price: <i class="icon-taka mr-1"></i>{{ order.price }}</strong
              ><br />O.Price: <i class="icon-taka mr-1"></i>{{ order.originalPrice }}
            </td>
            <td>
              <strong class="d-block fw-600">{{ order.phone }}</strong
              >{{ order.customer }}
            </td>
            <td>{{ order.district }}</td>
            <td>
              <span class="badge bg-warning" v-if="order.status === 'Shipped'">{{ order.status }}</span>
              <span class="badge bg-success" v-else-if="order.status === 'Successful'">{{ order.status }}</span>
              <span class="badge bg-danger" v-else-if="order.status === 'Cancel'">{{ order.status }}</span>
            </td>
            <td><i class="icon-taka mr-1"></i>{{ order.profit }}</td>
            <td class="text-right">
              <router-link v-if="order.status === 'Cancel'" class="btn-edit" :to="{ name: 'orderSummary' }">
                <i class="icon-edit"></i>
              </router-link>
              <a v-if="order.status === 'Successful' || order.status === 'Cancel'" class="text-danger" @click.prevent="deleteItem(order.invoice)"><i class="icon-trash"></i></a>
              <div @click="trackOrders = true" class="btn-edit" v-if="order.status === 'Shipped'"><i class="icon-track mr-1"></i> </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div v-else><h3>There is no orders</h3></div>
  </div>
  <div class="d-flex align-center justify-between mt-3">
    <button class="btn btn-outline" @click="previousPage">Previous</button>
    <!-- <span>{{ currentPage }} of {{ totalPages }}</span> -->
    <el-pagination layout="prev, pager, next" :total="1000" />
    <button class="btn btn-outline" @click="nextPage">Next</button>
  </div>
  <div class="tracking-container" v-if="trackOrders != false">
    <div class="tracking-inner">
      <div class="tracking-header">
        <h1>Tracking Details <span>ID: 1DO08112MMV6799</span></h1>
        <div class="tracking-close" @click="trackOrders = false"><i class="icon-cross"></i></div>
      </div>
      <div class="stepper mb-4">
        <div class="stepper__step stepper__step--active">
          <div class="stepper__icon"><i class="icon-check"></i></div>
          <div class="stepper__label">Accepted</div>
        </div>
        <div class="stepper__step stepper__step--active">
          <div class="stepper__icon"><i class="icon-product"></i></div>
          <div class="stepper__label">Picked</div>
        </div>

        <div class="stepper__step stepper__step--active">
          <div class="stepper__icon"><i class="icon-track"></i></div>
          <div class="stepper__label">In Transit</div>
        </div>

        <div class="stepper__step stepper__step--current">
          <div class="stepper__icon"><i class="icon-delivery"></i></div>
          <div class="stepper__label">Out for Delivery</div>
        </div>

        <div class="stepper__step stepper__step--disabled">
          <div class="stepper__icon"><i class="icon-badge-check"></i></div>
          <div class="stepper__label">Delivered</div>
        </div>
      </div>

      <el-timeline>
        <el-timeline-item timestamp="Order delivery has been on hold" placement="top">
          <p>Nov 9, 2024 5:07 PM</p>
        </el-timeline-item>
        <el-timeline-item timestamp="Order has been reached at delivery hub" placement="top">
          <p>Nov 10, 2024 8:17 AM</p>
        </el-timeline-item>
        <el-timeline-item timestamp="Order has been assigned to (Yaar Mohammad-01751632438) for delivery" placement="top">
          <p>Nov 11, 2024 2:07 PM</p>
        </el-timeline-item>
        <el-timeline-item timestamp="Order delivery has been on hold" placement="top">
          <p>Nov 12, 2024 9:07 PM</p>
        </el-timeline-item>
      </el-timeline>
      <div class="text-center">
        <router-link :to="{ name: 'addTicket' }" class="btn btn-outline mr-3">Contact Support</router-link>
      <a  class="btn " href="#" target="_blank">Track on Courier Page</a>
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
