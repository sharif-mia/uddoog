<template>
  <aside class="sidebar">
    <div class="sidebar__customer">
      <div class="sidebar__customer-logo">
        <img v-if="isCollapse" src="@/assets/images/logo.svg" alt="logo" />
        <img v-else src="@/assets/images/logo.svg" alt="logo" />
      </div>

      <div class="sidebar__customer-lavel">
        <h3>Mr. Kazi Zaman</h3>
        <el-tag type="primary">Diamond</el-tag>
      </div>
      <h4>
        Balance <strong>: <i class="icon-taka"></i> 20000.00 </strong>
      </h4>
      <h4 class="mt-1">
        Points <strong>: <i class="icon-medal"></i> 20000 </strong>
      </h4>
    </div>

    <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" @open="handleOpen" @close="handleClose">
      <el-menu-item index="1">
        <router-link :to="{ name: 'home' }">
          <i class="icon-home"></i>
          <span>Home</span>
        </router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link :to="{ name: 'dashboard' }">
          <i class="icon-apps"></i>
          <span>Dashboard</span>
        </router-link>
      </el-menu-item>

      <el-menu-item index="4">
        <router-link :to="{ name: 'orders' }"><i class="icon-shopping-cart"></i> <span>My Orders</span> </router-link>
      </el-menu-item>
      <el-menu-item index="5">
        <router-link :to="{ name: 'customers' }">
          <i class="icon-users"></i>
          <span>My Customers</span>
        </router-link>
      </el-menu-item>
      <!-- <el-menu-item index="5">
        <router-link :to="{ name: 'categories' }">
          <i class="icon-category"></i>
          <span>Categories</span>
        </router-link>
      </el-menu-item> -->
      <el-menu-item index="6">
        <router-link :to="{ name: 'myProducts' }"><i class="icon-product"></i> <span>My Product</span> </router-link>
      </el-menu-item>
      <el-menu-item index="7">
        <router-link :to="{ name: 'wishList' }"> <i class="icon-heart"></i> <span>Wish List</span></router-link>
      </el-menu-item>
      <el-menu-item index="8">
        <router-link :to="{ name: 'transaction' }"> <i class="icon-document-signed"></i> <span>Transaction History</span></router-link>
      </el-menu-item>
      <el-menu-item index="9">
        <router-link :to="{ name: 'withdraw' }"> <i class="icon-card"></i> <span>Withdraw Money</span></router-link>
      </el-menu-item>
      <el-menu-item index="10">
        <router-link :to="{ name: 'moderators' }"><i class="icon-user"></i> <span>Manage Moderators</span> </router-link>
      </el-menu-item>
      <el-menu-item index="11">
        <router-link :to="{ name: 'notifications' }"> <i class="icon-bell"></i> <span>Notification</span> <span class="ml-auto">(5)</span></router-link>
      </el-menu-item>
      <el-menu-item index="12">
        <router-link :to="{ name: 'settings' }"><i class="icon-settings"></i> <span>Settings</span> </router-link>
      </el-menu-item>
      <el-menu-item index="13">
        <router-link :to="{ name: 'warranties' }"><i class="icon-receipt"></i> <span>Warranty Products</span> </router-link>
      </el-menu-item>
      <el-menu-item index="14">
        <router-link :to="{ name: 'tickets' }"> <i class="icon-headset"></i> <span>Support Center</span> </router-link>
      </el-menu-item>
      <el-menu-item index="15">
        <a @click="logout"> <i class="icon-sign-out"></i> <span>Log Out</span></a>
      </el-menu-item>
    </el-menu>
  </aside>
</template>
<script>
export default {
  name: "SideBar",

  data() {
    return {
      //
    };
  },
  methods: {
    logout() {
      localStorage.removeItem("sellerToken");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  /* width: 200px; */
  min-height: 400px;
}
</style>
