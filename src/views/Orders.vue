<template>
  <v-container class="pa-5">
    <v-row class="my-0">
      <!-- <v-col cols="12" class="pb-0"> -->
      <v-col cols="10">
        <v-text-field
          class="grey--text text--darken-2 elevation-5 rounded-lg"
          background-color="#F7F7FC"
          color="primary"
          append-icon="mdi-magnify"
          filled
          hide-details
          dense
          solo
          single-line
          flat
          outlined
          v-model="searchBar"
        >
        </v-text-field>
      </v-col>
      <v-col cols="2" class="px-1">
        <v-btn
          small
          to="/orders/add"
          color="primary"
          class="elevation-5 rounded-lg"
          height="40px"
        >
          <v-icon> mdi-account-plus-outline </v-icon>
        </v-btn>
      </v-col>
      <!-- </v-col> -->
    </v-row>

    <!-- Status Slider -->
    <v-slide-group v-model="productFilterBy" value="status" class="py-2">
      <v-slide-item
        v-for="(status, index) in orderStatusMenu"
        :key="index"
        v-slot="{ active, toggle }"
      >
        <v-btn
          class="mx-2 catpion text-capitalize rounded-lg white"
          :input-value="active"
          active-class="primary white--text"
          depressed
          rounded
          small
          @click="toggle"
        >
          {{ status }}
        </v-btn>
      </v-slide-item>
    </v-slide-group>

    <!-- OrderList -->
    <v-fade-transition>
      <order-list :filter="getStatusFilter" :searchBar="searchBar" />
    </v-fade-transition>
  </v-container>
</template>


<script>
import orderList from "./components/OrderList.vue";

export default {
  name: "OrdersPage",
  components: { orderList },
  props: ["filter"],
  data() {
    return {
      searchBar: "",
      orderStatusMenu: [
        "All",
        "To Order",
        "Packing",
        "Shipping",
        "Done",
        "Canceled",
      ],
      productFilterBy: null,
    };
  },
  computed: {
    getStatusFilter() {
      let statusFilter = "All";
      if (this.filter && this.productFilterBy == null) {
        statusFilter = this.filter;
      } else if (
        (!this.filter || this.productFilterBy) &&
        this.productFilterBy != null
      ) {
        statusFilter = this.orderStatusMenu[this.productFilterBy];
      }
      return statusFilter;
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff !important;
}
</style>