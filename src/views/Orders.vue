<template>
  <v-container>
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
        >
        </v-text-field>
      </v-col>
      <v-col cols="2" class="px-1">
        <v-btn
          small
          to="/orders/add"
          color="primary"
          class="elevation-0 rounded-lg"
          height="40px"
        >
          <v-icon> mdi-account-plus-outline </v-icon>
        </v-btn>
      </v-col>
      <!-- </v-col> -->
    </v-row>

    <!-- Status Slider -->
    <v-slide-group
      mandatory
      v-model="productFilterBy"
      value="status"
      class="py-2"
    >
      <v-slide-item
        v-for="status in orderStatusMenu"
        :key="status"
        v-slot="{ active, toggle }"
      >
        <v-btn
          class="mx-2 catpion text-capitalize rounded-lg"
          :input-value="active"
          active-class="primary white--text"
          :color="active ? 'undefined' : '#8c9eff'"
          outlined
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
      <order-list :filter="orderStatusMenu[productFilterBy]" />
    </v-fade-transition>
  </v-container>
</template>


<script>
import orderList from "./components/OrderList.vue";

export default {
  name: "OrderList",
  components: { orderList },
  data() {
    return {
      orderStatusMenu: [
        "All",
        "To Order",
        "Awaiting Shipment",
        "Done",
        "Canceled",
      ],
      productFilterBy: "",
    };
  },
};
</script>