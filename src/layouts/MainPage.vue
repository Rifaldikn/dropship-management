<template>
  <v-main app>
    <v-container class="pa-0">
      <router-view />

      <notification />
    </v-container>
  </v-main>
</template>

<script>
import notification from "./NotificationModal.vue";

export default {
  name: "MainPageLayout",
  components: { notification },
  created() {
    if (this.$store.getters.userData) {
      this.$store.dispatch("fetchCustomerList");
      this.$store.dispatch("fetchSupplierList");
      this.$store.dispatch("fetchOrdersProduct");
      this.$store.dispatch("fetchProductListItems");
      this.$store.dispatch("fetchSalesData");
    }
  },
};
</script>

<style scoped>
</style>