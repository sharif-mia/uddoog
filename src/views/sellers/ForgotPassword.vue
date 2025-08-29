<template>
  <div class="container-fluid">
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

            <form @submit.prevent="login">
              <h1>Forgot password?</h1>
              <div class="form-group">
                <label class="form-label">E-mail</label>
                <input class="form-control" v-model="email" required placeholder="Enter your E-mail" />
              </div>
              
              <div class="form-group">
                <button type="submit" class="btn btn-full justify-center" :disabled="!email">Submit</button>
              </div>
            </form>
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rememberAuth: false,
      showPassword: false,
      email: "",
      password: "",
      error: false,
    };
  },
  computed: {},
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },

    async login() {
      try {
        const response = await this.$axios.get("http://localhost:3000/sellers");
        const sellers = response.data;
        const seller = sellers.find((s) => s.personalInfo.email === this.email && s.personalInfo.password === this.password);
        if (seller) {
          const token = seller.personalInfo.email;
          localStorage.setItem("sellerToken", token);
          this.$router.push({ name: "dashboard" });
        } else {
          this.error = true;
        }
      } catch (error) {
        console.error("Error submitting form:", error);
      }
    },
  },
};
</script>
