import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store/";

Vue.use(VueRouter);

const routes = [
  {
    path: "",
    name: "Layouts",
    component: () => import("@/layouts/Layout.vue"),
    children: [
      {
        path: "/",
        name: "Home",
        component: () => import("@/views/Home.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/products",
        name: "Products",
        component: () => import("@/views/Products.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/products/add",
        name: "Add Product",
        component: () => import("@/views/ProductDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/products/:product_id",
        name: "Product Detail",
        component: () => import("@/views/ProductDetail.vue"),
        meta: { requiresAuth: true },
      },

      // Store Routes
      {
        path: "/store/customers/add",
        name: "Add New Customer",
        component: () => import("@/views/StoreDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/store/suppliers/add",
        name: "Add New Supplier",
        component: () => import("@/views/StoreDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/store",
        name: "Store",
        component: () => import("@/views/Store.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/store/suppliers/:supplier_id",
        name: "Supplier Detail",
        component: () => import("@/views/StoreDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/store/customers/:customer_id",
        name: "Customer Detail",
        component: () => import("@/views/StoreDetail.vue"),
        meta: { requiresAuth: true },
      },

      // Order Routes
      {
        path: "/orders",
        name: "Orders",
        component: () => import("@/views/Orders.vue"),
        props: (route) => ({ filter: route.query.status }),
        meta: { requiresAuth: true },
      },
      {
        path: "/orders/add",
        name: "Add New Order",
        component: () => import("@/views/OrderForm.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/profile",
        name: "Profile Page",
        component: () => import("@/views/Profile.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/orders/:order_id",
        name: "Order Detail",
        component: () => import("@/views/OrderDetail.vue"),
        meta: { requiresAuth: true },
      },
      {
        path: "/login",
        name: "Login Page",
        component: () => import("@/views/Login.vue"),
        meta: { requiresAuth: false, fullScreen: true },
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

// Check for authentication
router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.
    if (!store.getters.isAuthenticated) {
      next({
        path: "/login",
      });
    } else {
      next();
    }
  } else {
    next(); // make sure to always call next()!
  }
});

export default router;
