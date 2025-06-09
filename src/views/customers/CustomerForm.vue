<template>
  <div>
    <h2 class="page__title gap-3 d-flex"> <router-link class="btn-back" :to="{ name: 'customers' }">
          <i class="icon-arrow-left"></i>
        </router-link>  {{ isEdit ? "Edit" : "Create" }} Customer</h2>
    <form @submit.prevent="submitForm">
      <div class="row">
        <div class="col-8">
          <div class="row">
          <div class="col-6">
            <div class="form-group">
              <label class="form-label">Phone Number</label>
              <input type="tel" v-model="formData.phone" class="form-control" />
              <small v-if="phoneNoExist" class="error-msg">Phone number must be unique. Please use a different phone number.</small>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-label">Name</label>
              <input type="text" id="name" v-model="formData.name" class="form-control" />
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-label">District</label>
              <el-select class="w-100" v-model="formData.district" filterable placeholder="Select District" @change="onDistrictChange">
                <el-option v-for="district in districts" :key="district.id" :label="district.name" :value="district.name" />
              </el-select>
            </div>
          </div>
          <div class="col-6">
            <div class="form-group">
              <label class="form-label">Select Area</label>
              <el-select class="w-100" v-model="formData.upazila" filterable placeholder="Select Upazila">
                <el-option v-for="upazila in upazillas" :key="upazila.id" :label="upazila.name" :value="upazila.name" />
              </el-select>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label class="form-label">Address</label>
              <textarea rows="3" v-model="formData.address" class="form-control"></textarea>
            </div>
          </div>
          <div class="col-12">
            <div class="form-group">
              <label class="form-label">Note</label>
              <textarea rows="3" v-model="formData.note" class="form-control"></textarea>
            </div>
          </div>
        </div>
        </div>
      </div>
        
        <button type="submit" class="btn btn-primary">{{ isEdit ? "Update" : "Submit" }}</button>
      </form>
  </div>
</template>

<script>

export default {
  name: "CustomerForm",
  data() {
    return {
      districts: [],
      upazillas: [],
      formData: {
        name: "",
        phone: "",
        district: "",
        upazila: "",
        address: "",
        note: "",
      },
      isEdit: false,
      phoneNoExist: false,
    };
  },
  created() {
    this.isEdit = !!this.$route.params.id;
    if (this.isEdit) {
      this.fetchCustomer();
    }
    this.fetchDistricts();
  },
  methods: {
    async fetchDistricts() {
      try {
        const response = await this.$axios.get("https://bdapi.vercel.app/api/v.1/district");
        this.districts = response.data.data;
      } catch (error) {
        console.error("Error fetching districts:", error);
        alert("Failed to fetch districts. Please try again.");
      }
    },

    async fetchUpazillas(districtName) {
      try {
        const response = await this.$axios.get(
          `https://bdapi.vercel.app/api/v.1/district/${districtName}`
        );
        this.upazillas = response.data.data;
      } catch (error) {
        console.error("Error fetching upazillas:", error);
      }
    },

    onDistrictChange() {
      if (this.formData.district) {
        this.fetchUpazillas(this.formData.district);
      } else {
        this.upazillas = [];
      }
    },

    async fetchCustomer() {
      const customerId = this.$route.params.id;
      try {
        const response = await this.$axios.get(`http://localhost:3000/customers/${customerId}`);
        this.formData = response.data;
      } catch (error) {
        console.error("Error fetching customer data:", error);
        alert("Failed to fetch customer data. Please try again.");
      }
    },

    // Check phone number
    async UniquePhoneNo(phoneNumber) {
      try {
        const response = await this.$axios.get("http://localhost:3000/customers");
        const customers = response.data;
        const customerId = this.isEdit ? this.$route.params.id : null;
        return !customers.some(
          (customer) =>
            customer.phone === phoneNumber && (!customerId || customer.id !== customerId)
        );
      } catch (error) {
        console.error("Error:", error);
        alert("Failed to check phone number uniqueness. Please try again.");
        return false;
      }
    },

    async submitForm() {
      const customerId = this.$route.params.id;

      try {
        const payload = {
          name: this.formData.name,
          phone: this.formData.phone,
          district: this.formData.district,
          upazila: this.formData.upazila,
          address: this.formData.address,
          note: this.formData.note,
        };

        // if the phone number is unique
        const isUnique = await this.UniquePhoneNo(this.formData.phone);
      
        if (this.isEdit) {
          await this.$axios.put(`http://localhost:3000/customers/${customerId}`, payload);
        } else {
          // Create  customer
          if (!isUnique) {
          this.phoneNoExist = true;
          return; // Stop form submission if the phone number is not unique
        }
          await this.$axios.post("http://localhost:3000/customers", payload);
          this.formData = { ...this.$options.data().formData }; // Reset form data
        }

        this.$router.push({ name: "customers" });
      } catch (error) {
        console.error("Error on submitting:", error);
        alert("An error occurred. Please try again.");
      }
    },
  },
};
</script>

<style scoped>
</style>
