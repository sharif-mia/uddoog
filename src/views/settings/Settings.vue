<template>
  <div class="row">
    <div class="col-8">
      <h2 class="page__title m-0">Settings</h2>
      <div class="setting__item d-flex">
        <h3>
          Auto-Apply Profit Margin on New Products.
          <span>Set a default profit margin to automatically apply to new products</span>
        </h3>
        <el-switch class="ml-auto" v-model="autoProfitMargin" />
      </div>
      <div class="setting__item">
        <div class="form-group">
          <h3 class="mb-3">Set A Default Profit %</h3>
          <div class="row">
            <div class="col-5">
              <input class="form-control mt-3" type="number" v-model="defaultProfit" />
            </div>
          </div>
        </div>
      </div>

      <div class="setting__item d-flex">
        <h3>
          Auto-Update Tracking Info for Customers
          <span>Automatically send tracking updates to customers via email when available</span>
        </h3>
        <el-switch class="ml-auto" v-model="autoUpdateTrackingInfo" />
      </div>

      <div class="setting__item d-flex">
        <h3>
          Low Inventory Alert
          <span>Receive an alert when a product’s inventory is low</span>
        </h3>
        <el-switch class="ml-auto" v-model="lowInventoryAlert" />
      </div>

      <div class="setting__item d-flex">
        <h3>Product Image Watermarking <span>Option to watermark product images with the store logo or branding.</span></h3>
        <el-switch class="ml-auto" v-model="productImageWatermarking" />
      </div>

      <div class="setting__item d-flex">
        <h3>Order Shipping Status Update to Customer <span>Automatically notify customers when their order ships.</span></h3>
        <el-switch class="ml-auto" v-model="orderShippingStatusUpdate" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      autoProfitMargin: false,
      defaultProfit: 15,
      autoUpdateTrackingInfo: false,
      lowInventoryAlert: false,
      productImageWatermarking: false,
      orderShippingStatusUpdate: false,
    };
  },
};
</script>

<style scoped></style>
