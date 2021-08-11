import Vue from "vue";
import VueRouter from "vue-router";

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
      },
      {
        path: "/products",
        name: "Products",
        component: () => import("@/views/Products.vue"),
      },
      {
        path: "/products/add",
        name: "Add Product",
        component: () => import("@/views/ProductDetail.vue"),
      },
      {
        path: "/products/:product_id",
        name: "Product Detail",
        component: () => import("@/views/ProductDetail.vue"),
      },

      // Store Routes
      {
        path: "/store/customers/add",
        name: "Add New Customer",
        component: () => import("@/views/StoreDetail.vue"),
      },
      {
        path: "/store/suppliers/add",
        name: "Add New Supplier",
        component: () => import("@/views/StoreDetail.vue"),
      },
      {
        path: "/store",
        name: "Store",
        component: () => import("@/views/Store.vue"),
      },
      {
        path: "/store/suppliers/:supplier_id",
        name: "Supplier Detail",
        component: () => import("@/views/StoreDetail.vue"),
      },
      {
        path: "/store/customers/:customer_id",
        name: "Customer Detail",
        component: () => import("@/views/StoreDetail.vue"),
      },

      // Order Routes
      {
        path: "/orders",
        name: "Orders",
        component: () => import("@/views/Orders.vue"),
      },
      {
        path: "/orders/add",
        name: "Add New Order",
        component: () => import("@/views/OrderForm.vue"),
      },
      {
        path: "/orders/:order_id",
        name: "Order Detail",
        component: () => import("@/views/OrderDetail.vue"),
      },
    ],
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

export default router;
