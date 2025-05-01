<template>
  <header class="header">
    <div class="header__topbar">
      <div class="container d-flex align-center justify-between">
        <p class="header__topbar-text">New here? Start your 14-day FREE trial. Try now</p>
        <div class="header__account-links">
          <a href="#">About Us</a>
          <a href="#">Pricing</a>
          <a href="#">Be a Supplier</a>
        </div>
      </div>
    </div>
    <div class="header__main">
      <div class="container d-flex align-center justify-between">
        <router-link class="header__logo" :to="{ name: 'home' }">
          <img src="@/assets/images/logo.svg" alt="" />
          </router-link>
          <div class="nav__search"><button class="nav__search__btn"><i class="icon icon-search"></i></button><input class="form-control" type="text" placeholder="What are you looking for"></div>
        <div class="header__links">
          <router-link :to="{ name: 'login' }" v-if="!isLoggedIn">
            <i class="icon-login"></i>
            <span>Login</span>
          </router-link>
          <router-link :to="{ name: 'signup' }" v-if="!isLoggedIn">
            <i class="icon-user"></i>
            <span>Register Now</span>
          </router-link>
          <router-link :to="{ name: 'dashboard' }" v-else>
            <i class="icon-user"></i>
            <span>Dashboard</span>
          </router-link>
          <router-link :to="{ name: 'signup' }">
            <i class="icon-comment"></i>
            <span>Support</span>
          </router-link>
          <router-link :to="{ name: 'signup' }">
            <i class="icon-cart"></i>
          </router-link>
        </div>
      </div>
    </div>
    <nav class="header__nav">
      <div class="container">
        <ul class="header__nav-list">
        <li><a href="#">New Products</a></li>
        <li><a href="#">All Products</a></li>
        <li><a href="#">Fashion</a></li>
        <li><a href="#">Furniture</a></li>
        <li><a href="#">Electronics</a></li>
        <li><a href="#">Mobile</a></li>
        <li><a href="#">Health</a></li>
        <li><a href="#">Computers</a></li>
        <li><a href="#">Office</a></li>
        <li><a href="#">Sports</a></li>
        <li><a href="#">Others</a></li>
      </ul>
      </div>
    </nav>
  </header>
  <router-view></router-view>
  <!-- Footer -->
  <footer class="footer">
    <div class="container">
      <div class="footer__columns">
        <div class="footer__column">
          <h4 class="footer__heading">Company info</h4>
          <ul class="footer__list">
            <li><a href="#">About Uddoog</a></li>
            <li><a href="#">Uddoog – Shop Like a Billionaire</a></li>
            <li><a href="#">Affiliate & Influencer: Earn Commission</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Careers</a></li>
            <li><a href="#">Press</a></li>
          </ul>
        </div>

        <div class="footer__column">
          <h4 class="footer__heading">Customer service</h4>
          <ul class="footer__list">
            <li><a href="#">Return and refund policy</a></li>
            <li><a href="#">Intellectual property policy</a></li>
            <li><a href="#">Shipping info</a></li>
            <li><a href="#">Your Recalls and Product Safety Alerts</a></li>
            <li><a href="#">Report suspicious activity</a></li>
          </ul>
        </div>

        <div class="footer__column">
          <h4 class="footer__heading">Help</h4>
          <ul class="footer__list">
            <li><a href="#">Support center & FAQ</a></li>
            <li><a href="#">Safety center</a></li>
            <li><a href="#">Uddoog purchase protection</a></li>
            <li><a href="#">Sitemap</a></li>
            <li><a href="#">Partner with Uddoog</a></li>
          </ul>
        </div>

        <div class="footer__column">
          <h4 class="footer__heading">Download the Uddoog App</h4>
          <ul class="footer__list">
            <li><a href="#">Price-drop alerts</a></li>
            <li><a href="#">Faster & more secure checkout</a></li>
            <li><a href="#">Exclusive offers</a></li>
            <li><a href="#">Track orders any time</a></li>
            <li><a href="#">Low stock items alerts</a></li>
            <li><a href="#">Coupons & offers alerts</a></li>
          </ul>
        </div>
      </div>
      <div class="footer__bottom">
        <div class="footer__legal">
          © 2022 - 2025 uddoog Inc.
          <a href="#">Terms of use</a>
          <a href="#">Privacy policy</a>
          <a href="#">Your privacy choices</a>
          <a href="#">Ad Choices</a>
        </div>
        <div class="footer__social">
          <a href="#" aria-label="Instagram"><i class="icon-instagram"></i></a>
          <a href="#" aria-label="Facebook"><i class="icon-facebook"></i></a>
          <a href="#" aria-label="X (Twitter)"><i class="icon-x"></i></a>
          <a href="#" aria-label="YouTube"><i class="icon-youtube"></i></a>
        </div>
      </div>
    </div>
   
  </footer>
</template>

<script>
export default {
  components: {},
  methods: {},
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem('sellerToken');
    }
  }
};
</script>
