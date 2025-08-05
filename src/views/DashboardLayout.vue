<template>
  <div class="page">
    <nav class="nav">
      <div class="nav__search">
        <button class="nav__search__btn">
          <i class="icon icon-search"> </i>
        </button>
        <input class="form-control" type="text" placeholder="What are you looking for" />
      </div>

      <div class="nav__control d-flex ml-auto">
        <router-link class="mr-3" :to="{ name: 'notifications' }"><i class="icon-bell"></i> <span class="active"></span> </router-link>
        <router-link class="mr-3" :to="{ name: 'wishList' }"><i class="icon-heart"></i></router-link>
        <el-dropdown trigger="click" >
          <span class="el-dropdown-link"> <div class="nav__control_avatar mr-2">A</div> Admin <i class="icon-down"></i></span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item><router-link :to="{ name: 'profile' }"><i class="icon-user"></i> <span>Profile</span> </router-link></el-dropdown-item>
              <el-dropdown-item class="text-danger" @click="logout"><i class="icon-sign-out"></i>Logout</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </nav>
    <SideBar :isSidebarVisible="showSidebar" @close-sidebar="showSidebar = false" />
    <section class="page__inner">
      <div class="page__container">
        <router-view></router-view>
      </div>
    </section>
    <MobileFooter :showSidebar="showSidebar" @toggle-sidebar="toggleSidebar" @close-sidebar="showSidebar = false" />

  </div>
</template>

<script>
import MobileFooter from "@/components/MobileFooter.vue";
import SideBar from "@/components/SideBar.vue";
export default {
  data() {
    return {
      showSidebar: false, // initially hidden on mobile
    };
  },
  components: {
    SideBar,MobileFooter
  },
  methods: {
     toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
    logout() {
      localStorage.removeItem("sellerToken");
      this.$router.push({ name: "login" });
    },
  },
};
</script>
