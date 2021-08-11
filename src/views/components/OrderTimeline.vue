<template>
  <v-card flat outlined rounded="lg" class="pa-3">
    <v-row class="pb-3">
      <!-- <v-card-title class="primary--text"> Canceled </v-card-title> -->
      <v-col class="text-center">
        <v-chip color="error" class="font-weight-bold">Canceled</v-chip>
      </v-col>
    </v-row>
    <v-col cols="12" class="d-flex">
      <v-row class="d-flex justify-center">
        <v-col :cols="i != 4 ? 3 : 1" v-for="i in 4" :key="i">
          <v-row class="d-flex align-center justify-center">
            <v-col :cols="i != 4 ? 3 : 12" class="pa-0">
              <v-avatar size="25" color="undefined" class="grey lighten-3">
                <v-icon small color="white">mdi-check</v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="9" v-if="i != 4" class="pa-0">
              <v-divider
                class="grey lighten-3"
                style="border-width: 2px"
              ></v-divider>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-col>
    <v-col cols="12">
      <v-row>
        <v-col
          class="pa-0 caption text-center"
          cols="3"
          v-for="i in 4"
          :key="i"
        >
          <v-list-item-subtitle
            class="font-weight-medium grey--text text--lighten-1"
            >Done</v-list-item-subtitle
          >
          <v-list-item-subtitle class="grey--text text--darken-2 caption">
            19-09-2021
          </v-list-item-subtitle>
        </v-col>
      </v-row>
    </v-col>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      orderStatusTimeline: {},
      courierShipment: {
        courierName: "",
        awb: "",
      },
      courierDelivery: ["JNE, JNT"],
    };
  },
};
</script>

<style scoped>
</style>