<template>
  <div>
    <!-- <v-main> -->
    <router-view />

    <!-- </v-main> -->
  </div>
</template>

<script>
export default {
  name: "App",
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

<style >
body {
  max-width: 600px !important;
  margin: 0 auto;
}

.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff !important;
}

* {
  -webkit-touch-callout: none !important;
  -webkit-user-select: none !important;
  -khtml-user-select: none !important;
  -moz-user-select: none !important;
  -ms-user-select: none !important;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
