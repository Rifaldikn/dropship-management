<template>
  <div>
    <!-- <v-main> -->
    <v-fade-transition>
      <router-view />
    </v-fade-transition>

    <!-- </v-main> -->
  </div>
</template>

<script>
export default {
  name: "App",
  created() {
    this.$store.dispatch("fetchCustomerList");
    this.$store.dispatch("fetchSupplierList");
    this.$store.dispatch("fetchOrdersProduct");
    this.$store.dispatch("fetchProductListItems");
  },
};
</script>

<style >
body {
  max-width: 600px !important;
  margin: 0 auto;
}
#app {
  background-color: #f9f8f7;
}

.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff !important;
}

* {
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
}
</style>
