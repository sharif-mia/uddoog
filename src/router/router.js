import Categories from "@/views/categories/Categories.vue";
import CategoryForm from "@/views/categories/CategoryForm.vue";
import CustomerForm from "@/views/customers/CustomerForm.vue";
import Customers from "@/views/customers/Customers.vue";
import Dashboard from "@/views/dashboard/Dashboard.vue";
import DashboardLayout from "@/views/DashboardLayout.vue";
import MainLayout from "@/views/MainLayout.vue";
import AddProducts from "@/views/myProducts/AddProduct.vue";
import MyProducts from "@/views/myProducts/MyProducts.vue";
import Notifications from "@/views/notifications/Notifications.vue";
import Orders from "@/views/orders/Orders.vue";
import OrderSummary from "@/views/orders/OrderSummary.vue";
import Home from "@/views/pages/Home.vue";
import ProductDetails from "@/views/pages/ProductDetails.vue";
import AllProducts from "@/views/pages/ProductList.vue";
import Payments from "@/views/payments/Payments.vue";
import ProductForm from "@/views/products/ProductForm.vue";
import Products from "@/views/products/Products.vue";
import Profile from "@/views/profile/Profile.vue";
import ForgotPassword from "@/views/sellers/ForgotPassword.vue";
import Login from "@/views/sellers/Login.vue";
import Signup from "@/views/sellers/Signup.vue";
import Settings from "@/views/settings/Settings.vue";
import TicketForm from "@/views/tickets/TicketForm.vue";
import Tickets from "@/views/tickets/Tickets.vue";
import WishList from "@/views/wishlist/WishList.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/signup",
    name: "signup",
    component: Signup,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/forgot-password",
    name: "forgotPassword",
    component: ForgotPassword,
  },
  // ✅ Public pages wrapped in PublicLayout
  {
    path: "/",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: Home,
      },
      {
        path: "all-products",
        name: "allProducts",
        component: AllProducts,
      },
      
      {
        path: "product-details",
        name: "productDetails",
        component: ProductDetails,
      },
    ],
  },

  {
    path: "/dashboard",
    component: DashboardLayout,
    meta: { requiresAuth: true },
    children: [
      {
        path: "", // Default nested route (e.g., /dashboard)
        name: "dashboard",
        component: Dashboard,
      },
      {
        path: "profile",
        name: "profile",
        component: Profile,
      },
      {
        path: "customers",
        name: "customers",
        component: Customers,
      },
      {
        path: "customers/add",
        name: "addCustomer",
        component: CustomerForm,
      },
      {
        path: "customers/edit/:id",
        name: "editCustomer",
        component: CustomerForm,
      },
      {
        path: "categories",
        name: "categories",
        component: Categories,
      },
      {
        path: "categories/add",
        name: "addCategory",
        component: CategoryForm,
      },
      {
        path: "categories/edit/:id",
        name: "editCategory",
        component: CategoryForm,
      },
      {
        path: "products",
        name: "products",
        component: Products,
      },

      {
        path: "products/add",
        name: "addProduct",
        component: ProductForm,
      },
      {
        path: "products/edit/:id",
        name: "editProduct",
        component: ProductForm,
      },
      {
        path: "payments",
        name: "payments",
        component: Payments,
      },
      {
        path: "wishlist",
        name: "wishList",
        component: WishList,
      },
      {
        path: "orders",
        name: "orders",
        component: Orders,
      },
      {
        path: "order-summary",
        name: "orderSummary",
        component: OrderSummary,
      },
      {
        path: "my-products",
        name: "myProducts",
        component: MyProducts,
      },
      {
        path: "add-products",
        name: "addProducts",
        component: AddProducts,
      },
      {
        path: "notifications",
        name: "notifications",
        component: Notifications,
      },
      {
        path: "settings",
        name: "settings",
        component: Settings,
      },
      {
        path: "tickets",
        name: "tickets",
        component: Tickets,
      },
      {
        path: "ticket/add",
        name: "addTicket",
        component: TicketForm,
      },
    ],
  },
  // {
  //   path: "/customer-add",
  //   name: "customerAdd",
  //   component: CustomerForm,
  //   meta: { requiresAuth: true },
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem("sellerToken");
  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ name: "login" });
  } else {
    next();
  }
});

export default router;
