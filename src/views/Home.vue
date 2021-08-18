<template>
  <div id="Home">
    <!-- Dasboard Information -->

    <v-container class="pa-5 white">
      <v-card
        class="elevation-1 mx-auto mt-n16 pa-1 absolute rounded-xl"
        :ripple="false"
        dense
      >
        <v-row class="" no-gutters>
          <v-col v-for="(item, key) in dashboardData" :key="key" cols="4">
            <v-card
              width="100%"
              height="100%"
              :to="item.path"
              class="
                d-flex
                justify-center
                align-center
                text-center
                rounded-xl
                elevation-0
              "
              :ripple="false"
              flat
            >
              <div class="pa-1 primary--text">
                <div class="title">
                  {{ item.value }}
                </div>
                <v-list-item-subtitle class="grey--text text--darken-2">
                  {{ item.label }}
                </v-list-item-subtitle>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-card>
    </v-container>

    <!-- Menus -->

    <v-container fluid class="pt-0 px-7 white">
      <v-row>
        <v-col
          v-for="menu in dashboardMenus"
          :key="menu.title"
          cols="4"
          class="py-2"
        >
          <v-card
            dense
            class="elevation-0 rounded-xl"
            :to="menu.path"
            :ripple="false"
          >
            <v-responsive :aspect-ratio="1 / 1" class="d-flex align-center">
              <v-row class="d-flex justify-center no-gutters">
                <v-col class="py-0">
                  <v-card
                    class="rounded-circle pa-3 elevation-0 mx-auto"
                    width="60px"
                    height="60px"
                    color="secondary"
                    :ripple="false"
                  >
                    <v-img class="rounded" contain :src="menu.image"></v-img>
                  </v-card>
                </v-col>
              </v-row>
              <v-row>
                <v-col class="pt-1">
                  <div class="caption text-center">
                    {{ menu.title }}
                  </div>
                </v-col>
              </v-row>
            </v-responsive>
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <!-- Order Status -->

    <v-container class="white pb-5 mt-2">
      <v-row class="px-5 my-1">
        <div class="grey--text text--darken-3 subtitle-1 font-weight-medium">
          List Orders
        </div>
      </v-row>
      <v-row>
        <v-card class="mx-auto rounded-lg" flat width="100%" c>
          <v-list class="">
            <v-list-item-group class="caption">
              <v-list-item
                v-for="(item, i) in orderStatusInfo"
                :key="i"
                :to="item.path"
              >
                <v-list-item-icon class="my-2">
                  <v-img class="rounded" contain></v-img>
                  <v-avatar size="30" color="secondary">
                    <img class="pa-1 rounded" :src="item.image" alt="alt" />
                  </v-avatar>
                </v-list-item-icon>
                <v-list-item-content class="pa-0">
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
                <v-list-item-action-text
                  v-text="getOrderListCount(item.value)"
                  class="caption font-weight-bold"
                ></v-list-item-action-text>

                <v-icon> mdi-chevron-right </v-icon>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-card>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  beforeMount() {
    this.$store.dispatch("fetchDashboard");
  },
  data() {
    return {
      dashboardMenus: [
        {
          image: "https://image.flaticon.com/icons/png/512/1007/1007888.png",
          title: "Add Products",
          path: "/products/add",
        },
        {
          image: "https://image.flaticon.com/icons/png/512/4371/4371334.png",
          title: "Add Order",
          path: "/orders/add",
        },
        {
          image: "https://image.flaticon.com/icons/png/512/4371/4371079.png",
          title: "List Orders",
          path: "/orders",
        },
        {
          image: "https://image.flaticon.com/icons/png/512/3787/3787823.png",
          title: "Suppliers",
          path: "/store",
        },
        {
          image: "https://image.flaticon.com/icons/png/512/726/726498.png",
          title: "My Store",
          path: "/store",
        },
      ],
      orderStatusInfo: [
        {
          title: "Waiting To Order",
          value: "To Order",
          path: "/orders?status=To Order",
          image: "https://image.flaticon.com/icons/png/512/2258/2258597.png",
        },
        {
          title: "Waiting to be Packed",
          value: "Packing",
          path: "/orders?status=Packing",
          image: "https://image.flaticon.com/icons/png/512/4021/4021566.png",
        },
        {
          title: "Waiting to be Shipped",
          value: "Shipping",
          path: "/orders?status=Shipping",
          image: "https://image.flaticon.com/icons/png/512/4320/4320283.png",
        },
        {
          title: "Orders Completed",
          value: "Done",
          path: "/orders?status=Done",
          image: "https://image.flaticon.com/icons/png/512/391/391175.png",
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["dashboardData"]),
  },
  methods: {
    getOrderListCount(status) {
      const orderList = this.$store.getters.ordersByStatus(status);
      return orderList.length;
    },
  },
};
</script>

<style scoped>
#home {
  background-color: white;
}

.v-bottom-navigation {
  margin: 0 auto !important;
}
</style>
