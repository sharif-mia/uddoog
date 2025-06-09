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
              <h1>Hi There!</h1>
              <p>Welcome back to Uddoog Platform</p>
              <div class="form-group">
                <label class="form-label">E-mail</label>
                <input class="form-control" v-model="email" required placeholder="Enter your E-mail" />
              </div>
              <div class="form-group">
                <label class="form-label">Password</label>
                <div class="password">
                  <input v-model="password" required class="form-control" :type="showPassword ? 'text' : 'password'" />
                  <span class="password-toggle" @click="togglePassword">
                    <i :class="{ 'icon-eye-off': showPassword, 'icon-eye': !showPassword }"></i>
                  </span>
                </div>
              </div>
              <div class="form-group">
                <label class="checkbox">
                  <input type="checkbox" v-model="rememberAuth" />
                  <span class="checkmark"></span> Remember Me
                </label>
              </div>
              <router-link :to="{ name: 'forgotPassword' }">Forgot password?</router-link>
              <div class="form-group">
                <button type="submit" class="btn btn-full" :disabled="!password && !email">Login</button>
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
