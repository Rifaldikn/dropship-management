<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12" class="my-3">
        <order-timeline />
      </v-col>

      <v-col>
        <!-- Delivery Information -->
        <v-card class="elevation-0 pa-3 rounded-lg" outlined>
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-card-text primary-title class="font-weight-bold pa-0 caption">
                Delivery Information
              </v-card-text>
            </v-col>

            <!-- Right -->
            <v-col cols="5" class="grey--text text--darken-2 caption">
              <v-card-text class="font-weight-medium pa-0 caption">
                Courier Delivery
              </v-card-text>
              <v-card-text class="font-weight-medium pa-0 caption">
                AWB
              </v-card-text>
              <v-card-text class="font-weight-medium pa-0 caption">
                Seller
              </v-card-text>
            </v-col>

            <!-- Left -->
            <v-col>
              <v-card-text class="font-weight-medium pa-0 caption"
                >: JNT
              </v-card-text>

              <!-- AWB Value -->
              <v-card-text class="font-weight-medium pa-0 caption">
                : <span class="font-weight-bold">160430131624244</span>
                <span>
                  <v-btn x-small icon depressed :ripple="false">
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                  <!-- <v-btn
                x-small
                color="primary"
                class="text-capitalize elevation-0"
              >
                Input AWB
              </v-btn> -->
                </span>
              </v-card-text>
              <v-card-text class="font-weight-medium pa-0 caption"
                >: {{ getOrderDetailData.supplierName }}
                <span class="primary--text">(Jakarta)</span>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
        <!-- Order Information -->
        <v-card class="elevation-0 my-3 pa-3 rounded-lg" outlined>
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-card-text primary-title class="font-weight-bold pa-0 caption">
                Order Information
              </v-card-text>
            </v-col>
            <v-col cols="12">
              <v-row>
                <v-col cols="5" class="grey--text text--darken-2">
                  <v-card-text class="font-weight-medium pa-0 caption">
                    Order Id
                  </v-card-text>
                  <v-card-text class="font-weight-medium pa-0 caption">
                    Cost</v-card-text
                  >
                  <v-card-text class="font-weight-medium pa-0 caption">
                    Customer Payment
                  </v-card-text>
                  <v-card-text class="font-weight-medium pa-0 caption">
                    Profit</v-card-text
                  >
                </v-col>
                <v-col>
                  <v-card-text class="font-weight-medium pa-0 caption">
                    : <span class="font-weight-bold">160430131624244</span>
                    <span>
                      <v-btn x-small icon depressed :ripple="false">
                        <v-icon>mdi-content-copy</v-icon>
                      </v-btn>
                    </span>
                  </v-card-text>
                  <v-card-text class="font-weight-medium pa-0 caption">
                    : Rp {{ 125000 | currency }}
                  </v-card-text>
                  <v-card-text class="font-weight-medium pa-0 caption">
                    : Rp {{ 125000 | currency }}
                  </v-card-text>
                  <v-card-text class="font-weight-medium pa-0 caption">
                    :
                    <span class="primary--text font-weight-bold caption"
                      >Rp {{ 125000 | currency }}
                    </span>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <!-- Customer Information -->
        <v-card class="elevation-0 my-3 pa-3 rounded-lg" outlined>
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-card-text primary-title class="font-weight-bold pa-0 caption">
                Customer Information
              </v-card-text>
            </v-col>
            <!-- Right -->
            <v-col cols="5" class="grey--text text--darken-2 caption">
              <v-card-text class="font-weight-medium pa-0 caption">
                Name
              </v-card-text>
              <v-card-text class="font-weight-medium pa-0 caption">
                Phone Number
              </v-card-text>
              <v-card-text class="font-weight-medium pa-0 caption">
                Address
              </v-card-text>
            </v-col>
            <!-- Left -->
            <v-col>
              <v-card-text class="font-weight-medium pa-0 caption">
                : Rifaldi Kusnawan
              </v-card-text>

              <v-card-text class="font-weight-medium pa-0 caption"
                >: 010940255048417
              </v-card-text>
              <v-card-text class="font-weight-medium pa-0 caption"
                >: Serang
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>

        <!-- Product Information -->
        <v-card class="elevation-0 my-3 pa-3 rounded-lg" outlined>
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-card-text primary-title class="font-weight-bold pa-0 caption">
                Product Information
              </v-card-text>
            </v-col>
            <!-- Product Order List -->
            <v-col cols="12" v-for="i in 5" :key="i">
              <v-row class="align-center">
                <v-col cols="2">
                  <v-avatar size="50" color="secondary" class="rounded-lg">
                    <v-img></v-img>
                  </v-avatar>
                </v-col>

                <v-col cols="10">
                  <v-list-item-subtitle class="pa-0 caption">
                    Alat Pemotong Sayur / Buah / Parutan Serbaguna Multifungsi 8
                    in 1
                  </v-list-item-subtitle>
                  <v-card-subtitle
                    class="pa-0 caption d-flex justify-space-between"
                  >
                    <span>Count : 1</span>
                    <span class="text-end">Rp {{ 125000 | currency }}</span>
                  </v-card-subtitle>
                </v-col>
                <v-col cols="12" class="pa-0">
                  <v-divider></v-divider>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import orderTimeline from "./components/OrderTimeline";
import moment from "moment";

export default {
  name: "OrderDetail",
  components: { orderTimeline },
  data() {
    return {
      orderStatus: [
        {
          label: "Waiting Approval",
        },
      ],
    };
  },
  filters: {
    dateFormat(date) {
      return moment(date, "MM-DD-YYYY");
    },
  },
  computed: {
    getOrderDetailData() {
      const orderId = this.$router.params.order_id;
      console.log(orderId);
      return this.$store.getters.getOrderById(orderId);
    },
  },
};
</script>