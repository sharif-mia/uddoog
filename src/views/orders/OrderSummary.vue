<template>
  <h2 class="page__title">My Cart</h2>

  <el-collapse class="my__cart" accordion v-model="activeName">
    <el-collapse-item name="1">
      <template #title="">
        <h4>Order For <strong>Kazi Zaman</strong></h4>
      </template>
      <div class="card p-0 mt-3 col-gap">
        <div class="table-responsive-md">
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-center">DropShop Price</th>
                <th class="text-center">Selling Price</th>
                <th class="text-center">Quantity</th>
                <th class="text-center">Total Price</th>
                <th class="text-center">Profit</th>
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
                <td class="text-center"><i class="icon-taka mr-1"></i>500</td>
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
                <td class="text-center"><i class="icon-taka mr-1"></i>500</td>
                <td class="text-right">
                  <a class="text-danger"><i class="icon-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <div class="order-summary__address">
            <div class="d-flex align-items-center">
              <h4>Shipping Information</h4>
              <router-link class="btn ml-auto" :to="{ name: 'profile' }"><i class="icon-edit"></i> Edit </router-link>
            </div>
            <div class="order-summary__shipping">
              <i class="icon-user"></i>
              <ul>
                <li>Mr. Keramoti Ali</li>
                <li>0177986654</li>
              </ul>
            </div>
            <div class="order-summary__shipping">
              <i class="icon-home"></i>
              <ul>
                <li>Shipping Address</li>
                <li>Flat # A1, House, 7B Rd 103, Dhaka 1212</li>
              </ul>
            </div>
            <div class="order-summary__shipping">
              <i class="icon-truck"></i>
              <ul>
                <li>Shipping by</li>
                <li>Pathao</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="order-summary__totals">
            <ul>
              <li>
                Partial Payment <strong><i class="icon-taka mr-1"></i>70</strong>
              </li>
              <li>
                Due Payment <strong><i class="icon-taka mr-1"></i>300</strong>
              </li>
              <li>
                Total
                <h4><i class="icon-taka mr-1"></i>380</h4>
              </li>
            </ul>
            <div class="order-summary__profit">Your Total Profit <div class="ml-auto"><i class="icon-taka mr-1"></i>70</div></div>
            <div class="order-summary__actions">
              <button type="button" @click="walletBalance = true" class="btn mb-3"><i class="icon-wallet mr-1"></i>Buy from wallet (120 Tk available)</button>
              <button type="button" @click="paymentLink = true" class="btn btn-outline"><i class="icon-link mr-1"></i>Generate Payment link for 70 TK</button>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-item>
    <el-collapse-item name="2">
      <template #title="">
        <h4>Order For <strong>Hasan Mahmud</strong></h4>
      </template>
      <div class="card p-0 mt-3 col-gap">
        <div class="table-responsive-md">
          <table class="table">
            <thead>
              <tr>
                <th>Item</th>
                <th class="text-center">DropShop Price</th>
                <th class="text-center">Selling Price</th>
                <th class="text-center">Quantity</th>
                <th class="text-center">Total Price</th>
                <th class="text-center">Profit</th>
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
                <td class="text-center"><i class="icon-taka mr-1"></i>500</td>
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
                <td class="text-center"><i class="icon-taka mr-1"></i>500</td>
                <td class="text-right">
                  <a class="text-danger"><i class="icon-trash"></i></a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div class="row">
        <div class="col-8">
          <div class="order-summary__address">
            <div class="d-flex align-items-center">
              <h4>Shipping Information</h4>
              <router-link class="btn ml-auto" :to="{ name: 'profile' }"><i class="icon-edit"></i> Edit </router-link>
            </div>
            <div class="order-summary__shipping">
              <i class="icon-user"></i>
              <ul>
                <li>Mr. Keramoti Ali</li>
                <li>0177986654</li>
              </ul>
            </div>
            <div class="order-summary__shipping">
              <i class="icon-home"></i>
              <ul>
                <li>Shipping Address</li>
                <li>Flat # A1, House, 7B Rd 103, Dhaka 1212</li>
              </ul>
            </div>
            <div class="order-summary__shipping">
              <i class="icon-truck"></i>
              <ul>
                <li>Shipping by</li>
                <li>Pathao</li>
              </ul>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="order-summary__totals">
            <ul>
              <li>
                Partial Payment <strong><i class="icon-taka mr-1"></i>70</strong>
              </li>
              <li>
                Due Payment <strong><i class="icon-taka mr-1"></i>300</strong>
              </li>
              <li>
                Total
                <h4><i class="icon-taka mr-1"></i>380</h4>
              </li>
            </ul>
            
            <div class="order-summary__profit">Your Total Profit <div class="ml-auto"><i class="icon-taka mr-1"></i>80</div></div>
            <div class="order-summary__actions">
              <button type="button" @click="walletBalance = true" class="btn mb-3"><i class="icon-wallet mr-1"></i>Buy from wallet (120 Tk available)</button>
              <button type="button" @click="paymentLink = true" class="btn btn-outline"><i class="icon-link mr-1"></i>Generate Payment link for 70 TK</button>
            </div>
          </div>
        </div>
      </div>
    </el-collapse-item>
  </el-collapse>
  <el-dialog v-model="walletBalance" :modal="false" class="text-center">
    <div class="p-4">
      <h2 class="page__title">Would you like to use your wallet balance?</h2>
      <button class="btn btn-outline mr-3" type="button" @click="walletBalance = false">No</button>
      <button class="btn" type="button" @click="walletBalance = false">Yes</button>
    </div>
  </el-dialog>
  <el-dialog v-model="paymentLink" :modal="false" class="text-center">
    <div class="p-4">
      <h2 class="page__title">Payment link generated</h2>
      <div class="d-flex gap-3">
        <input type="text" value="https://uddogg.com/storeid/dasda/r34893249823jshf/" class="form-control" />
        <button class="btn" type="button" @click="paymentLink = false"><i class="icon-copy mr-3"></i> Copy</button>
      </div>
    </div>
  </el-dialog>
</template>

<script>
export default {
  data() {
    return {
      activeName: "1",
      orders: [],
      walletBalance: false,
      paymentLink: false,
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
.el-collapse {
  border: none !important;
}
.icon-taka {
  font-size: 12px;
}
h3 {
  margin: 0;
  font-size: 0.875rem;
  font-weight: 600;
}
</style>
