<template>
  <v-row>
    <v-col>
      <div>
        <v-card
          class="pa-2 elevation-0 rounded-lg mb-2"
          outlined
          v-for="order in filterOrdersByStatus"
          :key="order.id"
          :to="'/orders/' + order.id"
        >
          <v-row class="d-flex align-center caption">
            <v-col cols="1">
              <v-avatar color="accent" size="20">
                <v-icon dark small> mdi-account </v-icon>
              </v-avatar>
            </v-col>
            <v-col class="font-weight-bold primary--text">
              {{ order.customerName }}
            </v-col>
            <v-col class="d-flex justify-end grey--text text--darken-2">
              {{ order.updatedAt | dateFormat }}
            </v-col>
            <v-col cols="12" class="py-0">
              <v-divider></v-divider>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="auto">
              <v-img
                height="80px"
                width="80px"
                class="rounded-lg secondary"
                contain
              >
              </v-img>
            </v-col>
            <v-col class="caption">
              <v-row>
                <v-col cols="12" class="pb-0">
                  <p class="font-weight-medium mb-0">
                    {{ order.products[0].name }}
                  </p>
                </v-col>
              </v-row>

              <v-row>
                <v-col class="grey--text py-0">No. Pesanan </v-col>
                <v-col class="font-weight-bold d-flex justify-end py-0">
                  {{ order.id }}
                </v-col>
              </v-row>

              <v-row>
                <v-col class="grey--text pt-0"> Products (1)</v-col>
                <v-col
                  class="d-flex justify-end font-weight-bold pt-0 primary--text"
                >
                  Rp. {{ order.totalPrice | currency }}
                </v-col>
                <v-col cols="12" class="pt-0 d-flex justify-end">
                  <v-chip small label color="primary">
                    {{ order.status }}</v-chip
                  >
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import moment from "moment";
import { mapGetters } from "vuex";

export default {
  name: "OrderList",
  props: ["filter"],
  computed: {
    ...mapGetters(["allOrders"]),
    filterOrdersByStatus() {
      if (this.filter == "All") {
        return this.allOrders;
      } else {
        return this.allOrders.filter((order) => {
          return order.status == this.filter;
        });
      }
    },
  },
  filters: {
    dateFormat(date) {
      return moment(date, "MM-DD-YYYY");
    },
  },
};
</script>