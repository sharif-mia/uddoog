<template>
  <nav class="mobile-nav-bar">
    <ul>
      <li v-for="m_nav in menu_list" :key="m_nav.id" @click="activate(m_nav.id)" :class="{ active: active_el == m_nav.id }">
        <router-link :to="m_nav.route" @click.native="closeMenu">
          <div class="footer-icon">
            <i :class="m_nav.icon"></i>
          </div>
          {{ m_nav.menu }}
        </router-link>
      </li>
      <li :class="{ open: show }">
        <a class="hamburger-icon" href="javascript:void(0);" @click="toggleftSidebar">
          <div class="footer-icon">
            <i class="icon-dots-vertical"></i>
          </div>
          More
        </a>
      </li>
      <div class="indicator"></div>
    </ul>
  </nav>
</template>
<script>
export default {
  name: "MobileFooter",

  data() {
    return {
      menu_list: [
        { id: "1", menu: "Home", icon: "icon-apps", route: "/dashboard" },
        {
          id: "2",
          menu: "Orders",
          icon: "icon-shopping-cart",
          route: "/dashboard/orders",
        },
        {
          id: "3",
          menu: "Customers",
          icon: "icon-users",
          route: "/dashboard/customers",
        },
      ],
      active_el: "1",
      show: false,
      showMobileMenu: false,
      isMenuOpen: false,
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("sellerToken");
      this.$router.push({ name: "login" });
    },
    toggleftSidebar() {
      this.$emit("toggle-sidebar");
    },

    activate(menuId) {
      this.active_el = menuId;
    },
    closeMenu() {
      this.$emit("close-sidebar");
    },
  },
};
</script>
<style></style>
