<template>
  <v-card flat rounded="lg" class="pa-5">
    <v-row class="pb-3">
      <!-- <v-card-title class="primary--text"> Canceled </v-card-title> -->
      <v-col class="text-center">
        <v-chip
          :color="data.status != 'Canceled' ? 'primary' : 'error'"
          class="font-weight-medium"
          >{{ data.status }}</v-chip
        >
      </v-col>
    </v-row>
    <v-col cols="12" class="d-flex">
      <v-row class="d-flex justify-center">
        <v-col
          :cols="index != 3 ? 3 : 1"
          v-for="(status, index) in orderStatusTimeline"
          :key="index"
        >
          <v-row class="d-flex align-center justify-center">
            <v-col :cols="index != 4 ? 3 : 12" class="pa-0">
              <v-avatar
                size="25"
                :color="status.date ? 'primary' : 'undefined'"
                :class="status.date ? '' : 'grey lighten-3'"
              >
                <v-icon small color="white">mdi-check</v-icon>
              </v-avatar>
            </v-col>
            <v-col cols="9" v-if="index != 4" class="px-1">
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
          v-for="(detail, index) in orderStatusTimeline"
          :key="index"
        >
          <v-list-item-subtitle
            class="font-weight-medium grey--text text--darken-2"
            >{{ detail.label }}</v-list-item-subtitle
          >
          <v-list-item-subtitle
            v-if="detail.date"
            class="grey--text text--lignten-1 caption"
          >
            {{ detail.date | formatDate }}
          </v-list-item-subtitle>
        </v-col>
      </v-row>
    </v-col>
  </v-card>
</template>

<script>
export default {
  props: ["data"],
  data() {
    return {
      courierShipment: {
        courierName: "",
        awb: "",
      },
    };
  },
  computed: {
    orderStatusTimeline() {
      let status = this.data.statusDetails;
      return [status.toOrder, status.packing, status.shipping, status.done];
    },
  },
};
</script>

<style scoped>
</style>