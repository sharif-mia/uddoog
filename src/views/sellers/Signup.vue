<template>
  <div v-if="currentStep !== 4" class="container-fluid">
    <div class="login-container">
      <div class="login-img">
        <img src="@/assets/images/login-img.jpeg" alt="" />
        <div class="login-img-content">
          <h1>Become A Uddoog Seller Today!</h1>
          <p>Create a Uddoog seller account now and reach millions of customers!</p>
        </div>
      </div>
      <div class="login-body">
        <div class="row justify-content-center">
          <div class="col-7">
            <img src="@/assets/images/logo.svg" alt="" />

            <div v-if="currentStep === 1">
              <h1>Create your account</h1>
              <p>Our registration process is quick and easy, taking no more than 10 minutes to complete.</p>
              <div class="form-group">
                <label class="form-label">Your Phone Number</label>

                <input class="form-control" v-model="formData.phoneNumber" maxlength="11" type="tel" placeholder="Enter your phone number" />
              </div>
              <div class="form-group">
                <button class="btn btn-full justify-center py-3" @click="nextStep" :disabled="!formData.phoneNumber">Continue</button>
              </div>
              <div class="text-center">
                <p>Or continue with others account</p>
                <ul class="d-flex login-social">
                  <li>
                    <a href=""><i class="icon-facebook"></i></a>
                  </li>
                  <li>
                    <a href=""><i class="icon-google"></i></a>
                  </li>
                  <li>
                    <a href=""><i class="icon-x"></i></a>
                  </li>
                </ul>
                <p>Aldready have an account? <router-link :to="{ name: 'login' }">Sign In</router-link></p>
              </div>
            </div>

            <!-- OTP Verification -->
            <div v-if="currentStep === 2">
              <h1>OTP Verification</h1>
              <p>
                A One-Time Password has been sent to <strong>{{ formData.phoneNumber }}</strong>
              </p>
              <div class="form-group">
                <label class="form-label">Enter Code</label>
                <div class="otp-inputs">
                  <input class="form-control" v-for="i in 6" :key="i" v-model="formData.otp[i - 1]" maxlength="1" @input="focusNext(i)" :ref="`otp${i}`" />
                </div>
              </div>

              <div class="btn-wrap mb-4">
                <button class="btn" @click="prevStep">Previous</button>
                <button class="btn" @click="nextStep" :disabled="!isOTPComplete">Verify</button>
              </div>
              <p>OTP expires in <strong>02:57</strong> seconds</p>
              <p>Didn’t receive code? <a href="#">Send again</a></p>
            </div>

            <!-- Personal and Shop Information -->
            <div v-if="currentStep === 3">
              <h1>Create your account</h1>
              <el-collapse accordion v-model="activeName">
                <el-collapse-item name="1">
                  <template #title>
                    <h3 class="d-flex align-items-center m-0"><i class="icon-user"></i> Your Personal Information</h3>
                  </template>

                  <div class="form-group mt-3">
                    <label class="form-label">Username</label>
                    <input class="form-control" v-model="formData.personalInfo.username" placeholder="Enter your username" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Full name</label>
                    <input class="form-control" v-model="formData.personalInfo.name" placeholder="Enter your full name" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">E-mail</label>
                    <input class="form-control" v-model="formData.personalInfo.email" placeholder="Enter your E-mail" />
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
                  <div class="form-group">
                    <label class="form-label">Confirm Password</label>
                    <div class="password">
                      <input v-model="formData.personalInfo.confirmPassword" class="form-control" :type="showConfPwd ? 'text' : 'password'" />
                      <span class="password-toggle" @click="toggleConfirmPassword">
                        <i :class="{ 'icon-eye-off': showConfPwd, 'icon-eye': !showConfPwd }"></i>
                      </span>
                    </div>
                  </div>
                </el-collapse-item>
                <el-collapse-item name="2">
                  <template #title>
                    <h3 class="d-flex align-items-center m-0"><i class="icon-shop"></i>Your Shop Information</h3>
                  </template>
                  <div class="form-group mt-3">
                    <label class="form-label">Shop Name</label>
                    <input type="text" class="form-control" v-model="formData.shopInfo.shopName" placeholder="Shop Name" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Business or shop address</label>
                    <input type="text" class="form-control" v-model="formData.shopInfo.shopAddress" placeholder="Shop Address" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">District or city</label>
                    <input type="text" class="form-control" v-model="formData.shopInfo.district" placeholder="Select District" />
                  </div>
                  <div class="form-group">
                    <label class="form-label">Website or page url</label>
                    <input type="text" class="form-control" v-model="formData.shopInfo.shopWebsite" placeholder="https://" />
                  </div>
                  <!-- <div class="form-group">
                    <label class="form-label">Shop logo</label>
                    <input type="file" class="form-control" @change="handleShopLogoUpload" accept="image/*"  />
                  </div> -->
                  <div class="form-group">
                    <label class="form-label">Shop logo</label>
                    <input type="text" class="form-control" v-model="formData.shopInfo.shopLogo" />
                  </div>
                  <div class="form-group">
                    <label class="checkbox">
                      <input type="checkbox" v-model="formData.shopInfo.shopInvoice" />
                      <span class="checkmark"></span> I want to use my logo in my invoice
                    </label>
                  </div>
                  <div class="form-group" v-if="formData.shopInfo.shopInvoice">
                    <label class="form-label">Upload your valid trade licence</label>
                    <input type="file" @change="handleShopLicenceUpload" accept="image/*" />
                  </div>
                </el-collapse-item>
              </el-collapse>

              <div class="btn-wrap my-2 mb-4">
                <button class="btn" @click="prevStep">Previous</button>
                <button class="btn" @click="nextStep">Next</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="container" v-if="currentStep === 4">
    <h1 class="review-heading">Review and Payment</h1>
    <div class="row">
      <div class="col-6">
        <div class="preview-card mb-3">
          <h3 class="d-flex align-items-center">Phone Number <i class="ml-auto icon-edit" @click="gotoStep(1)"></i></h3>
          <p class="m-0">{{ formData.phoneNumber }}</p>
        </div>
        <div class="preview-card mb-3">
          <h3 class="d-flex align-items-center">Shop Information <i class="ml-auto icon-edit" @click="gotoStep(3)"></i></h3>
          <ul>
            <li>
              Shop Name <strong>{{ formData.shopInfo.shopName }}</strong>
            </li>
            <li>
              Shop Address <strong>{{ formData.shopInfo.shopAddress }}</strong>
            </li>
            <li>
              Shop District <strong>{{ formData.shopInfo.district }}</strong>
            </li>
            <li>
              Shop Website <strong>{{ formData.shopInfo.shopWebsite }}</strong>
            </li>
            <li>Shop Logo <img :src="formData.shopInfo.shopLogo" alt="" /></li>
            <li>Shop Trade licence <img src="" alt="" /></li>
          </ul>
        </div>
      </div>
      <div class="col-6">
        <div class="preview-card mb-3">
          <h3 class="d-flex align-items-center">Personal Information <i class="ml-auto icon-edit" @click="gotoStep(3)"></i></h3>
          <ul>
            <li>
              Username <strong>{{ formData.personalInfo.username }}</strong>
            </li>
            <li>
              Full Name <strong>{{ formData.personalInfo.name }}</strong>
            </li>
            <li>
              Email <strong>{{ formData.personalInfo.email }}</strong>
            </li>
          </ul>
        </div>
        <div class="package-type">
          <label>
            <input type="radio" name="package" />
            <div class="package-type-box">
              <div class="icon-radio"></div>
              <h4>Basic Package</h4>
              <h3 class="ml-auto">3000 BDT</h3>
            </div>
          </label>
        </div>

        <div class="payment-type">
          <ul>
            <li>
              <label>
                <input name="payment" type="radio" />
                <div class="payment-box"><img src="../../assets/images/bkash.svg" alt="" /> <span>bKash</span></div>
              </label>
            </li>
            <li>
              <label>
                <input name="payment" type="radio" />
                <div class="payment-box justify-content-center"><img src="../../assets/images/visa.svg" alt="" /></div>
              </label>
            </li>
            <li>
              <label>
                <input name="payment" type="radio" />
                <div class="payment-box"><img src="../../assets/images/mastercard.svg" alt="" /> <span>mastercard</span></div>
              </label>
            </li>
          </ul>
        </div>
        <button class="btn btn-full" type="button" @click="submitForm">Payment</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentStep: 1,
      activeName: "1",
      showPassword: false,
      showConfPwd: false,
      formData: {
        phoneNumber: "",
        otp: Array(6).fill(""),
        personalInfo: {
          username: "",
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        shopInfo: {
          shopName: "",
          shopAddress: "",
          district: "",
          shopWebsite: "",
          shopLogo: null,
          shopInvoice: false,
          shopLicence: null,
        },
      },
    };
  },
  computed: {
    isOTPComplete() {
      return this.formData.otp.every((digit) => digit !== "");
    },
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    toggleConfirmPassword() {
      this.showConfPwd = !this.showConfPwd;
    },
    nextStep() {
      if (this.currentStep < 4) {
        this.currentStep++;
      }
    },
    prevStep() {
      if (this.currentStep > 1) {
        this.currentStep--;
      }
    },
    gotoStep(step) {
      if (step >= 1 && step <= 4) {
        this.currentStep = step;
      }
    },

    focusNext(index) {
      if (index < 6 && this.formData.otp[index - 1] !== "") {
        this.$refs[`otp${index + 1}`][0].focus();
      }
    },
    handleShopLicenceUpload(event) {
      const file = event.target.files[0];
      if (file) {
        this.formData.shopInfo.shopLicence = file;
      }
    },
    async submitForm() {
      try {
        const payload = {
          phoneNumber: this.formData.phoneNumber,
          otp: this.formData.otp.join(""),
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
  },
};
</script>

<style scoped>
.btn {
  padding: 0.75rem;
  justify-content: center;
}
</style>
