<template>
  <div class="row">
    <div class="col-6">
      <h2 class="page__title m-0">My Invoice</h2>
      <div class="setting__item mt-3">
        <el-tag type="danger">Your request is awaiting admin approval.</el-tag>
        <h3 class="mt-3">Invoice changes will take effect after admin approval.</h3>
      </div>

      <div class="setting__item">
        <div class="form-group">
          <label class="form-label">Upload your Company Logo</label>
          <label class="upload">
            <input class="upload-input" title="" type="file" value="" />
            <div class="text-center">
              <img alt="" class="mx-auto" src="@/assets/images/upload.png" />
              <h4 class="my-1">Browse your image here</h4>
              <p class="text-muted m-0">Support: jpeg, png</p>
            </div>
          </label>
        </div>
        <h3>
          <span>If you wish to change your company logo, please note that admin approval is required. Approval may take up to 24 hours to process. Kindly plan accordingly and await confirmation before making any changes.</span>
        </h3>
      </div>
      <div class="setting__item">
        <div class="form-group">
          <label class="form-label">Set Invoice Number Start with</label>
          <div class="row mb-3">
            <div class="col-8">
              <input class="form-control" type="number" v-model="invoiceNumber" placeholder="KL - 090" />
            </div>
          </div>
        </div>
        <h3>
          <span>This number will auto-increment based on your insert format.</span>
        </h3>
      </div>
      <button type="button" class="btn" @click="invoicePreview = true">Preview</button>
    </div>
    <div class="col-6">
      <img v-if="invoicePreview" src="@/assets/images/invoice.png" alt="invoice" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      invoiceNumber: "",
      invoicePreview: false,
    };
  },
};
</script>

<style scoped></style>
