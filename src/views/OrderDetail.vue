<template>
  <v-container class="pa-5">
    <v-row no-gutters>
      <v-col cols="12" class="my-3">
        <order-timeline :data="statusTimelineData" />
      </v-col>

      <v-col>
        <!-- Delivery Information -->
        <v-card
          class="elevation-0 pa-3 rounded-lg my-3"
          v-if="
            statusTimelineData.statusDetails.toOrder.done &&
            !statusTimelineData.statusDetails.packing.done
          "
        >
          <v-row>
            <v-col cols="12" class="d-flex justify-space-between">
              <v-card-text primary-title class="font-weight-bold pa-0 caption">
                Placed Order to Seller?
              </v-card-text>
              <v-btn
                small
                color="primary"
                class="text-capitalize elevation-0"
                @click="confirmOrder"
              >
                Confirm
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-card
          class="elevation-0 pa-3 rounded-lg my-3"
          v-if="
            statusTimelineData.statusDetails.shipping.done &&
            !statusTimelineData.statusDetails.done.done
          "
        >
          <v-row>
            <v-col cols="12" class="d-flex justify-space-between">
              <v-card-text primary-title class="font-weight-bold pa-0 caption">
                Order Completed
              </v-card-text>
              <v-btn
                small
                color="primary"
                class="text-capitalize elevation-0"
                @click="confirmCompleted"
              >
                Confirm
              </v-btn>
            </v-col>
          </v-row>
        </v-card>

        <v-card class="elevation-0 pa-3 rounded-lg">
          <v-row>
            <v-col cols="12" class="pb-0 d-flex justify-space-between">
              <v-card-text primary-title class="font-weight-bold pa-0 caption">
                Delivery Information
              </v-card-text>
              <v-btn
                x-small
                color="primary"
                class="text-capitalize elevation-0"
                @click="openDeliveryDialog"
                v-if="
                  statusTimelineData.statusDetails.packing.done &&
                  !statusTimelineData.statusDetails.done.done
                "
              >
                Input AWB
              </v-btn>
            </v-col>

            <!-- Right -->
            <v-col cols="5" class="grey--text text--darken-2 caption">
              <v-card-text class="font-weight-medium pa-0 caption">
                Courier Delivery
              </v-card-text>
              <v-card-text class="font-weight-medium pa-0 caption">
                AWB
              </v-card-text>
              <!-- <v-card-text class="font-weight-medium pa-0 caption">
                Seller
              </v-card-text> -->
            </v-col>

            <!-- Left -->
            <v-col>
              <v-card-text class="font-weight-medium pa-0 caption">
                : {{ getOrderDetailData.delivery.courierDelivery || "" }}
              </v-card-text>
              <!-- AWB Value -->
              <v-card-text class="font-weight-medium pa-0 caption">
                : {{ getOrderDetailData.delivery.awb || "" }}
                <span class="font-weight-bold"> </span>
                <span v-if="getOrderDetailData.delivery.awb">
                  <v-btn
                    x-small
                    icon
                    depressed
                    :ripple="false"
                    @click="copyToClipboard(getOrderDetailData.delivery.awb)"
                  >
                    <v-icon>mdi-content-copy</v-icon>
                  </v-btn>
                </span>
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>
        <!-- Order Information -->
        <v-card class="elevation-0 my-3 pa-3 rounded-lg">
          <v-row>
            <v-col cols="12" class="pb-0 d-flex justify-space-around">
              <v-card-text primary-title class="font-weight-bold pa-0 caption">
                Order Information
              </v-card-text>
              <v-btn
                x-small
                color="primary"
                class="text-capitalize elevation-0"
              >
                Adjust Order
              </v-btn>
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
                  <!-- Order Id Value -->
                  <v-card-text class="font-weight-medium pa-0 caption">
                    :
                    <span class="font-weight-bold">{{
                      getOrderDetailData.id
                    }}</span>
                    <span>
                      <v-btn
                        x-small
                        icon
                        depressed
                        :ripple="false"
                        @click="copyToClipboard(getOrderDetailData.id)"
                      >
                        <v-icon>mdi-content-copy</v-icon>
                      </v-btn>
                    </span>
                  </v-card-text>
                  <v-card-text class="font-weight-medium pa-0 caption">
                    : Rp {{ getOrderDetailData.totalCost | currency }}
                  </v-card-text>
                  <!-- Customer Payment Value -->
                  <v-card-text class="font-weight-medium pa-0 caption">
                    : Rp {{ getOrderDetailData.totalPrice | currency }}
                  </v-card-text>
                  <v-card-text class="font-weight-medium pa-0 caption">
                    :
                    <span class="primary--text font-weight-bold caption"
                      >Rp
                      {{
                        (getOrderDetailData.totalPrice -
                          getOrderDetailData.totalCost)
                          | currency
                      }}
                    </span>
                  </v-card-text>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </v-card>

        <!-- Customer Information -->
        <v-card class="elevation-0 my-3 pa-3 rounded-lg">
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
                : {{ getUserById.name }}
              </v-card-text>

              <v-card-text class="font-weight-medium pa-0 caption"
                >: {{ getUserById.phone }}
              </v-card-text>
              <v-card-text class="font-weight-medium pa-0 caption"
                >: {{ getUserById.address }}
              </v-card-text>
            </v-col>
          </v-row>
        </v-card>

        <!-- Product Information -->
        <v-card class="elevation-0 my-3 pa-3 rounded-lg">
          <v-row>
            <v-col cols="12" class="pb-0">
              <v-card-text primary-title class="font-weight-bold pa-0 caption">
                Product Information
              </v-card-text>
            </v-col>
            <!-- Product Order List -->
            <v-col
              cols="12"
              v-for="product in getOrderDetailData.products"
              :key="product.id"
            >
              <v-row class="align-center">
                <v-col cols="2">
                  <v-avatar size="50" color="secondary" class="rounded-lg">
                    <v-img></v-img>
                  </v-avatar>
                </v-col>

                <v-col cols="10">
                  <v-list-item-subtitle class="pa-0 caption text--capitalize">
                    {{ product.name }}
                  </v-list-item-subtitle>
                  <v-card-subtitle
                    class="pa-0 caption d-flex justify-space-between"
                  >
                    <span>Count : {{ product.count }}</span>
                    <span class="text-end"
                      >Rp {{ product.totalPrice | currency }}</span
                    >
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
    <v-bottom-sheet v-model="dialog">
      <v-card class="px-10 py-10">
        <v-row>
          <v-col>
            <v-list-item-subtitle>AWB</v-list-item-subtitle>
            <v-select
              solo
              hide-details
              dense
              flat
              outlined
              class="mb-3"
              :items="courierDelivery"
              v-model="deliveryInformation.courierDelivery"
            ></v-select>
            <v-list-item-subtitle>Courier Delivery</v-list-item-subtitle>
            <v-text-field
              solo
              hide-details
              dense
              flat
              outlined
              class="mb-3"
              v-model="deliveryInformation.awb"
            >
            </v-text-field>

            <v-btn
              block
              color="primary"
              class="text--capitalize my-5"
              @click="saveDeliveryInformation"
              >Save
            </v-btn>
          </v-col>
        </v-row>
      </v-card>
    </v-bottom-sheet>
  </v-container>
</template>

<script>
import orderTimeline from "./components/OrderTimeline";

export default {
  name: "OrderDetail",
  components: { orderTimeline },
  data() {
    return {
      dialog: false,
      courierDelivery: ["JNE", "JNT"],
      deliveryInformation: {
        awb: "",
        courierDelivery: "",
      },
      orderStatus: [
        {
          label: "Waiting Approval",
        },
      ],
    };
  },
  methods: {
    async confirmCompleted() {
      const orderId = this.$route.params.order_id;

      const totalProductCount = await this.getOrderDetailData.products
        .map((item) => item.count)
        .reduce((prev, next) => prev + next);

      const totalProfit =
        this.getOrderDetailData.totalPrice - this.getOrderDetailData.totalCost;

      const completedSales = {
        totalProfit,
        totalProductCount,
      };

      const orderDetail = this.getOrderDetailData;

      this.$store.dispatch("confirmCompleted", {
        orderId,
        completedSales,
        orderDetail,
      });
      this.$router.push("/orders");
    },
    confirmOrder() {
      this.$store.dispatch("confirmToOrder", this.$route.params.order_id);
      this.$router.push("/orders");
    },

    async saveDeliveryInformation() {
      let data = {
        delivery: this.deliveryInformation,
        orderId: this.$route.params.order_id,
      };
      await this.$store.dispatch("inputOrderDeliveryInformation", data);
      this.dialog = false;

      this.$router.push("/orders");
    },
    openDeliveryDialog() {
      this.dialog = true;
    },
    async copyToClipboard(message) {
      await navigator.clipboard.writeText(message).then(() => {
        this.$store.commit("SET_Notification", {
          message: "Copied",
          isActive: true,
          img: "success",
        });
        setTimeout(() => {
          this.$store.commit("SET_Notification", {
            isActive: false,
          });
        }, 1000);
      });
    },
  },
  computed: {
    statusTimelineData() {
      const orderStatusFormData = this.getOrderDetailData;
      const statusData = {
        status: orderStatusFormData.status,
        statusDetails: orderStatusFormData.statusDetails,
      };

      return statusData;
    },
    getOrderDetailData() {
      const orderId = this.$route.params.order_id;
      return this.$store.getters.getOrderById(orderId);
    },
    getUserById() {
      const customerId = this.getOrderDetailData.customer.id;
      return this.$store.getters.getCustomerById(customerId);
    },
  },
};
</script>

<style scoped>
.v-text-field--outlined >>> fieldset {
  border-color: #b9bcff;
}
</style>