<template>
  <div class="row">
    <div class="col-8">
      <form @submit.prevent="submitForm">
        <div class="personal-info">
          <h3><i class="icon-user"></i> Your Personal Information</h3>
          <div class="form-group">
            <label class="form-label">Full Name</label>
            <input class="form-control" type="text" id="full-name" v-model="formData.personalInfo.fullName" placeholder="Mr. Kazi Zaman" />
          </div>
          <div class="row">
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">E-mail</label>
                <input class="form-control" type="email" id="email" v-model="formData.personalInfo.email" placeholder="zaman.kazi1989@gmail.com" />
              </div>
            </div>
            <div class="col-6">
              <div class="form-group">
                <label class="form-label">Phone Number</label>
                <input class="form-control" type="text" id="phone" v-model="formData.phoneNumber" placeholder="017789765486" />
              </div>
            </div>
          </div>
          <el-collapse class="form-group" v-model="activeNames">
            <el-collapse-item title="Change Password" name="1">
              <div class="form-group mt-3">
                <label class="form-label">Old Password</label>
                <div class="password">
                  <input v-model="formData.personalInfo.password" class="form-control" :type="showPassword ? 'text' : 'password'" />
                  <span class="password-toggle" @click="togglePassword">
                    <i :class="{ 'icon-eye-off': showPassword, 'icon-eye': !showPassword }"></i>
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <div class="password">
                  <input v-model="formData.personalInfo.password" class="form-control" :type="showPassword ? 'text' : 'password'" />
                  <span class="password-toggle" @click="togglePassword">
                    <i :class="{ 'icon-eye-off': showPassword, 'icon-eye': !showPassword }"></i>
                  </span>
                </div>
                <small>Requires a minimum of 8 characters.</small>
              </div>
              <div class="form-group m-0">
                <label class="form-label">Confirm Password</label>
                <div class="password">
                  <input v-model="formData.personalInfo.confirmPassword" class="form-control" :type="showConfPwd ? 'text' : 'password'" />
                  <span class="password-toggle" @click="toggleConfirmPassword">
                    <i :class="{ 'icon-eye-off': showConfPwd, 'icon-eye': !showConfPwd }"></i>
                  </span>
                </div>
              </div>
            </el-collapse-item>
          </el-collapse>
        </div>

        <div class="shop-info">
          <h3 class="my-3"><i class="icon-shop"></i> Your Shop Information</h3>
          <div class="form-group">
            <label class="form-label">Your Shop Name</label>
            <input type="text" class="form-control" v-model="formData.shopInfo.shopName" placeholder="Enter your shop name" />
          </div>

          <div class="form-group">
            <label class="form-label">Business or Shop Address</label>
            <input type="text" class="form-control" v-model="formData.shopInfo.shopAddress" placeholder="Enter your business or shop address" />
          </div>

          <div class="form-group">
            <label class="form-label">District or City</label>
            <select class="form-control" v-model="formData.shopInfo.district">
              <option disabled value="">Select District</option>
              <option v-for="district in districts" :key="district">{{ district }}</option>
            </select>
          </div>

          <div class="form-group">
            <label class="form-label">Website or Page URL</label>
            <input type="url" class="form-control" v-model="formData.shopInfo.website" placeholder="https://" />
          </div>

          <div class="form-group">
            <label class="checkbox">
              <input type="checkbox" v-model="formData.shopInfo.shopInvoice" />
              <span class="checkmark"></span> I want to use my logo in my invoice
            </label>
          </div>
          <div class="form-group">
            <label class="form-label">Upload your valid trade licence</label>
            <label class="upload">
              <input class="upload-input" title="" type="file" value="" />
              <div class="text-center">
                <img alt="" class="mx-auto" src="@/assets/images/upload.png" />
                <h4 class="my-1">Browse your image here</h4>
                <p class="text-muted m-0">Support: jpeg, png</p>
              </div>
            </label>
          </div>
        </div>

        <button class="btn" type="submit">Submit</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        phoneNumber: "",
        personalInfo: {
          fullName: "",
          email: "",
        },
        shopInfo: {
          shopName: "",
          shopAddress: "",
          district: "",
          website: "",
          shopInvoice: false,
        },
      },
      districts: ["District 1", "District 2", "District 3"], // Example district names
    };
  },
  methods: {
    async submitForm() {
      try {
        const payload = {
          phoneNumber: this.formData.phoneNumber,
          personalInfo: this.formData.personalInfo,
          shopInfo: this.formData.shopInfo,
        };

        const response = await this.$axios.post("http://localhost:3000/sellers", payload);

        console.log("Seller created:", response.data);
        this.formData = { ...this.$options.data().formData };
        const token = response.data.email;
        localStorage.setItem("sellerToken", token);
        this.$router.push({ name: "dashboard" });
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
    changePassword() {
     
    },
   
    includeLogoInInvoice() {
      
    },
  },
};
</script>

<style scoped>
.el-collapse {
  border: 1.5px solid rgba(111, 118, 126, 0.4);
  padding: 1rem;
  border-radius: 0.375rem;
}
</style>
