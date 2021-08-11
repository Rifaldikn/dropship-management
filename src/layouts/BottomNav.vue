<template>
  <v-bottom-navigation
    v-model="nav"
    class="elevation-5 text-center"
    id="bottomNav"
    grow
    fixed
    app
  >
    <v-btn
      :key="menu.path"
      v-for="menu in bottomNavigation"
      icon
      :to="menu.path"
      color="primary"
    >
      <span>{{ menu.title }}</span>

      <v-icon>mdi-{{ menu.icon }}</v-icon>
    </v-btn>
  </v-bottom-navigation>
</template>

<script>
export default {
  name: "BottomNavLayout",
  data() {
    return {
      nav: "",
      bottomNavigation: [
        {
          title: "Home",
          path: "/",
          icon: "home-outline",
        },
        {
          title: "Orders",
          path: "/orders",
          icon: "receipt",
        },
        {
          title: "Product",
          path: "/products",
          icon: "package-variant-closed",
        },
        {
          title: "Store",
          path: "/store",
          icon: "storefront-outline",
        },
        {
          title: "Profile",
          path: "/profile",
          icon: "account-outline",
        },
      ],
    };
  },
};
</script>

<style scoped>
#bottomNav {
  display: flex;
  justify-content: center;
  margin: 0 auto;
}
</style>