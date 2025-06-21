<template>
  <div class="notifications">
    <h2 class="page__title d-flex">
      Notifications
      <button class="btn btn-outline ml-auto" @click="markAllAsRead">Mark all as read</button>
    </h2>
    <div class="notification__tab d-flex">
      <button class="mr-3" @click="setTab('all')" :class="{ active: currentTab === 'all' }">
        All <span>{{ notifications.length }}</span>
      </button>
      <button @click="setTab('promotion')" :class="{ active: currentTab === 'promotion' }">Promotion</button>
      <button @click="setTab('order')" :class="{ active: currentTab === 'order' }">Order</button>
      <button @click="setTab('products')" :class="{ active: currentTab === 'products' }">Products</button>
    </div>
    <div v-for="notification in filteredNotifications" :key="notification.id" class="notification">
      <span class="notification__icon">{{notification.title.charAt(0)}}</span>
      <div class="notification__content">
        <h3>{{ notification.title }}</h3>
        <p>{{ notification.message }}</p>
      </div>
      <div class="notification__more">
        <el-dropdown>
          <div class="el-dropdown-link">
            <span>{{ notification.timeAgo }}</span>
            <i class="icon-dots-vertical"></i>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item class="text-danger">Delete</el-dropdown-item>
              <el-dropdown-item>Mark Read</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentTab: "all",
      notifications: [
        {
          id: 1,
          title: "Low Stock Alert – Only 5 units left",
          message: "Consider restocking soon to avoid missed sales.",
          timeAgo: "15h",
          type: "general",
        },
        {
          id: 2,
          title: "Auto Cash Disbursement Complete",
          message: "Your weekly earnings of [Amount] have been transferred to your account.",
          timeAgo: "15h",
          type: "products",
        },
        {
          id: 3,
          title: "New Order Received!",
          message: "You have a new order for [Product Name]. Click here to view details and fulfill.",
          timeAgo: "15h",
          type: "order",
        },
        {
          id: 4,
          title: "New Customer Review",
          message: "[Customer Name] left a review on [Product Name]. Click here to view and respond if needed.",
          timeAgo: "15h",
          type: "promotion",
        },
      ],
    };
  },
  computed: {
    filteredNotifications() {
       if (this.currentTab === 'all') {
    return this.notifications;
  }
      return this.notifications.filter(
    (notification) => notification.type === this.currentTab
  );
    },
  },
  methods: {
    setTab(tab) {
      this.currentTab = tab;
    },
    markAllAsRead() {
      alert("All notifications marked as read!");
    },
  },
};
</script>

<style scoped>

</style>
